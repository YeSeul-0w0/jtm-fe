import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthState } from '../../context';
import { IUser } from '@src/interfaces/ILogin';
import FeedHeader from '../common/FeedHeader';
import BottomBtn from '../common/BottomBtn';
import PaperList from '../paper_view/PaperList';
import FloatingButton from '../common/FloatingButton';
import { getPaperList } from '../../api/paper';
import axios from 'axios';
import EnvConfig from '../../config/EnvConfig';
import Modal from '../common/Modal';
import Tutorial from '../tutorial/Tutorial';

const Option = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 80px;
  background-color: #000;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 68px;
`;

const PaperMain = () => {
  const { user, kakaoToken } = useAuthState(); // id 토큰, user 닉네임
  const navigate = useNavigate();
  if (!user?.userId) navigate('/login');
  const [userPaperNum, setUserPaperNum] = useState<number>(0);

  useEffect(() => {
    async function fetchPaperCnt(userId: string) {
      const allData = await getPaperList(userId);
      const paperLength = (allData?.length || 0).toString();
      localStorage.setItem('userPaperCnt', paperLength);
      return paperLength;
    }
    user &&
      fetchPaperCnt(user.userId).then(() => {
        if (localStorage.getItem('userPaperCnt')) {
          setUserPaperNum(
            parseInt(localStorage.getItem('userPaperCnt') || '0')
          );
        }
      });
    // console.log(user);
  }, []);
  // user의 userName 없으면 페이지 login으로 리디렉트
  return (
    <>
      <FeedHeader />
      {user && userPaperNum > 0 ? (
        <ViewPapers user={user} paperCnt={userPaperNum} />
      ) : (
        user && <SuggestCreation userName={user?.userName} />
      )}
    </>
  );
};

// 유저의 페이퍼가 있는 경우
const ViewPapers = ({ user, paperCnt }: { user: IUser; paperCnt: number }) => {
  let userId = '';
  if (user.userId) userId = user.userId;
  // 유저 페이퍼가 있는 경우 가로 크기가 AppLayout을 벗어나는 문제가 발생
  // 해당 문제를 잡기 위해 width 크기를 추가해주었습니다.
  // 또한 이중스크롤 방지를 위해 overflow : scroll 옵션을 제거했습니다.
  const [onComponent, setOnComponent] = useState<boolean>(false);
  const [paperId, setPaperId] = useState<string>('0');
  const [checkDelete, setCheckDelete] = useState<boolean>(false);
  const navigate = useNavigate();
  const modifyPaper = (pId: string) => {
    // console.log('modify', pId);
    navigate(`/changePaperName/${pId}`);
  };

  const [onModal, setOnModal] = useState<boolean>(false);
  const [onInfo, setOnInfo] = useState<string>('');

  const onClickDelete = () => {
    console.log('check', checkDelete);
    if (checkDelete) {
      window.location.href = '/main';
    } else {
      setOnModal(false);
    }
  };

  const deletePaper = async (pId: string) => {
    try {
      await axios({
        method: 'delete',
        url: `${EnvConfig.LANTO_SERVER}paper/${pId}`,
        data: {
          user: {
            userId: userId,
          },
        },
      });
      setOnModal(true);
      setCheckDelete(true);
      setOnInfo('성공적으로 제거 되었습니다.');
    } catch (err) {
      setOnModal(true);
      setOnInfo('페이퍼 삭제에 실패했습니다.');
    }
  };

  const setupPaper = (id: string) => {
    setPaperId(id);
  };

  const changeComponent = (x: any) => {
    setOnComponent(x);
  };

  const close = useRef<any>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent): void {
      if (!close?.current?.contains(e.target as Node)) {
        // console.log('click?');
        setOnComponent(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [close]);

  const onClose = () => {
    setOnComponent(!onComponent);
  };

  const copy = (e: string) => {
    navigator.clipboard.writeText(`https://www.byeolmal.today/paper/${e}`);
    setOnModal(true);
    setOnInfo(
      '페이퍼 링크가 복사되었습니다. \n  링크를 공유하여 메시지를 받아보세요!'
    );
  };

  return (
    <main style={{ width: '100%', overflowY: 'hidden' }}>
      <FloatingButton />
      <h1
        style={{
          fontSize: '20px',
          fontWeight: '900',
          lineHeight: '1.75rem',
          paddingLeft: '2rem',
        }}
      >
        {onModal ? (
          <Modal
            info={onInfo}
            confirm={false}
            onModal={onModal}
            setOnModal={setOnModal}
            onClick={onClickDelete}
          ></Modal>
        ) : null}
        {user && (
          <>
            <p>
              {user.userName}님, <br /> 롤링페이퍼의 묘미는
              <br />
              따뜻한 진심이 아닐까요?
            </p>
            <span style={{ color: '#BBBBBB' }}>
              {paperCnt}개의 롤링페이퍼가 있습니다!
            </span>
          </>
        )}
      </h1>
      <ServiceDue />
      {onComponent ? (
        <Wrapper>
          <ButtonWrapper ref={close}>
            <ModifyDelete onClick={onClose}>
              <Item onClick={() => modifyPaper(paperId)}>
                {' '}
                페이퍼 설정 수정하기{' '}
              </Item>
              <Item onClick={() => deletePaper(paperId)}>
                {' '}
                페이퍼 삭제하기{' '}
              </Item>
              <Item onClick={() => copy(paperId)}> 페이퍼 공유하기 </Item>
            </ModifyDelete>
          </ButtonWrapper>
        </Wrapper>
      ) : null}
      <PaperList
        userId={userId}
        setPaperId={setupPaper}
        onSelect={onComponent}
        setSelect={changeComponent}
      />
    </main>
  );
};

