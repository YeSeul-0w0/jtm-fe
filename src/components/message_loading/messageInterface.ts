export interface Loading {
  backColor: string;
  font: string;
  width: string;
  left: string;
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
}

export interface More2 extends More1 {
  setMore: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface Color {
  color: string;
}
