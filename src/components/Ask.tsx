import React from 'react';
import styled from 'styled-components';
import Header from './layout/Header';

export const Ask = () => {
  return (
    <>
      <Header pageNm="문의하기" to="/createPaper" />
      <StyledMain>
        <h1>
          궁금한 점이
          <br />
          있으신가요?
        </h1>
        <p>
          이용 중 문제가 발생한다면 알려주세요.
          <br />
          확인 후 빠르게 답변 드리겠습니다.
        </p>
        <a href="https://mailto:messagetometeam@gmail.com" target="_blank">
          <span>이메일 보내기</span>
          <span>→</span>
        </a>
      </StyledMain>
    </>
  );
};

const StyledMain = styled.main`
  width: 88%;
  height: 80%;
  line-height: 1.5rem;
  h1 {
    font-size: 1.25rem;
  }
  p {
    color: #bbbbbb;
    margin-top: 1.25rem;
    line-height: 1.25rem;
    font-weight: 700;
  }
  a {
    margin-top: 2.5rem;
    display: inline-block;
    border-bottom: 1px solid black;
    span {
      font-size: 0.85rem;
      font-weight: 800;
      padding-bottom: 1.75rem;
      &:nth-child(2) {
        padding-left: 2rem;
      }
    }
    &:hover {
      cursor: pointer;
      color: #bbbbbb;
    }
  }
`;
