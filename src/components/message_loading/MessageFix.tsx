import React, { useEffect, useReducer, useState } from 'react';
import BottomBtn from '../common/BottomBtn';
import { messageFix, messagePost, messageRe } from './messageFunction';
import { themeColor, themeInput, themeMessageColor } from './messageData';
import './messageLoading.scss';
import styled from 'styled-components';
import { Color } from './messageInterface';
import { useParams } from 'react-router-dom';
import { useAuthState } from 'src/context';
import { MessageLoadingComponent } from './MessageLoading';
import { BottomFix, ColorBox, ColorBoxBorder, InputBox } from './MessageWrite';
import Header from '../layout/Header';
import { messageInitialState, messageReducer } from './messageStore';

const MessageFixed = () => {
  const { paperId, messageId, paperSkin, prev, prevColor } = useParams();
  const [message, setMessage] = useState<string>(prev!);
  const [textLength, setTextLength] = useState<number>(0);
  const [color, setColor] = useState<string>('#' + prevColor!);
  const { user, kakaoToken } = useAuthState();
  const userId = user?.userId;

  const writeData = Object.values(themeMessageColor[Number(paperSkin) - 1]);

  const textC = color.slice(1);

  return (
    <>
      <Header
        to={`/paper/${paperId}`}
        background={themeColor[Number(paperSkin) - 1]}
        pageNm="메시지 수정하기"
      />
      <MessageLoadingComponent
        full={true}
        theme={themeColor[Number(paperSkin) - 1]}
      >
        <div className="message-wrap">
          <div className="write-box">
            <InputBox
              maxLength={420}
              color={color}
              onChange={(e: any) => {
                setTextLength(e.target.value.length);
                setMessage(e.target.value);
              }}
              textColor={
                isNaN(Number(textC))
                  ? 'black'
                  : Number(textC) <= 7
                  ? '#fff'
                  : 'black'
              }
              value={message}
            ></InputBox>
            <span>{textLength}/420</span>
          </div>
        </div>
        <div className="message-color">
          {
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
          }
        </div>
        <BottomFix>
          <BottomBtn
            onclick={() => messageFix(userId!, message, messageId!, color!)}
            text="수정 완료"
            link={`/paper/${paperId}`}
          />
        </BottomFix>
      </MessageLoadingComponent>
    </>
  );
};

export default MessageFixed;
