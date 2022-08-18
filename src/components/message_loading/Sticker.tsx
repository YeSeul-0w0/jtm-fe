import React, { useEffect, useReducer, useRef, useState } from 'react';
import Modal from '../common/Modal';
import { stickerDelete, stickerPost } from './messageFunction';
import { messageInitialState, messageReducer, move } from './messageStore';

const Sticker = ({
  email,
  setMove,
  x,
  y,
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
  // const [change, setChange] = useState<boolean>(false);
  // const [rightLimit, setRightLimit] = useState<number>(0);
  // const [bottomLimit, setBottomLimit] = useState<number>(0);
  // const [x, setX] = useState<number>(0);
  // const [move, setMove] = useState<boolean>(false);
  const wrapRef = useRef<any>();

  useEffect(() => {
    // 창 크기가 바뀔 때마다 현재 메인 컴포넌트의 왼쪽 위치 값과 위 위치 값을 가져옵니다
    setLeftLimit(wrapRef.current.parentElement.getBoundingClientRect().left);
    setTopLimit(wrapRef.current.parentElement.getBoundingClientRect().y);
    // setRightLimit(
    // wrapRef.current.parentElement.getBoundingClientRect().left +
    // wrapRef.current.offsetWidth
    // );
    // setBottomLimit(
    // wrapRef.current.parentElement.getBoundingClientRect().bottom
    // );
  }, [window.innerWidth, window.innerHeight]);

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
                    stickerDelete(stickerId, email, paperId);
                    setOpen(false);
                  }
                : setSt(0)
              : () => {
                  stickerPost(email, postX, postY, paperId!, url);
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
          // 포지션 앱솔루트에 의해 빈 공간만큼 더 이동하는 걸 방지하기 위해 레프트, 탑 빼주고
          // 커서를 스티커 이미지의 정중앙으로 두기 위해 이미지의 절반만큼 빼줬습니다
          left: `${setPostX ? x - leftLimit - 95 / 2 : x}px`,
          top: `${setPostY ? y - topLimit - 133 / 2 : y}px`,
          zIndex: 60,
        }}
        onClick={() => {
          if (stickerUserName === currentUserName) {
            setCurrentFix(prev => !prev);
          }
        }}
        onTouchStart={() => {
          window.innerWidth < 1000 && currentFix && setPostY && setMove(true);
          // console.log(123);
        }}
        onTouchEnd={() => {
          window.innerWidth < 1000 && currentFix && setPostY && setMove(false);
          setPostX(x - leftLimit - 95 / 2);
          setPostY(y - topLimit - 133 / 2);
          // console.log(456);
        }}
        onMouseDown={() => currentFix && setPostY && setMove(true)}
        onMouseUp={() => {
          currentFix && setPostY && setMove(false);
          setPostX(x - leftLimit - 95 / 2);
          setPostY(y - topLimit - 133 / 2);
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
