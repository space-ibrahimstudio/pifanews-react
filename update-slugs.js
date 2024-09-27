const fs = require("fs");
const path = require("path");
const axios = require("axios");
const { parseStringPromise, Builder } = require("xml2js");
const moment = require("moment");
const packageJson = require("./package.json");
if (!process.env.CI) {
  require("dotenv").config({ path: ".env.development" });
}

const domainURL = process.env.REACT_APP_DOMAIN_EVENT;
const apiURL = process.env.REACT_APP_API_URL;

async function fetchEventSlug() {
  try {
    const url = `${apiURL}/event/showevent`;
    const response = await axios.get(url, {});
    const slugdata = response.data;
    if (!slugdata.error) {
      return slugdata.data;
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error fetching post slugs:", error);
    process.exit(1);
  }
}

async function updatePackageJson(eventslugs) {
  const updatedInclude = ["/", ...eventslugs.map((item) => `/event/${item.slug}`)];
  packageJson.reactSnap.include = updatedInclude;

  fs.writeFileSync("package.json", JSON.stringify(packageJson, null, 2));
  console.log("package.json updated successfully");
}

async function generateSitemap(eventslugs) {
  const domain = domainURL;
  if (!domain) {
    console.error("DOMAIN environment variable is not set");
    process.exit(1);
  }

  const sitemapPath = path.join(__dirname, "public", "sitemap.xml");
  const defaultLastmod = moment().format("YYYY-MM-DD");

  const createUrlNode = (loc, changefreq = "weekly", lastmod = null, priority = 0.8) => {
    const node = {
      loc: `${domain}${loc}`,
      changefreq,
      priority: priority.toFixed(1),
    };
    if (lastmod) {
      node.lastmod = lastmod;
    }
    return node;
  };

  const staticUrls = [{ loc: "/", changefreq: "daily", lastmod: moment().format("YYYY-MM-DD"), priority: 1.0 }];
  const dynamicUrls = [...eventslugs.map((item) => ({ loc: `/event/${item.slug}`, lastmod: item.eventupdate ? moment(item.eventupdate).format("YYYY-MM-DD") : defaultLastmod, priority: 0.8 }))];
  let existingUrls = [];

  if (fs.existsSync(sitemapPath)) {
    console.log("existing sitemap.xml detected, merging data...");
    const existingSitemapData = fs.readFileSync(sitemapPath, "utf8");
    try {
      const parsedSitemap = await parseStringPromise(existingSitemapData);
      const existingUrlset = parsedSitemap.urlset.url;
      existingUrls = existingUrlset.map((urlObj) => ({
        loc: urlObj.loc[0],
        changefreq: urlObj.changefreq[0],
        lastmod: urlObj.lastmod ? urlObj.lastmod[0] : null,
        priority: urlObj.priority ? parseFloat(urlObj.priority[0]) : 0.6,
      }));
    } catch (err) {
      console.error("Error parsing existing sitemap.xml:", err);
    }
  } else {
    console.log("sitemap.xml does not exist, creating a new one...");
  }

  const urlMap = new Map(existingUrls.map((url) => [url.loc, url]));

  staticUrls.forEach((staticUrl) => {
    if (!urlMap.has(`${domain}${staticUrl.loc}`)) {
      urlMap.set(`${domain}${staticUrl.loc}`, createUrlNode(staticUrl.loc, staticUrl.changefreq, staticUrl.lastmod, staticUrl.priority));
    } else {
      const existingUrl = urlMap.get(`${domain}${staticUrl.loc}`);
      existingUrl.priority = "1.0";
    }
  });

  dynamicUrls.forEach((newUrl) => {
    if (urlMap.has(`${domain}${newUrl.loc}`)) {
      const existingUrl = urlMap.get(`${domain}${newUrl.loc}`);
      existingUrl.lastmod = newUrl.lastmod;
    } else {
      urlMap.set(`${domain}${newUrl.loc}`, createUrlNode(newUrl.loc, "weekly", newUrl.lastmod, newUrl.priority));
    }
  });

  const mergedUrls = Array.from(urlMap.values());
  const builder = new Builder();
  const updatedSitemapXml = builder.buildObject({
    urlset: {
      $: { xmlns: "http://www.sitemaps.org/schemas/sitemap/0.9" },
      url: mergedUrls.map((url) => ({
        loc: url.loc,
        changefreq: url.changefreq,
        lastmod: url.lastmod,
        priority: url.priority,
      })),
    },
  });

  fs.writeFileSync(sitemapPath, updatedSitemapXml);
  console.log("sitemap.xml generated and updated successfully");
}

async function main() {
  const eventslugs = await fetchEventSlug();
  await updatePackageJson(eventslugs);
  await generateSitemap(eventslugs);
}

main();
