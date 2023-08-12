const express = require("express");
const router = express.Router();
const { authenticate, authorize } = require("../middleware/auth");
const setSalary = require("../controllers/setSalary");
const getUserSalary = require("../controllers/getUserSalary");
const getAllUsersWithSalaries = require("../controllers/getAllUserSalary");

router.get("/:user_id", getUserSalary.getSalaryByUserId); // get salary by user
router.get("/", getAllUsersWithSalaries.getAllUsersWithSalaries); // get all users salaries
router.patch("/set", authenticate, authorize("admin"), setSalary.setSalary); //set perhour salary

module.exports = router;
