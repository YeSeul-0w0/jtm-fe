import React, { useEffect, useReducer, useRef, useState } from 'react';
import Modal from '../common/Modal';
import { stickerDelete, stickerPost } from './messageFunction';
import { messageInitialState, messageReducer, move } from './messageStore';

const Sticker = ({
  userId,
  setMove,
  x,
  y,
  z,
  url,
  postX,
  postY,
  paperId,
  setPostX,
  setPostY,
  setSt,
  stickerId,
  stickerUserName,
  currentUserName,
}: any) => {
  const [leftLimit, setLeftLimit] = useState<number>(0);
  const [topLimit, setTopLimit] = useState<number>(0);
  const [currentFix, setCurrentFix] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [cancel, setCancel] = useState<boolean>(false);
  const wrapRef = useRef<any>();

  useEffect(() => {
    setLeftLimit(wrapRef.current.parentElement.getBoundingClientRect().left);
    setTopLimit(wrapRef.current.parentElement.getBoundingClientRect().y);
  }, [window.innerWidth, window.innerHeight]);

  useEffect(() => {
    if (currentFix) setMove?.(true);
    else setMove?.(false);
  }, [currentFix]);

  return (
    <>
      {open && (
        <Modal
          confirm={true}
          info={
            cancel
              ? setPostX
                ? '스티커 붙이기를 취소하시겠습니까?'
                : '스티커를 삭제하시겠습니까?'
              : '스티커를 붙이시겠습니까?'
          }
          onModal={open}
          setOnModal={setOpen}
          onClick={
            cancel
              ? stickerId
                ? () => {
                    stickerDelete(stickerId, userId, paperId);
                    setOpen(false);
                  }
                : () => {
                    setSt(false);
                    setOpen(false);
                  }
              : () => {
                  stickerPost(
                    userId,
                    postX,
                    postY + wrapRef.current.nextElementSibling.scrollTop,
                    paperId!,
                    url
                  );
                  setOpen(false);
                  setCurrentFix(false);
                }
          }
        />
      )}
      <div
        className={currentFix ? 'solo-sticker-wrap click' : 'solo-sticker-wrap'}
        style={{
          position: 'absolute',
          left: `${setPostX ? x - leftLimit - 95 / 2 : x}px`,
          top: `${setPostY ? y - topLimit - 133 / 2 : y}px`,
          zIndex: `${z ? z : '60'}`,
        }}
        onClick={() => {
          if (stickerUserName === currentUserName) {
            setCurrentFix(prev => !prev);
          }
        }}
        ref={wrapRef}
      >
        {currentFix && (
          <>
            {setPostX && (
              <div
                className="check-box"
                onClick={() => {
                  setOpen(true);
                  setCancel(false);
                  setPostX?.(x - leftLimit - 95 / 2);
                  setPostY?.(y - topLimit - 133 / 2);
                }}
              >
                <svg
                  width="13"
                  height="10"
                  viewBox="0 0 13 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.12427 1.13501L6.78027 9.19945"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M7.09424 8.84302L11.3369 1.49455"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
            )}
            <div
              className="x-box"
              onClick={() => {
                setOpen(true);
                setCancel(true);
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 4L4 12"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M4 4L12 12"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </>
        )}
        <img src={`${process.env.PUBLIC_URL}/img/${url}.png`} />
      </div>
    </>
  );
};

export default Sticker;
