const fs = require("fs");
const axios = require("axios");
const packageJson = require("./package.json");

async function fetchSlugs() {
  try {
    const response = await axios.get("https://zulkarna.in/pifa_api/main/categorynew");
    const slugdata = response.data;
    return slugdata.data;
  } catch (error) {
    console.error("Error fetching slugs:", error);
    process.exit(1);
  }
}

async function updatePackageJson() {
  const slugs = await fetchSlugs();
  const updatedInclude = ["/", ...slugs.map((item) => `/${item.slug}`)];

  // Update the reactSnap configuration
  packageJson.reactSnap.include = updatedInclude;

  // Write the updated package.json back to the file system
  fs.writeFileSync("package.json", JSON.stringify(packageJson, null, 2));
  console.log("package.json updated successfully");
}

updatePackageJson();
