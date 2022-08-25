export interface IUser {
  userName: string;
  userId: string;
}

// 로그인 상태 인터페이스
export interface IState {
  user: IUser | null; // 로그인된 경우 IUser, 로그인 안된 경우 ''로 string
  token: string | null;
  loading: boolean;
  errorMsg: string | null;
}
