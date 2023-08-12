const { User, Logging, Salary } = require("../models");
const { Sequelize } = require("sequelize");

exports.clockIn = async (req, res) => {
  try {
    const { username } = req.body;

    // Find the user based on username
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find the user's latest clock-out entry for the day
    const latestLog = await Logging.findOne({
      where: {
        user_id: user.user_id,
        clockOut: null,
        clockIn: {
          [Sequelize.Op.between]: [
            new Date().setHours(0, 0, 0, 0),
            new Date().setHours(23, 59, 59, 999),
          ],
        },
      },
      order: [["clockIn", "DESC"]],
    });

    if (latestLog) {
      return res
        .status(400)
        .json({ message: "You need to clock out before clocking in" });
    }

    // Clock in the user
    await Logging.create({
      user_id: user.user_id,
      clockIn: new Date(),
    });

    return res.status(200).json({ message: "Clock-in successful" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.clockOut = async (req, res) => {
  try {
    const { username } = req.body;

    // Find the user based on username
    const user = await User.findOne({
      where: { username },
      include: [Salary], // Include associated salary data
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find the user's latest clock-in entry for the day
    const latestLog = await Logging.findOne({
      where: {
        user_id: user.user_id,
        clockOut: null,
        clockIn: {
          [Sequelize.Op.between]: [
            new Date().setHours(0, 0, 0, 0),
            new Date().setHours(23, 59, 59, 999),
          ],
        },
      },
      order: [["clockIn", "DESC"]],
    });

    if (!latestLog) {
      return res.status(400).json({ message: "User has not clocked in today" });
    }

    const currentTime = new Date();
    const workHours = Math.min(
      8,
      currentTime.getHours() - latestLog.clockIn.getHours()
    );

    const currentTotalSalary = user.Salary.total_salary || 0;

    const hourlySalary = user.Salary.perhour_salary || 0;
    const earnings = hourlySalary * workHours;
    const newTotalSalary = currentTotalSalary + earnings;

    await Logging.update(
      { clockOut: currentTime },
      { where: { logging_id: latestLog.logging_id } }
    );

    // Update the total salary with the new value
    await Salary.update(
      { total_salary: newTotalSalary },
      { where: { user_id: user.user_id } }
    );

    return res.status(200).json({
      message: "Clock-out successful",
      totalSalary: newTotalSalary,
      TodayRevenue: earnings,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
