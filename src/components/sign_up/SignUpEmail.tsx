import { SignUpEmailInter } from '@src/interfaces/ISignUp';
import React from 'react';
import BottomBtn from '../common/BottomBtn';
import { MoveBtn } from '../common/MoveBtn';
import { TextInput } from '../common/TextInput';
import { emailVerify } from './SignUpFunction';
import { double, email, enterVerifyNum, veriftNum } from './signUpStore';
import SignUpTextInput from './SignUpTextInput';

const SignUpEmail = ({
  dispatch,
  emailState,
  emailCheck,
  setEmailSave,
}: SignUpEmailInter) => {
  const addF = () => {
    dispatch(veriftNum('새 메일을 받아주세요'));
    dispatch(double(false));
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
          text={
            // doubleState ? '다음' :
            '인증번호 받기'
          }
          // onclick={(e: any) =>
          // emailVerify(e, emailState, dispatch, double, veriftNum)
          // }
        />
      </div>
      <div>
        <SignUpTextInput
          title={'인증번호'}
          htmlFor={'email'}
          // addFunction={(e: React.ChangeEvent<HTMLInputElement>) =>
          //   dispatch(enterVerifyNum(e.target.value))
          // }
        />
        <MoveBtn
          // onClick={e => emailVerify(e, emailState, dispatch, double, veriftNum)}
          text="인증메일 재발송하기"
        />
      </div>
    </>
  );
};

export default SignUpEmail;
