import './App.css';
import Contacts from './components/home_page';
import Login from './components/Login_page';
import Edit from './components/Edit';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Add from './components/Add_contact';

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
