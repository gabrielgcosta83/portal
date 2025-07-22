import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component={"footer"}
      sx={{
        textAlign: "center",
        bgcolor: "primary.main",
        p: 1,
        width: "100%",
      }}
    >
      <Typography variant="body1" color="background.default">
        Yoga to Feel | Rio de Janeiro - RJ
      </Typography>
    </Box>
  );
};

export default Footer;
