import React, { useReducer, useState } from 'react';
import BottomBtn from '../common/BottomBtn';
import { messagePost, messageRe } from './messageFunction';
import { themeColor, themeInput, themeMessageColor } from './messageData';
import './messageLoading.scss';
import styled from 'styled-components';
import { Color } from './messageInterface';
import { useAuthState } from 'src/context';
import { useParams } from 'react-router-dom';
import { MessageLoadingComponent } from './MessageLoading';
import Header from '../layout/Header';
import { messageInitialState, messageReducer } from './messageStore';

const MessageWrite = () => {
  const { paperId, paperSkin } = useParams();
  const [message, setMessage] = useState<string>('');
  const [textLength, setTextLength] = useState<number>(0);
  const [color, setColor] = useState<string>(themeInput[Number(paperSkin) - 1]);
  const { user, token } = useAuthState();
  const email = user?.email;
  const [state, dispatch] = useReducer(messageReducer, messageInitialState);
  // const [select, setSelect] = useState<boolean>(false);

  const writeData = Object.values(themeMessageColor[Number(paperSkin) - 1]);

  const textC = color.slice(1);

  // console.log();

  return (
    <>
      <MessageLoadingComponent
        full={true}
        theme={themeColor[Number(paperSkin) - 1]}
      >
        <Header to={`/paper/${paperId}`} pageNm="메시지 남기기" />
        <div className="message-wrap">
          <div className="write-box">
            <InputBox
              value={message}
              maxLength={420}
              color={color}
              textColor={
                isNaN(Number(textC))
                  ? 'black'
                  : Number(textC) <= 7
                  ? '#fff'
                  : 'black'
              }
              onChange={(e: any) => {
                setTextLength(e.target.value.length);
                setMessage(e.target.value);
              }}
            ></InputBox>
            <span>{textLength}/420</span>
          </div>
        </div>
        <div className="message-color">
          <>
            {writeData[0].map((item: any) => (
              <ColorBoxBorder color={item}>
                <ColorBox
                  key={item}
                  onClick={() => setColor(item)}
                  color={item}
                  on={color === item ? true : false}
                />
              </ColorBoxBorder>
            ))}
          </>
        </div>
        <BottomFix>
          <BottomBtn
            link={message.length > 0 ? `/paper/${paperId}` : undefined}
            onclick={() => {
              if (message.length > 0) {
                messagePost(email!, message, '굴림', color, paperId!, dispatch);
              } else {
                alert('메세지 내용을 입력해주세요');
              }
              // messageRe(email!, paperId, dispatch);
            }}
            text="작성 완료"
          />
        </BottomFix>
      </MessageLoadingComponent>
    </>
  );
};

interface Box {
  color: string;
  textColor: string;
}

export const InputBox = styled.textarea<Box>`
  width: 327px;
  height: 300px;
  border-radius: 12px;
  border: none;
  background-color: ${props => (props.color ? props.color : '#fff')};
  padding: 24px;
  box-sizing: border-box;
  resize: none;
  font-size: 16px;
  font-weight: 500;
  font-family: inherit;
  color: ${props => (props.textColor ? props.textColor : '#000')};
`;

export const BottomFix = styled.div`
  width: 300px;
  height: 60px;
  position: absolute;
  bottom: 34px;
`;

export const ColorBox = styled.div<Color>`
  width: 40px;
  height: 40px;
  border-radius: 40px;
  background-color: ${props => (props.color ? `${props.color}` : 'unset')};
  transform: ${props =>
    props.on ? 'scale(0.9) translate(-50%, -50%)' : 'unset'};
  position: ${props => (props.on ? 'absolute' : 'unset')};
  top: 45%;
  left: 45%;
`;

export const ColorBoxBorder = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 40px;
  border: 2px solid;
  border-color: ${props => (props.color ? `${props.color}` : 'unset')};
  position: relative;
`;

export default MessageWrite;
