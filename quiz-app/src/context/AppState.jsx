import React, { useEffect, useState } from "react";
import AppContext from "./AppContext";
import axios from "axios";

const AppState = (props) => {
  const [quizData, setQuizData] = useState([]);
  const [metaData, setMetaData] = useState();

  const fetchQuizData = async () => {
    try {
      const response = await axios.get("https://proxyserverquiz.onrender.com/api/quiz"); // Use the proxy URL here
      console.log(response.data.questions);
      console.log(response.data);
      setMetaData(response.data);
      setQuizData(response.data.questions);
    } catch (error) {
      console.error("Error fetching quiz data:", error);
      return [];
    }
  };

  useEffect(() => {
    fetchQuizData();
  }, []);


  return (
    <AppContext.Provider
      value={{
        quizData,
        metaData
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppState;
