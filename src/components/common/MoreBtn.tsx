import React, { useState } from 'react';
import styled from 'styled-components';
import { More1 } from '../message_loading/messageInterface';
import MoreBottom from './MoreBottom';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const More = styled.div`
  //width: 16px;
  //height: 8px;
  display: flex;
  justify-content: space-between;
  align-self: flex-end;
  cursor: pointer;
`;
const MoreBtn = ({
  text,
  messageId,
  prev,
  paperTheme,
  paperId,
  prevColor,
}: More1) => {
  const [more, setMore] = useState<boolean>(false);
  return (
    <>
      <More onClick={() => setMore(prev => !prev)}>
        <FontAwesomeIcon icon={faEllipsis} />
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
