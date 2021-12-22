import {createContext,useState,useReducer} from 'react';

const initialState = [];
export const HistoryContext = createContext(initialState);

const historyReducer = (state,action) => {
    const {type,payload} = action;

    switch(type) {
        case "ADD_HISTORY":
            return [...state, payload]
        default:
            throw new Error(`ADD HISTORY is not working.`);
    }
}

export const HistoryProvider = ({children}) => {
    const [state,dispatch] = useReducer(historyReducer,initialState);

    const addToHistory = (history) => {
       

        dispatch({
            type:"ADD_HISTORY",
            payload: state.push(history)
        })
    }
    return (
        <HistoryContext.Provider value={{state,addToHistory}}>
            {children}
        </HistoryContext.Provider>
    )
}