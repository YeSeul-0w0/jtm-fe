import { SignUpEmailInter } from '@src/interfaces/ISignUp';
import React from 'react';
import { MoveBtn } from '../common/MoveBtn';
import { TextInput } from '../common/TextInput';
import { emailVerify } from './SignUpFunction';
import { double, email, enterVerifyNum, veriftNum } from './signUpStore';

const SignUpEmail = ({ dispatch, emailState }: SignUpEmailInter) => {
  return (
    <>
      <div className="emailWrap">
        <TextInput
          title={'이메일을 입력해주세요'}
          htmlFor={'email'}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            dispatch(email(e.target.value));
            dispatch(veriftNum('새 메일을 받아주세요'));
            dispatch(double(false));
          }}
        />
      </div>
      <div>
        <TextInput
          title={'인증번호를 입력해주세요'}
          htmlFor={'email'}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            dispatch(enterVerifyNum(e.target.value))
          }
        />
        <MoveBtn
          onClick={e => emailVerify(e, emailState, dispatch, double, veriftNum)}
          text="인증메일 재발송하기"
        />
      </div>
    </>
  );
};

export default SignUpEmail;
