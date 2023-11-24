import React from "react";
import { Container, Typography, Grid, Paper } from "@mui/material";
import { LocalHospital, DirectionsCar, EmojiObjects } from "@mui/icons-material";
const aboutUsStyle = {
    backgroundColor: "#FFFF99",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  };

const About = () => {
  return (
    <div style={aboutUsStyle}>
    <Container>
      <Typography variant="h2" align="center" gutterBottom>
        About Our Insurance Company
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} style={{ padding: 16, textAlign: "center" }}>
            <LocalHospital style={{ fontSize: 60 }} />
            <Typography variant="h5" gutterBottom>
              Medical Insurance
            </Typography>
            <Typography>
              Our medical insurance policies ensure your health and well-being.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} style={{ padding: 16, textAlign: "center" }}>
            <DirectionsCar style={{ fontSize: 60 }} />
            <Typography variant="h5" gutterBottom>
              Vehicle Insurance
            </Typography>
            <Typography>
              Protect your vehicle with our comprehensive insurance coverage.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} style={{ padding: 16, textAlign: "center" }}>
            <EmojiObjects style={{ fontSize: 60 }} />
            <Typography variant="h5" gutterBottom>
              Life Insurance
            </Typography>
            <Typography>
              Secure your loved ones' future with our life insurance policies.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
    </div>
  );
};



export default About;
