const { Salary, User } = require("../models");

exports.setPerHourSalary = async (req, res) => {
  try {
    const { user_id, perhour_salary } = req.body;

    // Check if the requesting user is an admin
    if (req.account.role !== "admin") {
      return res.status(403).json({ message: "Only admin can set salaries" });
    }

    // Find the user based on user_id
    const user = await User.findByPk(user_id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create or update the perhour salary for the user
    await Salary.upsert({
      user_id,
      perhour_salary,
    });

    return res.status(200).json({ message: "Perhour salary set successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
