import { IState } from '@src/interfaces/ILogin';
import { Dispatch } from 'react';

export type LoginAction =
  | { type: 'REQUEST_LOGIN'; loading: boolean }
  | {
      type: 'LOGIN_SUCCESS';
      payload: any;
    }
  | { type: 'LOGOUT'; user: string }
  | { type: 'LOGIN_ERROR'; loading: boolean; error: any };

// 위 타입 전용 디스패치
export type LoginDispatch = Dispatch<LoginAction>;

export const AuthReducer = (initialState: IState, action: LoginAction) => {
  switch (action.type) {
    case 'REQUEST_LOGIN':
      return {
        ...initialState,
        loading: true,
      };
    case 'LOGIN_SUCCESS':
      // context InitialState와 같은 구조
      return {
        ...initialState,
        user: {
          userName: action.payload.userName,
          userId: action.payload.userId,
        },
        token: action.payload.id,
        loading: false,
      };
    case 'LOGOUT':
      return {
        ...initialState,
        user: null,
        token: null,
      };
    case 'LOGIN_ERROR':
      return {
        ...initialState,
        loading: false,
        errorMsg: action.error,
      };
    default:
      return {
        ...initialState,
      };
    // throw new Error(`액션 타입 이건 뭔가요: ${action}`);
  }
};
