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
  double,
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
  const [rePassword, setRePassword] = useState<string>('');
  const [emailSave, setEmailSave] = useState<string>('');
  const scrollRef = useRef<any>();
  const nav = useNavigate();

  const doubleState = state.doubleState;
  const emailState = state.emailState;
  const nicknameState = state.nicknameState;
  const passwordState = state.passwordState;
  const enterVerifyState = state.enterVerifyState;
  const verifyState = state.verifyState;

  // 이메일, 패스워드, 유저네임 저장해야함
  // 이메일 저장 완

  const emailSaveFunc = (data: string) => {
    setEmailSave(data);
  };

  const emailCheck = (suc: boolean) => {
    dispatch(email(suc));
  };
  const nick = (suc: boolean) => {
    dispatch(nickname(suc));
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
            setEmailSave={setEmailSave}
          />
          <div className="nickNameWrap">
            <SignUpTextInput
              title={'닉네임'}
              htmlFor={'nickName'}
              des="총 2~8글자"
              suc={nick}
            />
          </div>
          {/* 지금 인피니트 루프 문제 나옴 */}
          <div className="passwordWrap">
            <TextInput
              autocomplete="off"
              isPassword={true}
              title={'비밀번호'}
              htmlFor={'password'}
              des="총 8~15글자, 특수문자 포함"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                dispatch(password(e.target.value))
              }
            />
          </div>
          <div className="rePasswordWrap">
            <TextInput
              autocomplete="off"
              isPassword={true}
              title={'비밀번호 확인'}
              htmlFor={'rePassword'}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setRePassword(e.target.value)
              }
            />
          </div>
        </form>
        {/* <BottomBtn
          text={doubleState ? '다음' : '인증메일 받기'}
          onclick={(e: any) =>
            doubleState
              ? passVerify(e, {
                  emailTest,
                  emailState,
                  enterVerifyState,
                  verifyState,
                  doubleState,
                  nickNameTest,
                  nicknameState,
                  passwordTest,
                  passwordState,
                  rePassword,
                  nav,
                })
              : emailVerify(e, emailState, dispatch, double, veriftNum)
          }
        /> */}
      </div>
    </>
  );
};

export default SignUp;
