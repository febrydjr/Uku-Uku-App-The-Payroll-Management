import React, { useState, useEffect } from "react";
import "../index.css";
import axios from "axios";
import {
  Box,
  Input,
  Button,
  Link,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Text,
  useToast,
} from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

const ResetSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email address format"),
});

const Login = () => {
  const toast = useToast();
  const navigate = useNavigate();
  //   useEffect(() => {
  //     const token = localStorage.getItem("token");
  //     if (token) {
  //       try {
  //         const decoded = jwt_decode(token);
  //         const isAdmin = decoded.is_admin;
  //         if (isAdmin) {
  //           return navigate("/dashboard");
  //         } else {
  //           return navigate("/cashier");
  //         }
  //       } catch (error) {
  //         return navigate("/not-found");
  //       }
  //     } else {
  //       return navigate("/");
  //     }
  //   }, []);

  const handleLogin = async (values) => {
    try {
      const { identifier, password } = values;
      const res = await axios.post("http://localhost:8000/api/auth/login", {
        identifier,
        password,
      });
      if (res.status === 200) {
        localStorage.setItem("token", res.data.token);
        const token = res.data.token;
        const decoded = jwt_decode(token);
        const isAdmin = decoded.role;
        toast({
          title: "Success",
          description: "Login Success",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        if (isAdmin == "admin") {
          document.location.href = "/admin";
        } else {
          document.location.href = "/employee";
        }
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "Login Failed",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const initialValues = {
    identifier: "",
    password: "",
  };

  return (
    <Box
      fontFamily={"Victor Mono"}
      bg={"#000000"}
      backgroundSize={"cover"}
      h={"100vh"}
    >
      <Box display="flex" alignItems="center" justifyContent="center" h="100vh">
        <Box
          bgColor={"#2A2B2E"}
          w="450px"
          p={5}
          border={"1px solid #2D2D2D"}
          borderWidth={1}
          borderRadius={8}
          color={"white"}
          boxShadow={"dark-lg"}
        >
          <Text fontSize={"4xl"}>App Login!</Text>
          <Text fontSize="12px" mb={8}>
            Enter Admin or Employee Credentials
          </Text>
          <Formik
            initialValues={initialValues}
            validationSchema={ResetSchema}
            onSubmit={handleLogin}
          >
            {() => (
              <Form>
                <>
                  <Field name="identifier">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          form.errors.identifier && form.touched.identifier
                        }
                        mb={2}
                      >
                        <FormLabel htmlFor="identifier">
                          Username/Email
                        </FormLabel>
                        <Input {...field} id="identifier" />
                        <FormErrorMessage>
                          {form.errors.identifier}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="password">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          form.errors.password && form.touched.password
                        }
                        mb={2}
                      >
                        <FormLabel htmlFor="password">Password</FormLabel>
                        <Input {...field} id="password" type="password" />
                        <FormErrorMessage>
                          {form.errors.password}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Button type="submit" colorScheme="gray" mt={1} mb={4}>
                    Login
                  </Button>
                </>
              </Form>
            )}
          </Formik>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
