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
import Activity from './page/activity/Activity';
import Commerce from './page/commerce/Commerce';
import Scene from './page/scene/Scene';
import Programmation from './page/programmation/Programmation';
import ActivityEdit from './page/activity/ActivityEdit';
import User from './page/user/User';
import ProgrammationEdit from './page/programmation/ProgrammationEdit';

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
            <Route path='/activites' element={<Activity />} />
            <Route path='/activity-edit/:id' element={<ActivityEdit />} />
            {/* <Route path='/activity-new' element={<ActivityNew />} /> */}
            <Route path='/commerce' element={<Commerce />} />
            <Route path='/scene' element={<Scene />} />
            <Route path='/programmation' element={<Programmation />} />
            <Route path='/programmation-edit/:id' element={<ProgrammationEdit />} />
            <Route path='/utilisateur' element={<User />} />
            {/* <Route path='/programmation' element={<Scene />} /> */}
            {/* <Route path="/activity-edit/:id" element={<ActivityEdit />} /> */}
          </Route>
        </Route>
      </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;