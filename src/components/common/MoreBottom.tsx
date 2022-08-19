import { useAuthState } from 'src/context';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { messageDelete, messageFix } from '../message_loading/messageFunction';
import { More2 } from '../message_loading/messageInterface';
import Modal from './Modal';

const BottomWrap = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(17, 17, 17, 0.6);
  z-index: 61;
`;

const BottomTap = styled.div`
  width: 375px;
  padding: 40px 28px 42px 28px;
  box-sizing: border-box;
  background-color: #fff;
  border-radius: 15px 15px 0 0;
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
`;

const Tap = styled.p`
  width: 100%;
  margin-bottom: 32px;
  font-weight: bold;
  font-size: 14px !important;
  color: #000;
`;

const MoreBottom = ({
  setMore,
  text,
  prev,
  messageId,
  paperTheme,
  paperId,
  prevColor,
}: More2) => {
  const nav = useNavigate();
  const { user, token } = useAuthState();
  const email = user?.email;

  const [open, setOpen] = useState<boolean>(false);

  const color = prevColor?.slice(1);

  return (
    <BottomWrap
      onClick={(e: any) => {
        if (e.target === e.currentTarget) setMore(prev => !prev);
      }}
    >
      <BottomTap>
        {text &&
          text.map((item: string, idx: number) => (
            <Tap
              // onClick={async () => {
              onClick={() => {
                if (item === '수정하기')
                  nav(
                    `/paper/fix/${paperId}/${paperTheme}/${messageId}/${prev}/${color}`
                  );
                if (item === '삭제하기') {
                  setOpen(true);
                }
              }}
              key={idx}
            >
              {item}
            </Tap>
          ))}
      </BottomTap>
      {open && (
        <Modal
          info="정말 삭제하시겠습니까?"
          confirm={true}
          onModal={open}
          setOnModal={setOpen}
          onClick={() => {
            messageDelete(email!, messageId);
            setOpen(false);
            setMore(false);
          }}
        />
      )}
    </BottomWrap>
  );
};

export default MoreBottom;
