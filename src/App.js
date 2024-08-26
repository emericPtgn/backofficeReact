import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/Context'; // Assure-toi que AuthContext est importé correctement
import LoginPage from './page/login/LoginPage';
import LevelOneLayout from './component/layout/levelOne/LevelOneLayout';
import { Dashboard } from './page/dashboard/Dashboard';
import PrivateRoute from './route/PrivateRoute';
import ArtisteEdit from './page/artiste/ArtisteEdit';
import ArtisteNew from './page/artiste/ArtisteNew';
import Activity from './page/activity/Activity';
import Scene from './page/scene/Scene';
import ActivityEdit from './page/activity/ActivityEdit';
import User from './page/user/User';
import ProgrammationEdit from './page/programmation/ProgrammationEdit';
import CommerceEdit from './page/commerce/CommerceEdit';
import Commerce from './page/commerce/Commerce';
import CommerceNew from './page/commerce/CommerceNew'; 
import Artiste from './page/artiste/Artiste';
import SceneEdit from './page/scene/SceneEdit';
import SceneNew from './page/scene/SceneNew';
import ProgrammationNew from './page/programmation/ProgrammationNew';
import ActivityNew from './page/activity/ActivityNew';
import Programmation from './page/programmation/Programmation';
import MyMap from './page/map/Map';
import UserEdit from './page/user/UserEdit';
import ResetPass from './component/primereact/components/ResetPass';
import AppProviders from './context/AppProviders';
import { UserProvider } from './context/UserContext';
import SignInPage from './component/primereact/components/SignInPage';
import UserNew from './page/user/UserNew';
import GlobalLayout from './component/layout/GlobalLayout';
import TableLayout from './component/layout/TableLayout';
import { Tab } from 'bootstrap';



function App() {
  return (
    <AuthProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/login/:token" element={<LoginPage />} />
            <Route path="/signin/:token" element={<SignInPage />} />
            <Route path="/reset-password/:token" element={<ResetPass />} />
            <Route element={<PrivateRoute />}>
              <Route path="/" element={<AppProviders><GlobalLayout /></AppProviders>}>
                <Route index element={<Navigate to="/dashboard" replace />} />
                <Route path="/dashboard" element={ <Dashboard /> } />
                <Route path="/artiste" element={ <Artiste /> } />
                <Route path="/artiste-edit/:id" element={<ArtisteEdit />} />
                <Route path="/artiste-new" element={<ArtisteNew />} />
                <Route path='/activite' element={<Activity />} />
                <Route path='/activite-edit/:id' element={<ActivityEdit />} />
                <Route path='/activite-new' element={<ActivityNew />} />
                <Route path='/commerce' element={<Commerce />} />
                <Route path='/commerce-edit/:id' element={<CommerceEdit />} />
                <Route path='/commerce-new' element={<CommerceNew />} />
                <Route path='/scene' element={ <Scene /> } />
                <Route path='/scene-edit/:id' element={<SceneEdit />} />
                <Route path='/scene-new' element={<SceneNew />} />
                <Route path='/programmation' element={<Programmation />} />
                <Route path='/programmation-edit/:id' element={<ProgrammationEdit />} />
                <Route path='/programmation-new' element={<ProgrammationNew />} />
                <Route path='/map' element={<MyMap />} />
                <Route path='/utilisateur' element={ <User /> } />
                <Route path='/utilisateur-edit/:id' element={<UserEdit />} />
                <Route path='/utilisateur-new' element={<UserNew />} />
              </Route>
            </Route>
            <Route path="/" element={<Navigate to="/login" replace />} />
          </Routes>
        </Router>
    </AuthProvider>
  );
}

export default App;
