import { IMessage } from '@src/interfaces/IPaper';
import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const NoMessageItem = () => {
  return <StyledNoMsgP>아직 메시지가 없어요!</StyledNoMsgP>;
};

const StyledNoMsgP = styled.p`
  padding: 0.75rem 1rem;
  background: rgba(221, 221, 221, 0.3);
  border-radius: 12px;
`;

const MessageItem = ({ msg, pId }: { msg: IMessage; pId: string }) => {
  const navigate = useNavigate();

  return (
    <StyledMessageli
      color={msg.color}
      onClick={() => navigate(`/paper/${pId}`)}
    >
      <p style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>
        {msg.userName}님
      </p>
      <span>{msg.content}</span>
    </StyledMessageli>
  );
};
const StyledMessageli = styled.li`
  border-radius: 12px;
  cursor: pointer;

  min-width: 30%;
  min-height: 8vh;
  padding: 1.5rem 1rem;
  word-break: break-all;
  margin-right: 1.25rem;
  background: ${props => (props.color ? props.color : 'lightyellow')};
  color: ${props => (props.color === '#000000' ? 'white' : 'initial')};
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
