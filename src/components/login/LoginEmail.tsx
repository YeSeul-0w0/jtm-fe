import { loginUser, useAuthDispatch, useAuthState } from '../../context';
import React, { useEffect, useState } from 'react';

import CustomBottomButton from '../common/BottomBtn';
import Header from '../layout/Header';
import LoginForm from './LoginForm';
import { isEmail } from './Validation';
import { useNavigate } from 'react-router-dom';

const LoginEmail = () => {
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });
  const { email, password } = inputs;
  const [isValidated, setValidation] = useState<boolean>(false);

  const { user, loading } = useAuthState(); // initialState 안의 것을 구조 분해 할당
  const dispatch = useAuthDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // 또는 설정으로 리디렉션
    if (user?.email) navigate('/createPaper');
  }, []);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isValidated) {
      try {
        const responseData = await loginUser(dispatch, inputs);
        // 이거 userName 나중에 token으로 바꿔야함
        if (!responseData?.userName) {
          alert('아이디 또는 비밀번호를 다시 확인해주세요.');
          return;
        }
      } catch (e) {
        console.error(e);
      }
      // 로그인 완료 시 메인으로 이동
      navigate('../createPaper', { replace: true });
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValidation(isEmail(email));
    setInputs(inputs => ({
      ...inputs,
      [name]: value,
    }));
  };

  return (
    <>
      <Header pageNm="로그인" to="/" />
      <LoginForm
        onChange={onChange}
        email={email}
        password={password}
        disabled={loading}
        autocomplete="on"
      />
      <CustomBottomButton
        text="로그인하기"
        onclick={handleLogin}
        disabled={!isValidated}
      />
    </>
  );
};

// 메모!
export default LoginEmail;
