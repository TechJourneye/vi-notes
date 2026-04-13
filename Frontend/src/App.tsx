import { BrowserRouter,Routes,Route } from 'react-router-dom'
import './App.css'
import Editor from './components/editor'
import Navbar from './components/navbar'
import { CookiesProvider } from 'react-cookie'

import Signup from './components/user/signup'
import Login from './components/user/login'
import MyNotes from './components/show'
import Edit from './components/edit.jsx'
import ViewNote from './components/ViewNote'

function App() {
 

  return (
    <>
    <CookiesProvider>
    <BrowserRouter>
       <Navbar/>
      <Routes>
       <Route path='/signup' element={<Signup/>}/>
       <Route path='/login' element={<Login/>}/>
       <Route path='/' element={<Editor/>}/>
       <Route path='/mynotes' element={<MyNotes/>}/>
      <Route path='/note/:id' element={<ViewNote/>}/>
       <Route path='/edit/:id' element={<Edit/>}/>

      </Routes>
    </BrowserRouter>
        </CookiesProvider>
    </>
  )
}

export default App;
