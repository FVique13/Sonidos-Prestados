// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Layout from './Layout/Layout';
import Home from './Routes/Home';
import Detail from './Routes/Detail/Detail';
import DetailView from './Routes/DetailView/DetailView';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'bootstrap/dist/js/bootstrap.bundle.min'; 
import Login from './Components/Login';
import Register from './Components/Register';
import AdminPanel from './Routes/AdminPanel';
const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/detail/:id" element={<Detail />} />
            <Route path="/detailview/:id" element={<DetailView />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin" element={<AdminPanel/>} />
            </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
};

export default App;
