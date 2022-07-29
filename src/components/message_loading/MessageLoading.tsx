import axios from 'axios';
import React, { useEffect, useReducer, useState } from 'react';
import styled from 'styled-components';
// import { Btn } from '../common/Btn';
import './messageLoading.scss';
import Header from '../layout/Header';
import { Btn } from '../common/Btn';
import MessageInput from './MessageInput';
import { initialState, message, messageReducer } from './messageStore';
import StickerPop from './StickerPop';
import MoreBtn from '../common/MoreBtn';
import { Loading, Message } from './messageInterface';

// 회원가입에서 인증번호 useState 말고 유저단에 안 보여줄 방법 찾아봐야

const MessageLoading = ({ messageData }: any) => {
  const [messagePop, setMessagePop] = useState<boolean>(false);
  const [stickerPop, setStickerPop] = useState<boolean>(false);
  const [fixPop, setFixPop] = useState<boolean>(false);
  const [state, dispatch] = useReducer(messageReducer, initialState);
  const [sq, setSq] = useState<string>();

  const messageList = state.message;

  const messageFix = async (text: string) => {
    const a = await axios({
      method: 'put',
      url: 'http://3.39.162.248:80/message/9004',
      data: {
        user: {
          email: 'jam@gmail.com',
        },
        message: {
          content: text,
          font: '굴림',
          color: '#333',
        },
      },
    });
    console.log(a);
  };

  const messageGet = async () => {
    try {
      const a = await axios('http://3.39.162.248:80/message', {
        method: 'get',
        headers: {
          ['User-Email']: 'jam@gmail.com',
        },
      });
      dispatch(message(a.data.messages));
      console.log(a);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    messageGet();
  }, []);

  const messagePost = async (content: any, font: any, color: any) => {
    try {
      const a = await axios({
        method: 'post',
        url: 'http://3.39.162.248:80/message',
        data: {
          user: {
            email: 'jam@gmail.com',
          },
          paper: {
            paperId: 1,
          },
          message: {
            content: content,
            font: font,
            color: color,
          },
        },
      });
      messageGet();
      console.log(a);
    } catch (e) {
      console.log(e);
    }
  };
  const messageDelete = async (e: React.FormEvent, messageId: any) => {
    try {
      const a = await axios({
        url: `http://3.39.162.248:80/message/${messageId}`,
        method: 'delete',
        data: {
          user: {
            email: 'jam@gmail.com',
          },
        },
      });
      messageGet();
      console.log(a);
    } catch (e) {
      console.log(e);
    }
  };

  const reactionAmount = async () => {
    const a = await axios({
      url: `http://3.39.162.248:80/reaction/${1}`,
      method: 'get',
    });
    console.log(a);
  };

  reactionAmount();

  const paperName = '숨니의 생일을 축하해요!';
  // ${props =>
  // props.backColor ? props.backColor : '#ffbba6'};
  const Message = styled.div<Loading>`
    width: 327px;
    /* background-color: #ffbba6; */
    background-color: ${props =>
      props.backColor ? props.backColor : '#ffbba6'};
    font-family: ${props => (props.font ? props.font : 'sans-serif')};
    border-radius: 12px;
    padding: 20px 24px;
    box-sizing: border-box;
    margin-top: 34px;
    display: flex;
    flex-direction: column;
    & p {
      font-size: 14px;
      font-weight: 600;
      line-height: 24px;
    }
  `;

  return (
    <div className="message-loading">
      <Header to="/" pageNm={paperName} />
      <div className="message-wrap">
        {messageList[0] ? (
          messageList.map((item: Message) => (
            <Message backColor={item.color} font={item.font}>
              <p>{item.userName}</p>
              <p>{item.content}</p>
              {/* <button onClick={e => messageDelete(e, item.messageId)}>
                메세지 삭제하기
              </button>
              <button onClick={e => setFixPop(true)}>메세지 수정하기</button> */}
              <MoreBtn />
            </Message>
          ))
        ) : (
          <p>앗 아직 메세지가 없어요!</p>
        )}
      </div>
      <div className="message-btns">
        <Btn
          href="#"
          width="48px"
          height="48px"
          text=""
          padding="0"
          background="#111"
          logo="message.svg"
          imgSize="20px"
          center="center"
          onClick={() => setMessagePop(true)}
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
      {messagePop && (
        <MessageInput send={messagePost} setMessagePop={setMessagePop} />
      )}
      {stickerPop && <StickerPop setStickerPop={setStickerPop} />}
      {fixPop && (
        <>
          <input onChange={e => setSq(e.target.value)} />
          <button onClick={e => messageFix(sq!)}>메세지 수정할기다</button>
        </>
      )}
    </div>
  );
};

export default MessageLoading;
