import EnvConfig from 'src/config/EnvConfig';
import axios from 'axios';
import { message, paper, reaction, sticker } from './messageStore';

export const paperDetail = async (
  email: string,
  paperId: string,
  dispatch: any
) => {
  try {
    const a = await axios({
      method: 'post',
      url: `${EnvConfig.LANTO_SERVER}paper/${paperId}`,
      // url: `${EnvConfig.LANTO_SERVER}paper/${paperId}`,
      data: {
        user: {
          email: email,
        },
      },
    });
    dispatch(message(a.data.messages));
    dispatch(sticker(a.data.stickers));
    dispatch(paper(a.data.papers));
    dispatch(reaction(a.data.reactions));
    console.log(a.data);
  } catch (e) {
    console.log(e);
  }
};

// export const messageGet = async (
//   dispatch: React.Dispatch<any>,
//   message: any
// ) => {
//   try {
//     const a = await axios(`${EnvConfig.LANTO_SERVER}message`, {
//       method: 'get',
//       headers: {
//         ['User-Email']: 'jam@gmail.com',
//       },
//     });
//     dispatch(message(a.data.messages));
//     console.log(a);
//   } catch (e) {
//     console.log(e);
//   }
// };

export const messagePost = async (
  email: string,
  content: any,
  font: any,
  color: any,
  paperId: string
) => {
  try {
    const a = await axios({
      method: 'post',
      url: `${EnvConfig.LANTO_SERVER}message`,
      data: {
        user: {
          email: email,
        },
        paper: {
          paperId: paperId,
        },
        message: {
          content: content,
          font: font,
          color: color,
        },
      },
    });
    console.log(a);
  } catch (e) {
    console.log(e);
  }
};

export const messageDelete = async (email: string, messageId: any) => {
  try {
    const a = await axios({
      url: `${EnvConfig.LANTO_SERVER}message/${messageId}`,
      method: 'delete',
      data: {
        user: {
          email: email,
        },
      },
    });
    console.log(a);
  } catch (e) {
    console.log(e);
  }
};

export const messageFix = async (
  email: string,
  text: string,
  messageId: string,
  fixColor: string
) => {
  try {
    const a = await axios({
      method: 'put',
      url: `${EnvConfig.LANTO_SERVER}message/${messageId}`,
      data: {
        user: {
          email: email,
        },
        message: {
          content: text,
          font: '굴림',
          color: fixColor,
        },
      },
    });
    console.log(a);
    console.log('수정완료요~');
  } catch (e) {
    console.log(e);
  }
};

// export const messageFixOrDelete = async (
//   text: string,
//   messageId: string,
//   content?: string
// ) => {
//   if (text === '수정하기') {
//     console.log('수정하기기능');
//     messageFix(content!, messageId);
//   } else if (text === '삭제하기') {
//     console.log('삭제하기 기능');
//     messageDelete(messageId);
//   }
// };

export const stickerPost = async (
  email: string,
  x: number,
  y: number,
  paperId: string,
  stickerNum: number
) => {
  try {
    const q = await axios({
      method: 'post',
      url: `${EnvConfig.LANTO_SERVER}sticker`,
      data: {
        user: {
          email: email,
        },
        paper: {
          paperId: paperId,
        },
        sticker: {
          positionX: x.toString(),
          positionY: y.toString(),
          kind: stickerNum,
        },
      },
    });
    console.log(q);
  } catch (e) {
    console.log(e);
  }
};

export const reactionAmount = async (messageId: number) => {
  try {
    const a = await axios({
      url: `${EnvConfig.LANTO_SERVER}reaction/${messageId}`,
      method: 'get',
    });
    return { ...a.data };
  } catch (e) {
    console.log(e);
  }
};

export const reactionAdd = async (email: string, messageId: number) => {
  try {
    const reactionTouch = await axios({
      url: `${EnvConfig.LANTO_SERVER}reaction`,
      method: 'post',
      data: {
        message: {
          messageId: messageId,
        },
        user: {
          email: email,
        },
        reaction: {
          emoji: 'asd',
        },
      },
    });
    console.log(reactionTouch);
  } catch (e) {
    console.log(e);
  }
};

export const reactionMinus = async (
  email: string,
  messageId: number,
  reactionId: any
) => {
  try {
    const reactionTouch = await axios({
      url: `${EnvConfig.LANTO_SERVER}reaction`,
      method: 'delete',
      data: {
        message: {
          messageId: messageId,
        },
        user: {
          email: email,
        },
        reaction: {
          reactionId: reactionId,
        },
      },
    });
    console.log(reactionTouch);
  } catch (e) {
    console.log(e);
  }
};
