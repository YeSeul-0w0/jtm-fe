import { emailTest, nickNameTest, passwordTest } from 'src/config/RegExp';
import { FirstVerify, SecondVerify } from 'src/interfaces/ISignUp';
import axios, { AxiosResponse } from 'axios';
import EnvConfig from '../../config/EnvConfig';

const nickCheck = async (data: string) => {
  try {
    const a = await axios({
      method: 'get',
      url: EnvConfig.NICK_CHECK,
      params: {
        userName: data,
      },
    });
    return true;
  } catch (e) {
    return false;
  }
};

const emailCheck = async (data: string) => {
  try {
    const a = await axios({
      method: 'get',
      url: EnvConfig.DOUBLE_CHECK,
      params: {
        email: data,
      },
    });
    return true;
  } catch (e) {
    return false;
  }
};

export const whoWrong = async (title: string, data: string, data2?: string) => {
  switch (title) {
    case '이메일':
      return emailTest.test(data) && (await emailCheck(data));
    case '닉네임':
      return nickNameTest.test(data) && (await nickCheck(data));
    case '인증번호':
      if (data === data2) return data === data2;
      else {
        alert('인증번호가 틀렸습니다');
        return data === data2;
      }
    case '비밀번호':
      return passwordTest.test(data);
    case '비밀번호 확인':
      return data === data2;
    default:
      return false;
  }
};

export const passVerify = async ({
  emailSave,
  nicknameSave,
  PasswordSave,
  nav,
}: SecondVerify): Promise<void> => {
  try {
    await axios({
      method: 'post',
      url: EnvConfig.USER_DATA,
      data: {
        email: emailSave,
        password: PasswordSave,
        userName: nicknameSave,
      },
    }).then(function (response) {
      if (response.status === 200) {
        alert('회원가입이 완료되었습니다');
        nav('/');
      }
    });
  } catch (e) {
    console.log(e);
    throw new Error('회원가입에 실패했습니다');
  }
};

export const emailVerify = async (
  emailState: string,
  dispatch: React.Dispatch<any>,
  veriftNum: any
): Promise<void> => {
  try {
    const codeSend = await axios({
      method: 'get',
      url: EnvConfig.VERIFY_MAIL,
      params: {
        email: emailState,
      },
    });
    dispatch(veriftNum(codeSend.data));
    alert('인증번호가 발송됐습니다');
  } catch (e) {
    alert('인증번호 발송을 실패했습니다');
  }
};
