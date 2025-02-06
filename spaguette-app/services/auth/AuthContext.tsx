// AuthContext.js
import React, { createContext, useState, useEffect, ReactNode, useReducer } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DataContext } from '../data/DataContext';

interface AuthContext {
    user?: User,
    loading: boolean,
}

const initialState: AuthContext = {
    user: undefined,
    loading: false,
}

export const AuthContext = createContext({ authState: initialState, dispatch: (action: Action) => {} });


type Action = 
    | { type: 'SET_LOADING'; payload: boolean }
    | { type: 'SET_USER'; payload: User }
    | { type: 'RESET_STATE' }

const reducer = (state: AuthContext, action: Action) => {
    switch(action.type) {
        case 'SET_LOADING':
            return { ...state, loading: action.payload }
        case 'SET_USER':
            return { ...state, user: action.payload }
        case 'RESET_STATE': 
            return initialState
        default:
            return state
    }
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [authState, dispatch] = useReducer(reducer, initialState)

    return (
        <AuthContext.Provider value={{ authState, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}


// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const checkLoggedUser = async () => {
//       try {
//         // Recupera il token da AsyncStorage
//         const token = await AsyncStorage.getItem('token');
//         if (token) {
//           // Se esiste il token, puoi fare una chiamata API per ottenere i dati utente
//           // oppure decodificarlo se contiene già le informazioni necessarie.
//           // Ad esempio:
//           const userData = await fetchUserData(token);
//           setUser(userData);
//         }
//       } catch (error) {
//         console.error('Errore nel recupero del token', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     checkLoggedUser();
//   }, []);

//   // Simulazione di una chiamata API per ottenere i dati utente
//   const fetchUserData = async (token) => {
//     // Qui va la tua logica per chiamare l'API con il token
//     // Ad esempio, potresti usare fetch o axios:
//     // const response = await fetch('https://api.example.com/me', { headers: { Authorization: `Bearer ${token}` } });
//     // return response.json();
//     return { id: 1, name: 'Mario Rossi' }; // esempio statico
//   };

//   return (
//     <AuthContext.Provider value={{ user, setUser, loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
