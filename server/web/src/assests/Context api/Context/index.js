import React, { createContext, useReducer } from 'react'
import Reducer from '../Reducer';

export const GlobalContext = createContext();
let initialData = {
    userEmail: "",
    theme: true
}

const Context = ({ children }) => {
    const [state, dispatch] = useReducer(Reducer, initialData);
    return (
        <GlobalContext.Provider value={{ state, dispatch }}>
            {children}
        </GlobalContext.Provider>
    )
}

export default Context;
