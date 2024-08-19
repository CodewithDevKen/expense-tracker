import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import Header from "../../components/Header";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addCategoryAPI } from "../../services/categories/category.services.js";

//! Validations
const validationSchema = Yup.object({
  type: Yup.string().required("Type is required"),
  name: Yup.string().required("Category name is required"),
});

export default function AddCategory() {
  const theme = useTheme();

  //! Mutation
  const { mutateAsync } = useMutation({
    mutationFn: addCategoryAPI,
    mutationKey: ["create"],
  });

  const formik = useFormik({
    initialValues: {
      type: "",
      name: "",
    },
    //! Validations
    validationSchema,
    //! Submit
    onSubmit: (values) => {
      //! http request
      mutateAsync(values)
        .then((data) => {
          toast.success("Category Created!");
        })
        .catch((e) => {
          toast.error("Category can't be created, please check all details!");
          console.log(e);
        });
    },
  });
  return (
    <Box m="1.5rem 2rem">
      <Header title="User Registration" subtitle="Complete the form" />
      <ToastContainer />
      <Box component="form" onSubmit={formik.handleSubmit}>
        <FormControl fullWidth margin="normal" variant="outlined">
          <InputLabel id="type-label">Type</InputLabel>
          <Select
            labelId="type-label"
            id="type"
            name="type"
            value={formik.values.type}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            label="Type"
            error={formik.touched.type && Boolean(formik.errors.type)}
          >
            <MenuItem value="income">Income</MenuItem>
            <MenuItem value="expense">Expense</MenuItem>
          </Select>
          {formik.touched.type && formik.errors.type && (
            <Typography variant="h6" component="span" color="red">
              {formik.errors.type}
            </Typography>
          )}
        </FormControl>
        <TextField
          margin="normal"
          fullWidth
          id="name"
          label="Name"
          {...formik.getFieldProps("name")}
          name="name"
          autoFocus
          variant="outlined"
          autoComplete="name"
        />
        {formik.touched.name && formik.errors.name && (
          <Typography variant="h6" component="span" color="red">
            {formik.errors.name}
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
