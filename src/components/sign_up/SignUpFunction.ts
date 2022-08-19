import { FirstVerify, SecondVerify } from '@src/interfaces/ISignUp';
import axios, { AxiosResponse } from 'axios';
import EnvConfig from '../../config/EnvConfig';
import { nicknamePass } from './signUpStore';

const verify = ({
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
}: FirstVerify) => {
  if (
    emailTest.test(emailState) &&
    enterVerifyState === verifyState &&
    doubleState &&
    nickNameTest.test(nicknameState) &&
    passwordTest.test(passwordState) &&
    rePassword === passwordState
  )
    return true;
  else return false;
};

export const passVerify = async (
  e: React.FormEvent<HTMLFormElement>,
  {
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
  }: SecondVerify
): Promise<void> => {
  e.preventDefault();
  if (
    verify({
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
    })
  ) {
    try {
      await axios({
        method: 'post',
        url: EnvConfig.USER_DATA,
        data: {
          email: emailState,
          password: passwordState,
          userName: nicknameState,
        },
      })
        .then(function (response) {
          if (response.status === 200) {
            alert('회원가입이 완료되었습니다');
            nav('/');
          }
        })
        .catch(function (error) {
          alert('닉네임이 중복됐습니다');
        });
    } catch (e) {
      throw new Error('회원가입에 실패했습니다');
    }
    // return
  } else {
    alert('입력 정보를 확인해주세요');
  }
};

export const emailVerify = async (
  event: any,
  emailState: string,
  dispatch: React.Dispatch<any>,
  double: any,
  veriftNum: any
): Promise<void> => {
  event.preventDefault();
  try {
    const getDouble: AxiosResponse<object[]> = await axios({
      url: EnvConfig.DOUBLE_CHECK,
      method: 'get',
      params: {
        email: emailState,
      },
    });
    if (getDouble) {
      dispatch(double(true));
      const codeSend = await axios({
        method: 'get',
        url: EnvConfig.VERIFY_MAIL,
        params: {
          email: emailState,
        },
      });
      dispatch(veriftNum(codeSend.data));
      alert('인증번호가 발송됐습니다');
    }
  } catch (e) {
    dispatch(double(false));
    alert('이미 가입되어 있거나 양식이 틀린 메일입니다.');
  }
};

export const gauge = (scrollRef: any) => {
  // 이거 길이 계산
  window.addEventListener('scroll', () => {
    scrollRef.style.width = '150px';
  });
};
