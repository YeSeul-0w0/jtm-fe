import React from 'react';
import styled from 'styled-components';
import Header from './layout/Header';

const StyledMain = styled.main`
  width: 80%;
  margin-top: 1rem;
  line-height: 180%;
  text-align: left;
  > h1 {
    padding: 1rem 0 0.5rem;
    font-size: 20px;
  }
  > div {
    padding: 0.5rem 0;
    border-bottom: 1px solid rgba(238, 238, 238, 1);
    span {
      margin-right: 1rem;
    }
    a {
      display: block;
      font-size: 18px;
      font-weight: 600;
    }
  }
`;
export const Credit = () => {
  return (
    <>
      <Header pageNm="만든이 소개" to="/createPaper" />
      <StyledMain>
        <h1>백엔드</h1>
        <div>
          <a href="https://github.com/superkingyj" target="_blank">
            <span>🐙</span>Jam
          </a>
          <a href="https://github.com/better-nine" target="_blank">
            <span>🦈</span>Merge
          </a>
          <a href="https://github.com/tein408" target="_blank">
            <span>🦩</span>Lanto
          </a>
        </div>
        <h1>프론트엔드</h1>
        <div>
          <a href="https://github.com/yeseul-0w0" target="_blank">
            <span>🍦</span>Vanila
          </a>
          <a href="https://github.com/bokumbob" target="_blank">
            <span>🍚</span>Bokkbab
          </a>
          <a href="https://github.com/pullingoff" target="_blank">
            <span>🥭</span>Haeun
          </a>
        </div>
        <h1>디자인</h1>
        <div>
          <a>
            <span>🍲</span>Mara
          </a>
        </div>
        <h1>기획</h1>
        <div>
          <a>
            <span>👖</span>Pants
          </a>
        </div>
        <h1>서비스 작명</h1>
        <div>
          <a>
            <span>🐦</span>익명의 까마귀
          </a>
        </div>
      </StyledMain>
    </>
  );
};
