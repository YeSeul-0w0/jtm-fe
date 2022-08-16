import axios from 'axios';
import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from 'react';
import { Btn } from '../common/Btn';
import { messageInitialState, messageReducer } from './messageStore';
import Sticker from './Sticker';

import one from '../../static/sticker/1.png';

const StickerWrite = ({ setStickerPop, setSt }: any) => {
  const [state, dispatch] = useReducer(messageReducer, messageInitialState);
  return (
    <>
      {/* 스티커 클릭시 각 스티커 값이 setSt에 담기고 팝업을 닫습니다 */}
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
            // src={`${process.env.PUBLIC_URL}/img/1.png`}
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
          {/* setStickerPop(false); */}
        </div>
      </div>
    </>
  );
};

export default StickerWrite;
