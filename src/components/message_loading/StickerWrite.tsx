import axios from 'axios';
import React from 'react';

import one from '../../static/sticker/1.png';
import Header from '../layout/Header';

const StickerHeader = ({ setStickerPop }: any) => {
  // React.Dispatch<React.SetStateAction<boolean>>
  const headerS = document.querySelector('header');
  const button = headerS?.children[0];
  button?.addEventListener('click', (e: Event) => {
    e.preventDefault();
    setStickerPop(false);
  });
  return <Header pageNm="" to="#" />;
};

const StickerWrite = ({ setStickerPop, setSt }: any) => {
  return (
    <>
      <p className="title">
        스티커를 골라주세요! <br />{' '}
        <span>스티커는 딱 하나만 붙일 수 있어요 :)</span>
      </p>
      <div className="message-wrap">
        <div className="sticker-wrap">
          <img
            onClick={() => {
              setStickerPop(false);
              setSt(1);
            }}
            src={one}
          />
          <img
            onClick={() => {
              setStickerPop(false);
              setSt(2);
            }}
            src={`${process.env.PUBLIC_URL}/img/2.png`}
          />
          <img
            onClick={() => {
              setStickerPop(false);
              setSt(3);
            }}
            src={`${process.env.PUBLIC_URL}/img/3.png`}
          />
          <img
            onClick={() => {
              setStickerPop(false);
              setSt(4);
            }}
            src={`${process.env.PUBLIC_URL}/img/4.png`}
          />
          <img
            onClick={() => {
              setStickerPop(false);
              setSt(5);
            }}
            src={`${process.env.PUBLIC_URL}/img/5.png`}
          />
          <img
            onClick={() => {
              setStickerPop(false);
              setSt(6);
            }}
            src={`${process.env.PUBLIC_URL}/img/6.png`}
          />
          <img
            onClick={() => {
              setStickerPop(false);
              setSt(7);
            }}
            src={`${process.env.PUBLIC_URL}/img/7.png`}
          />
          <img
            onClick={() => {
              setStickerPop(false);
              setSt(8);
            }}
            src={`${process.env.PUBLIC_URL}/img/8.png`}
          />
        </div>
      </div>
    </>
  );
};

export default StickerWrite;
