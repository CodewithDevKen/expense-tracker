import { AdminPanelSettingsOutlined } from "@mui/icons-material";
import { Person2Outlined } from "@mui/icons-material";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import ClassOutlinedIcon from "@mui/icons-material/ClassOutlined";
import SpaceDashboardOutlinedIcon from "@mui/icons-material/SpaceDashboardOutlined";

const navItems = [
  {
    text: "Dashboard",
    icon: <SpaceDashboardOutlinedIcon />,
  },
  {
    text: "Create",
    icon: <AdminPanelSettingsOutlined />,
  },
  {
    text: "Users",
    icon: <Person2Outlined />,
  },
  {
    text: "Add Category",
    icon: <AddOutlinedIcon />,
  },
  {
    text: "Categories",
    icon: <ClassOutlinedIcon />,
  },
  {
    text: "Add Transaction",
    icon: <AddOutlinedIcon />,
  },
  {
    text: "Profile",
    icon: <Person2Outlined />,
  },
];

export default navItems;
