import React from 'react';
import styled from 'styled-components';
import { Btn } from '../common/Btn';
import Background from '../../static/main.png';
import EnvConfig from '../../config/EnvConfig';

interface PropsType {
  api: string;
}
const GoToLogin = (props: PropsType) => {
  const REST_API_KEY = props.api;
  // local 이용 : REDIRECT_URI_LOCAL
  // 도메인 이용 : KAKAO_REDIRECT_URI
  const REDIRECT_URI = EnvConfig.REDIRECT_URI_LOCAL;
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  return (
    <Container>
      <TextComponent>
        시작하실 경우,&nbsp;
        <a
          href="https://docs.google.com/document/d/1Pju15M5Cm4m2WPDvxLs5gwo4lOXBZfr20D7rCFRKi0M/edit?usp=sharing"
          target="_blank"
          style={{ textDecoration: 'underline' }}
        >
          서비스 이용약관
        </a>
        과 <br />
        <a
          href="https://docs.google.com/document/d/11sXimrdfeWhsTN1f6D0oqjpyZmVOuXBDqYUUvkibvag/edit?usp=sharing"
          target="_blank"
          style={{ textDecoration: 'underline' }}
        >
          개인정보 처리방침
        </a>
        에 동의하게 됩니다.
      </TextComponent>
      <BtnComponent>
        <Btn
          text="카카오로 시작하기"
          href={KAKAO_AUTH_URL}
          logo="kakao.png"
          background="#FAE54D"
        />
        <Btn
          text="이메일로 시작하기"
          link="/login"
          logo="mail.svg"
          background="black"
          color="white"
        />
      </BtnComponent>
    </Container>
  );
};

const Container = styled.div`
  background-image: url(${Background});
  background-size: cover;
  background-color: #fffdea;
  width: 100%;
  height: 100%;
`;

const TextComponent = styled.div`
  line-height: normal;
  text-align: center;
  margin-top: 2rem;
  font-size: 0.9rem;
  color: #333333;
`;

const BtnComponent = styled.div`
  position: absolute;
  bottom: 0;
  margin-left: 1.6rem;
  margin-bottom: 3rem;
`;

export default GoToLogin;
