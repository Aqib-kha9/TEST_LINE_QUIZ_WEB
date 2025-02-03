import React, { useEffect, useState } from "react";
import AppContext from "./AppContext";
import axios from "axios";

const AppState = (props) => {
  const [quizData, setQuizData] = useState([]);
  const [metaData, setMetaData] = useState();

  const fetchQuizData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/quiz"); // Use the proxy URL here
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
  // axios.get('http://localhost:5000/api/quiz')  // Use the backend route
  // .then(response => {
  //   console.log(response.data);
  // })
  // .catch(error => {
  //   console.error('Error fetching quiz data', error);
  // });


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
