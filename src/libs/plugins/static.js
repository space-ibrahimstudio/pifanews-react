const puppeteer = require("puppeteer");
const axios = require("axios");
const fs = require("fs");
const path = require("path");

const API_URL = "https://your-api-url.com/pages";

const MINIFY_OPTIONS = {
  collapseWhitespace: true,
  removeComments: true,
  removeEmptyAttributes: true,
};

const minifyHtml = (html) => {
  const minify = require("html-minifier").minify;
  return minify(html, MINIFY_OPTIONS);
};

const savePage = async (page, route) => {
  const isRoot = route === "/";
  const filePath = path.join(__dirname, "build", isRoot ? "index.html" : `${route}/index.html`);
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
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching pages:", error);
    return [];
  }
};

(async () => {
  const pages = await fetchPages();
  if (!pages.length) {
    console.error("No pages to process");
    return;
  }
  const browser = await puppeteer.launch({ args: ["--no-sandbox", "--disable-setuid-sandbox"] });
  const page = await browser.newPage();
  for (const route of pages) {
    const url = `http://localhost:3000${route}`;
    await page.goto(url, { waitUntil: "networkidle2" });
    await savePage(page, route);
  }
  await browser.close();
})();
