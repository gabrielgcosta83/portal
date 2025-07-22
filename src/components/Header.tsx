import React from "react";
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
} from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsappIcon from "@mui/icons-material/WhatsApp";
import MenuIcon from "@mui/icons-material/Menu";
import logo from "@/assets/images/logotransparente.png";
import iconLogo from "@/assets/images/logo icone transparente.png";
import { Link } from "react-router-dom";

const appBarStyle = {
  bgcolor: "background.default",
  boxShadow: "none",
};

const menuStyle = {
  bgcolor: "rgba(245, 243, 238, 0.9)",
  width: "70vw",
};

const menuList = [
  // {
  //   name: <HomeIcon />,
  //   link: "/",
  // },
  {
    name: <InstagramIcon />,
    link: "https://www.instagram.com/yogatofeel/",
  },
  {
    name: <WhatsappIcon />,
    link: "https://wa.me/5521996148053?text=Oi!%20Quero%20saber%20mais%20sobre%20o%20Yoga%20to%20Feel.",
  },
];

const NavbarList = ({
  isMobile,
}: {
  isMobile?: boolean;
}) => {
  const listDirection = isMobile
    ? { flexDirection: "column" }
    : { flexDirection: "row" };

  return (
    <List sx={{ display: "flex", alignItems: "center", ...listDirection }}>
      {menuList.map((item, index) => (
        <ListItem key={index} disablePadding sx={{ width: "auto" }}>
          <ListItemButton component={Link} to={item.link} sx={{ p: 1 }}>
            <ListItemText
              primary={item.name}
              sx={{ p: 0, lineHeight: "1.0" }}
            />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

const Header = () => {
  const [openDrawer, setOpenDrawer] = React.useState(false);
  // const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isMobile = false;

  return (
    <AppBar position="relative" sx={appBarStyle}>
      <Toolbar
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: { xs: "100%", lg: "80%" },
          m: "0 auto",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box component={"img"} src={logo} sx={{ height: "60px", my: 1 }} />
        </Box>
        
        {isMobile ? (
          <>
            <IconButton onClick={() => setOpenDrawer(true)}>
              <MenuIcon fontSize="large" />
            </IconButton>

            <Drawer
              open={openDrawer}
              onClose={() => setOpenDrawer(false)}
              anchor="right"
              PaperProps={{ sx: menuStyle }}
            >
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <Box
                  component={"img"}
                  src={iconLogo}
                  sx={{ height: "180px", width: "180px", alignSelf: "center" }}
                />
                <NavbarList isMobile={isMobile}  />
              </Box>
            </Drawer>
          </>
        ) : (
          <NavbarList isMobile={isMobile}  />
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
