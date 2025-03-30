const fs = require("fs");
const path = require("path");
const successColor = "\x1b[32m%s\x1b[0m";
const checkSign = "\u{2705}";
const dotenv = require("dotenv").config({ path: "./.env" });

const envFile = `export const environment = {
    VITE_SUPABASE_URL: '${process.env.VITE_SUPABASE_URL}',
    VITE_SUPABASE_KEY: '${process.env.VITE_SUPABASE_KEY}',
};
`;

console.log(envFile);

const targetPath = path.join(__dirname, "./src/environments/environment.ts");
fs.writeFile(targetPath, envFile, (err) => {
  if (err) {
    console.error(err);
    throw err;
  } else {
    console.log(
      successColor,
      `${checkSign} Successfully generated environment.ts`
    );
  }
});
