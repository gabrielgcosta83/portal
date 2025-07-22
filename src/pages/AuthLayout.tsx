import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      alignItems="center"
      minHeight="100vh"
      bgcolor={"background.default"}
    >
      <Header />
      <Outlet />
      <Footer />
    </Box>
  );
};

export default AuthLayout;
