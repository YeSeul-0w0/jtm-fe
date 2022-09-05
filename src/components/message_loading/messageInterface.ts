import { IUser } from '@src/interfaces/ILogin';
import { SetStateAction } from 'react';

export interface Loading {
  backColor: string;
  font: string;
  width: string;
  left: string;
  color: string;
  z: boolean;
}

export interface Message {
  color: string;
  content: string;
  createDate: string;
  font: string;
  messageId: number;
  paperId: number;
  paperTitle: string;
  readny: string;
  userName: string;
}

export interface More1 {
  text: string[];
  messageId: number;
  prev?: string;
  paperTheme?: string;
  paperId?: string;
  prevColor?: string;
  color?: any;
}

export interface More2 extends More1 {
  setMore: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface Color {
  color: string;
  on: boolean;
}

export interface MessageLoadingInt {
  full: boolean;
  theme: string;
}

export interface MessageCompoInter {
  item: Message;
  idx: number;
  reactionAll: any;
  user: IUser;
  paperId: string;
  paperTheme: string;
  newToday: string[];
  setChange: React.Dispatch<SetStateAction<boolean>>;
}
