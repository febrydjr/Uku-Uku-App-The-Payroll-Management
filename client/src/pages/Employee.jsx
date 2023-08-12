import React, { useState, useEffect } from "react";
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
  Td,
  Button,
} from "@chakra-ui/react";
import { format } from "date-fns";
import axios from "axios";

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

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      const decodedToken = JSON.parse(atob(token.split(".")[1]));

      try {
        const response = await axios.get(
          `http://localhost:8000/api/user/${decodedToken.user_id}`
        );
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const currentTime = format(new Date(), "HH:mm:ss");
      setCurrentTime(currentTime);
    }, 1000);

    return () => clearInterval(intervalId);
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
      setClockedIn(true);
    } catch (error) {
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
      setClockedOut(true);
      setUserData((prevUserData) => ({
        ...prevUserData,
        total_salary: response.data.totalSalary,
        today_revenue: response.data.TodayRevenue,
      }));
    } catch (error) {
      console.error("Error clocking out:", error);
    }
  };

  return (
    <ChakraProvider theme={theme}>
      <Box h="100vh" display="flex" flexDirection="column" alignItems="center">
        <Text fontSize="4xl" mt="4">
          Current Time: {currentTime}
        </Text>
        {userData && (
          <Table mt="4" variant="striped" colorScheme="whiteAlpha">
            <Thead>
              <Tr>
                <Th>Full Name</Th>
                <Th>Email</Th>
                <Th>Per Hour Salary</Th>
                <Th>Monthly Salary</Th>
                <Th>Total Salary</Th>
                <Th>Role Name</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>{userData.fullname}</Td>
                <Td>{userData.email}</Td>
                <Td>{userData.perhour_salary}</Td>
                <Td>{userData.monthly_salary}</Td>
                <Td>{userData.total_salary}</Td>
                <Td>{userData.Role.role_name}</Td>
              </Tr>
            </Tbody>
          </Table>
        )}
        <Button
          mt="4"
          colorScheme="blue"
          onClick={handleClockIn}
          disabled={clockedIn}
        >
          Clock In
        </Button>
        <Button
          mt="4"
          colorScheme="red"
          onClick={handleClockOut}
          disabled={clockedOut}
        >
          Clock Out
        </Button>
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
                <Td>{format(new Date(log.date), "yyyy-MM-dd")}</Td>
                <Td>{log.fullname}</Td>
                <Td>08:00</Td>
                <Td>16:00</Td>
                <Td>{log.clock_in || "-"}</Td>
                <Td>{log.clock_out || "-"}</Td>
                <Td>{log.today_revenue}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </ChakraProvider>
  );
};

export default Employee;
