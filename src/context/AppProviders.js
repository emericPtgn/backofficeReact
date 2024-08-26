// AppProviders.js
import React from 'react';
import { ArtistesProvider } from './ArtisteContext';
import EmplacementProvider from './EmplacementContext';
import { CommercesProvider } from './CommerceContext';
import MarkerProvider from './MarkerContext';
import { ActiviteProvider } from './ActiviteContext';
import { ProgrammationProvider } from './ProgrammationContext';
import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';
import "primereact/resources/themes/lara-light-cyan/theme.css"; // Choisis le thème que tu utilises
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { UserProvider } from './UserContext';


const AppProviders = ({ children }) => {

  const value = {
    ripple : true
  }
  return (
    <UserProvider>
      <ArtistesProvider>
        <EmplacementProvider>
          <CommercesProvider>
            <MarkerProvider>
              <ActiviteProvider>
                <ProgrammationProvider>
                  <PrimeReactProvider value={value}>
                    {children}
                  </PrimeReactProvider>
                </ProgrammationProvider>
              </ActiviteProvider>
            </MarkerProvider>
          </CommercesProvider>
        </EmplacementProvider>
      </ArtistesProvider>
    </UserProvider>
  );
};

export default AppProviders;
