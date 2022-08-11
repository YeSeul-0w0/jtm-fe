import React, { useEffect, useReducer, useRef, useState } from 'react';
import { messageInitialState, messageReducer, move } from './messageStore';

const Sticker = ({ setMove, x, y, url, setPostX, setPostY }: any) => {
  const [leftLimit, setLeftLimit] = useState<number>(0);
  const [rightLimit, setRightLimit] = useState<number>(0);
  const [topLimit, setTopLimit] = useState<number>(0);
  const [bottomLimit, setBottomLimit] = useState<number>(0);
  // const [x, setX] = useState<number>(0);
  // const [move, setMove] = useState<boolean>(false);
  const wrapRef = useRef<any>();

  const [state, dispatch] = useReducer(messageReducer, messageInitialState);

  useEffect(() => {
    setLeftLimit(wrapRef.current.parentElement.getBoundingClientRect().left);
    setRightLimit(
      wrapRef.current.parentElement.getBoundingClientRect().left +
        wrapRef.current.offsetWidth
    );
    setTopLimit(wrapRef.current.parentElement.getBoundingClientRect().y);
    setBottomLimit(
      wrapRef.current.parentElement.getBoundingClientRect().bottom
    );
  }, [window.innerWidth, window.innerHeight]);

  return (
    <img
      src={`${process.env.PUBLIC_URL}/img/${url}.png`}
      style={{
        position: 'absolute',
        left: `${setPostX ? x - leftLimit - 95 / 2 : x}px`,
        top: `${setPostY ? y - topLimit - 95 / 2 : y}px`,
        zIndex: 60,
      }}
      onMouseDown={() => setPostX && setMove(true)}
      onMouseUp={() => {
        setMove(false);
        setPostX(x - leftLimit - 95 / 2);
        setPostY(y - topLimit - 95 / 2);
      }}
      ref={wrapRef}
    />
  );
};
export default Sticker;
