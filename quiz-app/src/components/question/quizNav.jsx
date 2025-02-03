import React from "react";
import { AppBar, Toolbar, Typography, Box, LinearProgress } from "@mui/material";
import { AccessTime } from "@mui/icons-material";
import { motion } from "framer-motion";

const QuizNavbar = ({ timeLeft, questionIndex, totalQuestions, topic, source }) => {
  return (
    <AppBar 
      color="default" 
      elevation={3} 
      sx={{ 
        width: "90vw",  
        left: "50%",
        transform: "translateX(-50%)",
        top: "80px",  // 👈 Top se 80px chhod diya
        mb: 5, 
        borderRadius: 2 
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        {/* Timer Section */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <AccessTime sx={{ color: "primary.main", mr: 1 }} />
          </motion.div>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            {timeLeft} sec
          </Typography>
        </Box>

        {/* Progress Section */}
        <Box sx={{ width: "40%", display: { xs: "none", sm: "block" } }}> {/* Hide on small screens */}
          <Typography variant="body2" align="center">
            Progress: {questionIndex} / {totalQuestions}
          </Typography>
          <LinearProgress
            variant="determinate"
            value={(questionIndex / totalQuestions) * 100}
            sx={{ height: 8, borderRadius: 5 }}
          />
        </Box>

        {/* Topic and Source */}
        <Box textAlign="right">
          <Typography variant="body2"><strong>Topic:</strong> {topic}</Typography>
          <Typography variant="body2"><strong>Source:</strong> {source}</Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default QuizNavbar;
