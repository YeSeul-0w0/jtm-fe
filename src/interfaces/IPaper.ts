export interface IPaper {
  createDate: string;
  giftyn: string;
  paperId: string;
  paperTitle: string;
  skin: number;
  messageCount: number;
  messages: IMessage[];
}

export interface IMessage {
  messageId: string;
  content: string;
  userName: string;
  color?: string;
  onClick: any;
}
