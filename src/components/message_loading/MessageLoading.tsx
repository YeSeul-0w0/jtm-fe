import React, { useEffect, useReducer, useState } from 'react';
import styled from 'styled-components';
import './messageLoading.scss';
import Header from '../layout/Header';
import { Btn } from '../common/Btn';
import { messageInitialState, messageReducer } from './messageStore';
import { Message, MessageLoadingInt } from './messageInterface';
import { paperDetail } from './messageFunction';
import { Link, useParams } from 'react-router-dom';
import StickerWrite from './StickerWrite';
import Sticker from './Sticker';
import BottomBtn from '../common/BottomBtn';
import { useAuthState } from 'src/context';
import { themeColor } from './messageData';
import MessageCompo from './MessageCompo';

const MessageLoading = () => {
  const [change, setChange] = useState<boolean>(true);
  const [state, dispatch] = useReducer(messageReducer, messageInitialState);

  const [stickerPop, setStickerPop] = useState<boolean>(false);
  const [st, setSt] = useState<number>();
  const [x, setX] = useState<number>(window.innerWidth / 2);
  const [postX, setPostX] = useState<number>(0);
  const [y, setY] = useState<number>(window.innerHeight / 2);
  const [postY, setPostY] = useState<number>(0);

  const [move, setMove] = useState<boolean>(false);

  const today = new Date().toLocaleDateString().split('.').slice(0, 3);
  const newToday = today.map(item => item.replace(' ', '0'));

  const stickerList = state.sticker;

  const { paperId } = useParams();
  const messageList = state.message;

  const { user } = useAuthState();
  const userId = user?.userId;
  const userName = user?.userName;

  const paperData = state.paper;
  const paperTheme = state.paper.skin;
  const paperName = state.paper.paperTitle;
  const reactionAll = state.reaction;

  useEffect(() => {
    if (change) {
      paperDetail(
        userId!,
        paperId!,
        dispatch,
        messageList!,
        stickerList!,
        paperData!,
        reactionAll!
      );
      setChange(false);
    }
  }, [change]);
  return (
    <>
      {st && (
        <Sticker
          url={st}
          setMove={setMove}
          x={x}
          y={y}
          z={62}
          postX={postX}
          postY={postY}
          paperId={paperId!}
          userId={userId!}
          setPostX={setPostX}
          setPostY={setPostY}
          setSt={setSt}
        />
      )}
      <MessageLoadingComponent
        theme={themeColor[paperTheme - 1]}
        full={stickerPop ? true : false}
        onClick={e => {
          move && setX(e.clientX);
          move && setY(e.clientY);
        }}
      >
        {stickerPop ? (
          <>
            <StickerWrite setStickerPop={setStickerPop} setSt={setSt} />
          </>
        ) : (
          <>
            <Header to="/main" pageNm={paperName} />
            <div className="message-wrap">
              {messageList[0] ? (
                messageList.map((item: Message, idx: number) => (
                  <MessageCompo
                    key={item.messageId}
                    item={item}
                    idx={idx}
                    reactionAll={reactionAll}
                    user={user!}
                    paperId={paperId!}
                    paperTheme={paperTheme}
                    newToday={newToday}
                    setChange={setChange}
                  />
                ))
              ) : (
                <p>앗 아직 메시지가 없어요!</p>
              )}
              {stickerList[0] &&
                stickerList.map((item: any) => {
                  return (
                    <Sticker
                      key={item.stickerId}
                      userId={userId}
                      url={item.stickerType}
                      x={item.positionX}
                      y={item.positionY}
                      stickerId={item.stickerId}
                      paperId={paperId!}
                      stickerUserName={item.userName}
                      currentUserName={userName!}
                    />
                  );
                })}
            </div>
          </>
        )}
        {user?.userId !== null && !stickerPop && (
          <div className="message-btns">
            {/* <div className="btn">/ */}
            <Btn
              link={`/paper/write/${paperTheme!}/${paperId!}`}
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
              onClick={() => {
                if (
                  stickerList[0] === undefined ||
                  stickerList[0].userName !== userName
                )
                  setStickerPop(true);
                else alert('이미 이 페이퍼에 스티커를 작성했습니다');
              }}
            />
          </div>
        )}
        {userId === null && (
          <Link to="/">
            <div className="go-login">
              <BottomBtn text="로그인하러 가기" />
            </div>
          </Link>
        )}
      </MessageLoadingComponent>
    </>
  );
};

export const MessageLoadingComponent = styled.main<MessageLoadingInt>`
  width: 100%;
  position: relative;
  background-color: ${props => (props.theme ? props.theme : '#fff')};
  padding: 0 24px;
  box-sizing: border-box;
  min-height: 100%;
  overflow-y: ${props => (props.full ? 'unset' : 'scroll')};
  overflow-x: hidden;
  height: ${props => (props.full ? '100vh' : 'unset')};
`;

export default MessageLoading;
