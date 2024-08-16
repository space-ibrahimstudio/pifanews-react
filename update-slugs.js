const fs = require("fs");
const path = require("path");
const axios = require("axios");
const packageJson = require("./package.json");

const apiURL = "https://api.pifa.co.id";

async function fetchCatSlug() {
  try {
    const response = await axios.get(`${apiURL}/main/categorynew`);
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
  formData.append("limit", "100");
  formData.append("hal", "0");
  try {
    const url = `${apiURL}/main/latestnew`;
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
  const updatedInclude = ["/", ...catslugs.map((item) => `/berita/kategori/${item.slug}`), ...postslugs.map((item) => `/berita/${item.slug}`)];
  packageJson.reactSnap.include = updatedInclude;

  fs.writeFileSync("package.json", JSON.stringify(packageJson, null, 2));
  console.log("package.json updated successfully");
}

function generateSitemap(catslugs, postslugs) {
  const domain = "https://beta.pifa.co.id";
  if (!domain) {
    console.error("REACT_APP_DOMAIN_URL environment variable is not set");
    process.exit(1);
  }

  const staticUrls = ["/"];
  const dynamicUrls = [...catslugs.map((item) => `/berita/kategori/${item.slug}`), ...postslugs.map((item) => `/berita/${item.slug}`)];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticUrls
  .map(
    (surl) => `<url>
  <loc>${`${domain}${surl}`}</loc>
  <changefreq>daily</changefreq>
</url>`
  )
  .join("\n")}
${dynamicUrls
  .map(
    (durl) => `<url>
  <loc>${`${domain}${durl}`}</loc>
  <changefreq>weekly</changefreq>
</url>`
  )
  .join("\n")}
</urlset>`;

  fs.writeFileSync(path.join(__dirname, "public", "sitemap.xml"), sitemap);
  console.log("sitemap.xml generated successfully");
}

async function main() {
  const catslugs = await fetchCatSlug();
  const postslugs = await fetchPostSlug();
  await updatePackageJson(catslugs, postslugs);
  generateSitemap(catslugs, postslugs);
}

main();
