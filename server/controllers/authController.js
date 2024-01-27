import Users from "../models/userModel.js";
import { hashString } from "../utils/index.js";
import { sendVerificationEmail } from "../utils/sendEmail.js";
import { compareString } from "../utils/index.js";
import { createJWT } from "../utils/index.js";

export const register = async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

  // validate field

  if (!(firstName || lastName || email || password)) {
    console.log("hello");
    next("Provide Required Fields"); // passes argument through next
    return;
  }

  try {
    const userExist = await Users.findOne({ email });

    if (userExist) {
      next("Email Address Already Exist");
      return;
    }
    const hashedPassword = await hashString(password);
    const user = await Users.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    // console.log(user)
    sendVerificationEmail(user, res);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

// login functionality
export const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    //validation
    if (!email || !password) {
      next("Please Provide User Credentials");
      return;
    }

    // find user by email
    const user = await Users.findOne({ email }).select("+password").populate({
      path: "friends",
      select: "firstName lastName location profileUrl -password",
    });

    if (!user) {
      next("Invalid email or password");
      return;
    }

    if (!user?.verified) {
      next(
        "User email is not verified. Check your email account and please verify the email"
      );
      return;
    }

    // compare password
    const isMatch = await compareString(password, user?.password);

    if (!isMatch) {
      next("Invalid email or password");
      return;
    }

    user.password = undefined; // set paasword to null for security purposes

    const token = createJWT(user?._id);

    res.status(201).json({
      success: true,
      message: "Login successfully",
      user,
      token,
    });
    // console.log(user)
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};
