import React, { useReducer, useState } from 'react';
import BottomBtn from '../common/BottomBtn';
import { messagePost } from './messageFunction';
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
  const [message, setMessage] = useState<string>();
  const [textLength, setTextLength] = useState<number>(0);
  const [color, setColor] = useState<string>();
  const { user, token } = useAuthState();
  const email = user?.email;
  const { paperId, paperSkin } = useParams();
  const [state, dispatch] = useReducer(messageReducer, messageInitialState);
  // const [select, setSelect] = useState<boolean>(false);

  const writeData = Object.values(themeMessageColor[Number(paperSkin)]);

  // console.log();

  return (
    <>
      <MessageLoadingComponent
        full={true}
        theme={themeColor[Number(paperSkin)]}
      >
        <Header to={`/paper/${paperId}`} pageNm="메시지 남기기" />
        <div className="message-wrap">
          <div className="write-box">
            <InputBox
              maxLength={420}
              color={themeInput[Number(paperSkin)]}
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
            link={`/paper/${paperId}`}
            onclick={() =>
              messagePost(email!, message, '굴림', color, paperId!, dispatch)
            }
            text="작성 완료"
          />
        </BottomFix>
      </MessageLoadingComponent>
    </>
  );
};

export const InputBox = styled.textarea`
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
