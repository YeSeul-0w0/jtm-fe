import { SignUpEmailInter } from '@src/interfaces/ISignUp';
import React, { useState } from 'react';
import BottomBtn from '../common/BottomBtn';
import { TextInput } from '../common/TextInput';
import { emailVerify, whoWrong } from './SignUpFunction';
import { enterVerifyNum, veriftNum } from './signUpStore';
import SignUpTextInput from './SignUpTextInput';

const SignUpEmail = ({
  dispatch,
  emailCheck,
  emailSave,
  setEmailSave,
  verifyState,
  enterVerifyState,
}: SignUpEmailInter) => {
  const [re, setRe] = useState<boolean>(false);
  const [verifySave, setVerifySave] = useState<string>();
  const addF = () => {
    dispatch(veriftNum('새 메일을 받아주세요'));
    dispatch(enterVerifyNum(false));
  };
  return (
    <>
      <div className="emailWrap">
        <SignUpTextInput
          title={'이메일'}
          htmlFor={'email'}
          addFunction={addF}
          suc={emailCheck}
          saveData={setEmailSave}
        />
        <BottomBtn
          text={re ? '다시 전송하기' : '인증번호 받기'}
          onclick={(e: any) => {
            if (!re) setRe(true);
            e.preventDefault();
            alert('잠시만 기다려주세요');
            emailVerify(emailSave, dispatch, veriftNum);
          }}
        />
      </div>
      <div className={enterVerifyState ? `emailWrap verify` : `emailWrap`}>
        <TextInput
          title={'인증번호'}
          htmlFor={'email'}
          onChange={(e: any) => setVerifySave(e.target.value)}
        />
        <BottomBtn
          text={enterVerifyState ? '인증되었습니다' : '확인'}
          disabled={enterVerifyState ? true : false}
          onclick={async (e: any) => {
            e.preventDefault();
            dispatch(
              enterVerifyNum(
                await whoWrong('인증번호', verifyState, verifySave)
              )
            );
          }}
        />
      </div>
    </>
  );
};

export default SignUpEmail;
