import EnvConfig from '../config/EnvConfig';
import axios from 'axios';

const ROOT_URL = EnvConfig.LANTO_SERVER;

type LoginInfoType = {
  email: string;
  password: string;
};

export const loginUser = async (dispatch: any, loginPayload: LoginInfoType) => {
  try {
    const response = await axios({
      method: 'POST',
      url: `${ROOT_URL}login`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        email: loginPayload.email,
        password: loginPayload.password,
      },
    });
    // console.log(response);
    if (response.status === 200) {
      // 프론트측에서 저장할 user 정보
      const userData = {
        // id: response.data.idToken,
        userName: response.data.userName || '',
        userId: response.data.userId,
      };
      dispatch({ type: 'LOGIN_SUCCESS', payload: userData });
      localStorage.setItem('currentUser', JSON.stringify(userData));
      return userData;
    } else {
      dispatch({ type: 'LOGIN_ERROR', error: response.data.error[0] });
    }
    return;
  } catch (e) {
    console.log(e);
    dispatch({ type: 'LOGIN_ERROR', error: e });
  }
};

export const kakaoLoginUser = async (dispatch: any, idToken: string) => {
  try {
    const response = await axios({
      method: 'post',
      url: `${ROOT_URL}login`,
      data: {
        idToken: idToken,
      },
    });

    // console.log(response);
    if (response.status === 200) {
      // 프론트측에서 저장할 user 정보
      const userData = {
        // id: response.data.idToken,
        userName: response.data.userName || '',
        userId: response.data.userId,
      };
      dispatch({ type: 'LOGIN_SUCCESS', payload: userData });
      localStorage.setItem('currentUser', JSON.stringify(userData));
      return userData;
    } else {
      dispatch({ type: 'LOGIN_ERROR', error: response.data.error[0] });
    }
    return;
  } catch (e) {
    dispatch({ type: 'LOGIN_ERROR', error: e });
  }
};

export async function logout(dispatch: any) {
  dispatch({ type: 'LOGOUT' });
  localStorage.clear();
}
