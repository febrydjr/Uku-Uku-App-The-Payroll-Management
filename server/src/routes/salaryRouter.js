const express = require("express");
const router = express.Router();
const { authenticate, authorize } = require("../middleware/auth");
const setSalary = require("../controllers/setSalary");
const getUserSalary = require("../controllers/getUserSalary");
const getAllUsersWithSalaries = require("../controllers/getAllUserSalary");
const getAttendanceLogs = require("../controllers/attendanceLogs");
const getAllAttendanceLogs = require("../controllers/attendanceLogsAll");
const payroll = require("../controllers/payroll");

router.get("/payroll/:user_id", payroll.payroll);
router.get(
  "/attendance/:user_id",
  authenticate,
  getAttendanceLogs.getAttendanceLogs
);
router.get("/attendance", getAllAttendanceLogs.getAllAttendanceLogs);
router.get("/:user_id", getUserSalary.getSalaryByUserId);
router.get("/", getAllUsersWithSalaries.getAllUsersWithSalaries);
router.patch("/set", authorize("admin"), setSalary.setSalary);

module.exports = router;
