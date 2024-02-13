import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config = {
  mode: "production",
  entry: "./index.js",
  output: {
    path: path.join(__dirname, "dist"),
    publicPath: "/",
    filename: "build.js",
  },
  target: "node",
};

export default config;
