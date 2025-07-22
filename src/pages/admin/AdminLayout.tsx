import { useState } from "react";
import {
  Box,
  Drawer,
  List,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
  Tooltip,
  ListItemButton,
} from "@mui/material";
import {
  Dashboard,
  AccountCircle,
  Groups,
  EventNote,
  CardMembership,
  Payments,
  Settings,
  Logout,
  ChevronLeft,
  ChevronRight,
  Person,
} from "@mui/icons-material";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "@/auth/useAuth";

const drawerWidth = 240;
const drawerWidthCollapsed = 72;

const navItems = [
  {
    label: "Dashboard",
    icon: <Dashboard />,
    path: "/admin/dashboard",
  },
  {
    label: "Alunos",
    icon: <Groups />,
    path: "/admin/clients",
  },
  {
    label: "Professoras",
    icon: <Person />,
    path: "/admin/teachers",
  },
  {
    label: "Aulas",
    icon: <EventNote />,
    path: "/admin/aulas",
  },
  {
    label: "Planos",
    icon: <CardMembership />,
    path: "/admin/planos",
  },
  {
    label: "Pagamentos",
    icon: <Payments />,
    path: "/admin/pagamentos",
  },
  {
    label: "Configurações",
    icon: <Settings />,
    path: "/admin/configuracoes",
  },
  {
    label: "Perfil",
    icon: <AccountCircle />,
    path: "/admin/profile",
  },
];

export default function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();

  const toggleDrawer = () => {
    setCollapsed((prev) => !prev);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Box sx={{ display: "flex"}}>
      <Drawer
        variant="permanent"
        anchor="left"
        sx={{
          width: collapsed ? drawerWidthCollapsed : drawerWidth,
          flexShrink: 0,
          whiteSpace: "nowrap",
          transition: "width 0.3s",
          [`& .MuiDrawer-paper`]: {
            width: collapsed ? drawerWidthCollapsed : drawerWidth,
            boxSizing: "border-box",
            overflowX: "hidden",
            transition: "width 0.3s",
          },
        }}
      >
        <List>
          {navItems.map((item) => (
            <Tooltip
              key={item.label}
              title={item.label}
              placement="right"
              disableHoverListener={!collapsed}
            >
              <ListItemButton onClick={() => navigate(item.path)}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                {!collapsed && <ListItemText primary={item.label} />}
              </ListItemButton>
            </Tooltip>
          ))}
        </List>

        <Divider />

        <List>
          <Tooltip
            title="Sair"
            placement="right"
            disableHoverListener={!collapsed}
          >
            <ListItemButton onClick={handleLogout}>
              <ListItemIcon>
                <Logout />
              </ListItemIcon>
              {!collapsed && <ListItemText primary="Sair" />}
            </ListItemButton>
          </Tooltip>
        </List>

        <Divider />

        <Box
          sx={{
            display: "flex",
            justifyContent: collapsed ? "center" : "flex-end",
            alignItems: "center",
            px: 1,
            py: 2,
          }}
        >
          <IconButton onClick={toggleDrawer}>
            {collapsed ? <ChevronRight /> : <ChevronLeft />}
          </IconButton>
        </Box>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          backgroundColor: "background.default",
          p: 3,
          minHeight: "100vh",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
