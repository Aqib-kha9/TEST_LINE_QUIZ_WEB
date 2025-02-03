import React from 'react'
import AppContext from './context/AppContext'
import { useContext } from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Index from './components/home';
import Quiz from './components/question/quiz';
import Rules from './components/question/rules';
import Navbar from './components/header/navbar';
import QuizSummary from './components/question/quizSummary';
import Leaderboard from './components/home/leaderBoard';
const App = () => {
  return (
    <Router>
       <Navbar/>
      {/*<ToastContainer /> */}
      <Routes>
        <Route path='/' element={<Index/>}/>
        <Route path='/rules' element={<Rules/>}/>
        <Route path='/quiz' element={<Quiz/>}/>
        <Route path='/quiz-summary' element={<QuizSummary/>}/>
        <Route path='/leader-board' element={<Leaderboard/>}/>

      </Routes> 
    </Router>
  )
}

export default App