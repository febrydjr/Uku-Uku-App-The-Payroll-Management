const { Salary, User } = require("../models");

exports.setSalary = async (req, res) => {
  try {
    const { username, perhour_salary, monthly_salary } = req.body;

    if (req.account.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Only admin can update salaries" });
    }

    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await Salary.update(
      {
        perhour_salary:
          perhour_salary !== undefined
            ? perhour_salary
            : user.Salary.perhour_salary,
        monthly_salary:
          monthly_salary !== undefined
            ? monthly_salary
            : user.Salary.monthly_salary,
      },
      { where: { user_id: user.user_id } }
    );

    return res.status(200).json({ message: "Salary updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
