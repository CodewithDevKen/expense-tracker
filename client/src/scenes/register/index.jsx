import { Box, Button, TextField, Typography, useTheme } from "@mui/material";
import Header from "../../components/Header";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerAPI } from "../../services/users/user.services";

//! Validations
const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  username: Yup.string().required("Username is required"),
  password: Yup.string()
    .min(5, "Password must be 5 characters long")
    .required("Password is required"),
});

export default function Register() {
  const theme = useTheme();

  //! Mutation
  const { mutateAsync } = useMutation({
    mutationFn: registerAPI,
    mutationKey: ["logout"],
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
      password: "",
    },
    //! Validations
    validationSchema,
    //! Submit
    onSubmit: (values) => {
      //! http request
      mutateAsync(values)
        .then((data) => {
          toast.success("User Created!");
        })
        .catch((e) => {
          toast.error("User cannot be created, please check all details!");
          console.log(e);
        });
    },
  });
  return (
    <Box m="1.5rem 2rem">
      <Header title="User Registration" subtitle="Complete the form" />
      <ToastContainer />
      <Box component="form" onSubmit={formik.handleSubmit}>
        <TextField
          margin="normal"
          fullWidth
          id="email"
          label="Email"
          {...formik.getFieldProps("email")}
          name="email"
          autoFocus
          variant="outlined"
          autoComplete="email"
        />
        {formik.touched.email && formik.errors.email && (
          <Typography variant="h6" component="span" color="red">
            {formik.errors.email}
          </Typography>
        )}
        <TextField
          margin="normal"
          fullWidth
          id="username"
          label="Username"
          {...formik.getFieldProps("username")}
          name="username"
          autoFocus
          variant="outlined"
          autoComplete="username"
        />
        {formik.touched.username && formik.errors.username && (
          <Typography variant="h6" component="span" color="red">
            {formik.errors.username}
          </Typography>
        )}
        <TextField
          margin="normal"
          fullWidth
          id="password"
          label="Password"
          {...formik.getFieldProps("password")}
          name="password"
          type="password"
          autoFocus
          autoComplete="current-password"
          variant="outlined"
        />
        {formik.touched.password && formik.errors.password && (
          <Typography variant="h6" component="span" color="red">
            {formik.errors.password}
          </Typography>
        )}

        <br />
        <Button
          type="submit"
          variant="contained"
          sx={{
            padding: "0.5rem 3rem",
            mt: "1rem",
            backgroundColor: theme.palette.primary[500],
            color: theme.palette.grey[50],
          }}
        >
          Create
        </Button>
      </Box>
    </Box>
  );
}
