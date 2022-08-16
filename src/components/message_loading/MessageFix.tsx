import React, { useEffect, useState } from 'react';
import BottomBtn from '../common/BottomBtn';
import { messageFix, messagePost } from './messageFunction';
import { themeColor, themeInput, themeMessageColor } from './messageData';
import './messageLoading.scss';
import styled from 'styled-components';
import { Color } from './messageInterface';
import { useParams } from 'react-router-dom';
import { useAuthState } from 'src/context';
import { MessageLoadingComponent } from './MessageLoading';
import { BottomFix, ColorBox, ColorBoxBorder, InputBox } from './MessageWrite';
import Header from '../layout/Header';

const MessageFixed = () => {
  const { paperId, messageId, paperSkin, prev } = useParams();
  const [message, setMessage] = useState<string>(prev!);
  const [textLength, setTextLength] = useState<number>(0);
  const [color, setColor] = useState<string>();
  const { user, token } = useAuthState();
  const email = user?.email;

  const writeData = Object.values(themeMessageColor[Number(paperSkin)]);

  return (
    <MessageLoadingComponent full={true} theme={themeColor[Number(paperSkin)]}>
      <Header to={`/paper/${paperId}`} pageNm="메시지 수정하기" />
      <div className="message-wrap">
        <div className="write-box">
          <InputBox
            maxLength={420}
            color={themeInput[Number(paperSkin)]}
            onChange={(e: any) => {
              setTextLength(e.target.value.length);
              setMessage(e.target.value);
            }}
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
          link={`/paper/${paperId}`}
          onclick={() => messageFix(email!, message, messageId!, color!)}
          text="수정 완료"
        />
      </BottomFix>
    </MessageLoadingComponent>
  );
};

export default MessageFixed;
