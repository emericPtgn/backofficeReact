import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/Context';
import LoginPage from './page/login/LoginPage';
import LevelOneLayout from './component/layout/levelOne/LevelOneLayout';
import { Dashboard } from './page/dashboard/Dashboard';
import PrivateRoute from './route/PrivateRoute';
import Artiste from './page/artiste/Artiste';
import ArtisteEdit from './page/artiste/ArtisteEdit';
import ArtisteNew from './page/artiste/ArtisteNew';

function App() {
  return (
    <AuthProvider>
      <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<LevelOneLayout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/artistes" element={<Artiste />}/>
            <Route path="/artiste-edit/:id" element={<ArtisteEdit />} />
            <Route path="/artiste-new" element={<ArtisteNew />} />
            
          </Route>
        </Route>
      </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;