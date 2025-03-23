const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");

const envPath = path.resolve(__dirname, ".env");
const envConfig = dotenv.parse(fs.readFileSync(envPath));

const environmentFiles = [
  path.resolve(__dirname, "src/environments/environment.ts"),
  path.resolve(__dirname, "src/environments/environment.prod.ts"),
];

environmentFiles.forEach((file) => {
  let fileContent = fs.readFileSync(file, "utf8");
  Object.keys(envConfig).forEach((key) => {
    const regex = new RegExp(`(supabaseUrl|supabaseKey):\\s*'"['"]`, "g");
    fileContent = fileContent.replace(regex, (match, p1) => {
      if (p1 === "supabaseUrl") {
        return `supabaseUrl: '${envConfig.VITE_SUPABASE_URL}'`;
      } else if (p1 === "supabaseKey") {
        return `supabaseKey: '${envConfig.VITE_SUPABASE_KEY}'`;
      }
      return match;
    });
  });
  fs.writeFileSync(file, fileContent);
});
