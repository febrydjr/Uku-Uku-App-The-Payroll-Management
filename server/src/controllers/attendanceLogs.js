const { User, Logging, Salary } = require("../models");
const { Sequelize } = require("sequelize");

exports.getAttendanceLogs = async (req, res) => {
  try {
    const { user_id } = req.params;

    // Find the user based on user_id
    const user = await User.findByPk(user_id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Fetch attendance logs for the user
    const attendanceLogs = await Logging.findAll({
      where: {
        user_id: user.user_id,
        clockIn: {
          [Sequelize.Op.between]: [
            new Date().setHours(0, 0, 0, 0),
            new Date().setHours(23, 59, 59, 999),
          ],
        },
      },
      order: [["clockIn", "ASC"]],
    });

    // Fetch the user's salary information
    const salary = await Salary.findOne({ where: { user_id: user.user_id } });

    // Prepare the response data
    const attendanceData = attendanceLogs.map((log) => {
      const schedule_in = new Date(log.clockIn);
      schedule_in.setHours(8, 0, 0, 0); // Schedule in at 08:00 AM

      const schedule_out = new Date(log.clockIn);
      schedule_out.setHours(16, 0, 0, 0); // Schedule out at 16:00 PM

      const total_salary = salary ? salary.total_salary : 0;

      return {
        date: log.clockIn,
        fullname: user.fullname,
        // schedule_in: schedule_in.toISOString(),
        schedule_in: "08.00",
        schedule_out: "16.00",
        clockIn: log.clockIn,
        clockOut: log.clockOut,
        total_salary: total_salary,
      };
    });

    return res.status(200).json(attendanceData);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
