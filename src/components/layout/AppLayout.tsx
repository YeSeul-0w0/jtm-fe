import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

const AppLayout = () => {
  return (
    <StyledContainer>
      <Outlet />
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  max-width: 375px;
  height: 100vh;
  // min-height: 100vh;
  margin: auto;
  border: 1px solid lightgrey; // 경계 구분용
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  align-content: stretch;
  position: relative;
  transform: translateX(-0%);
  /* overflow-y: hidden; */
  overflow-x: hidden;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  ::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
  @media screen and (min-height: 901px) {
    min-height: unset;
    max-height: 900px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    margin: unset;
    position: absolute;
    width: 100%;
  }
`;

export default AppLayout;
