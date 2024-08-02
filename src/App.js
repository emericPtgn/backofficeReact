import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/Context';
import LoginPage from './page/login/LoginPage';
import LevelOneLayout from './component/layout/levelOne/LevelOneLayout';
import { Dashboard } from './page/dashboard/Dashboard';
import PrivateRoute from './route/PrivateRoute';
import ArtisteEdit from './page/artiste/ArtisteEdit';
import ArtisteNew from './page/artiste/ArtisteNew';
import ActivityComponent from './page/activity/Activity.js'
import Scene from './page/scene/Scene';
import ProgrammationComponent from './page/programmation/Programmation';
import ActivityEdit from './page/activity/ActivityEdit';
import UserComponent from './page/user/User';
import ProgrammationEdit from './page/programmation/ProgrammationEdit';
import CommerceEdit from './page/commerce/CommerceEdit';
import CommerceComponent from './page/commerce/Commerce';
import ArtisteComponent from './page/artiste/Artiste.js'

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
            <Route path="/artistes" element={<ArtisteComponent />}/>
            <Route path="/artiste-edit/:id" element={<ArtisteEdit />} />
            <Route path="/artiste-new" element={<ArtisteNew />} />
            <Route path='/activites' element={<ActivityComponent />} />
            <Route path='/activity-edit/:id' element={<ActivityEdit />} />
            {/* <Route path='/activity-new' element={<ActivityNew />} /> */}
            <Route path='/commerce' element={<CommerceComponent />} />
            <Route path='/commerce-edit/:id' element={<CommerceEdit />} />
            <Route path='/scene' element={<Scene />} />
            <Route path='/programmation' element={<ProgrammationComponent />} />
            <Route path='/programmation-edit/:id' element={<ProgrammationEdit />} />
            <Route path='/utilisateur' element={<UserComponent />} />
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