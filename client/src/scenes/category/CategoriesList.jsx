import {
  Box,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";
import Header from "../../components/Header";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import {
  getAllCategoriesAPI,
  updateCategoryAPI,
  deleteCategoryAPI,
} from "../../services/categories/category.services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";

export default function CategoriesList() {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategoriesAPI,
  });

  const updateCategoryMutation = useMutation({
    mutationFn: updateCategoryAPI,
    onSuccess: () => {
      queryClient.invalidateQueries(["categories"]);
      handleClose();
    },
  });

  const deleteCategoryMutation = useMutation({
    mutationFn: deleteCategoryAPI,
    onSuccess: () => {
      queryClient.invalidateQueries(["categories"]);
    },
  });

  const handleEditClick = (category) => {
    setSelectedCategory(category);
    setOpen(true);
  };

  const handleDeleteClick = (id) => {
    deleteCategoryMutation.mutate(id);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedCategory(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedCategory) {
      updateCategoryMutation.mutate({
        id: selectedCategory._id,
        type: selectedCategory.type,
        name: selectedCategory.name,
      });
    }
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 300 },
    { field: "type", headerName: "Type", width: 200 },
    { field: "name", headerName: "Name", width: 200, editable: true },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <Box display="flex" justifyContent="flex-end" gap="1rem">
          <IconButton onClick={() => handleEditClick(params.row)}>
            <EditIcon color="secondary" />
          </IconButton>
          <IconButton onClick={() => handleDeleteClick(params.row._id)}>
            <DeleteIcon color="error" />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="All Categories" subtitle="List of all categories" />
      <Box sx={{ height: 400, width: "100%", mt: "1rem" }}>
        <DataGrid
          rows={categories}
          columns={columns}
          pageSize={10}
          getRowId={(row) => row._id}
          slots={{ toolbar: GridToolbar }}
        />
      </Box>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Category</DialogTitle>
        <DialogContent>
          <Box
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <TextField
              margin="normal"
              fullWidth
              id="type"
              label="Type"
              value={selectedCategory?.type || ""}
              onChange={(e) =>
                setSelectedCategory({
                  ...selectedCategory,
                  type: e.target.value,
                })
              }
            />
            <TextField
              margin="normal"
              fullWidth
              id="name"
              label="Name"
              value={selectedCategory?.name || ""}
              onChange={(e) =>
                setSelectedCategory({
                  ...selectedCategory,
                  name: e.target.value,
                })
              }
            />
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button type="submit" color="primary">
                Save
              </Button>
            </DialogActions>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
}
