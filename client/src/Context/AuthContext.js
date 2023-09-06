import { createContext, useEffect, useReducer } from 'react';
import authReducer from '../Reducer/AuthReducer.js';


const INITIAL_STATE = {
    user:
      localStorage.getItem('user') !== null
        ? JSON.parse(localStorage.getItem('user'))
        : null,
    myList:
      localStorage.getItem('myList') !== null
        ? JSON.parse(localStorage.getItem('myList'))
        : null,
  
    isFetching: false,
    error: false,
  };
  
export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, INITIAL_STATE);
  
  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(state.user));
    localStorage.setItem('myList', JSON.stringify(state.myList));
  }, [state.user, state.myList]);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        myList: state.myList,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};