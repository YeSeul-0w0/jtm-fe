import React, { useState } from 'react';
import styled from 'styled-components';
import MoreBtn from '../common/MoreBtn';
import { Loading, MessageCompoInter } from './messageInterface';
import Reaction from './Reaction';

const MessageCompo = (props: MessageCompoInter) => {
  const [messageFloating, setMessageFloating] = useState<boolean>(false);

  const {
    item,
    reactionAll,
    idx,
    user,
    paperId,
    paperTheme,
    newToday,
    setChange,
    st,
  } = props;

  const hourData = item.createDate.slice(11, -3);
  const dayData = item.createDate.slice(0, 10);
  const myReaction = reactionAll.filter(
    (re: any) => re.messageId === item.messageId
  );

  return (
    <>
      <MessageComponent
        z={messageFloating ? true : false}
        key={item.messageId}
        backColor={item.color}
        color={
          isNaN(Number(item.color[1]))
            ? 'unset'
            : Number(item.color[1]) <= 7
            ? '#fff'
            : 'unset'
        }
        font={item.font}
        width={item.content.length <= 84 ? '234px' : ''}
        left={(idx + 1) % 2 !== 0 ? 'flex-start' : 'flex-end'}
      >
        <div onClick={() => st || setMessageFloating(prev => !prev)}>
          <div className="message-top">
            <p className="user-name">
              {item.userName === user?.userName
                ? '내가 작성한 메시지'
                : item.userName}
            </p>
          </div>
          <p>{item.content}</p>
        </div>
        <div className="more-wrap">
          {item.userName === user?.userName && (
            <MoreBtn
              text={['수정하기', '삭제하기']}
              paperId={paperId!}
              messageId={item.messageId}
              paperTheme={paperTheme}
              prev={item.content}
              prevColor={item.color}
              st={st}
              color={
                isNaN(Number(item.color[1]))
                  ? false
                  : Number(item.color[1]) < 7
                  ? '#fff'
                  : false
              }
            />
          )}
          <span className="create-data">
            {dayData.split('-').toString() === newToday.toString()
              ? hourData
              : dayData}
          </span>
          <Reaction
            key={item.userName}
            messageId={item.messageId}
            user={user}
            myReaction={myReaction}
            setChange={setChange}
            st={st}
            white={
              isNaN(Number(item.color[1]))
                ? false
                : Number(item.color[1]) < 7
                ? true
                : false
            }
          />
        </div>
      </MessageComponent>
    </>
  );
};

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
  box-sizing: border-box;
  z-index: ${props => (props.z ? '65' : 'unset')};
  border: ${props =>
    props.z
      ? props.backColor === '#000000'
        ? 'dashed 2px white'
        : 'dashed 2px black'
      : 'unset'};
  p {
    font-size: 13px;
    line-height: 24px;
  }
  .message-top {
    display: flex;
    justify-content: space-between;
    p.user-name {
      font-weight: 600;
      font-size: 14px;
      margin-bottom: 7px;
    }
  }
  span.create-data {
    opacity: 0.5;
    font-size: 12px;
    font-weight: bold;
    margin-left: 7px;
  }
  p:nth-child(2) {
    margin-bottom: 13px;
  }
`;

export default MessageCompo;
