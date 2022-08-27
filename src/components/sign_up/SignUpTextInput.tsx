import React, { useEffect, useReducer, useRef, useState } from 'react';
import styled from 'styled-components';
import { TextInput } from '../common/TextInput';
import { whoWrong } from './SignUpFunction';
import { SignUpTextInputInter } from './signUpInterface';
import { initialState, nickname, reducer } from './signUpStore';

const SignUpTextInput = ({
  title,
  htmlFor,
  des,
  addFunction,
  suc,
  saveData,
  compare,
}: SignUpTextInputInter) => {
  // const [state, dispatch] = useReducer(reducer, initialState);
  // const verifyState = state.verifyState;
  const [on, setOn] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [data, setData] = useState<string>();
  const current = useRef<any>();

  const test = async () => {
    setShow(true);
    setSuccess(await whoWrong(title, data!, compare));
  };

  useEffect(() => {
    if (success) {
      suc?.(true);
    } else suc?.(false);
  }, [success]);

  useEffect(() => {
    if (data) saveData?.(data);
  }, [data]);

  return (
    <>
      <Contain onClick={() => setOn(true)} ref={current}>
        <TextInput
          autocomplete={
            title.indexOf('비밀번호') === 0 ? 'current-password' : ''
          }
          isPassword={title.indexOf('비밀번호') === 0 ? true : false}
          title={title}
          htmlFor={htmlFor}
          des={des}
          blur={test}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setData(e.target.value);
            addFunction && addFunction();
          }}
          click={on}
          // onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          //   dispatch(nickname(e.target.value))
          // }
        />
        {on && show && (
          <Icon src={success ? '/icons/success.svg' : '/icons/fail.svg'} />
        )}
      </Contain>
      {on && show && !success && <Error>입력정보를 확인해주세요</Error>}
    </>
  );
};

const Contain = styled.div`
  position: relative;
`;

const Icon = styled.img`
  width: 20px;
  height: 20px;
  position: absolute;
  bottom: 18px;
  right: 40px;
`;

const Error = styled.p`
  font-size: 12px;
  color: #ff0000;
  text-align: left;
  padding-left: 17px;
  box-sizing: border-box;
`;

export default SignUpTextInput;
