const { User, Salary, Role } = require("../models");

exports.getAllUsersWithSalaries = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["user_id", "username", "fullname"],
      include: [
        {
          model: Salary,
          attributes: ["perhour_salary", "monthly_salary"],
          required: true,
        },
        {
          model: Role,
          attributes: ["role_name"],
        },
      ],
    });

    return res.status(200).json({ users });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
