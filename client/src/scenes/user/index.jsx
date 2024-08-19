import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Header from "../../components/Header";
import { useQuery } from "@tanstack/react-query";
import { getAllUsersAPI } from "../../services/users/user.services.js";

export default function Users() {
  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: getAllUsersAPI,
  });

  const columns = [
    { field: "_id", headerName: "ID", width: 300 },
    { field: "username", headerName: "Username", width: 150 },
    { field: "email", headerName: "Email", width: 200, editable: true },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="All Users" subtitle="List of all users" />
      <Box sx={{ height: 400, width: "100%", mt: "1rem" }}>
        <DataGrid
          rows={users}
          columns={columns}
          pageSize={10}
          getRowId={(row) => row._id}
          slots={{ toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
}
