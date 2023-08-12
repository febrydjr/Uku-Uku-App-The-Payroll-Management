import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Button,
  Flex,
  SimpleGrid,
  chakra,
  useColorModeValue,
} from "@chakra-ui/react";
import axios from "axios";
import ModalAddEmployee from "./ModalAddEmployee";

const ModalUserManagement = ({ isOpen, onClose }) => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [isAddEmployeeOpen, setIsAddEmployeeOpen] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/auth");
        setUsers(response.data);
      } catch (error) {
        setError("Error fetching user data");
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const dataColor = useColorModeValue("white", "gray.800");
  const bg2 = useColorModeValue("gray.100", "gray.700");

  const handleOpenAddEmployee = () => {
    setIsAddEmployeeOpen(true);
  };

  const handleCloseAddEmployee = () => {
    setIsAddEmployeeOpen(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={"6xl"}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader ml={2} color={"black"}>
          Employee List
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody color={"black"}>
          <Button ml={2} onClick={handleOpenAddEmployee}>
            Add Employee
          </Button>
          {error ? (
            <div>{error}</div>
          ) : (
            <Flex direction="column" bg={dataColor} p={2}>
              <SimpleGrid
                columns={5} // Adding an extra column for birthdate
                w="full"
                textTransform="uppercase"
                bg={bg2}
                color={"gray.500"}
                py={1}
                px={4}
                fontSize="md"
                fontWeight="hairline"
              >
                <span>Username</span>
                <span>Email</span>
                <span>Full Name</span>
                <span>Birthdate</span> {/* New column */}
                <span>Join Date</span>
              </SimpleGrid>
              {users.map((user) => (
                <SimpleGrid
                  columns={5} // Matching the number of columns
                  w="full"
                  py={2}
                  px={4}
                  fontWeight="hairline"
                  key={user.user_id}
                >
                  <span>{user.username}</span>
                  <chakra.span
                    textOverflow="ellipsis"
                    overflow="hidden"
                    whiteSpace="nowrap"
                  >
                    {user.email}
                  </chakra.span>
                  <chakra.span
                    textOverflow="ellipsis"
                    overflow="hidden"
                    whiteSpace="nowrap"
                  >
                    {user.fullname}
                  </chakra.span>
                  <span>{user.birthdate}</span> {/* Displaying birthdate */}
                  <span>{user.join_date}</span>
                </SimpleGrid>
              ))}
            </Flex>
          )}
          <ModalAddEmployee
            isOpen={isAddEmployeeOpen}
            onClose={handleCloseAddEmployee}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ModalUserManagement;
