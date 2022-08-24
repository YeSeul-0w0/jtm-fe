import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import qs from 'qs';
import axios from 'axios'; // URL 쿼리 읽어주는 것
import EnvConfig from '../../config/EnvConfig';

interface PropsType {
  api: string;
  client: string;
}

function KakaoLogin(props: PropsType): null {
  const KAKAO_API_KEY: string = props.api;
  // local 이용 : REDIRECT_URI_LOCAL
  // 도메인 이용 : KAKAO_REDIRECT_URI
  const REDIRECT_URI = EnvConfig.REDIRECT_URI_LOCAL;
  const CLIENT_SECRET: string = props.client;
  const code: string =
    new URL(window.location.href).searchParams.get('code') || '';
  const nv: any = useNavigate();
  const Kakao = (window as any).Kakao;
  const ROOT_URL = EnvConfig.LANTO_SERVER;

  async function getToken() {
    const payload: string = qs.stringify({
      grant_type: 'authorization_code',
      client_id: KAKAO_API_KEY,
      redirect_uri: REDIRECT_URI,
      code: code,
      client_secret: CLIENT_SECRET,
    });

    try {
      const res: any = await axios.post(
        'https://kauth.kakao.com/oauth/token',
        payload
      );
      // res > 카카오가 제공하는 서버에서 카카오 로그인 시 유저의 교유값 불러옴
      Kakao.init(KAKAO_API_KEY);
      Kakao.Auth.setAccessToken(res.data.access_token);
      try {
        const sendRequest: any = await axios({
          method: 'post',
          url: `${ROOT_URL}login`,
          data: {
            idToken: res.data.id_token,
          },
        });
        // sendRequest 성공하면 return 값으로 userIdd와 UserName을 backend 에서 받아옴
        localStorage.setItem('currentUser', JSON.stringify(sendRequest.data));
        // 성공 시 create paper로 이동
        nv('/createPaper');
      } catch (err) {
        nv('/');
      }
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    getToken();
  }, []);
  return null;
}

export default KakaoLogin;
