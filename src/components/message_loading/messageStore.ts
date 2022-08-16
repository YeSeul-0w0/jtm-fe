const MESSAGE = 'messageStore/MESSAGE';
const STICKER = 'messageStore/STICKER';
// const CURRENTSTICKER = 'messageStore/CURRENTSTICKER';
const REACTION = 'messageStore/REACTION';
const PAPER = 'messageStore/PAPER';
const X = 'messageStore/X';
const MOVE = 'messageStore/MOVE';

export const message = (message: any) => ({ type: MESSAGE, message });
export const sticker = (sticker: any) => ({ type: STICKER, sticker });
// export const currentSticker = (currentSticker: any) => ({
//   type: CURRENTSTICKER,
//   currentSticker,
// });
export const reaction = (reaction: any) => ({ type: REACTION, reaction });
export const paper = (paper: any) => ({ type: PAPER, paper });
export const x = (x: number) => ({ type: X, x });
export const move = (move: boolean) => ({ type: MOVE, move });

export const messageInitialState = {
  message: {},
  sticker: {},
  // currentSticker: 0,
  reaction: {},
  paper: '',
  x: 0,
  move: false,
};

export const messageReducer = (state = messageInitialState, action: any) => {
  switch (action.type) {
    case MESSAGE:
      return {
        ...state,
        message: action.message,
      };
    case STICKER:
      return {
        ...state,
        sticker: action.sticker,
      };
    // case CURRENTSTICKER:
    //   return {
    //     ...state,
    //     currentSticker: action.currentSticker,
    //   };
    case REACTION:
      return {
        ...state,
        reaction: action.reaction,
      };
    case PAPER:
      return {
        ...state,
        paper: action.paper,
      };
    case X:
      return {
        ...state,
        x: action.x,
      };
    case MOVE:
      return {
        ...state,
        move: action.move,
      };
    default:
      return {
        ...state,
      };
  }
};
