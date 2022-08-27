import { NavigateFunction } from 'react-router-dom';

export interface Base {
  email: string;
  password: string;
  nickname: string;
}

export interface User extends Base {
  veriftNum: string;
  enterVerifyNum: string;
  next: boolean;
  double: boolean;
  clickNum: number;
}

export interface ISignUpState {
  emailState: boolean;
  nicknameState: boolean;
  passwordState: boolean;
  enterVerifyState: boolean;
  verifyState: string;
}

export interface FirstVerify {
  nickNameTest: RegExp;
  nicknameState: string;
  passwordTest: RegExp;
  passwordState: string;
  rePassword: string;
  emailTest: RegExp;
  emailState: string;
  enterVerifyState: string;
  verifyState: string;
  doubleState: boolean;
}
export interface SecondVerify {
  emailSave: string;
  nicknameSave: string;
  PasswordSave: string;
  nav: NavigateFunction;
}

export type SignUpEmailInter = Pick<ISignUpState, 'emailState'> & {
  dispatch: React.Dispatch<any>;
  emailCheck: any;
  setEmailSave: any;
  emailSave: string;
  verifyState: string;
  enterVerifyState: string;
};
