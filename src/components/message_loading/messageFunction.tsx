import EnvConfig from 'src/config/EnvConfig';
import axios from 'axios';
import { message, paper, reaction, sticker } from './messageStore';

export const paperDetail = async (
  userId: string,
  paperId: string,
  dispatch: any,
  me: any,
  st: any,
  pa: any,
  re: any
) => {
  try {
    if (userId) {
      const a = await axios({
        method: 'post',
        url: `${EnvConfig.LANTO_SERVER}paper/${paperId}`,
        data: {
          user: {
            userId: userId,
          },
        },
      });
      // console.log(a.data);
      if (
        a.data.messages.toString() !== me.toString() ||
        a.data.stickers.toString() !== st.toString() ||
        a.data.papers.toString() !== pa.toString() ||
        a.data.reactions.toString() !== re.toString()
      ) {
        dispatch(message(a.data.messages));
        dispatch(sticker(a.data.stickers));
        dispatch(paper(a.data.papers));
        dispatch(reaction(a.data.reactions));
      }
    } else {
      const a = await axios({
        method: 'get',
        url: `${EnvConfig.LANTO_SERVER}paper/${paperId}`,
      });
      if (
        a.data.messages.toString() !== me.toString() ||
        a.data.stickers.toString() !== st.toString() ||
        a.data.papers.toString() !== pa.toString() ||
        a.data.reactions.toString() !== re.toString()
      ) {
        dispatch(message(a.data.messages));
        dispatch(sticker(a.data.stickers));
        dispatch(paper(a.data.papers));
        dispatch(reaction(a.data.reactions));
      }
    }
  } catch (e) {
    throw new Error('페이퍼 목록 불러오기에 실패했습니다');
  }
};

export const messageRe = async (email: string, paperId: any, dispatch: any) => {
  try {
    const a = await axios({
      method: 'get',
      url: `${EnvConfig.LANTO_SERVER}message`,
      // url: `${EnvConfig.LANTO_SERVER}paper/${paperId}`,
      headers: {
        ['User-Id']: email,
      },
    });
    dispatch(message(a.data.messages));
    // a.data.filter((item: any) => console.log(item.paperId));
  } catch (e) {
    throw new Error('메세지 로딩에 실패했습니다');
  }
};

export const messagePost = async (
  userId: string,
  content: any,
  font: any,
  color: any,
  paperId: string
) => {
  try {
    if (color) {
      const a = await axios({
        method: 'post',
        url: `${EnvConfig.LANTO_SERVER}message`,
        data: {
          user: {
            userId: userId,
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
      if (a) {
        alert('메세지가 작성되었습니다');
        location.reload();
      }
    } else {
      alert('색을 골라주세요');
    }
  } catch (e) {
    alert('메세지 작성에 실패했습니다');
    throw new Error('메세지 작성에 실패했습니다');
  }
};

export const messageDelete = async (userId: string, messageId: string) => {
  try {
    const a = await axios({
      url: `${EnvConfig.LANTO_SERVER}message/${messageId}`,
      method: 'delete',
      data: {
        user: {
          userId: userId,
        },
      },
    });
    if (a) {
      alert('메세지가 삭제되었습니다');
      location.reload();
    }
  } catch (e) {
    alert('메세지 삭제를 실패했습니다');
    throw new Error('메세지 삭제를 실패했습니다');
  }
};

export const messageFix = async (
  userId: string,
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
          userId: userId,
        },
        message: {
          content: text,
          font: '굴림',
          color: fixColor,
        },
      },
    });
    if (a) {
      alert('메세지가 수정되었습니다');
      location.reload();
    }
  } catch (e) {
    alert('메세지 수정에 실패했습니다');
    throw new Error('메세지 수정에 실패했습니다');
  }
};

export const stickerPost = async (
  userId: string,
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
          userId: userId,
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
    if (q) {
      alert('스티커 작성이 완료되었습니다');
      location.reload();
    }
  } catch (e) {
    alert('스티커를 이미 작성했거나 오류로 인해 작성에 실패했습니다');
    throw new Error('스티커 작성에 실패했습니다');
  }
};

export const stickerDelete = async (
  stickerId: any,
  userId: any,
  paperId: any
) => {
  try {
    const q = await axios({
      method: 'delete',
      url: `${EnvConfig.LANTO_SERVER}sticker/${stickerId}`,
      data: {
        user: {
          userId: userId,
        },
        paper: {
          paperId: paperId,
        },
      },
    });
    if (q) {
      alert('스티커 삭제가 완료되었습니다');
      location.reload();
    }
  } catch (e) {
    alert('오류로 인해 스티커 삭제에 실패했습니다');
    throw new Error('스티커 삭제에 실패했습니다');
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
    alert('리액션 목록 불러오기에 실패했습니다');
    throw new Error('리액션 목록 불러오기에 실패했습니다');
  }
};

export const reactionAdd = async (userId: string, messageId: number) => {
  try {
    const reactionTouch = await axios({
      url: `${EnvConfig.LANTO_SERVER}reaction`,
      method: 'post',
      data: {
        message: {
          messageId: messageId,
        },
        user: {
          userId: userId,
        },
        reaction: {
          emoji: '❤',
        },
      },
    });
  } catch (e) {
    alert('리액션 추가를 실패했습니다');
    throw new Error('리액션 추가를 실패했습니다');
  }
};

export const reactionMinus = async (
  userId: string,
  messageId: number,
  reactionId: any
) => {
  try {
    const reactionTouch = await axios({
      url: `${EnvConfig.LANTO_SERVER}reaction/${reactionId}`,
      method: 'delete',
      data: {
        message: {
          messageId: messageId,
        },
        user: {
          userId: userId,
        },
      },
    });
  } catch (e) {
    alert('리액션 제거를 실패했습니다');
    throw new Error('리액션 제거를 실패했습니다');
  }
};
