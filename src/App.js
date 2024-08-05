import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/Context';
import { ArtistesProvider } from './context/ArtisteContext'; // Importez ArtistesProvider
import LoginPage from './page/login/LoginPage';
import LevelOneLayout from './component/layout/levelOne/LevelOneLayout';
import { Dashboard } from './page/dashboard/Dashboard';
import PrivateRoute from './route/PrivateRoute';
import ArtisteEdit from './page/artiste/ArtisteEdit';
import ArtisteNew from './page/artiste/ArtisteNew';
import ActivityComponent from './page/activity/Activity';
import Scene from './page/scene/Scene';
import ProgrammationComponent from './page/programmation/Programmation';
import ActivityEdit from './page/activity/ActivityEdit';
import UserComponent from './page/user/User';
import ProgrammationEdit from './page/programmation/ProgrammationEdit';
import CommerceEdit from './page/commerce/CommerceEdit';
import CommerceComponent from './page/commerce/Commerce';
import Artiste from './page/artiste/Artiste'
import { SceneProvider } from './context/SceneContext';
import SceneEdit from './page/scene/SceneEdit';
import { ProgrammationProvider } from './context/ProgrammationContext';
import SceneNew from './page/scene/SceneNew';
import ProgrammationNew from './page/programmation/ProgrammationNew';
import ActivityNew from './page/activity/ActivityNew';
import { ActiviteProvider } from './context/ActiviteContext';
import Programmation from './page/programmation/Programmation';
function App() {
  return (
    <AuthProvider>
      <Router>
        <ArtistesProvider> {/* Envelopper ici */}
          <SceneProvider>
            <ActiviteProvider>
              <ProgrammationProvider>
              <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route element={<PrivateRoute />}>
                <Route path="/" element={<LevelOneLayout />}>
                  <Route index element={<Navigate to="/dashboard" replace />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/artiste" element={<Artiste />} />
                  <Route path="/artiste-edit/:id" element={<ArtisteEdit />} />
                  <Route path="/artiste-new" element={<ArtisteNew />} />
                  <Route path='/activite' element={<ActivityComponent />} />
                  <Route path='/activite-edit/:id' element={<ActivityEdit />} />
                  <Route path='/activite-new' element={<ActivityNew />} />
                  {/* <Route path='/activity-new' element={<ActivityNew />} /> */}
                  <Route path='/commerce' element={<CommerceComponent />} />
                  <Route path='/commerce-edit/:id' element={<CommerceEdit />} />
                  <Route path='/scene' element={<Scene />} />
                  <Route path='/scene-edit/:id' element={<SceneEdit />} />
                  <Route path='/scene-new' element={<SceneNew />} />
                  <Route path='/programmation' element={<Programmation />} />
                  <Route path='/programmation-edit/:id' element={<ProgrammationEdit />} />
                  <Route path='/programmation-new' element={<ProgrammationNew />} />
                  <Route path='/utilisateur' element={<UserComponent />} />
                  {/* <Route path='/programmation' element={<Scene />} /> */}
                  {/* <Route path="/activity-edit/:id" element={<ActivityEdit />} /> */}
              </Route>
              </Route>
              </Routes>    
              </ProgrammationProvider>
            </ActiviteProvider>
          </SceneProvider>
        </ArtistesProvider> {/* Fin de l'enveloppement */}
      </Router>
    </AuthProvider>
  );
}

export default App;
