import React, { useState, useEffect } from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import heroImage from "../../assets/27.png";

const textOptions = [
  "Welcome to the Quiz Game 🎯",
  "Test Your Skills 💡",
  "Win Exciting Rewards 🏆",
];

const Index = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [subtitleVisible, setSubtitleVisible] = useState(true);

  // Typing effect for title that changes text dynamically
  useEffect(() => {
    let index = 0;
    const fullText = textOptions[currentTextIndex];
    setTitle(""); // Reset title
    const typingEffect = setInterval(() => {
      setTitle(fullText.slice(0, index + 1));
      index++;
      if (index === fullText.length) clearInterval(typingEffect);
    }, 80);

    // Change text every 3.5s
    const changeTextTimer = setTimeout(() => {
      setCurrentTextIndex((prev) => (prev + 1) % textOptions.length);
    }, 3500);

    return () => {
      clearInterval(typingEffect);
      clearTimeout(changeTextTimer);
    };
  }, [currentTextIndex]);

  // Fade-in and fade-out effect for the subtitle
  useEffect(() => {
    const subtitleTimer = setInterval(() => {
      setSubtitleVisible((prev) => !prev);
    }, 4000); // Toggle every 4 seconds

    return () => clearInterval(subtitleTimer);
  }, []);

  return (
    <Container
      maxWidth="lg"
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row-reverse" },
        alignItems: "center",
        justifyContent: {xs:"space-evenly",md:"space-between"},
        minHeight: "100vh",
        minWidth: "99vw",
        p: 0,
        m: 0, // Removing margin here
        background: "linear-gradient(to right, rgba(111, 150, 198, 0.19), transparent)", // Adding a blue background on the left
        borderRadius: "15px", // Soft rounded corners for elegance
      }}
    >
      {/* Hero Image Section with Floating Effect */}
      <Box
        component="img"
        src={heroImage}
        alt="Quiz Hero"
        sx={{
          width: { xs: "100%", md: "45%" },
          mb: 0, // Removing margin here
          mt: { xs: 10, md: 0 },
          p: 0, // Removing padding here
          transition: "transform 0.5s ease-in-out, box-shadow 0.5s ease-in-out",
          animation: "float 3s ease-in-out infinite",
          "@keyframes float": {
            "0%, 100%": { transform: "translateY(0px)" },
            "50%": { transform: "translateY(-10px)" },
          },
        }}
      />

      {/* Text Content Section with Advanced Animations */}
      <Box
        sx={{
          width: { xs: "100%", md: "45%" },
          textAlign: { xs: "center", md: "left" },
          px: { xs: 2, md: 2 },
          p: 0, // Removing padding here
          m: 0, // Removing margin here
          transition: "transform 0.4s ease, color 0.4s ease-in-out",
        }}
      >
        {/* Animated Title with Typing Effect */}
        <Typography
          variant="h3"
          gutterBottom
          fontWeight="bold"
          sx={{
            background: "linear-gradient(90deg,rgb(15, 162, 224), #ee0979)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontSize: { xs: "2rem", md: "3rem" },
          }}
        >
          {title}
        </Typography>

        {/* Subtitle with Fade-in and Fade-out Effect */}
        <Typography
          variant="h6"
          color="textSecondary"
          paragraph
          sx={{
            opacity: subtitleVisible ? 1 : 0,
            transition: "opacity 1.5s ease-in-out",
            fontSize: { xs: "1rem", md: "1.5rem" },
          }}
        >
          Test your knowledge and earn points. Are you ready for the challenge?
        </Typography>

        {/* Animated Button */}
        <Box mt={4}>
          <Button
            variant="contained"
            color="primary"
            size="x-small"
            sx={{
              px: 4,
              py: 1.5,
              fontSize: "1.2rem",
              borderRadius: "12px",
              border: "2px solid #1976d2", // Keeping the original button color as the border
              background: "#1976d2", // Default background
              color: "#fff", // Default text color
              transition: "all 0.3s ease-in-out",
              "&:hover": {
                background: "linear-gradient(to right, #cddff5, #ebf2fc) !important", // Background changes to white on hover
                color: "#1976d2", // Text color changes to the original button color
                border: "2px solid #1976d2", // Border remains the same
                transform: "scale(1.1) translateY(-3px)", // Lift effect
                boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.3)", // Enhanced shadow
              },
            }}
            onClick={() => navigate("/metaData")}
          >
            Start Quiz
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Index;
