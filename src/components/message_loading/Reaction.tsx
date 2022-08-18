import React, { useEffect, useReducer, useState } from 'react';
import { reactionAdd, reactionAmount, reactionMinus } from './messageFunction';
import { messageInitialState, messageReducer, reaction } from './messageStore';

const Reaction = ({ messageId, user, myReaction }: any) => {
  const [reactionAm, setReactionAm] = useState<any>(myReaction.length);
  const [click, setClick] = useState<boolean>(false);
  const [state, dispatch] = useReducer(messageReducer, messageInitialState);
  const yourReaction = myReaction.filter(
    (item: any) => item.userName === user.userName
  );
  // const [re, setRe] = useState<any>(yourReaction);

  // myReaction 해당 메세지의 리액션들
  // yourReaction 해당 메세지의 리액션 중 내가 한 리액션
  // result 리액션의 해당 메세지의 리액션 총 갯수

  useEffect(() => {
    // (async () => {
    //   try {
    //     const result = await reactionAmount(messageId);
    //     setReactionAm(result.reactionCnt);
    //   } catch (e) {
    //     throw new Error('리액션 목록 불러오기를 실패했습니다');
    //   }
    // })();
    if (yourReaction.length > 0) setClick(true);
    else setClick(false);
    // console.log(myReaction.length);
  }, []);
  return (
    <div
      className="reaction-wrap"
      onClick={() => {
        if (click) {
          reactionMinus(user.email, messageId, yourReaction[0].reactionId);
          setReactionAm((prev: number) => prev - 1);
          setClick(false);
        } else {
          reactionAdd(user.email, messageId);
          setClick(true);
          setReactionAm((prev: number) => prev + 1);
        }
      }}
    >
      <svg
        width="12"
        height="10"
        viewBox="0 0 12 10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          className={click ? 'like on' : 'like'}
          d="M10.4201 1.305C10.1647 1.0495 9.86147 0.84682 9.52774 0.708539C9.19401 0.570258 8.8363 0.499084 8.47506 0.499084C8.11382 0.499084 7.75611 0.570258 7.42238 0.708539C7.08865 0.84682 6.78544 1.0495 6.53006 1.305L6.00006 1.835L5.47006 1.305C4.95421 0.789151 4.25458 0.499352 3.52506 0.499352C2.79554 0.499352 2.09591 0.789151 1.58006 1.305C1.06421 1.82084 0.774414 2.52048 0.774414 3.25C0.774414 3.97951 1.06421 4.67915 1.58006 5.195L2.11006 5.725L6.00006 9.615L9.89006 5.725L10.4201 5.195C10.6756 4.93962 10.8782 4.6364 11.0165 4.30267C11.1548 3.96895 11.226 3.61124 11.226 3.25C11.226 2.88875 11.1548 2.53105 11.0165 2.19732C10.8782 1.86359 10.6756 1.56038 10.4201 1.305Z"
        />
      </svg>

      <span>{reactionAm}</span>
    </div>
  );
};

export default Reaction;
