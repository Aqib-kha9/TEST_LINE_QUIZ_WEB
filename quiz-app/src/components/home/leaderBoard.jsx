import React, { useState, useEffect } from "react";
import { Box, Typography, Divider, Button, Grid, Paper, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Leaderboard = () => {
  const navigate = useNavigate();

  const [openDialog, setOpenDialog] = useState(true); // State to control dialog visibility

  // Sample leaderboard data
  const leaderboardData = [
    { rank: 1, name: "Alice", score: 250, avatar: "https://i.pravatar.cc/150?img=1" },
    { rank: 2, name: "Bob", score: 230, avatar: "https://i.pravatar.cc/150?img=2" },
    { rank: 3, name: "Charlie", score: 210, avatar: "https://i.pravatar.cc/150?img=3" },
    { rank: 4, name: "David", score: 180, avatar: "https://i.pravatar.cc/150?img=4" },
    { rank: 5, name: "Eve", score: 150, avatar: "https://i.pravatar.cc/150?img=5" },
  ];

  // Close dialog when user clicks on "OK"
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <Box
      sx={{
        width: "100vw",
        minHeight: "100vh",
        paddingTop: "80px", // Navbar offset
        background: "linear-gradient(to right, #E3F2FD, #ffffff)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Dialog Popup */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>🚨 Disclaimer</DialogTitle>
        <DialogContent>
          <Typography variant="body1" sx={{ color: "#424242" }}>
            The leaderboard data shown here is static and will not update dynamically. This is just a placeholder for demonstration purposes.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>

      <Box
        sx={{
          width: "90%",
          maxWidth: "1000px",
          padding: "40px",
          backgroundColor: "#ffffff",
          boxShadow: "0px 6px 18px rgba(0, 0, 0, 0.15)",
          borderRadius: "12px",
          textAlign: "center",
        }}
      >
        {/* Header */}
        <Typography
          variant="h3"
          fontWeight="bold"
          sx={{
            marginBottom: "20px",
            color: "#0D47A1",
            textShadow: "2px 2px 4px rgba(0,0,0,0.2)",
          }}
        >
          Leaderboard 🏆
        </Typography>
        <Divider sx={{ marginBottom: "30px", backgroundColor: "#1976D2" }} />

        {/* Leaderboard Instructions */}
        <Typography variant="h5" sx={{ fontWeight: "bold", color: "#424242", marginBottom: "10px" }}>
          Top Performers
        </Typography>
        <Typography variant="body1" sx={{ color: "#616161", fontSize: "1.1rem", lineHeight: "1.8" }}>
          Check out the highest scorers on QuizMaster! Compete with the best and aim for the top position on the leaderboard.
        </Typography>

        <Divider sx={{ marginY: "25px", backgroundColor: "#1976D2" }} />

        {/* Leaderboard Table */}
        <Typography variant="h6" sx={{ fontWeight: "bold", color: "#0D47A1", marginBottom: "10px" }}>
          ✨ Top Scorers:
        </Typography>
        
        {/* Leaderboard Grid */}
        <Grid container spacing={3} justifyContent="center">
          {leaderboardData.map((player, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Paper
                sx={{
                  display: "flex",
                  alignItems: "center",
                  padding: "20px",
                  boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.1)",
                  borderRadius: "8px",
                  backgroundColor: index === 0 ? "#FFEB3B" : index === 1 ? "#C5E1A5" : "#ffffff",
                  border: "1px solid #ddd",
                }}
              >
                <Box sx={{ marginRight: "15px" }}>
                  <img
                    src={player.avatar}
                    alt={player.name}
                    style={{ borderRadius: "50%", width: "50px", height: "50px" }}
                  />
                </Box>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: "bold", color: "#0D47A1" }}>
                    {player.rank}. {player.name}
                  </Typography>
                  <Typography variant="body1" sx={{ color: "#424242" }}>
                    Score: {player.score} points
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>

        <Divider sx={{ marginY: "25px", backgroundColor: "#1976D2" }} />

        {/* CTA Button */}
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: "30px" }}>
          <Button
            variant="contained"
            color="primary"
            sx={{
              paddingX: "30px",
              paddingY: "12px",
              fontSize: "1.2rem",
              borderRadius: "8px",
              boxShadow: "0px 6px 18px rgba(0, 0, 0, 0.15)",
              transition: "all 0.3s ease-in-out",
              "&:hover": {
                backgroundColor: "#ffffff",
                color: "#0D47A1",
                boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.2)",
                transform: "scale(1.07)",
              },
            }}
            onClick={() => navigate("/quiz")}
          >
            Take the Quiz Now
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Leaderboard;
