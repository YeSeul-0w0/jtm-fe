import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import BottomBtn from '../common/BottomBtn';

interface Tu {
  setTutorial: React.Dispatch<React.SetStateAction<boolean>>;
}

const Tutorial = ({ setTutorial }: Tu) => {
  const [pageNum, setPageNum] = useState<number>(0);
  const dots = document.querySelectorAll('.dot') as NodeListOf<HTMLDivElement>;

  useEffect(() => {
    const dot = dots[pageNum] as HTMLDivElement;
    if (dot) {
      dot.style.backgroundColor = '#111';
      dots.forEach((item, idx) => {
        if (idx !== pageNum) item.style.backgroundColor = '#ddd';
      });
    }
  }, [pageNum]);

  return (
    <Tuto>
      <h3>튜토리얼</h3>
      <img src={require(`../../static/tutorialImg/tuto${pageNum}.png`)} />
      <div className="bottom-fix">
        <BottomBtn
          text={pageNum > 1 ? '메인화면으로 이동하기' : '다음'}
          onclick={() =>
            pageNum > 1 ? setTutorial(false) : setPageNum(prev => prev + 1)
          }
        />
      </div>
      <div className="page-round">
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </div>
    </Tuto>
  );
};

const Tuto = styled.article`
  width: 100%;
  height: 100%;
  padding: 0 32px;
  box-sizing: border-box;
  h3 {
    font-size: 24px;
    margin: 20px 0 93px 0;
  }
  img {
    width: 100%;
  }
  .bottom-fix {
    width: 80%;
    position: fixed;
    bottom: 34px;
    button {
      width: 100%;
      font-weight: bold;
    }
  }
  .page-round {
    width: 50px;
    height: 10px;
    display: flex;
    justify-content: space-between;
    position: absolute;
    bottom: 170px;
    left: 50%;
    transform: translateX(-50%);
    .dot {
      width: 8px;
      height: 8px;
      border-radius: 8px;
      background-color: #ddd;
      :first-child {
        background-color: #111;
      }
    }
  }
`;

export default Tutorial;
