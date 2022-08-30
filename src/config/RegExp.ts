export const nickNameTest = /^[a-zA-Z0-9가-힣]{2,8}$/;
export const emailTest =
  /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
export const passwordTest =
  // eslint-disable-next-line no-useless-escape
  /^(?=.*?[`~#?!@$%^&*-])[a-zA-Z\\d`~!@#$%^&*()-_=+]{8,15}$/;
// ^[a-zA-Z\\d`~!@#$%^&*()-_=+]{8,24}$
