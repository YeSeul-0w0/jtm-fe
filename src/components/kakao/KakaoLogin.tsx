import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import qs from 'qs';
import axios from 'axios'; // URL 쿼리 읽어주는 것
import EnvConfig from '../../config/EnvConfig';
import { kakaoLoginUser } from '../../context/action';
import { useAuthDispatch } from '../../context';
import { Base64 } from 'js-base64';

interface PropsType {
  api: string;
  client: string;
}

function KakaoLogin(props: PropsType): null {
  const dispatch = useAuthDispatch();
  const KAKAO_API_KEY: string = props.api;
  // local 이용 : REDIRECT_URI_LOCAL
  // 도메인 이용 : KAKAO_REDIRECT_URI
  const REDIRECT_URI = EnvConfig.KAKAO_REDIRECT_URI;
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
    const kakaoTokenResp = await axios.post(
      'https://kauth.kakao.com/oauth/token',
      payload
    );
    Kakao.init(KAKAO_API_KEY);
    Kakao.Auth.setAccessToken(kakaoTokenResp.data.access_token);
    const decode = Base64.decode(kakaoTokenResp.data.id_token);
    const splitId = decode.split(',')[0].split(':')[1];
    const id = splitId.substring(1, splitId.length - 1);
    try {
      const responseData = await kakaoLoginUser(dispatch, id);
      if (!responseData?.userId) {
        alert('아이디 또는 비밀번호가 존재하지 않거나 맞지 않습니다.');
        window.location.href = '/';
        return;
      }
    } catch (err) {
      alert('카카오 로그인이 불가능합니다. 관리자에게 문의하십시오.');
      window.location.href = '/';
    }
    // 로그인 완료 시 메인으로 이동
    nv('../main', { replace: true });
  }
  useEffect(() => {
    getToken();
  }, []);
  return null;
}

export default KakaoLogin;
