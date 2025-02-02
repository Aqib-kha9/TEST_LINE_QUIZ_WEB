import React from 'react'
import AppContext from './context/AppContext'
import { useContext } from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Index from './components/home';
import Quiz from './components/question/quiz';
import MetaData from './components/question/metaData';
import Navbar from './components/header/navbar';
import QuizSummary from './components/question/quizSummary';
const App = () => {
  // let {data} = useContext(AppContext);
  return (
    <Router>
       <Navbar/>
      {/*<ToastContainer /> */}
      <Routes>
        <Route path='/' element={<Index/>}/>
        <Route path='/metaData' element={<MetaData/>}/>
        <Route path='/quiz' element={<Quiz/>}/>
        <Route path='/quiz-summary' element={<QuizSummary/>}/>
      </Routes> 
    </Router>
  )
}

export default App