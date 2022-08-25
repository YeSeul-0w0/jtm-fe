import { IState } from 'src/interfaces/ILogin';
import React, { ReactNode } from 'react';
import { createContext, useReducer } from 'react';
import { AuthReducer, LoginDispatch } from './reducer';

// localStorage에는 id(token)과 유저 닉네임, 이메일만 저장함
const currentUser = localStorage.getItem('currentUser');
const id = currentUser ? JSON.parse(currentUser).id : null;
const userName = currentUser ? JSON.parse(currentUser).userName : null;
const userId = currentUser ? JSON.parse(currentUser).userId : null;

const initialState: IState = {
  user: {
    userName: userName,
    userId: userId,
  },
  token: id,
  loading: false,
  errorMsg: null,
};

const AuthStateContext = createContext<IState>(initialState);
const AuthDispatchContext = createContext<LoginDispatch | null>(null);

// 토큰, 사용자 인증 정보를 저장
export function useAuthState() {
  const context = React.useContext(AuthStateContext);

  if (context === undefined)
    throw new Error('useAuthState는 AuthProvider 안에서만 사용 가능합니다.');
  return context;
}

// dispatch를 전달
export function useAuthDispatch() {
  const context = React.useContext(AuthDispatchContext);

  if (!context)
    throw new Error('useAuthDispatch는 AuthProvider 안에서만 사용 가능합니다.');
  return context;
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, dispatch] = useReducer(AuthReducer, initialState);

  return (
    <AuthStateContext.Provider value={user}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
};
