import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import Header from "../../components/Header";
import { ToastContainer, toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import { addTransactionAPI } from "../../services/transactions/transaction.services";
import { getAllCategoriesAPI } from "../../services/categories/category.services";

// Validations
const validationSchema = Yup.object({
  type: Yup.string().required("Type is required"),
  amount: Yup.number()
    .required("Amount is required")
    .positive("Amount must be positive"),
  category: Yup.string().required("Category is required"),
  date: Yup.date().required("Date is required"),
  description: Yup.string(),
});

export default function AddTransaction() {
  const theme = useTheme();

  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategoriesAPI,
  });
  // Mutation
  const { mutateAsync } = useMutation({
    mutationFn: addTransactionAPI,
    mutationKey: ["create"],
  });

  const formik = useFormik({
    initialValues: {
      type: "",
      amount: "",
      date: "",
      category: "",
      description: "",
    },
    validationSchema,
    onSubmit: (values) => {
      mutateAsync(values)
        .then(() => {
          toast.success("Transaction Created!");
        })
        .catch((e) => {
          toast.error(
            "Transaction can't be created, please check all details!"
          );
          console.error(e);
        });
    },
  });

  return (
    <Box m="1.5rem 2rem">
      <Header title="Transaction" subtitle="Add transaction">
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
              <Typography variant="body2" color="error">
                {formik.errors.type}
              </Typography>
            )}
          </FormControl>
          <TextField
            margin="normal"
            fullWidth
            id="amount"
            label="Amount"
            type="number"
            variant="outlined"
            {...formik.getFieldProps("amount")}
            error={formik.touched.amount && Boolean(formik.errors.amount)}
            helperText={formik.touched.amount && formik.errors.amount}
          />
          <TextField
            margin="normal"
            fullWidth
            id="date"
            label="Date"
            type="date"
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            {...formik.getFieldProps("date")}
            error={formik.touched.date && Boolean(formik.errors.date)}
            helperText={formik.touched.date && formik.errors.date}
          />
          <FormControl fullWidth margin="normal" variant="outlined">
            <InputLabel id="category-label">Category</InputLabel>
            <Select
              labelId="category-label"
              id="category"
              name="category"
              value={formik.values.category}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              label="Category"
              error={formik.touched.category && Boolean(formik.errors.category)}
            >
              {categories.map((category) => (
                <MenuItem key={category._id} value={category._id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
            {formik.touched.category && formik.errors.category && (
              <Typography variant="body2" color="error">
                {formik.errors.category}
              </Typography>
            )}
          </FormControl>

          <TextField
            margin="normal"
            fullWidth
            id="description"
            label="Description"
            variant="outlined"
            {...formik.getFieldProps("description")}
            multiline
            rows={4}
          />
          <Box mt="1rem">
            <button type="submit">Submit</button>
          </Box>
        </Box>
      </Header>
    </Box>
  );
}
