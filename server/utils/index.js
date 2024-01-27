import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";

// password hashing
export const hashString = async (useValue) => {
  const salt = await bcrypt.genSalt(10);

  const hashedpassword = await bcrypt.hash(useValue, salt);
  return hashedpassword;
};

// compare hashedPassword
export const compareString = async (userPassword, password) => {
  const isMatch = await bcrypt.compare(userPassword, password);
  return isMatch;
};

// create json webToken
export function createJWT(id) {
  return JWT.sign({ userId: id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "1d",
  });
}
