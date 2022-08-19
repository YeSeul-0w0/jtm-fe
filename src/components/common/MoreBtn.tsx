import React, { useState } from 'react';
import styled from 'styled-components';
import { More1 } from '../message_loading/messageInterface';
import MoreBottom from './MoreBottom';

const More = styled.div`
  width: 16px;
  height: 8px;
  display: flex;
  justify-content: space-between;
  align-self: flex-end;
  cursor: pointer;
`;

const Dot = styled.div`
  width: 3px;
  height: 3px;
  border-radius: 3px;
  background-color: ${props =>
    props.color ? props.color : 'rgba(0, 0, 0, 0.5)'};
`;

const MoreBtn = ({
  text,
  messageId,
  prev,
  paperTheme,
  paperId,
  prevColor,
  color,
}: More1) => {
  const [more, setMore] = useState<boolean>(false);
  return (
    <>
      <More onClick={() => setMore(prev => !prev)}>
        <Dot color={color} />
        <Dot color={color} />
        <Dot color={color} />
      </More>
      {more && (
        <MoreBottom
          setMore={setMore}
          text={text}
          prev={prev}
          messageId={messageId}
          paperTheme={paperTheme}
          paperId={paperId}
          prevColor={prevColor}
        />
      )}
    </>
  );
};

export default MoreBtn;
