import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    if (users.length === 0) {
      return res.status(404).json({ message: "No users were found" });
    }
    return res.status(200).json({ users });
  } catch (error) {
    console.error("Error fetching Users", error);
    return res.status(500).json({
      message: "An unexpected error occurred while trying to fetch users",
    });
  }
};

export const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  const saltRounds = 10;
  if (!password || !email || !name) {
    return res
      .status(400)
      .json({ message: "The request body is missing one or more items" });
  }
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    return res
      .status(409)
      .json({ message: "User with this email already exists" });
  }
  bcrypt.hash(password, saltRounds, async (err, hash) => {
    if (err) {
      console.error("Error hashing password:", err);
      return res.status(500).json({
        message:
          "An unexpected error occurred while encrypting the user's password",
      });
    }
    try {
      const newUser = await User.create({
        name: name,
        email: email,
        password: hash,
      });
      return res.status(201).json(newUser);
    } catch (error) {
      console.error("Error creating user:", error);
      return res
        .status(500)
        .json({ message: "Error creating user in the database" });
    }
  });
};

export const blockUser = async (req, res) => {
  const userId = req.params.id;
  if (!userId) {
    return res
      .status(400)
      .json({ message: "No id was received to query the database" });
  }
  const user = await User.findOne({ where: { id: userId } });
  if (!user) {
    return res.status(404).json({ message: "No user was found" });
  }
  try {
    await User.update(
      {
        status: "blocked",
      },
      {
        where: {
          id: userId,
        },
      }
    );
    return res.status(200).json({ message: "User blocked successfully" });
  } catch (error) {
    console.error("An error ocurred while trying to block this user", error);
    return res.status(500).json({ message: "Unable to block user" });
  }
};

export const unBlockUser = async (req, res) => {
  const userId = req.params.id;
  if (!userId) {
    return res
      .status(400)
      .json({ message: "No id was received to query the database" });
  }
  const user = await User.findOne({ where: { id: userId } });
  if (!user) {
    return res.status(404).json({ message: "No user was found" });
  }
  try {
    await User.update(
      {
        status: "active",
      },
      {
        where: {
          id: userId,
        },
      }
    );
    return res.status(200).json({ message: "User unblocked successfully" });
  } catch (error) {
    console.error("An error ocurred while trying to unblock this user", error);
    return res.status(500).json({ message: "Unable to unblock user" });
  }
};

export const deleteUser = async (req, res) => {
  const userId = req.params.id;
  if (!userId) {
    return res
      .status(400)
      .json({ message: "No id was received to query the database" });
  }
  const user = await User.findOne({ where: { id: userId } });
  if (!user) {
    return res.status(404).json({ message: "No user was found" });
  }
  try {
    await User.destroy({
      where: { id: userId },
    });
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("An error ocurred while trying to block this user", error);
    return res.status(500).json({ message: "Unable to delete user" });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.status === "blocked") {
      return res
        .status(403)
        .json({ message: "This user is currently blocked from the app" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    user.last_login_time = Date.now();
    user.save();
    const payload = { id: user.id, email: user.email, name: user.name };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    return res.status(200).json({
      message: "Login successful",
      token
    });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ message: "An error occurred during login" });
  }
};
