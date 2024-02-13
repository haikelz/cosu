import { connection } from "../lib/utils/connection.js";
import { encode } from "../lib/utils/jwt.js";

export async function homeHandler(req, res) {
  try {
    if (res.statusCode === 200) {
      res.send({
        status: res.statusCode,
        message: res.statusMessage,
        author: "Haikel Ilham Hakim",
        endpoints: {
          "/": "Home",
          "/api/costumes-list": "Get costumes list",
          "/api/add-costume": "Add new costume(only for admin role)",
          "/api/auth/sign-in": "Sign In",
          "/api/auth/sign-up": "Sign Up",
        },
      });
    } else {
      res.send({
        status: res.statusCode,
        message: res.statusMessage,
      });
    }
  } catch (err) {
    res.send({ status: 500, message: err.message });
  }
}

export async function costumesListHandler(req, res) {
  try {
    const [results] = await connection().then((res) =>
      res.query(`SELECT * FROM costumes_list`)
    );

    if (res.statusCode === 200 && results.length) {
      res.send({
        status: 200,
        message: "Berhasil mendapatkan data!",
        data: results,
      });
    } else {
      res.send({
        status: res.statusCode,
        message: res.statusMessage,
        data: null,
      });
    }
  } catch (err) {
    res.send({ status: 500, message: err.message });
  }
}

export async function addCostumeHandler(req, res) {
  try {
    const payload = {
      name: req.body.name,
      size: req.body.size,
      price: req.body.price,
      image: req.body.image,
    };

    if (res.statusCode === 200 || res.statusCode === 201) {
      if (Object.keys(req.body).length === 4) {
        await connection().then((res) =>
          res.query(
            `INSERT INTO costumes_list(name, size, price, image) VALUES('${payload.name}', '${payload.size}', '${payload.price}', '${payload.image}')`
          )
        );

        res.send({
          status: res.statusCode,
          message: "Berhasil menambah kostum baru!",
        });
      }
    } else {
      res.send({
        status: res.statusCode,
        message: res.statusMessage,
      });
    }
  } catch (err) {
    res.send({ status: 500, message: err.message });
  }
}

export async function signInHandler(req, res) {
  try {
    const payload = {
      username: req.body.username,
      password: req.body.password,
    };

    // jwt secret are generated from openssl rand command
    const newToken = encode(payload);

    if (res.statusCode === 200 || res.statusCode === 201) {
      if (Object.keys(req.body).length === 2) {
        // Select data from table users_list
        const [results] = await connection().then((res) =>
          res.query(
            `SELECT * FROM users_list WHERE username = '${payload.username}' AND password = '${payload.password}'`
          )
        );

        if (results.length) {
          res.send({
            status: res.statusCode,
            message: "Login berhasil!",
            data: results,
            token: newToken,
          });
        } else {
          res.send({
            status: 404,
            message:
              "Username atau password yang dimasukkan salah! Silahkan coba lagi!",
            data: null,
            token: null,
          });
        }
      }
    } else {
      res.send({
        status: res.statusCode,
        message: res.statusMessage,
        data: null,
        token: null,
      });
    }
  } catch (err) {
    res.send({
      status: 500,
      message: err.message,
    });
  }
}

async function checkUser(payload) {
  const [results] = await connection().then((res) =>
    res.query(
      `SELECT * FROM users_list WHERE username = '${payload.username}' AND password = '${payload.password}'`
    )
  );

  if (results.length) {
    return true;
  } else {
    return false;
  }
}

export async function signUpHandler(req, res) {
  try {
    const payload = {
      username: req.body.username,
      password: req.body.password,
    };

    if (res.statusCode === 200 || res.statusCode === 201) {
      if (Object.keys(req.body).length === 2) {
        const availableUser = await checkUser(payload);

        if (availableUser) {
          res.send({
            status: 403,
            message: "Data akun ini sudah pernah dibuat!",
          });
        } else {
          await connection().then((res) =>
            res.execute(
              `INSERT INTO users_list(username, password, role) VALUES('${
                payload.username
              }', '${payload.password}', '${
                payload.username === process.env.ADMIN_USERNAME &&
                payload.password === process.env.ADMIN_PASSWORD
                  ? "admin"
                  : "guest"
              }')`
            )
          );

          res.send({
            status: res.statusCode,
            message: "Pembuatan akun berhasil!",
          });
        }
      }
    } else {
      res.send({
        status: res.statusCode,
        message: res.statusMessage,
        data: null,
        token: null,
      });
    }
  } catch (err) {
    res.send({ status: 500, message: err.message });
  }
}
