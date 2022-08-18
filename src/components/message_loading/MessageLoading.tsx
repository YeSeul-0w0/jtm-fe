import React, { useContext, useEffect, useReducer, useState } from 'react';
import styled from 'styled-components';
import './messageLoading.scss';
import Header from '../layout/Header';
import { Btn } from '../common/Btn';
import { message, messageInitialState, messageReducer } from './messageStore';
import MoreBtn from '../common/MoreBtn';
import { Loading, Message, MessageLoadingInt } from './messageInterface';
import {
  messageRe,
  paperDetail,
  reactionAmount,
  stickerPost,
} from './messageFunction';
import { Link, useParams } from 'react-router-dom';
import StickerWrite from './StickerWrite';
import Sticker from './Sticker';
import BottomBtn from '../common/BottomBtn';
import Reaction from './Reaction';
import { useAuthState } from 'src/context';
import { MoveBtn } from '../common/MoveBtn';
import { themeColor, themeTextColor } from './messageData';

// 회원가입에서 인증번호 useState 말고 유저단에 안 보여줄 방법 찾아봐야

const MessageLoading = () => {
  const [change, setChange] = useState<boolean>(true);
  const [fixPop, setFixPop] = useState<boolean>(false);
  const [state, dispatch] = useReducer(messageReducer, messageInitialState);

  const [stickerPop, setStickerPop] = useState<boolean>(false);
  const [st, setSt] = useState<number>();
  const [x, setX] = useState<number>();
  const [postX, setPostX] = useState<number>(0);
  const [y, setY] = useState<number>();
  const [postY, setPostY] = useState<number>(0);

  const [move, setMove] = useState<boolean>(false);

  const stickerList = state.sticker;

  const { paperId } = useParams();
  const messageList = state.message;

  const { user, token } = useAuthState();
  const email = user?.email;
  const userName = user?.userName;

  const paperData = state.paper;
  const paperTheme = state.paper.skin;
  const paperName = state.paper.paperTitle;
  const reactionAll = state.reaction;

  useEffect(() => {
    if (change) {
      paperDetail(
        email!,
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
    <MessageLoadingComponent
      theme={themeColor[paperTheme - 1]}
      full={stickerPop ? true : false}
      onMouseMove={e => {
        move && setX(e.clientX);
        move && setY(e.clientY + e.currentTarget.scrollTop);
      }}
      onTouchMove={e => {
        move && setX(e.touches[0].clientX);
        move && setY(e.touches[0].clientY + e.currentTarget.scrollTop);
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
              email={email!}
              url={st}
              setMove={setMove}
              x={x}
              y={y}
              postX={postX}
              postY={postY}
              paperId={paperId!}
              setPostX={setPostX}
              setPostY={setPostY}
              setSt={setSt}
            />
          )}
          <Header to={email ? '/createPaper' : '/'} pageNm={paperName} />
          <div className="message-wrap">
            {messageList[0] ? (
              messageList.map((item: Message, idx: number) => {
                // console.log(item);
                const myReaction = reactionAll.filter(
                  (re: any) => re.messageId === item.messageId
                );
                return (
                  <MessageComponent
                    key={item.messageId}
                    // backColor={'#fff'}
                    backColor={item.color}
                    color={
                      isNaN(Number(item.color[1]))
                        ? 'unset'
                        : Number(item.color[1]) < 7
                        ? themeTextColor[paperTheme]
                        : 'unset'
                    }
                    font={item.font}
                    width={item.content.length <= 84 ? '234px' : ''}
                    left={(idx + 1) % 2 !== 0 ? 'flex-start' : 'flex-end'}
                  >
                    {/* <p>{item.createDate}</p> */}
                    <p>{item.userName}</p>
                    <p>{item.content}</p>
                    <div className="more-wrap">
                      {item.userName === user?.userName && (
                        <MoreBtn
                          text={['수정하기', '삭제하기']}
                          paperId={paperId!}
                          messageId={item.messageId}
                          paperTheme={paperTheme}
                          prev={item.content}
                          prevColor={item.color}
                        />
                      )}
                      <Reaction
                        messageId={item.messageId}
                        user={user}
                        myReaction={myReaction}
                        setChange={setChange}
                      />
                    </div>
                  </MessageComponent>
                );
              })
            ) : (
              <p>앗 아직 메세지가 없어요!</p>
            )}
            {stickerList[0] &&
              stickerList.map((item: any) => {
                return (
                  <Sticker
                    key={item.stickerId}
                    email={email!}
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
      {user?.email !== null && !stickerPop && (
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
            onClick={() => setStickerPop(true)}
          />
          {/* </div> */}
          {/* 임시로 만들어놓은 스티커 붙이기 버튼 */}
          {/* {st && (
            <BottomBtn
              onclick={() => stickerPost(email!, postX, postY, paperId!, st)}
              text="스티커 붙이기"
            />
          )} */}
        </div>
      )}
      {email === null && (
        <Link to="/login">
          <div className="go-login">
            <BottomBtn text="로그인하러 가기" />
          </div>
        </Link>
      )}
    </MessageLoadingComponent>
  );
};

export const MessageLoadingComponent = styled.div<MessageLoadingInt>`
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

const MessageComponent = styled.div<Loading>`
  width: ${props => (props.width ? props.width : '327px')};
  background-color: ${props => (props.backColor ? props.backColor : '#ffbba6')};
  font-family: ${props => (props.font ? props.font : 'sans-serif')};
  border-radius: 12px;
  padding: 16px 16px 20px 16px;
  margin-top: 34px;
  display: flex;
  flex-direction: column;
  align-self: ${props => props.left && props.width && props.left};
  color: ${props => props.color && props.color};
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

export default MessageLoading;
