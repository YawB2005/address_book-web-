import './App.css';
import Contacts from './components/home_page';
import Login from './components/Login_page';
import Edit from './components/Edit';
//Importing reacter-router-dom here
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Add from './components/Add_contact';

// Using reacter router to keep track of pages in the reac app
function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/edit/:id" element={<Edit/>}/>
          <Route path="/add" element={<Add/>}/>
          <Route path="/home" element={<Contacts/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
