const puppeteer = require("puppeteer");
const axios = require("axios");
const fs = require("fs");
const path = require("path");

const CATEGORY_API_URL = "https://your-api-url.com/categories";
const POSTS_API_URL = "https://your-api-url.com/posts";

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
  const filePath = path.join(__dirname, "build", route, "index.html");
  const dir = path.dirname(filePath);

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const content = await page.content();
  const minifiedContent = minifyHtml(content);

  fs.writeFileSync(filePath, minifiedContent);
  console.log(`Saved: ${filePath}`);
};

const fetchCategories = async () => {
  try {
    const response = await axios.get(CATEGORY_API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};

const fetchPostsForCategory = async (categorySlug) => {
  try {
    const response = await axios.get(`${POSTS_API_URL}?category=${categorySlug}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching posts for category ${categorySlug}:`, error);
    return [];
  }
};

(async () => {
  const categories = await fetchCategories();
  if (!categories.length) {
    console.error("No categories to process");
    return;
  }

  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();

  for (const category of categories) {
    const categorySlug = category.slug;
    const categoryUrl = `/${categorySlug}`;
    await page.goto(`http://localhost:3000${categoryUrl}`, { waitUntil: "networkidle2" });
    await savePage(page, categorySlug);

    const posts = await fetchPostsForCategory(categorySlug);
    for (const post of posts) {
      const postSlug = post.slug;
      const postUrl = `/${categorySlug}/${postSlug}`;
      await page.goto(`http://localhost:3000${postUrl}`, { waitUntil: "networkidle2" });
      await savePage(page, `${categorySlug}/${postSlug}`);
    }
  }

  await browser.close();
})();