// 유저의 페이퍼가 없는 경우
const SuggestCreation = ({ userName }: { userName: string }) => {
  const [tutorial, setTutorial] = useState<boolean>(true);
  const navigate = useNavigate();

  return (
    <>
      {tutorial ? (
        <Tutorial setTutorial={setTutorial} />
      ) : (
        <>
          <StyledSuggestCreation>
            <p style={{ color: '#CCCCCC' }}>
              {userName}님,
              <br />
              안녕하세요!
            </p>
            <p style={{ color: '#999999' }}>
              아직 롤링페이퍼가
              <br />
              없으시군요,
            </p>
            <p style={{ color: 'gray' }}>
              한 번 새롭게
              <br />
              만들어보시겠어요?
            </p>
          </StyledSuggestCreation>
          <BottomBtn
            text={'새 롤링페이퍼 만들기'}
            onclick={() => navigate('/createPaper/decideName')}
          />
        </>
      )}
    </>
  );
};

const StyledSuggestCreation = styled.main`
  width: 90%;
  margin-left: 2rem; // feed header와 맞춤
  text-align: left;
  font-size: 1.75rem;
  font-weight: 900;
  line-height: normal;
`;

const SettingButton = () => {
  return (
    <Link to="/">
      <Option>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M19.4 15C19.2669 15.3016 19.2272 15.6362 19.286 15.9606C19.3448 16.285 19.4995 16.5843 19.73 16.82L19.79 16.88C19.976 17.0657 20.1235 17.2863 20.2241 17.5291C20.3248 17.7719 20.3766 18.0322 20.3766 18.295C20.3766 18.5578 20.3248 18.8181 20.2241 19.0609C20.1235 19.3037 19.976 19.5243 19.79 19.71C19.6043 19.896 19.3837 20.0435 19.1409 20.1441C18.8981 20.2448 18.6378 20.2966 18.375 20.2966C18.1122 20.2966 17.8519 20.2448 17.6091 20.1441C17.3663 20.0435 17.1457 19.896 16.96 19.71L16.9 19.65C16.6643 19.4195 16.365 19.2648 16.0406 19.206C15.7162 19.1472 15.3816 19.1869 15.08 19.32C14.7842 19.4468 14.532 19.6572 14.3543 19.9255C14.1766 20.1938 14.0813 20.5082 14.08 20.83V21C14.08 21.5304 13.8693 22.0391 13.4942 22.4142C13.1191 22.7893 12.6104 23 12.08 23C11.5496 23 11.0409 22.7893 10.6658 22.4142C10.2907 22.0391 10.08 21.5304 10.08 21V20.91C10.0723 20.579 9.96512 20.258 9.77251 19.9887C9.5799 19.7194 9.31074 19.5143 9 19.4C8.69838 19.2669 8.36381 19.2272 8.03941 19.286C7.71502 19.3448 7.41568 19.4995 7.18 19.73L7.12 19.79C6.93425 19.976 6.71368 20.1235 6.47088 20.2241C6.22808 20.3248 5.96783 20.3766 5.705 20.3766C5.44217 20.3766 5.18192 20.3248 4.93912 20.2241C4.69632 20.1235 4.47575 19.976 4.29 19.79C4.10405 19.6043 3.95653 19.3837 3.85588 19.1409C3.75523 18.8981 3.70343 18.6378 3.70343 18.375C3.70343 18.1122 3.75523 17.8519 3.85588 17.6091C3.95653 17.3663 4.10405 17.1457 4.29 16.96L4.35 16.9C4.58054 16.6643 4.73519 16.365 4.794 16.0406C4.85282 15.7162 4.81312 15.3816 4.68 15.08C4.55324 14.7842 4.34276 14.532 4.07447 14.3543C3.80618 14.1766 3.49179 14.0813 3.17 14.08H3C2.46957 14.08 1.96086 13.8693 1.58579 13.4942C1.21071 13.1191 1 12.6104 1 12.08C1 11.5496 1.21071 11.0409 1.58579 10.6658C1.96086 10.2907 2.46957 10.08 3 10.08H3.09C3.42099 10.0723 3.742 9.96512 4.0113 9.77251C4.28059 9.5799 4.48572 9.31074 4.6 9C4.73312 8.69838 4.77282 8.36381 4.714 8.03941C4.65519 7.71502 4.50054 7.41568 4.27 7.18L4.21 7.12C4.02405 6.93425 3.87653 6.71368 3.77588 6.47088C3.67523 6.22808 3.62343 5.96783 3.62343 5.705C3.62343 5.44217 3.67523 5.18192 3.77588 4.93912C3.87653 4.69632 4.02405 4.47575 4.21 4.29C4.39575 4.10405 4.61632 3.95653 4.85912 3.85588C5.10192 3.75523 5.36217 3.70343 5.625 3.70343C5.88783 3.70343 6.14808 3.75523 6.39088 3.85588C6.63368 3.95653 6.85425 4.10405 7.04 4.29L7.1 4.35C7.33568 4.58054 7.63502 4.73519 7.95941 4.794C8.28381 4.85282 8.61838 4.81312 8.92 4.68H9C9.29577 4.55324 9.54802 4.34276 9.72569 4.07447C9.90337 3.80618 9.99872 3.49179 10 3.17V3C10 2.46957 10.2107 1.96086 10.5858 1.58579C10.9609 1.21071 11.4696 1 12 1C12.5304 1 13.0391 1.21071 13.4142 1.58579C13.7893 1.96086 14 2.46957 14 3V3.09C14.0013 3.41179 14.0966 3.72618 14.2743 3.99447C14.452 4.26276 14.7042 4.47324 15 4.6C15.3016 4.73312 15.6362 4.77282 15.9606 4.714C16.285 4.65519 16.5843 4.50054 16.82 4.27L16.88 4.21C17.0657 4.02405 17.2863 3.87653 17.5291 3.77588C17.7719 3.67523 18.0322 3.62343 18.295 3.62343C18.5578 3.62343 18.8181 3.67523 19.0609 3.77588C19.3037 3.87653 19.5243 4.02405 19.71 4.21C19.896 4.39575 20.0435 4.61632 20.1441 4.85912C20.2448 5.10192 20.2966 5.36217 20.2966 5.625C20.2966 5.88783 20.2448 6.14808 20.1441 6.39088C20.0435 6.63368 19.896 6.85425 19.71 7.04L19.65 7.1C19.4195 7.33568 19.2648 7.63502 19.206 7.95941C19.1472 8.28381 19.1869 8.61838 19.32 8.92V9C19.4468 9.29577 19.6572 9.54802 19.9255 9.72569C20.1938 9.90337 20.5082 9.99872 20.83 10H21C21.5304 10 22.0391 10.2107 22.4142 10.5858C22.7893 10.9609 23 11.4696 23 12C23 12.5304 22.7893 13.0391 22.4142 13.4142C22.0391 13.7893 21.5304 14 21 14H20.91C20.5882 14.0013 20.2738 14.0966 20.0055 14.2743C19.7372 14.452 19.5268 14.7042 19.4 15V15Z"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Option>
    </Link>
  );
};

