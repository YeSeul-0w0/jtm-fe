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
// 모바일 버전 스티커 가능하게 따로 만들어야 할 듯

// 1. GET 방식으로  ~/paper/{paperId}  요청시 (body x) 기존의 페이퍼 상세보기 와 동일한 형식의 데이터 리턴할 수 있도록 하였습니다.

// @Jam/백앤드 잼님 확인 하신 후 반영 부탁드립니다.

// 2. postman과 시트에 내용 추가해두었습니다.
// postman :
// https://documenter.getpostman.com/view/15855367/UVkvJXf8#f56370e6-1e8e-4f95-b0d3-14cd9df15368

const MessageLoading = () => {
  // const [messagePop, setMessagePop] = useState<boolean>(false);
  const [fixPop, setFixPop] = useState<boolean>(false);
  const [state, dispatch] = useReducer(messageReducer, messageInitialState);

  // sticker state ===
  const [stickerPop, setStickerPop] = useState<boolean>(false);
  // 스티커 작성 페이지 띄우기 여부
  const [st, setSt] = useState<number>();
  // 현재 선택한 스티커의 이름
  // const [x, setX] = useState<number>();
  const [x, setX] = useState<number>();
  // 스티커의 x 좌표
  const [postX, setPostX] = useState<number>(0);
  // api에 전송할 스티커의 x 좌표 (마우스의 커서를 스티커의 정중앙에 맞추기 위해 좌표 값을 두 개로 나눴습니다)
  const [y, setY] = useState<number>();
  // 스티커의 y 좌표
  const [postY, setPostY] = useState<number>(0);
  // api에 전송할 스티커의 y 좌표
  const [move, setMove] = useState<boolean>(false);
  // 스티커를 움직이고 있는가에 대한 여부
  const stickerList = state.sticker;
  // api를 통해 불러온 페이퍼에 붙어있는 스티커 목록들
  // ==================

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
    paperDetail(
      email!,
      paperId!,
      dispatch,
      messageList!,
      stickerList!,
      paperData!,
      reactionAll!
    );
    // console.log(user?.email !== null && st === 0);
    // console.log('바뀌고있나?');
    // dispatch(message(123));
  }, []);

  return (
    <MessageLoadingComponent
      theme={themeColor[paperTheme]}
      full={stickerPop ? true : false}
      onMouseMove={e => {
        move && setX(e.clientX);
        move && setY(e.clientY + e.currentTarget.scrollTop);
      }}
      onTouchMove={e => {
        // console.log();
        // console.log();
        move && setX(e.touches[0].clientX);
        move && setY(e.touches[0].clientY + e.currentTarget.scrollTop);
      }}
      // 페이퍼 페이지에서 마우스 위치에 따라 스티커의 위치를 잡아줌
    >
      {user?.email === null && (
        <>
          <div className="dis"></div>
        </>
      )}
      {stickerPop ? (
        <>
          <StickerWrite setStickerPop={setStickerPop} setSt={setSt} />
          {/* 스티커 팝의 boolean 값에 따라 스티커 작성 페이지가 나타날지 메세지 페이지가 나타날지 나뉩니다 */}
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
            // 스티커를 선택한 겂이 있을 때 그 스티커가 메세지 페이지에 나타납니다
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
                    key={idx}
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
