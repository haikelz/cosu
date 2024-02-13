import {
  addCostumeHandler,
  costumesListHandler,
  homeHandler,
  signInHandler,
  signUpHandler,
} from "./handlers/index.js";
import {
  checkTokenAddCostume,
  checkTokenSignIn,
  checkTokenSignUp,
} from "./middleware/index.js";
import bodyParser from "body-parser";
import compression from "compression";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";

dotenv.config();
const app = express();

async function main() {
  // cors stuff
  app.use(cors());
  app.options("*", cors());

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  /**
   * @see https://expressjs.com/en/advanced/best-practice-performance.html#use-gzip-compression
   */
  app.use(compression());

  // middleware
  app.use("/api/auth/sign-in", checkTokenSignIn);
  app.use("/api/auth/sign-up", checkTokenSignUp);
  app.use("/api/add-costume", checkTokenAddCostume);

  // (GET | Public Access) home
  app.get("/", homeHandler);

  // (GET | Public Access) costumes list
  app.get("/api/costumes-list", costumesListHandler);

  // (POST | Protected based on Role) add costume
  app.post("/api/add-costume", addCostumeHandler);

  // (POST | Protected based on available token) Sign In
  app.post("/api/auth/sign-in", signInHandler);

  // (POST | Protected by available token) Sign Up
  app.post("/api/auth/sign-up", signUpHandler);

  // Listen to the port
  app.listen(process.env.PORT, () => {
    console.log(`Server sudah jalan di port ${process.env.PORT}`);
  });
}

main();
