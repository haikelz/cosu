import bcrypt from "bcrypt";

export function hashPassword(plainText) {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(plainText, salt);

  return hash;
}

export function comparePassword(plainText, hashedText) {
  return bcrypt.compareSync(plainText, hashedText);
}