const ServiceDue = () => {
  return (
    <DueContainer>
      "별말, 씀"은 <br />
      2022년 9월 23일까지 운영합니다.
    </DueContainer>
  );
};

const DueContainer = styled.section`
  margin: 0.5rem 1.9rem 0;
  padding: 0.5rem 1rem;
  color: #bbbbbb;
  border: 1px solid #bbbbbb;
  border-radius: 5px;
  line-height: 140%;
  font-size: 14px;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  position: fixed;
  overflow: hidden;
  bottom: 0;
  height: 20%;
  background-color: white;
  border-top-left-radius: 1.5rem;
  border-top-right-radius: 1.5rem;
`;

const ModifyDelete = styled.div`
  background-color: white;
  width: 100%;
  position: fixed;
  height: 20%;
  //bottom: 20px;
  border-top-left-radius: 1.5rem;
  border-top-right-radius: 1.5rem;
`;

const Item = styled.button`
  border: none;
  background-color: transparent;
  width: 100%;
  height: 20%;
  font-size: 1rem;
  margin-top: 1.2rem;
  padding-left: 1rem;
  text-align: left;
  font-weight: bold;
  :hover {
    color: #00b860;
  }
`;

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  max-width: 375px;
  height: 100%;
  overflow: hidden;
  background-color: rgba(23, 23, 23, 0.5);
  z-index: 100;
  transition: transform 0.5s ease 0s;
`;

export default PaperMain;
