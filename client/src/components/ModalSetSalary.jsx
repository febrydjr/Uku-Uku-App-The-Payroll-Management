import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Button,
  FormControl,
  FormLabel,
  Select,
  Input,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";

const ModalSetSalary = ({ isOpen, onClose }) => {
  const toast = useToast();
  const [usernames, setUsernames] = useState([]);
  const [selectedUsername, setSelectedUsername] = useState("");
  const [perhourSalary, setPerhourSalary] = useState("");
  const [monthlySalary, setMonthlySalary] = useState("");
  const [selectedUserSalary, setSelectedUserSalary] = useState({
    perhour_salary: "",
    monthly_salary: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  useEffect(() => {
    const fetchUsernames = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/auth");
        setUsernames(response.data);
      } catch (error) {
        console.error("Error fetching usernames:", error);
      }
    };
    fetchUsernames();
  }, []);

  useEffect(() => {
    const fetchUserSalary = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/salary");
        const userData = response.data.users.find(
          (user) => user.username === selectedUsername
        );
        if (userData && userData.Salary) {
          setSelectedUserSalary(userData.Salary);
          setPerhourSalary(userData.Salary.perhour_salary.toString());
          setMonthlySalary(userData.Salary.monthly_salary.toString());
        }
      } catch (error) {
        console.error("Error fetching user salary:", error);
      }
    };

    if (selectedUsername) {
      fetchUserSalary();
    }
  }, [selectedUsername]);

  const handleUsernameChange = (event) => {
    setSelectedUsername(event.target.value);
  };

  const handlePerhourSalaryChange = (event) => {
    setPerhourSalary(event.target.value);
  };

  const handleMonthlySalaryChange = (event) => {
    setMonthlySalary(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      setSubmitError(null);

      const requestBody = {
        username: selectedUsername,
        perhour_salary: parseFloat(perhourSalary),
        monthly_salary: parseFloat(monthlySalary),
      };

      const token = localStorage.getItem("token");

      const response = await axios.patch(
        "http://localhost:8000/api/salary/set",
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast({
        title: "Success!",
        description: "Salary set successfully",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      setIsSubmitting(false);
      onClose();
    } catch (error) {
      setSubmitError("Error submitting data");
      setIsSubmitting(false);
      console.error("Error submitting data:", error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader color="black">Set Salary</ModalHeader>
        <ModalCloseButton color="black" />
        <ModalBody color="black">
          <FormControl>
            <FormLabel>Username</FormLabel>
            <Select value={selectedUsername} onChange={handleUsernameChange}>
              <option value="" disabled>
                Select a username
              </option>
              {usernames.map((user) => (
                <option key={user.user_id} value={user.username}>
                  {user.username}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl mt={3}>
            <FormLabel>Per Hour Salary</FormLabel>
            <Input
              type="number"
              placeholder="Enter per hour salary"
              value={perhourSalary}
              onChange={handlePerhourSalaryChange}
            />
          </FormControl>
          <FormControl mt={3}>
            <FormLabel>Monthly Salary</FormLabel>
            <Input
              type="number"
              placeholder="Enter monthly salary"
              value={monthlySalary}
              onChange={handleMonthlySalaryChange}
            />
          </FormControl>
          {submitError && <div>{submitError}</div>}
          <Button
            mt={3}
            mb={3}
            onClick={handleSubmit}
            isLoading={isSubmitting}
            colorScheme="blue"
          >
            Set Salary
          </Button>
          {/* <Button onClick={onClose} colorScheme="red">
            Close
          </Button> */}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ModalSetSalary;
