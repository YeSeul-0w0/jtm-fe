import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from '../../context';

function FeedHeader() {
  const [isSideBarOpen, setSideBarOpen] = useState<boolean>(false);
  const onClick = () => {
    setSideBarOpen(!isSideBarOpen);
  };

  const Sidebar = () => {
    const navigate = useNavigate();
    const { user } = useAuthState();
    const sideBarRef = useRef<any>(null);

    // 사이드바 외부 클릭시 사이드바 닫히도록 함
    useEffect(() => {
      function handleClickOutside(e: MouseEvent): void {
        if (!sideBarRef.current.contains(e.target as Node)) {
          setSideBarOpen(false);
        }
      }
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [sideBarRef]);

    return (
      <>
        <SideBarWrapper ref={sideBarRef}>
          {user ? (
            <div onClick={() => navigate('/user/nickname')}>
              {user.userName}님 <span>✎</span>
            </div>
          ) : (
            <div onClick={() => navigate('/login')}>
              로그인하기 <span>＞</span>
            </div>
          )}
          <ul>
            <li>FAQ</li>
            <li>문의하기</li>
            {user && <li>로그아웃</li>}
            <li>
              <a
                href="https://docs.google.com/document/d/1Pju15M5Cm4m2WPDvxLs5gwo4lOXBZfr20D7rCFRKi0M/edit?usp=sharing"
                target="_blank"
              >
                서비스 이용약관
              </a>
            </li>
            <li>
              <a
                href="https://docs.google.com/document/d/11sXimrdfeWhsTN1f6D0oqjpyZmVOuXBDqYUUvkibvag/edit?usp=sharing"
                target="_blank"
              >
                개인정보 처리방침
              </a>
            </li>
            {user && <li>회원탈퇴</li>}
          </ul>
        </SideBarWrapper>
      </>
    );
  };

  return (
    <>
      <HeaderComponent>
        <Feed>Feed</Feed>
        <Hamburger>
          <FontAwesomeIcon onClick={onClick} icon={faBars} />
        </Hamburger>
        {isSideBarOpen && (
          <AsideWrapper>
            <Sidebar />
          </AsideWrapper>
        )}
      </HeaderComponent>
    </>
  );
}

const SideBarWrapper = styled.aside`
  padding: 4rem 2rem;
  position: absolute;
  top: 0;
  right: 0;
  width: 248px;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: white;
  transition: transform 0.5s ease 0s;
  text-align: left;
  div {
    font-size: 1.25rem;
    margin: 1rem 0;
    font-weight: 900;
    cursor: pointer;
    span {
      color: grey;
      font-size: 1.25rem;
      // font-weight: bold;
      margin-left: 0.25rem;
    }
    &:after {
      content: ' ';
      display: block;
      margin-top: 1rem;
      border-bottom: 1px solid lightgrey;
    }
  }
  ul {
    font-size: 1rem;
    font-weight: normal;
    li {
      padding: 0.75rem 0;
      cursor: pointer;
      &:hover {
        font-weight: bold;
      }
    }
  }
`;

const AsideWrapper = styled.div`
  position: fixed;
  top: 0px;
  width: 100%;
  max-width: 375px;
  height: 100vh;
  overflow: hidden;
  background-color: rgba(23, 23, 23, 0.5);
  z-index: 100;
  transition: transform 0.5s ease 0s;
`;

const HeaderComponent = styled.header`
  padding: 1.5rem 0;
  text-align: center;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const Feed = styled.span`
  margin: 0.5rem 0 0 2rem;
  font-size: 1.5rem;
  font-weight: 900;
`;

const Hamburger = styled.div`
  margin: 0.9rem 2rem 0 0;
  &:hover {
    background-color: skyblue;
  }
`;

export default FeedHeader;
