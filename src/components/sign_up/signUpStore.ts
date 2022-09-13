import { ISignUpState } from '@src/interfaces/ISignUp';

const EMAIL = 'signUpStore/EMAIL';
const ENTERVERIFYSTATE = 'signUpStore/ENTERVERIFYSTATE';
const NICKNAME = 'signUpStore/NICKNAME';
const PASSWORD = 'signUpStore/PASSWORD';
// const DOUBLE = 'signUpStore/DOUBLE';
// const NICKNAMEPASS = 'signUpStore/NICKNAMEPASS';

export const email = (email: boolean) => ({ type: EMAIL, email });
export const enterVerifyNum = (enterVerifyState: boolean) => ({
  type: ENTERVERIFYSTATE,
  enterVerifyState,
});
export const nickname = (nicknameState: boolean) => ({
  type: NICKNAME,
  nicknameState,
});
export const password = (passwordState: boolean) => ({
  type: PASSWORD,
  passwordState,
});
// export const double = (doubleState: boolean) => ({ type: DOUBLE, doubleState });
// export const nicknamePass = (pass: boolean) => ({ type: NICKNAMEPASS, pass });

export const initialState = {
  emailState: false,
  enterVerifyState: false,
  nicknameState: false,
  passwordState: false,
  // doubleState: false,
  // nicknamePass: false,
};

export const reducer = (state: ISignUpState = initialState, action: any) => {
  switch (action.type) {
    case EMAIL:
      return {
        ...state,
        emailState: action.email,
      };
    case ENTERVERIFYSTATE:
      return {
        ...state,
        enterVerifyState: action.enterVerifyState,
      };
    case NICKNAME:
      return {
        ...state,
        nicknameState: action.nicknameState,
      };
    case PASSWORD:
      return {
        ...state,
        passwordState: action.passwordState,
      };
    // case DOUBLE:
    //   return {
    //     ...state,
    //     doubleState: action.doubleState,
    //   };
    // case NICKNAMEPASS:
    //   return {
    //     ...state,
    //     nicknamePass: true,
    //   };
    default:
      return state;
  }
};
