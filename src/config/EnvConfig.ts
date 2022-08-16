type EnvType = {
  KAKAO_API: string;
  CLIENT_SECRET: string;
  USER_DATA: string;
  VERIFY_MAIL: string;
  DOUBLE_CHECK: string;
  NICK_CHECK: string;
  CREATE_PAPER: string;
  LANTO_SERVER: string;
  KAKAO_REDIRECT_URI: string;
  REDIRECT_URI_LOCAL: string;
};

const EnvConfig: EnvType = {
  KAKAO_API: process.env.REACT_APP_KAKAO_API || '',
  CLIENT_SECRET: process.env.REACT_APP_CLIENT_SECRET || '',
  USER_DATA: process.env.REACT_APP_USER_DATA || '',
  VERIFY_MAIL: process.env.REACT_APP_VERIFY_MAIL || '',
  DOUBLE_CHECK: process.env.REACT_APP_DOUBLE_CHECK || '',
  NICK_CHECK: process.env.REACT_APP_NICKNAME_CHECK || '',
  CREATE_PAPER: process.env.REACT_APP_CREATE_PAPER || '',
  LANTO_SERVER: process.env.REACT_APP_LANTO_SERVER || '',
  KAKAO_REDIRECT_URI: process.env.REACT_APP_KAKAO_REDIRECT_URI || '',
  REDIRECT_URI_LOCAL: process.env.REACT_APP_KAKAO_REDIRECT_URI_LOCAL || '',
};

export default EnvConfig;
