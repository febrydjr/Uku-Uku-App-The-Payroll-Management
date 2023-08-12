import { FiLogOut } from "react-icons/fi";
import { MdLockClock } from "react-icons/md";
import { PiClockClockwiseDuotone } from "react-icons/pi";
import React, { useState, useEffect } from "react";
import Clock from "react-clock";
import {
  Box,
  ChakraProvider,
  extendTheme,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Flex,
  Td,
  Button,
  useToast,
} from "@chakra-ui/react";
import { format } from "date-fns";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: "black",
        color: "white",
        fontFamily: "Victor Mono",
      },
    },
  },
});

const Employee = () => {
  const [currentTime, setCurrentTime] = useState("");
  const [userData, setUserData] = useState(null);
  const [attendanceLog, setAttendanceLog] = useState([]);
  const [clockedIn, setClockedIn] = useState(false);
  const [clockedOut, setClockedOut] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const intervalId = setInterval(() => {
      const currentTime = format(new Date(), "HH:mm:ss");
      setCurrentTime(currentTime);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const fetchAttendanceLog = async () => {
      const token = localStorage.getItem("token");
      const decodedToken = JSON.parse(atob(token.split(".")[1]));

      try {
        const response = await axios.get(
          `http://localhost:8000/api/salary/attendance/${decodedToken.user_id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setAttendanceLog(response.data);
      } catch (error) {
        console.error("Error fetching attendance log:", error);
      }
    };

    fetchAttendanceLog();
  }, []);

  const handleClockIn = async () => {
    const token = localStorage.getItem("token");
    const decodedToken = JSON.parse(atob(token.split(".")[1]));

    try {
      await axios.post(
        "http://localhost:8000/api/clock/in",
        { username: decodedToken.username },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast({
        title: "Success!",
        description: "Successfully clocked in!",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      setClockedIn(true);
      window.location.reload();
    } catch (error) {
      toast({
        title: "Error!",
        description: error.response.data.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      console.error("Error clocking in:", error);
    }
  };

  const handleClockOut = async () => {
    const token = localStorage.getItem("token");
    const decodedToken = JSON.parse(atob(token.split(".")[1]));

    try {
      const response = await axios.post(
        "http://localhost:8000/api/clock/out",
        { username: decodedToken.username },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast({
        title: "Success!",
        description: "Successfully clocked out!",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      setClockedOut(true);
      setUserData((prevUserData) => ({
        ...prevUserData,
        total_salary: response.data.totalSalary,
        today_revenue: response.data.TodayRevenue,
      }));
      window.location.reload();
    } catch (error) {
      toast({
        title: "Error!",
        description: error.response.data.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      console.error("Error clocking out:", error);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      const decodedToken = JSON.parse(atob(token.split(".")[1]));

      try {
        const response = await axios.get(
          `http://localhost:8000/api/salary/${decodedToken.user_id}`
        );
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
    console.log(userData);
  }, []);

  async function handleLogout() {
    localStorage.removeItem("token");
    navigate("/");
  }
  return (
    <ChakraProvider theme={theme}>
      <Box h="100vh" display="flex" flexDirection="column" alignItems="center">
        <Flex justifyContent={"right"}>
          <Box>
            {userData && (
              <Table mt="4" variant="striped" colorScheme="whiteAlpha">
                <Thead>
                  <Tr>
                    <Th width="20%">Full Name</Th>
                    <Th width="20%">Email</Th>
                    <Th width="15%">Per Hour Salary</Th>
                    <Th width="15%">Monthly Salary</Th>
                    <Th width="15%">Total Salary</Th>
                    <Th width="15%">Role</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>{userData.fullname}</Td>
                    <Td>{userData.email}</Td>
                    <Td>{userData.perhour_salary}</Td>
                    <Td>{userData.monthly_salary}</Td>
                    <Td>{userData.total_salary}</Td>
                    <Td>{userData.role_name}</Td>
                  </Tr>
                </Tbody>
              </Table>
            )}
          </Box>
          <Box ml={16}>
            <Box w="100%" display={"flex"} justifyContent={"flex-end"}>
              <Text fontSize="4xl" mt="4">
                Current Time: {currentTime}
              </Text>
            </Box>
            <Button
              mt="4"
              colorScheme="green"
              onClick={handleClockIn}
              disabled={clockedIn}
            >
              ClockIn&nbsp;
              <PiClockClockwiseDuotone />
            </Button>
            <Button
              mt="4"
              ml={2}
              colorScheme="blue"
              onClick={handleClockOut}
              disabled={clockedOut}
            >
              ClockOut&nbsp;
              <MdLockClock />
            </Button>
            <Button ml={2} mt="4" colorScheme="red" onClick={handleLogout}>
              Log Out&nbsp;
              <FiLogOut />
            </Button>
          </Box>
        </Flex>

        <Text fontSize="xl" fontWeight="bold" mt="4">
          Attendance Log
        </Text>
        <Table mt="4" variant="striped" colorScheme="whiteAlpha">
          <Thead>
            <Tr>
              <Th>Date</Th>
              <Th>Full Name</Th>
              <Th>Schedule In</Th>
              <Th>Schedule Out</Th>
              <Th>Clock In</Th>
              <Th>Clock Out</Th>
              <Th>Today Revenue</Th>
            </Tr>
          </Thead>
          <Tbody>
            {attendanceLog.map((log) => (
              <Tr key={log.date}>
                <Td>{format(new Date(log.date), "dd-MM-yyyy")}</Td>
                <Td>{log.fullname}</Td>
                <Td>{log.schedule_in}</Td>
                <Td>{log.schedule_out}</Td>
                <Td>{log.clockIn || "-"}</Td>
                <Td>{log.clockOut || "-"}</Td>
                <Td>{log.total_salary}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </ChakraProvider>
  );
};

export default Employee;
