import { emailTest, nickNameTest, passwordTest } from 'src/config/RegExp';
import { FirstVerify, SecondVerify } from 'src/interfaces/ISignUp';
import axios, { AxiosResponse } from 'axios';
import EnvConfig from '../../config/EnvConfig';
// import { nicknamePass } from './signUpStore';

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

// const verfiCheck = (data: string) => {
// return data === verifyState
// }

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
  else if (emailTest.test(emailState) === false) {
    alert('이메일 양식이 틀렸습니다');
    return false;
  } else if ((enterVerifyState === verifyState) === false) {
    alert('인증번호가 틀렸습니다');
    return false;
  } else if (doubleState === false) {
    alert('이미 가입되어 있거나 양식이 틀린 메일입니다');
    return false;
  } else if (nickNameTest.test(nicknameState) === false) {
    alert('닉네임 양식이 틀렸습니다');
    return false;
  } else if (passwordTest.test(passwordState) === false) {
    alert('비밀번호 양식이 틀렸습니다');
    return false;
  } else if ((rePassword === passwordState) === false) {
    alert('비밀번호가 일치하지 않습니다');
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
  // return
};
// else {
//   alert('입력 정보를 확인해주세요');
// }

export const emailVerify = async (
  // event: any,
  emailState: string,
  dispatch: React.Dispatch<any>,
  veriftNum: any
): Promise<void> => {
  // event.preventDefault();
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
    // =======
    //     if (getDouble) {
    //       dispatch(double(true));
    //       const codeSend = await axios({
    //         method: 'get',
    //         url: EnvConfig.VERIFY_MAIL,
    //         params: {
    //           email: emailState,
    //         },
    //       });
    //       dispatch(veriftNum(codeSend.data));
    //       alert('인증번호가 발송되었습니다');
    //     }
    // >>>>>>> main
  } catch (e) {
    alert('인증번호 발송을 실패했습니다');
  }
};

// export const gauge = (scrollRef: any) => {
//   // 이거 길이 계산
//   const wrap = scrollRef.parentElement.parentElement;
//   const scrollTop = wrap.scrollTop;
//   const fullH = wrap.children[0].getBoundingClientRect().height;
//   wrap.addEventListener('scroll', () => {
//     // scrollRef.style.width = '150px';
//     // console.log(fullH - scrollTop);
//     const bodyHeight = wrap.offsetHeight;
//     const scrollable = bodyHeight - window.innerHeight;
//     // var progressEl = document.querySelector('.progress');
//     const per = Math.floor((window.scrollY / scrollable) * 100) + '%';
//     scrollRef.style.width = per;
//   });
// };
