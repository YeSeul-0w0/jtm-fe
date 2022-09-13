import { SignUpEmailInter } from '@src/interfaces/ISignUp';
import React, { useState } from 'react';
import BottomBtn from '../common/BottomBtn';
import { TextInput } from '../common/TextInput';
import { emailVerify, emailVerifyCheck } from './SignUpFunction';
import { enterVerifyNum } from './signUpStore';
import SignUpTextInput from './SignUpTextInput';

const SignUpEmail = ({
  dispatch,
  emailCheck,
  emailSave,
  setEmailSave,
  enterVerifyState,
}: SignUpEmailInter) => {
  const [re, setRe] = useState<boolean>(false);
  const [emailPass, setEmailPass] = useState<boolean>(false);
  const [verifySave, setVerifySave] = useState<string>();
  const addF = () => {
    dispatch(enterVerifyNum(false));
    setEmailPass(false);
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
          setEmailPass={setEmailPass}
        />
        <BottomBtn
          tabIndex={-1}
          text={re ? '다시 전송하기' : '인증번호 받기'}
          onclick={(e: any) => {
            e.preventDefault();
            if (!re) setRe(true);
            if (emailPass) {
              alert('잠시만 기다려주세요');
              emailVerify(emailSave);
            } else alert('중복된 이메일입니다');
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
          tabIndex={-1}
          text={enterVerifyState ? '인증되었습니다' : '확인'}
          disabled={enterVerifyState ? true : false}
          onclick={async (e: any) => {
            e.preventDefault();
            dispatch(
              enterVerifyNum(await emailVerifyCheck(emailSave, verifySave!))
            );
          }}
        />
      </div>
    </>
  );
};

export default SignUpEmail;
