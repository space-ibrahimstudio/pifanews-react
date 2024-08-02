const fs = require("fs");
const path = require("path");
const mkdirp = require("mkdirp");
const Prerenderer = require("@prerenderer/renderer-puppeteer");
const JSDOMRenderer = require("@prerenderer/renderer-jsdom");

const prerenderer = new Prerenderer({
  staticDir: path.join(__dirname, "../../../build"),
  renderer: new JSDOMRenderer(),
  postProcess(renderedRoute) {
    renderedRoute.html = renderedRoute.html.replace(/http:/gi, "https:").replace(/(https:\/\/)?(localhost|127\.0\.0\.1):\d*/gi, process.env.CI_ENVIRONMENT_URL || "");
  },
});

prerenderer
  .initialize()
  .then(() => {
    return prerenderer.renderRoutes(["/", "/lokal", "/nasional", "/internasional", "/teknologi"]);
  })
  .then((renderedRoutes) => {
    renderedRoutes.forEach((renderedRoute) => {
      try {
        const outputDir = path.join(__dirname, "../../../build", renderedRoute.route);
        const outputFile = `${outputDir}/index.html`;

        mkdirp.sync(outputDir);
        fs.writeFileSync(outputFile, renderedRoute.html.trim());
      } catch (e) {
        // Handle errors.
      }
    });

    return prerenderer.destroy();
  })
  .catch((err) => {
    return prerenderer.destroy();
    // Handle errors.
  });
