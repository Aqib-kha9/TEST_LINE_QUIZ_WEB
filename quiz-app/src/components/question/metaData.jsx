import React, { useContext } from "react";
import {
  Typography,
  Button,
  Box,
  Divider,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import AppContext from "../../context/AppContext";

const MetaData = () => {
  const navigate = useNavigate();
  const { metaData } = useContext(AppContext);

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center", // Center everything vertically
        alignItems: "center", // Center everything horizontally
        background: "linear-gradient(to right, rgba(111, 150, 198, 0.2), rgba(255, 255, 255, 0.8))",
        boxSizing: "border-box",
        textAlign: "center",
      }}
    >
      <Divider sx={{ width: "100%", marginY: "30px" }} />

      {/* Topic Section */}
      <Box
        sx={{
          width: "100%",
          maxWidth: "80vw",
          padding: "20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h5"
          fontWeight="bold"
          sx={{ textAlign: "left", marginRight: "20px" }}
        >
          Topic:
        </Typography>
        <Typography
          variant="h5"
          fontWeight="bold"
          sx={{ textAlign: "right", color: "#007bff" }}
        >
          {metaData?.title}
        </Typography>
      </Box>

      <Divider sx={{ width: "90%", marginY: "3px" }} />
      
      {/* Rules & Guidelines Section */}
      <Typography
        variant="h4"
        fontWeight="bold"
        sx={{ color: "#333", marginBottom: "20px" }}
      >
        📝 Rules & Guidelines
      </Typography>
      <Divider sx={{ width: "90%", marginBottom: "2px" }} />

      {/* Rules Grid Layout */}
      <Box
        sx={{
          width: "90%",
          maxWidth: "1000px",
          padding: "3px",
          borderRadius: "12px",
        }}
      >
        <Grid container spacing={3}>
          {[
            { label: "⏳ Duration", value: `${metaData?.duration} minutes` },
            { label: "❌ Max Mistakes Allowed", value: metaData?.max_mistake_count },
            { label: "⚠️ Negative Marks", value: metaData?.negative_marks },
            { label: "🔢 Total Questions", value: metaData?.questions_count },
            { label: "📡 Live Participants", value: metaData?.live_count },
            { label: "✅ Marks per Correct Answer", value: metaData?.correct_answer_marks },
          ].map((item, idx) => (
            <Grid item xs={12} key={idx}>
              <Grid container>
                {/* Left side for label */}
                <Grid item xs={6} sx={{ textAlign: "left" }}>
                  <Typography variant="h8" fontWeight="bold">
                    {item.label}:
                  </Typography>
                </Grid>

                {/* Right side for value */}
                <Grid item xs={6} sx={{ textAlign: "left" }}>
                  <Typography variant="h6" color="textSecondary">
                    {item.value}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Start Quiz Button */}
      <Box sx={{ width: "100%", maxWidth: "80vw", display: "flex", justifyContent: "flex-end", marginTop: "30px" }}>
        <Button
          variant="contained"
          color="primary"
          size="small" // Smaller button size
          sx={{
            px: 6,
            py: 2,
            fontSize: "1rem", // Smaller font size
            borderRadius: "12px",
            boxShadow: "0px 6px 18px rgba(0, 0, 0, 0.15)",
            transition: "all 0.3s ease-in-out",
            "&:hover": {
              backgroundColor: "#fff",
              boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.2)",
              transform: "scale(1.07) translateY(-3px)",
              color: "#007bff",
            },
          }}
          onClick={() => navigate("/quiz")}
        >
          Start Quiz 🚀
        </Button>
      </Box>
    </Box>
  );
};

export default MetaData;
