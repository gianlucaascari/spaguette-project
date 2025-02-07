// AuthContext.js
import React, { createContext, useState, useEffect, ReactNode, useReducer } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DataContext } from '../data/DataContext';
import { useAuthService } from './auth-service';

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
            <AuthVerifier>
                {children}
            </AuthVerifier>
        </AuthContext.Provider>
    )
}

const AuthVerifier = ({ children }: { children: ReactNode }) => {
    const authService = useAuthService()

    useEffect(() => {
        authService.isAuthenticated()
    }, [])

    return children
}