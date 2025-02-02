import React, { useContext, useState, useEffect } from "react";
import {
  Container,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Box,
  CircularProgress,
  LinearProgress,
  Slide,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import { AccessTime } from "@mui/icons-material"; // Clock icon
import { motion } from "framer-motion"; // For animations
import AppContext from "../../context/AppContext";

const QUIZ_TIME = 40; // seconds per question

const motivationalQuotes = {
  high: ["Excellent work!", "You're a quiz master!", "Keep up the great work!"],
  medium: [
    "Good job, but there's room for improvement.",
    "You're doing well!",
    "Nice effort!",
  ],
  low: ["Keep going, you'll get better!", "Don't give up!", "Try again, you've got this!"],
};

const Quiz = () => {
  // State declarations
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [userResponses, setUserResponses] = useState([]);
  const [timeLeft, setTimeLeft] = useState(QUIZ_TIME);
  const [startTime, setStartTime] = useState(Date.now());
  const [unattemptedQuestions, setUnattemptedQuestions] = useState(0);
  const [showDetails, setShowDetails] = useState({});
  const [showSummary, setShowSummary] = useState(false);

  const { quizData } = useContext(AppContext);

  if (!quizData || quizData.length === 0) {
    return <CircularProgress color="inherit" />;
  }

  const totalQuestions = quizData.length;
  const currentQuestion = quizData[questionIndex];

  // Timer effect: countdown for each question
  useEffect(() => {
    if (questionIndex >= totalQuestions) return;
    setTimeLeft(QUIZ_TIME);

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === 1) {
          if (!selectedAnswer) {
            setUnattemptedQuestions((prevCount) => prevCount + 1);
            setSelectedAnswer("No Answer Given");
          }
          clearInterval(timer);
          handleNextQuestion();
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [questionIndex]);

  // Handle moving to the next question
  const handleNextQuestion = () => {
    const endTime = Date.now();
    const timeTaken = (endTime - startTime) / 1000;

    const isCorrect = currentQuestion.options.find(
      (opt) => opt.description === selectedAnswer && opt.is_correct
    )?.is_correct;

    setUserResponses((prevResponses) => [
      ...prevResponses,
      {
        question: currentQuestion.description,
        selectedAnswer,
        isCorrect,
        correctAnswer: currentQuestion.options.find((opt) => opt.is_correct)
          ?.description,
        timeTaken,
        questionFrom: currentQuestion.question_from,
        topic: currentQuestion.topic,
        detailedSolution: `Detailed explanation for question "${currentQuestion.description}" goes here...`,
      },
    ]);

    if (questionIndex < totalQuestions - 1) {
      setQuestionIndex(questionIndex + 1);
      setSelectedAnswer("");
      setStartTime(Date.now());
    } else {
      setShowSummary(true);
    }
  };

  // Save summary data to localStorage
  const saveSummaryToLocalStorage = () => {
    const score = userResponses.filter((response) => response.isCorrect).length;
    const totalTime = userResponses.reduce(
      (total, response) => total + response.timeTaken,
      0
    );
    const summaryData = {
      score,
      totalTime,
      attemptedQuestions: userResponses.length,
      unattemptedQuestions,
    };
    localStorage.setItem("quizSummary", JSON.stringify(summaryData));
  };

  const getMotivationalQuote = () => {
    const accuracy =
      (userResponses.filter((response) => response.isCorrect).length / totalQuestions) *
      100;
    if (accuracy >= 80) {
      return motivationalQuotes.high[Math.floor(Math.random() * motivationalQuotes.high.length)];
    } else if (accuracy >= 50) {
      return motivationalQuotes.medium[Math.floor(Math.random() * motivationalQuotes.medium.length)];
    } else {
      return motivationalQuotes.low[Math.floor(Math.random() * motivationalQuotes.low.length)];
    }
  };

  const calculateTotalTime = () => {
    return userResponses.reduce((total, response) => total + response.timeTaken, 0);
  };

  const totalTimeTaken = calculateTotalTime();
  const attemptedQuestions = userResponses.length;

  return (
    <Container
      maxWidth="sm"
      sx={{
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        position: "relative", // To position the timer absolutely inside this container
        py: 4,
      }}
    >
      {/* Timer in Top-Right Corner with Icon and Pulse Animation */}
      <Box
        sx={{
          position: "absolute",
          top: 16,
          right: 16,
          display: "flex",
          alignItems: "center",
          background: "rgba(255,255,255,0.8)",
          p: 1,
          borderRadius: "8px",
          boxShadow: 3,
        }}
      >
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <AccessTime sx={{ color: "primary.main", mr: 0.5 }} />
        </motion.div>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          {timeLeft} sec
        </Typography>
      </Box>

      {/* Progress Bar */}
      <Box width="100%" mb={2}>
        <Typography variant="body1">
          Progress: {questionIndex} / {totalQuestions}
        </Typography>
        <LinearProgress
          variant="determinate"
          value={(questionIndex / totalQuestions) * 100}
          sx={{ height: 10, borderRadius: 5 }}
        />
      </Box>

      {questionIndex < totalQuestions && !showSummary ? (
        <>
          {/* Question Display with Slide Animation */}
          <Slide direction="down" in={true} mountOnEnter unmountOnExit>
            <Box sx={{ mb: 4, p: 2, borderRadius: 2, boxShadow: 3, width: "100%" }}>
              <Typography variant="h5" gutterBottom>
                {currentQuestion.description}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                <strong>Topic:</strong> {currentQuestion.topic} <br />
                <strong>Source:</strong> {currentQuestion.question_from}
              </Typography>
            </Box>
          </Slide>

          {/* Answer Options */}
          <RadioGroup
            aria-label="quiz-options"
            name="quiz-options"
            value={selectedAnswer}
            onChange={(e) => setSelectedAnswer(e.target.value)}
            sx={{ width: "100%" }}
          >
            {currentQuestion.options.map((option, index) => (
              <FormControlLabel
                key={index}
                value={option.description}
                control={<Radio />}
                label={option.description}
                sx={{
                  "&:hover": {
                    backgroundColor: "rgba(15, 162, 224, 0.1)",
                    borderRadius: 1,
                  },
                  mb: 1,
                }}
              />
            ))}
          </RadioGroup>

          <Box mt={4}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              disabled={!selectedAnswer}
              onClick={handleNextQuestion}
              sx={{
                transition: "transform 0.3s ease",
                "&:hover": { transform: "scale(1.1)" },
              }}
            >
              {questionIndex < totalQuestions - 1 ? "Next Question" : "Finish Quiz"}
            </Button>
          </Box>
        </>
      ) : showSummary ? (
        <Box>
          {saveSummaryToLocalStorage()}
          <Typography variant="h4" gutterBottom>
            Quiz Completed!
          </Typography>
          <Typography variant="h6" gutterBottom>
            Score: {userResponses.filter((response) => response.isCorrect).length} / {totalQuestions}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Total Time Taken: {totalTimeTaken.toFixed(2)} seconds
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Questions Attempted: {attemptedQuestions} / {totalQuestions}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Questions Unattempted: {unattemptedQuestions} / {totalQuestions}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Progress: {attemptedQuestions} / {totalQuestions}
          </Typography>

          {/* Motivational Quote */}
          <Box width="100%" mt={2}>
            <Typography variant="h6" color="primary">
              {getMotivationalQuote()}
            </Typography>
          </Box>

          {/* Detailed Summary of Each Question */}
          <List>
            {userResponses.map((response, index) => (
              <ListItem
                key={index}
                sx={{
                  bgcolor: response.isCorrect ? "green.100" : "red.100",
                  mb: 1,
                  borderRadius: 2,
                  boxShadow: 2,
                }}
              >
                <ListItemText
                  primary={`${index + 1}. ${response.question}`}
                  secondary={
                    <>
                      <strong>Your Answer:</strong> {response.selectedAnswer || "No Answer Given"} <br />
                      <strong>Time Taken:</strong> {response.timeTaken.toFixed(2)} sec <br />
                      <strong>Result:</strong> {response.isCorrect ? "✅ Correct" : "❌ Incorrect"} <br />
                      <strong>Topic:</strong> {response.topic} <br />
                      <strong>Source:</strong> {response.questionFrom} <br />
                      <Button
                        variant="text"
                        color="primary"
                        onClick={() =>
                          setShowDetails({ ...showDetails, [index]: true })
                        }
                      >
                        See Full Detailed Solution
                      </Button>
                      {showDetails[index] && (
                        <>
                          <Typography variant="body2" sx={{ mt: 1, whiteSpace: "pre-line" }}>
                            {response.detailedSolution}
                          </Typography>
                          <Button
                            variant="text"
                            color="secondary"
                            onClick={() =>
                              setShowDetails({ ...showDetails, [index]: false })
                            }
                          >
                            Hide Detailed Solution
                          </Button>
                        </>
                      )}
                    </>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Box>
      ) : null}
    </Container>
  );
};

export default Quiz;
