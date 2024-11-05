import { User } from "../models/User.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signUp = async (req, res) => {
  let { name, password, email } = req.body;
  try {
    email = req.body.email.toLowerCase();
    const userAlreadyExist = await User.findOne({ email });

    if (userAlreadyExist) {
      return res.status(400).json({
        success: false,
        errors: { email: "This email is already registered" },
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();

    return res.status(201).json({
      success: true,
      message: "user created successfully",
      data: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const login = async (req, res) => {
  let { password, email } = req.body;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const errors = {};

  try {
    if (!email) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(email)) {
      errors.email = "Invalid email format";
    }

    if (!password) {
      errors.password = "Password is required";
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ success: false, errors });
    }

    email = req.body.email.toLowerCase();

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        errors: { email: "User with this email not found" },
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ success: false, errors: { password: "Invalid Password" } });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return res.status(200).json({
      success: true,
      message: "Login Successfully",
      token: token,
      data: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findOne({ _id: userId });
    if (user) {
      return res.status(200).json({
        data: {
          ...user._doc,
          password: undefined,
        },
      });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};
