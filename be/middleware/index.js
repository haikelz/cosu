import { connection } from "../lib/utils/connection.js";
import { check } from "../lib/utils/jwt.js";

export async function checkTokenAddCostume(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(" ")[1];
    const checkedJwt = check(token);

    if (token === "null") {
      res.statusCode = 401;
      res.send({
        status: 401,
        message: "Unauthorized! Silahkan Login terlebih dahulu!",
      });
    } else {
      if (checkedJwt) {
        const [results] = await connection().then((res) =>
          res.query(
            `SELECT * FROM users_list WHERE username = '${checkedJwt.username}' AND password = '${checkedJwt.password}'`
          )
        );

        if (results.length) {
          if (results[0].role === "guest") {
            res.send({
              status: 401,
              message: "Hanya admin yang bisa mengakses page ini!",
            });
          }
        }
      }
    }

    next();
  } catch (err) {
    res.send({
      status: 500,
      message: err.message,
    });
  }
}

export async function checkTokenSignIn(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(" ")[1];

    if (token !== "null") {
      res.send({
        status: 403,
        message: "Kamu sudah login sebelumnya!",
        data: null,
        token: null,
      });
    }

    next();
  } catch (err) {
    res.send({
      status: 500,
      message: err.message,
    });
  }
}

export async function checkTokenSignUp(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(" ")[1];

    if (token !== "null") {
      res.send({
        status: 403,
        message: "Kamu sudah login sebelumnya!",
      });
    }

    next();
  } catch (err) {
    res.send({
      status: 500,
      message: err.message,
    });
  }
}

export async function checkTokenSignOut(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(" ")[1];

    if (token === "null") {
      res.send({
        status: 401,
        message: "Kamu belum login!",
      });
    }

    next();
  } catch (err) {
    res.send({
      status: 500,
      message: err.message,
    });
  }
}
