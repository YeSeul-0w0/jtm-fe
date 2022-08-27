import axios, { AxiosResponse } from 'axios';
import React, {
  useState,
  useReducer,
  useEffect,
  ChangeEvent,
  useRef,
} from 'react';
import { useNavigate } from 'react-router-dom';
import BottomBtn from '../common/BottomBtn';
import { TextInput } from '../common/TextInput';
import EnvConfig from '../../config/EnvConfig';
import { nickNameTest, passwordTest, emailTest } from '../../config/RegExp';
import './signUp.scss';
import SignUpEmail from './SignUpEmail';

import {
  emailVerify,
  // gauge,
  passVerify,
} from './SignUpFunction';
import {
  // double,
  email,
  initialState,
  nickname,
  password,
  reducer,
  veriftNum,
} from './signUpStore';
import Header from '../layout/Header';
import SignUpTextInput from './SignUpTextInput';

const SignUp = () => {
  // 인증번호 받고 나서 회원가입 버튼 누르기 전에 이메일이 바뀌었을 때도 감지해야 함
  const [state, dispatch] = useReducer(reducer, initialState);
  const [emailSave, setEmailSave] = useState<string>('');
  const [PasswordSave, setPasswordSave] = useState<string>('');
  const [nicknameSave, setNicknameSave] = useState<string>('');
  const scrollRef = useRef<any>();
  const nav = useNavigate();

  // const doubleState = state.doubleState;
  const emailState = state.emailState;
  const nicknameState = state.nicknameState;
  const passwordState = state.passwordState;
  const enterVerifyState = state.enterVerifyState;
  const verifyState = state.verifyState;

  // 이메일, 패스워드, 유저네임 저장해야함
  // 이메일 저장 완

  const emailCheck = (suc: boolean) => {
    dispatch(email(suc));
  };
  const nick = (suc: boolean) => {
    dispatch(nickname(suc));
  };
  const paw = (suc: boolean) => {
    dispatch(password(suc));
  };

  useEffect(() => {
    // gauge(scrollRef.current);
    // console.log(scrollRef.current);
  }, []);

  return (
    <>
      <div className="signWrap">
        <Header pageNm="회원가입" to="/login" />
        <div className="bar" ref={scrollRef}></div>
        <form id="signUp">
          <SignUpEmail
            emailCheck={emailCheck}
            emailState={emailState}
            dispatch={dispatch}
            emailSave={emailSave}
            setEmailSave={setEmailSave}
            verifyState={verifyState}
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
              // onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              //   dispatch(password(e.target.value))
              // }
            />
          </div>
          <div className="rePasswordWrap">
            <SignUpTextInput
              title={'비밀번호 확인'}
              htmlFor={'rePassword'}
              compare={PasswordSave}
              suc={paw}
              // onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              // setRePassword(e.target.value)
              // }
            />
          </div>
        </form>
        {emailState && enterVerifyState && nicknameState && passwordState && (
          <BottomBtn
            text="회원가입 완료하기"
            onclick={(e: any) => {
              e.preventDefault();
              passVerify({ emailSave, nicknameSave, PasswordSave, nav });
            }}
          />
        )}
      </div>
    </>
  );
};

export default SignUp;
