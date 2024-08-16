const puppeteer = require("puppeteer");
const axios = require("axios");
const fs = require("fs");
const path = require("path");
const { minify } = require("html-minifier");

const CATEGORY_API_URL = "https://api.pifa.co.id/main/categorynew";
// const NEWS_DETAIL_API_URL = `${apiURL}/authapi/viewnews`;

const MINIFY_OPTIONS = {
  collapseWhitespace: true,
  removeComments: true,
  removeEmptyAttributes: true,
};

const minifyHtml = (html) => {
  return minify(html, MINIFY_OPTIONS);
};

const savePage = async (page, route) => {
  const filePath = path.join(__dirname, "../../../build", route === "/" ? "index.html" : `${route}.html`);
  const dir = path.dirname(filePath);

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const content = await page.content();
  const minifiedContent = minifyHtml(content);

  fs.writeFileSync(filePath, minifiedContent);
  console.log(`Saved: ${filePath}`);
};

const fetchPages = async () => {
  try {
    // const [categoriesResponse, newsDetailsResponse] = await Promise.all([axios.get(CATEGORY_API_URL), axios.get(NEWS_DETAIL_API_URL)]);
    const categoriesResponse = await axios.get(CATEGORY_API_URL);
    const categoriesData = categoriesResponse.data;
    const categoryPaths = categoriesData.data.map((category) => `/${category.slug}`);
    // const newsDetailPaths = newsDetailsResponse.data.map((news) => `/berita/${news.slug}`);

    return categoryPaths;
    // return [...categoryPaths, ...newsDetailPaths];
  } catch (error) {
    console.error("Error fetching pages:", error);
    return [];
  }
};

(async () => {
  // const pages = await fetchPages();
  const pages = ["/lokal", "/nasional", "/internasional", "/teknologi"];
  if (!pages.length) {
    console.error("No pages to process");
    return;
  }

  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  for (const route of pages) {
    const page = await browser.newPage();
    const url = `http://localhost:3000${route}`;
    await page.goto(url, { waitUntil: "networkidle2" });

    const content = await page.evaluate(() => {
      return new XMLSerializer().serializeToString(document.doctype) + document.documentElement.outerHTML;
    });

    const minifiedContent = minifyHtml(content);
    const filePath = path.join(__dirname, "../../../build", route === "/" ? "index.html" : `${route}.html`);
    const dir = path.dirname(filePath);

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(filePath, minifiedContent);
    console.log(`Saved: ${filePath}`);
  }

  await browser.close();
})();
