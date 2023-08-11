const express = require("express");
const router = express.Router();
const { authenticate, authorize } = require("../middleware/auth");
const setPerHourSalary = require("../controllers/setPerHourSalary");
const getUserSalary = require("../controllers/getUserSalary");

router.get("/:user_id", getUserSalary.getSalaryByUserId); // get salary by user

router.post(
  "/set",
  authenticate,
  authorize("admin"),
  setPerHourSalary.setPerHourSalary
); //set perhour salary

module.exports = router;
