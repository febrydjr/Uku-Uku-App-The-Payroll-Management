const bcrypt = require("bcrypt");
const { User, Role } = require("../models");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { token, username, email, password, fullname, birthdate } = req.body;

    let decodedToken;
    try {
      decodedToken = jwt.verify(token, process.env.JWT_KEY);
    } catch (error) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    if (decodedToken.email !== email) {
      return res
        .status(400)
        .json({ message: "Token email does not match registration email" });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const existingUsername = await User.findOne({ where: { username } });
    if (existingUsername) {
      return res.status(400).json({ message: "Username already taken" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const employeeRole = await Role.findOne({
      where: { role_name: "employee" },
    });

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      fullname,
      birthdate,
      join_date: Date.now(),
      role_id: employeeRole.role_id,
    });

    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
