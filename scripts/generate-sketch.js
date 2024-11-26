const { readFileSync, copyFileSync, writeFileSync } = require("fs");
const path = require("path");

function convertToSlug(componentName) {
  return (
    componentName
      .replace(/([a-z])([A-Z])/g, "$1-$2") // Convert camelCase to kebab-case
      // .replace(/[^a-z0-9-]+/g, "-") // Remove special characters
      .toLowerCase()
  );
}

function findAndReplaceInFile(sourceFilePath, replaceSearch, replaceTerm) {
  var data = readFileSync(sourceFilePath, "utf-8");

  var newValue = data.replaceAll(replaceSearch, replaceTerm);

  writeFileSync(sourceFilePath, newValue, "utf-8");
}

const generateSketch = async () => {
  if (process.argv.length < 3)
    throw new Error(
      "Please provide a name for a new React component for sketching (e.g. 'SketchExample')"
    );

  const sketchName = process.argv[2];

  console.log(`⚙️ Creating a new sketch called <${sketchName} />`);

  // Get template for component and copy it
  const componentTemplatePath = path.join(
    __dirname,
    "../templates",
    "SketchTemplate.tsx"
  );
  const componentDestinationPath = path.join(
    __dirname,
    "../src/experiments/",
    `${sketchName}.tsx`
  );
  copyFileSync(componentTemplatePath, componentDestinationPath);

  // Swap out placeholder name
  findAndReplaceInFile(
    componentDestinationPath,
    "ExampleComponent",
    sketchName
  );

  // Get template for page and copy it
  const pageTemplatePath = path.join(__dirname, "../templates", "page.tsx");
  const pageName = convertToSlug(sketchName);
  const pageDestinationPath = path.join(
    __dirname,
    "../src/pages/experiments/",
    `${pageName}.tsx`
  );
  copyFileSync(pageTemplatePath, pageDestinationPath);

  // Swap out placeholder name
  findAndReplaceInFile(pageDestinationPath, "ExampleComponent", sketchName);

  // Done!
  console.log("Done! 🤘");
  console.log(`Created new sketch component: ${componentDestinationPath}`);
  console.log(`Created new sketch page: ${pageDestinationPath}`);
};

generateSketch();
