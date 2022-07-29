import { IMessage } from '@src/interfaces/IPaper';
import React from 'react';
import styled from 'styled-components';

const NoMessageItem = () => {
  return <p>아직 메시지가 없습니다.</p>;
};

const MessageItem = (msg: IMessage) => {
  const randomInt = parseInt((Math.random() * 100).toString(), 10);
  const randomColor = `hsl(${randomInt * 8}, 85%, 90%)`;

  return (
    <StyledMessageli color={randomColor}>
      <p style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>
        {msg.userName}님
      </p>
      <span>{msg.content}</span>
    </StyledMessageli>
  );
};
const StyledMessageli = styled.li`
  border-radius: 12px;

  min-width: 30%;
  min-height: 8vh;
  padding: 1.5rem 1rem;
  word-break: break-all;
  margin-right: 1.25rem;
  background: ${props => (props.color ? props.color : 'lightyellow')};
  span {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    word-wrap: break-word;
    text-overflow: ellipsis;
    overflow: hidden;
    -webkit-line-clamp: 4;
    height: 72px; // line-height * line-clamp
    line-height: 18px;
  }
`;

export { MessageItem, NoMessageItem };
