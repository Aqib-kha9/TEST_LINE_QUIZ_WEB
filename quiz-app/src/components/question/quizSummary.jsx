import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  Button,
  Grid,
} from "@mui/material";
import { Line, Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useNavigate } from "react-router-dom";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const QuizSummary = () => {
  const [summaryData, setSummaryData] = useState(null);
  const [previousSummary, setPreviousSummary] = useState(null);
  const [userResponses, setUserResponses] = useState([]);
  const [showExplanation, setShowExplanation] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("quizSummary")) || [];

    if (savedData.length > 0) {
      setSummaryData(savedData[savedData.length - 1]);
      setUserResponses(savedData[savedData.length - 1].userResponses || []);
      setShowExplanation(
        new Array(savedData[savedData.length - 1].userResponses.length).fill(false)
      );

      if (savedData.length > 1) {
        setPreviousSummary(savedData[savedData.length - 2]);
      }
    }
  }, []);

  const handleTryAgain = () => {
    navigate("/quiz");
  };

  const handleExplanationToggle = (index) => {
    const updatedVisibility = [...showExplanation];
    updatedVisibility[index] = !updatedVisibility[index];
    setShowExplanation(updatedVisibility);
  };

  const compareResults = () => {
    if (!previousSummary || !summaryData) return null;
    return (
      <Box
        sx={{
          border: "1px solid #ccc",
          borderRadius: "8px",
          padding: "16px",
          marginTop: "20px",
          bgcolor: "#e3f2fd",
        }}
      >
        <Typography
          variant="body1"
          color={summaryData.score >= previousSummary.score ? "green" : "red"}
        >
          Score Change: {summaryData.score - previousSummary.score} <br />
          Time Change: {summaryData.totalTime - previousSummary.totalTime} sec
        </Typography>
      </Box>
    );
  };

  const lineChartData = {
    labels: previousSummary
      ? ["Previous Quiz", "Current Quiz"]
      : ["Current Quiz"],
    datasets: [
      {
        label: "Score",
        data: previousSummary
          ? [previousSummary.score, summaryData?.score]
          : [summaryData?.score],
        borderColor: "blue",
        backgroundColor: "blue",
        fill: false,
        tension: 0.1,
      },
      {
        label: "Time",
        data: previousSummary
          ? [previousSummary.totalTime, summaryData?.totalTime]
          : [summaryData?.totalTime],
        borderColor: "red",
        backgroundColor: "red",
        fill: false,
        tension: 0.1,
      },
    ],
  };

  const barChartData = {
    labels: ["Correct", "Incorrect", "Unattempted"],
    datasets: [
      {
        label: "Answers",
        data: [
          summaryData?.score || 0,
          (summaryData?.attemptedQuestions || 0) - (summaryData?.score || 0),
          summaryData?.unattemptedQuestions || 0,
        ],
        backgroundColor: ["green", "red", "gray"],
      },
    ],
  };

  const doughnutChartData = {
    labels: ["Correct", "Incorrect", "Unattempted"],
    datasets: [
      {
        data: [
          summaryData?.score || 0,
          (summaryData?.attemptedQuestions || 0) - (summaryData?.score || 0),
          summaryData?.unattemptedQuestions || 0,
        ],
        backgroundColor: ["green", "red", "gray"],
      },
    ],
  };

  return (
    <Container
      maxWidth={false}
      sx={{
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Quiz Summary
      </Typography>

      {summaryData ? (
        <Box
          sx={{
            width: "95%",
            padding: "20px",
            backgroundColor: "#f5f5f5",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Box sx={{ marginBottom: "20px" }}>
            <Typography variant="h6">
              Score: {summaryData.score} / {summaryData.attemptedQuestions}
            </Typography>
            <Typography variant="body1">
              Total Time: {summaryData.totalTime} seconds
            </Typography>
            <Typography variant="body1">
              Unattempted Questions: {summaryData.unattemptedQuestions}
            </Typography>
          </Box>

          {compareResults()}

          <Grid container spacing={3} sx={{ marginTop: "30px" }}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6">Score & Time Comparison</Typography>
              <Line data={lineChartData} />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6">Answer Distribution</Typography>
              <Bar data={barChartData} />
            </Grid>
          </Grid>

          <Typography variant="h5" sx={{ marginTop: "30px" }}>
            Detailed Summary
          </Typography>
          <List>
            {userResponses.map((response, index) => (
              <ListItem
                key={index}
                sx={{
                  bgcolor: response.isCorrect ? "green.100" : "red.100",
                  mb: 1,
                  borderRadius: 2,
                  display: "flex",
                  flexDirection: "column", // Stack items vertically by default
                  alignItems: "flex-start", // Align items to the left
                }}
              >
                <Grid container spacing={2} sx={{ width: "100%" }}>
                  <Grid item xs={12} md={10}>
                    <ListItemText
                      primary={`${index + 1}. ${response.question}`}
                      secondary={`Your Answer: ${
                        response.selectedAnswer || "No Answer Given"
                      } | Correct Answer: ${
                        response.correctAnswer || "N/A"
                      } | Result: ${
                        response.isCorrect ? "✅ Correct" : "❌ Incorrect"
                      }`}
                    />
                  </Grid>
                  <Grid item xs={12} md={2}>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => handleExplanationToggle(index)}
                      sx={{ width: "100%" }}
                    >
                      {showExplanation[index]
                        ? "Hide Explanation"
                        : "Show Explanation"}
                    </Button>
                  </Grid>
                </Grid>

                {showExplanation[index] && response.explanation && (
                  <Box
                    sx={{
                      marginTop: "10px",
                      padding: "10px",
                      backgroundColor: "#f1f8e9",
                      borderRadius: "8px",
                      width: "100%", // Ensure it takes full width below the question
                    }}
                  >
                    <Typography variant="body2">
                      {response.explanation}
                    </Typography>
                  </Box>
                )}
              </ListItem>
            ))}
          </List>

          <Button variant="contained" color="primary" sx={{ marginTop: "20px" }} onClick={handleTryAgain}>
            Try Again
          </Button>
        </Box>
      ) : (
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="body1">You have not taken the quiz yet.</Typography>
          <Button variant="contained" color="primary" onClick={handleTryAgain} sx={{ marginTop: "20px" }}>
            Take Quiz
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default QuizSummary;
