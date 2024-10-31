const fs = require("fs");
const path = require("path");
const axios = require("axios");
const { parseStringPromise, Builder } = require("xml2js");
const moment = require("moment");
const packageJson = require("./package.json");
if (!process.env.CI) {
  require("dotenv").config({ path: ".env.development" });
}

const sub = process.env.REACT_APP_DOMAIN_AREA;
const subID = process.env.REACT_APP_DOMAIN_AREA_ID;
const apiURL = process.env.REACT_APP_API_URL;

async function fetchCatSlug() {
  const formData = new FormData();
  formData.append("idcat", subID);
  try {
    const url = `${apiURL}/main/subcategorynew`;
    const response = await axios.post(url, formData, { headers: { "Content-Type": "multipart/form-data" } });
    const slugdata = response.data;
    if (!slugdata.error) {
      return slugdata.data;
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error fetching category slugs:", error);
    process.exit(1);
  }
}

async function fetchPostSlug() {
  const formData = new FormData();
  formData.append("idcat", subID);
  formData.append("limit", "1500");
  formData.append("hal", "0");
  try {
    const url = `${apiURL}/main/sublatestnew`;
    const response = await axios.post(url, formData, { headers: { "Content-Type": "multipart/form-data" } });
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

async function updatePackageJson(catslugs, postslugs) {
  const updatedInclude = [
    "/",
    "/informasi",
    "/informasi/syarat-ketentuan",
    "/informasi/tentang-pifa",
    "/informasi/kebijakan-privasi",
    "/informasi/faq",
    "/informasi/kode-etik-jurnalistik",
    "/informasi/pasang-iklan",
    "/informasi/pedoman-media-siber",
    "/berita",
    "/berita/kategori",
    "/berita/tag",
    "/berita/insight",
    "/berita/insight/terbaru",
    "/berita/insight/populer",
    "/berita/insight/trending",
    "/berita/insight/rekomendasi",
    ...catslugs.map((item) => `/berita/kategori/${item[0].slug}`),
    ...postslugs.map((item) => `/berita/${item.slug}`),
  ];
  packageJson.reactSnap.include = updatedInclude;

  fs.writeFileSync("package.json", JSON.stringify(packageJson, null, 2));
  console.log("package.json updated successfully");
}

async function generateSitemap(catslugs, postslugs) {
  const domain = `https://${sub}.pifa.co.id`;
  if (!domain) {
    console.error("DOMAIN environment variable is not set");
    process.exit(1);
  }

  const sitemapPath = path.join(__dirname, "public", `${sub}_sitemap.xml`);
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

  const staticUrls = [
    { loc: "/", changefreq: "daily", lastmod: moment().format("YYYY-MM-DD"), priority: 1.0 },
    { loc: "/informasi/syarat-ketentuan", changefreq: "monthly", lastmod: moment().format("YYYY-MM-DD"), priority: 1.0 },
    { loc: "/informasi/tentang-pifa", changefreq: "monthly", lastmod: moment().format("YYYY-MM-DD"), priority: 1.0 },
    { loc: "/informasi/kebijakan-privasi", changefreq: "monthly", lastmod: moment().format("YYYY-MM-DD"), priority: 1.0 },
    { loc: "/informasi/faq", changefreq: "monthly", lastmod: moment().format("YYYY-MM-DD"), priority: 1.0 },
    { loc: "/informasi/kode-etik-jurnalistik", changefreq: "monthly", lastmod: moment().format("YYYY-MM-DD"), priority: 1.0 },
    { loc: "/informasi/pasang-iklan", changefreq: "monthly", lastmod: moment().format("YYYY-MM-DD"), priority: 1.0 },
    { loc: "/informasi/pedoman-media-siber", changefreq: "monthly", lastmod: moment().format("YYYY-MM-DD"), priority: 1.0 },
    { loc: "/berita/insight/terbaru", changefreq: "daily", lastmod: moment().format("YYYY-MM-DD"), priority: 1.0 },
    { loc: "/berita/insight/populer", changefreq: "daily", lastmod: moment().format("YYYY-MM-DD"), priority: 1.0 },
    { loc: "/berita/insight/trending", changefreq: "daily", lastmod: moment().format("YYYY-MM-DD"), priority: 1.0 },
    { loc: "/berita/insight/rekomendasi", changefreq: "daily", lastmod: moment().format("YYYY-MM-DD"), priority: 1.0 },
  ];
  const dynamicUrls = [...catslugs.map((item) => ({ loc: `/berita/kategori/${item[0].slug}`, lastmod: item[0].updated_at ? moment(item[0].updated_at).format("YYYY-MM-DD") : defaultLastmod, priority: 0.8 })), ...postslugs.map((item) => ({ loc: `/berita/${item.slug}`, lastmod: item.updated_at ? moment(item.updated_at).format("YYYY-MM-DD") : defaultLastmod, priority: 0.8 }))];
  let existingUrls = [];

  if (fs.existsSync(sitemapPath)) {
    console.log(`existing ${sub}_sitemap.xml detected, merging data...`);
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
      console.error(`Error parsing existing ${sub}_sitemap.xml:`, err);
    }
  } else {
    console.log(`${sub}_sitemap.xml does not exist, creating a new one...`);
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
  console.log(`${sub}_sitemap.xml generated and updated successfully`);
}

async function main() {
  const catslugs = await fetchCatSlug();
  const postslugs = await fetchPostSlug();
  await updatePackageJson(catslugs, postslugs);
  await generateSitemap(catslugs, postslugs);
}

main();
