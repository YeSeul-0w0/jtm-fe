import React, { useState, useReducer, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomBtn from '../common/BottomBtn';
import './signUp.scss';
import SignUpEmail from './SignUpEmail';

import { passVerify } from './SignUpFunction';
import {
  email,
  initialState,
  nickname,
  password,
  reducer,
} from './signUpStore';
import Header from '../layout/Header';
import SignUpTextInput from './SignUpTextInput';

const SignUp = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [emailSave, setEmailSave] = useState<string>('');
  const [PasswordSave, setPasswordSave] = useState<string>('');
  const [nicknameSave, setNicknameSave] = useState<string>('');
  const scrollRef = useRef<any>();
  const nav = useNavigate();

  const emailState = state.emailState;
  const nicknameState = state.nicknameState;
  const passwordState = state.passwordState;
  const enterVerifyState = state.enterVerifyState;

  const emailCheck = (suc: boolean) => {
    dispatch(email(suc));
  };
  const nick = (suc: boolean) => {
    dispatch(nickname(suc));
  };
  const paw = (suc: boolean) => {
    dispatch(password(suc));
  };

  document.addEventListener(
    'keydown',
    function (event) {
      if (event.key === 'Enter') {
        event.preventDefault();
      }
    },
    true
  );

  return (
    <>
      <main className="signWrap" ref={scrollRef}>
        <Header pageNm="회원가입" to="/login" />
        <div className="bar"></div>
        <form id="signUp" onSubmit={e => preventDetault(e)}>
          <SignUpEmail
            emailCheck={emailCheck}
            emailState={emailState}
            dispatch={dispatch}
            emailSave={emailSave}
            setEmailSave={setEmailSave}
            enterVerifyState={enterVerifyState}
          />
          <div className="nickNameWrap">
            <SignUpTextInput
              title={'닉네임'}
              htmlFor={'nickName'}
              des="총 2~8글자"
              suc={nick}
              saveData={setNicknameSave}
            />
          </div>
          <div className="passwordWrap">
            <SignUpTextInput
              title={'비밀번호'}
              htmlFor={'password'}
              des="총 8~15글자, 특수문자 포함"
              saveData={setPasswordSave}
            />
          </div>
          <div className="rePasswordWrap">
            <SignUpTextInput
              title={'비밀번호 확인'}
              htmlFor={'rePassword'}
              compare={PasswordSave}
              suc={paw}
            />
          </div>
          <BottomBtn
            tabIndex={-1}
            text="회원가입 완료하기"
            onclick={(e: any) => {
              e.preventDefault();
              if (
                emailState &&
                enterVerifyState &&
                nicknameState &&
                passwordState
              )
                passVerify({ emailSave, nicknameSave, PasswordSave, nav });
              else alert('입력 양식을 확인해주세요');
            }}
          />
        </form>
      </main>
    </>
  );
};

export default SignUp;
function preventDetault(e: React.FormEvent<HTMLFormElement>): void {
  throw new Error('Function not implemented.');
}
