import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { TextInput } from '../common/TextInput';
import { whoWrong } from './SignUpFunction';
import { SignUpTextInputInter } from './signUpInterface';

const SignUpTextInput = ({
  title,
  htmlFor,
  des,
  addFunction,
  suc,
  saveData,
  compare,
}: SignUpTextInputInter) => {
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
        />
        {on && show && (
          <Icon src={success ? '/icons/success.svg' : '/icons/fail.svg'} />
        )}
      </Contain>
      {on && show && !success && (
        <Error>
          {title === '이메일' && '이미 가입한 메일이거나 틀린 양식이에요'}
          {title === '닉네임' && '이미 있는 닉네임이거나 틀린 양식이에요'}
          {title === '비밀번호' && '양식이 틀렸어요'}
          {title === '비밀번호 확인' && '비밀번호가 일치하지 않아요'}
        </Error>
      )}
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
