import {
  Box,
  Button,
  Container,
  Grid,
  InputAdornment,
  Paper,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import PersonIcon from "@mui/icons-material/Person";
import { loginAPI } from "../services/users/user.services";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginAction } from "../redux/slice/authSlice";

//! Validations
const validationSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  password: Yup.string()
    .min(5, "Password must be 5 characters long")
    .required("Password is required"),
});

export default function Login() {
  //! Dispatch
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //! Mutation
  const { mutateAsync } = useMutation({
    mutationFn: loginAPI,
    mutationKey: ["login"],
  });

  const formik = useFormik({
    initialValues: {
      username: "kenji",
      password: "kma2024",
    },
    //! Validations
    validationSchema,
    //! Submit
    onSubmit: (values) => {
      //! http request
      mutateAsync(values)
        .then((data) => {
          //! Dispatch
          dispatch(loginAction(data));
          //! Save the user into local storage
          localStorage.setItem("userInfo", JSON.stringify(data));
          navigate("/dashboard");
        })
        .catch((e) => {
          toast.error("Username or password is incorrect");
          console.log(e);
        });
    },
  });

  const theme = useTheme();
  return (
    <Box
      height="100vh"
      width="100vw"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <ToastContainer />
      <Container maxWidth="lg">
        <Paper
          elevation={24}
          sx={{
            height: "100%",
            width: "100%",
            bgcolor: theme.palette.grey[50],
          }}
        >
          <Grid container>
            <Grid
              item
              xs={12}
              sm={5}
              sx={{
                height: { xs: "auto", sm: "70vh" },
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                p: { xs: "1rem", sm: "2rem" },
              }}
            >
              <Box
                color={theme.palette.primary.main}
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <Typography
                  variant="h3"
                  fontSize={{ xs: "20px", sm: "26px" }}
                  fontWeight="bold"
                  mb="1rem"
                  color={theme.palette.primary[500]}
                >
                  Expense Tracker App
                </Typography>
                <Box component="form" onSubmit={formik.handleSubmit}>
                  <TextField
                    margin="normal"
                    fullWidth
                    id="username"
                    {...formik.getFieldProps("username")}
                    label="Username"
                    name="username"
                    autoFocus
                    variant="outlined"
                    autoComplete="username"
                    InputLabelProps={{
                      style: { color: theme.palette.primary[500] },
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <PersonIcon sx={{ color: "#21295c" }} />
                        </InputAdornment>
                      ),
                      style: { color: theme.palette.primary[500] },
                      sx: {
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: theme.palette.primary[500],
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: theme.palette.primary[500],
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: theme.palette.primary[500],
                        },
                      },
                    }}
                  />{" "}
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
                    InputLabelProps={{
                      style: { color: theme.palette.primary[500] },
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <LockIcon sx={{ color: "#21295c" }} />
                        </InputAdornment>
                      ),
                      style: { color: theme.palette.primary[500] },
                      sx: {
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: theme.palette.primary[500],
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: theme.palette.primary[500],
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: theme.palette.primary[500],
                        },
                      },
                    }}
                  />{" "}
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
                    LOGIN
                  </Button>
                </Box>
              </Box>
            </Grid>
            <Grid
              item
              xs={0}
              sm={7}
              sx={{
                display: { xs: "none", sm: "block" },
              }}
            >
              <Box
                component="img"
                src="/bg.png"
                sx={{
                  objectFit: "cover",
                  objectPosition: "center",
                  height: "100%",
                  maxWidth: "100%",
                }}
              />
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
}
