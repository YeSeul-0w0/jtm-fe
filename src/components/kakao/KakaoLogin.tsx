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
  // localhost에서 사용시
  // const REDIRECT_URI = 'http://localhost/oauth/kakao/callback'
  const REDIRECT_URI = 'http://byeolmal.today/oauth/kakao/callback';
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
      ); // res => object
      Kakao.init(KAKAO_API_KEY);
      Kakao.Auth.setAccessToken(res.data.access_token);
      try {
        await axios({
          method: 'post',
          url: `${ROOT_URL}login`,
          data: {
            idToken: res.data.id_token,
          },
        });
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
