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
  initialState,
  nickname,
  password,
  reducer,
  veriftNum,
} from './signUpStore';
import Header from '../layout/Header';

const SignUp = () => {
  // 인증번호 받고 나서 회원가입 버튼 누르기 전에 이메일이 바뀌었을 때도 감지해야 함
  const [state, dispatch] = useReducer(reducer, initialState);
  const [rePassword, setRePassword] = useState<string>('');
  const scrollRef = useRef<any>();
  const nav = useNavigate();

  const doubleState = state.doubleState;
  const emailState = state.emailState;
  const nicknameState = state.nicknameState;
  const passwordState = state.passwordState;
  const enterVerifyState = state.enterVerifyState;
  const verifyState = state.verifyState;

  useEffect(() => {
    // gauge(scrollRef.current);
    // console.log(scrollRef.current);
  }, []);

  return (
    <>
      <div className="signWrap">
        <Header pageNm="회원가입" to="/login" />
        <div className="bar" ref={scrollRef}></div>
        {/* <div className="top">
          <p>회원가입</p>
        </div> */}
        <form id="signUp">
          <SignUpEmail emailState={emailState} dispatch={dispatch} />
          <div className="nickNameWrap">
            <TextInput
              title={'닉네임'}
              htmlFor={'nickName'}
              des="2~8글자, 특수문자 제외"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                dispatch(nickname(e.target.value))
              }
            />
          </div>
          <div className="passwordWrap">
            <TextInput
              autocomplete="off"
              isPassword={true}
              title={'비밀번호'}
              htmlFor={'password'}
              des="8~15글자, 특수문자 포함"
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
        <BottomBtn
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
        />
      </div>
    </>
  );
};

export default SignUp;
