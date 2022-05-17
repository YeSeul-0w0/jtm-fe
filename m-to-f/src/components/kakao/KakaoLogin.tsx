import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import qs from "qs"
import axios from "axios"; // URL 쿼리 읽어주는 것

interface PropsType {
    api:string
    client:string
}

function KakaoLogin(props : PropsType) : null{
    const REST_API_KEY : string = props.api;
    const REDIRECT_URI : string = "http://localhost:3000/oauth/kakao/callback";
    const CLIENT_SECRET : string = props.client;
    const code : string = new URL(window.location.href).searchParams.get("code") || '';
    const nv : any =useNavigate();
    const Kakao = (window as any).Kakao

    async function getToken() {
        const payload : string = qs.stringify(
            {
                grant_type: "authorization_code",
                client_id: REST_API_KEY,
                redirect_uri: REDIRECT_URI,
                code: code,
                client_secret: CLIENT_SECRET,
            });
        try{
            const res : any = await  axios.post(
                "https://kauth.kakao.com/oauth/token",
                payload
            ) // res => object
            Kakao.init(REST_API_KEY);
            Kakao.Auth.setAccessToken(res.data.access_token);
            nv("/inputEmail");
        }
        catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        getToken();
    }, []);
    return null;
}

export default KakaoLogin;