import React, { useReducer, createContext } from "react";
import jwtDecode, { JwtPayload } from 'jwt-decode';

const AuthContext = createContext({
  user: null,
  login: (userData) => {},
  logout: () => {},
});

enum AuthTypes {
  LOGIN, LOGOUT
}

type AuthActions = {
  type: AuthTypes;
  payload?: any;
}

const JWT_KEY = 'mind-jwt-token';

const initialState = {
  user: null
}

if (localStorage.getItem(JWT_KEY)) {
  const decodedToken = jwtDecode<JwtPayload>(localStorage.getItem(JWT_KEY));
  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem(JWT_KEY);
  } else {
    initialState.user = decodedToken;
  }
}

const authReducer = (state, action: AuthActions) => {
  switch (action.type) {
    case AuthTypes.LOGIN:
      return {
        ...state,
        user: action.payload,
      };
    case AuthTypes.LOGOUT:
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

const AuthProvider = (props) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = (userData) => {
    localStorage.setItem(JWT_KEY, userData.token);
    dispatch({
      type: AuthTypes.LOGIN,
      payload: userData,
    });
  };

  const logout = () => {
    localStorage.removeItem(JWT_KEY);
    dispatch({
      type: AuthTypes.LOGOUT
    });
  };

  return (
    <AuthContext.Provider
      value={{ user: state.user, login, logout }}
      {...props}
    />
  );
};

export { AuthContext, AuthProvider, JWT_KEY };
