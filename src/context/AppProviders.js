// AppProviders.js
import React from 'react';
import { ArtistesProvider } from './ArtisteContext';
import { CommercesProvider } from './CommerceContext';
import { MarkerProvider } from './MarkerContext';
import { ActiviteProvider } from './ActiviteContext';
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
          <CommercesProvider>
            <MarkerProvider>
              <ActiviteProvider>
                  <PrimeReactProvider value={value}>
                    {children}
                  </PrimeReactProvider>
              </ActiviteProvider>
            </MarkerProvider>
          </CommercesProvider>
      </ArtistesProvider>
    </UserProvider>
  );
};

export default AppProviders;
