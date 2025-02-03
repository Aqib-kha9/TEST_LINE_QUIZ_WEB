import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import QuizNavbar from "./quizNav";
import {
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Box,
  Skeleton,
  Slide,
  LinearProgress,
} from "@mui/material";
import AppContext from "../../context/AppContext";

const QUIZ_TIME = 30;

const Quiz = () => {
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [userResponses, setUserResponses] = useState([]);
  const [timeLeft, setTimeLeft] = useState(QUIZ_TIME);
  const [startTime, setStartTime] = useState(Date.now());
  const { quizData } = useContext(AppContext);
  const navigate = useNavigate();

  if (!quizData || quizData.length === 0)
    return (
      <Box sx={{ padding: 4, textAlign: "center" }}>
        <Skeleton variant="rectangular" width="100%" height="60px" sx={{ marginBottom: 2 }} />
        <Skeleton variant="text" width="80%" sx={{ marginBottom: 1 }} />
        <Skeleton variant="text" width="60%" />
      </Box>
    );

  const totalQuestions = quizData.length;
  const currentQuestion = quizData[questionIndex];

  // Timer effect - should run only when questionIndex changes
  useEffect(() => {
    if (questionIndex >= totalQuestions) return;

    setTimeLeft(QUIZ_TIME);
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === 1) {
          handleNextQuestion();
          clearInterval(timer);
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [questionIndex]); // Depend on questionIndex to reset timer when it changes

  const storeQuizSummary = (responses) => {
    const previousData = JSON.parse(localStorage.getItem("quizSummary")) || [];
    const quizHistory = Array.isArray(previousData) ? previousData : [];

    const newSummary = {
      score: responses.filter((res) => res.isCorrect).length,
      attemptedQuestions: totalQuestions,
      totalTime: responses.reduce((sum, res) => sum + res.timeTaken, 0),
      unattemptedQuestions: responses.filter((res) => res.selectedAnswer === "No Answer Given").length,
      userResponses: responses,
    };

    const newStoredData = [...quizHistory, newSummary].slice(-2); // Only store the last 2 quizzes
    localStorage.setItem("quizSummary", JSON.stringify(newStoredData));
    navigate("/quiz-summary");
  };

  const handleNextQuestion = () => {
    const timeTaken = (Date.now() - startTime) / 1000;
    const correctOption = currentQuestion.options.find((opt) => opt.is_correct);

    const updatedResponses = [
      ...userResponses,
      {
        question: currentQuestion.description,
        selectedAnswer: selectedAnswer || "No Answer Given",
        correctAnswer: correctOption?.description || "N/A",
        isCorrect: correctOption?.description === selectedAnswer,
        explanation: currentQuestion.detailed_solution || "No explanation provided.",
        timeTaken,
        topic: currentQuestion.topic,
        source: currentQuestion.question_from,
      },
    ];

    setUserResponses(updatedResponses);
    setSelectedAnswer("");
    setStartTime(Date.now());

    if (questionIndex < totalQuestions - 1) {
      setQuestionIndex(questionIndex + 1);
    } else {
      storeQuizSummary(updatedResponses);
    }
  };

  return (
    <>
      <QuizNavbar
        timeLeft={timeLeft}
        questionIndex={questionIndex}
        totalQuestions={totalQuestions}
        topic={currentQuestion.topic}
        source={currentQuestion.question_from}
      />

      <Box
        sx={{
          width: "90vw",
          maxWidth: "90vw",
          height: "100vh",
          overflow: "auto",
          margin: "auto",
          textAlign: "center",
          py: 4,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            mb: "1rem",
            width: "95%",
            display: { xs: "block", sm: "none" },
          }}
        >
          <Typography variant="body2" align="center">
            Progress: {questionIndex} / {totalQuestions}
          </Typography>
          <LinearProgress
            variant="determinate"
            value={(questionIndex / totalQuestions) * 100}
            sx={{ height: 8, borderRadius: 5 }}
          />
        </Box>

        <Slide direction="down" in={true} mountOnEnter unmountOnExit>
          <Box
            sx={{
              p: 3,
              borderRadius: 2,
              boxShadow: 3,
              width: "100%",
              maxWidth: "90vw",
              backgroundColor: "#f5f5f5",
              maxHeight: "10rem",
              display: "flex",
              alignItems: "flex-start",
              textAlign: "left",
              mt: { sm: "none", lg: "5rem" },
            }}
          >
            <Typography variant="h7" sx={{ textAlign: "left" }}>
              {currentQuestion.description}
            </Typography>
          </Box>
        </Slide>

        <Box sx={{ mt: 3, width: "100%", maxWidth: "90vw" }}>
          <RadioGroup
            name="quiz-options"
            value={selectedAnswer}
            onChange={(e) => setSelectedAnswer(e.target.value)}
          >
            {currentQuestion.options.map((option, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  border: "1px solid #ddd",
                  borderRadius: 1,
                  padding: "1px 5px",
                  marginBottom: 2,
                  "&:hover": { backgroundColor: "#f5f5f5" },
                  cursor: "pointer",
                  backgroundColor:
                    selectedAnswer === option.description ? "#e3f2fd" : "transparent",
                }}
                onClick={() => setSelectedAnswer(option.description)}
              >
                <Typography>
                  {String.fromCharCode(65 + index)}. {option.description}
                </Typography>
                <Radio value={option.description} sx={{ marginLeft: "auto" }} />
              </Box>
            ))}
          </RadioGroup>
        </Box>

        <Box mt={4}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            disabled={!selectedAnswer && questionIndex < totalQuestions - 1}
            onClick={handleNextQuestion}
          >
            {questionIndex < totalQuestions - 1 ? "Next Question" : "Finish Quiz"}
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default Quiz;
