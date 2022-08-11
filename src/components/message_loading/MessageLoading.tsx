import React, { useContext, useEffect, useReducer, useState } from 'react';
import styled from 'styled-components';
import './messageLoading.scss';
import Header from '../layout/Header';
import { Btn } from '../common/Btn';
import { messageInitialState, messageReducer } from './messageStore';
import MoreBtn from '../common/MoreBtn';
import { Loading, Message } from './messageInterface';
import { paperDetail, stickerPost } from './messageFunction';
import { useParams } from 'react-router-dom';
import StickerWrite from './StickerWrite';
import Sticker from './Sticker';
import BottomBtn from '../common/BottomBtn';
import Reaction from './Reaction';
import { useAuthState } from 'src/context';
import { MoveBtn } from '../common/MoveBtn';

// 회원가입에서 인증번호 useState 말고 유저단에 안 보여줄 방법 찾아봐야
// 모바일 버전 스티커 가능하게 따로 만들어야 할 듯

const MessageLoading = () => {
  // const [messagePop, setMessagePop] = useState<boolean>(false);
  const [stickerPop, setStickerPop] = useState<boolean>(false);
  const [fixPop, setFixPop] = useState<boolean>(false);
  const [state, dispatch] = useReducer(messageReducer, messageInitialState);
  const [st, setSt] = useState<number>();

  const [x, setX] = useState<number>();
  const [postX, setPostX] = useState<number>(0);
  const [y, setY] = useState<number>();
  const [postY, setPostY] = useState<number>(0);
  const [move, setMove] = useState<boolean>(false);

  const { paperId } = useParams();
  const messageList = state.message;
  const stickerList = state.sticker;

  const { user, token } = useAuthState();
  const email = user?.email;

  const paperName = state.paper.paperTitle;
  const reactionAll = state.reaction;

  useEffect(() => {
    paperDetail(email!, paperId!, dispatch);
    console.log(user);
  }, []);

  const Message = styled.div<Loading>`
    width: ${props => (props.width ? props.width : '327px')};
    background-color: ${props =>
      props.backColor ? props.backColor : '#ffbba6'};
    font-family: ${props => (props.font ? props.font : 'sans-serif')};
    border-radius: 12px;
    padding: 16px 16px 20px 16px;
    margin-top: 34px;
    display: flex;
    flex-direction: column;
    align-self: ${props => props.left && props.width && props.left};
    p {
      font-size: 13px;
      line-height: 24px;
    }
    p:first-child {
      font-weight: 600;
      font-size: 14px;
      margin-bottom: 7px;
    }
    p:nth-child(2) {
      margin-bottom: 13px;
    }
  `;

  return (
    <div
      className={stickerPop ? `message-loading full` : 'message-loading'}
      onMouseMove={e => {
        move && setX(e.clientX);
        move && setY(e.clientY + e.currentTarget.scrollTop);
      }}
    >
      {user?.email === null && (
        <>
          <div className="dis"></div>
        </>
      )}
      {stickerPop ? (
        <>
          <StickerWrite setStickerPop={setStickerPop} setSt={setSt} />
        </>
      ) : (
        <>
          {st && (
            <Sticker
              url={st}
              setMove={setMove}
              x={x}
              y={y}
              setPostX={setPostX}
              setPostY={setPostY}
            />
          )}
          <Header to="/createPaper" pageNm={paperName} />
          <div className="message-wrap">
            {messageList[0] ? (
              messageList.map((item: Message, idx: number) => {
                // console.log(item);
                // const reaction = await reactionAmount(item.messageId);
                return (
                  <Message
                    key={idx}
                    // backColor={'#fff'}
                    backColor={item.color}
                    font={item.font}
                    width={item.content.length <= 84 ? '234px' : ''}
                    left={(idx + 1) % 2 !== 0 ? 'flex-start' : 'flex-end'}
                  >
                    {/* <p>{item.createDate}</p> */}
                    <p>{item.userName}</p>
                    <p>{item.content}</p>
                    <div className="more-wrap">
                      {/* {item.userName === user?.userName && ( */}
                      <MoreBtn
                        text={['수정하기', '삭제하기']}
                        messageId={item.messageId}
                        prev={item.content}
                      />
                      {/* )} */}
                      <Reaction
                        messageId={item.messageId}
                        user={user}
                        reactionAll={reactionAll}
                      />
                    </div>
                  </Message>
                  // <p>asas</p>
                );
              })
            ) : (
              <p>앗 아직 메세지가 없어요!</p>
            )}
            {stickerList[0] &&
              stickerList.map((item: any) => {
                return (
                  <Sticker
                    url={item.stickerType}
                    x={item.poisitionX}
                    y={item.poisitionY}
                  />
                );
              })}
          </div>
        </>
      )}
      <div className="message-btns">
        <div className="btn">
          <Btn
            link={`/message/write/${paperId!}`}
            width="48px"
            height="48px"
            text=""
            padding="0"
            background="#111"
            logo="message.svg"
            imgSize="20px"
            center="center"
          />
          <Btn
            href="#"
            width="48px"
            height="48px"
            text=""
            padding="0"
            background="#FED700"
            logo="star.svg"
            imgSize="20px"
            center="center"
            onClick={() => setStickerPop(true)}
          />
        </div>
        {st && (
          <BottomBtn
            onclick={() => stickerPost(email!, postX, postY, paperId!, st)}
            text="스티커 붙이기"
          />
        )}
      </div>
      {email === null && <button>비회원이신가요?</button>}
    </div>
  );
};

export default MessageLoading;
