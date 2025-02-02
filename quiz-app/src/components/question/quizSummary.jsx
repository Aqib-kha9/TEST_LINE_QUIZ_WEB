import React, { useState, useEffect } from "react";
import { Container, Typography, Box, List, ListItem, ListItemText, Button } from "@mui/material";

const QuizSummary = () => {
  const [summaryData, setSummaryData] = useState(null);
  const [previousSummary, setPreviousSummary] = useState(null);

  useEffect(() => {
    const savedSummary = JSON.parse(localStorage.getItem("quizSummary"));
    setSummaryData(savedSummary);

    // Compare with previous quiz results
    if (savedSummary) {
      setPreviousSummary(savedSummary);
    }
  }, []);

  const compareResults = () => {
    if (!previousSummary || !summaryData) return null;
    
    const scoreChange = summaryData.score - previousSummary.score;
    const timeChange = summaryData.totalTime - previousSummary.totalTime;

    return (
      <Box>
        <Typography variant="body1">
          Score Change: {scoreChange >= 0 ? `+${scoreChange}` : scoreChange} <br />
          Time Change: {timeChange >= 0 ? `+${timeChange}` : timeChange} sec
        </Typography>
      </Box>
    );
  };

  return (
    <Container maxWidth="sm" sx={{ textAlign: "center", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
      <Typography variant="h4" gutterBottom>Quiz Summary</Typography>

      {summaryData ? (
        <Box>
          <Typography variant="h6">Score: {summaryData.score} / {summaryData.attemptedQuestions}</Typography>
          <Typography variant="body1">Total Time: {summaryData.totalTime} seconds</Typography>
          <Typography variant="body1">Unattempted Questions: {summaryData.unattemptedQuestions} / {summaryData.attemptedQuestions}</Typography>

          {compareResults()}

          <List>
            <ListItem>
              <ListItemText primary="Motivational Quote: Keep up the great work!" />
            </ListItem>
          </List>
        </Box>
      ) : (
        <Typography variant="body1">No summary available.</Typography>
      )}

      <Button variant="contained" color="primary" onClick={() => window.location.reload()}>Try Again</Button>
    </Container>
  );
};

export default QuizSummary;
