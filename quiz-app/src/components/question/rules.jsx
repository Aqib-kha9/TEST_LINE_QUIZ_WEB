import React, { useContext, useState, useEffect } from "react";
import { Typography, Button, Box, Divider, Grid, Skeleton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AppContext from "../../context/AppContext";

const Rules = () => {
  const navigate = useNavigate();
  const { metaData } = useContext(AppContext);
  const [loading, setLoading] = useState(true);  // Track loading state

  // Simulate loading state if metaData is not available yet
  useEffect(() => {
    if (metaData) {
      setLoading(false);  // Set loading to false once metaData is available
    }
  }, [metaData]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
          width: "100%",
          height: "100%",
          backgroundColor: "#f9f9f9",
          padding: "30px 20px",
          marginTop: "80px",
        }}
      >
        {/* Header Skeleton */}
        <Skeleton variant="text" width="60%" sx={{ marginBottom: "20px" }} />
        <Divider sx={{ width: "50%", margin: "20px 0" }} />

        {/* Rules Skeleton */}
        <Box sx={{ width: "100%", maxWidth: "1000px", padding: "30px" }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Skeleton variant="text" width="80%" sx={{ marginBottom: "10px" }} />
              <Skeleton variant="text" width="50%" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Skeleton variant="text" width="80%" sx={{ marginBottom: "10px" }} />
              <Skeleton variant="text" width="50%" />
            </Grid>
            {/* Repeat for other rule items */}
          </Grid>
        </Box>

        {/* Start Quiz Button Skeleton */}
        <Box sx={{ width: "100%", maxWidth: "900px", marginTop: "40px" }}>
          <Skeleton variant="rectangular" width="100%" height={50} />
        </Box>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        width: "100%",
        height: "100%",
        backgroundColor: "#f9f9f9",
        padding: "30px 20px",
        marginTop: "80px",
      }}
    >
      {/* Header Section */}
      <Box
        sx={{
          width: "100%",
          maxWidth: "900px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          marginBottom: "20px",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: "#333",
            fontSize: "1.2rem",
          }}
        >
          📝 Rules & Guidelines for {metaData?.title}
        </Typography>
        <Divider sx={{ width: "50%", margin: "20px 0" }} />
      </Box>

      {/* Rules Section */}
      <Box
        sx={{
          width: "100%",
          maxWidth: "1000px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "#fff",
          boxShadow: 3,
          borderRadius: "12px",
          padding: "30px",
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
            <Grid item xs={12} sm={6} key={idx}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: "bold", color: "#333" }}
                >
                  {item.label}:
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: "#555", fontWeight: "bold" }}
                >
                  {item.value}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Start Quiz Button Section */}
      <Box sx={{ width: "100%", maxWidth: "900px", marginTop: "40px" }}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          fullWidth
          sx={{
            py: 2,
            fontSize: "1.1rem",
            borderRadius: "8px",
            boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.1)",
            transition: "all 0.3s ease-in-out",
            "&:hover": {
              backgroundColor: "#0056b3",
              transform: "scale(1.05)",
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

export default Rules;
