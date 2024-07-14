import React, { useEffect } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { authActions } from './store'
import Navber from './components/navbar/Navbar'
import Home from './components/Home/home'
import About from './components/About/about'
import Todo from './components/todo/todo'
import SignIn from './components/sign/signIn'
import SignUp from './components/sign/signUp'
import Footer from './components/footer/footer'
import '@fortawesome/fontawesome-free/css/all.min.css';


const App=() =>{
  const dispatch=useDispatch()
  useEffect(() => {
    const id=sessionStorage.getItem('id')
    if(id){
      dispatch(authActions.login()  )
    }
  }, [])
  
  return (
    
      
    <Router>
     < Navber />
      <Routes >
            <Route exact path='/' element = {<Home/>}/>
            <Route  path='/about' element = {<About/>}/>
            <Route  path='/todo' element = {<Todo/>}/>
            <Route  path='/signin' element = {<SignIn/>}/>
            <Route  path='/signup' element = {<SignUp/>}/>
      </Routes>
    <Footer />
    </Router>
  
  )
}

export default App