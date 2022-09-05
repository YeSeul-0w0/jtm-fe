import React, { useState } from 'react';
import Header from '../layout/Header';
import BottomBtn from '../common/BottomBtn';
import styled from 'styled-components';
import monotone from '../../static/theme/monotone.jpg';
import congratulations from '../../static/theme/congratulations.jpg';
import love from '../../static/theme/love.jpg';
import axios from 'axios';
import EnvConfig from '../../config/EnvConfig';
import { useParams } from 'react-router-dom';
import { useAuthState } from '../../../src/context';
import Modal from '../common/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleDot } from '@fortawesome/free-solid-svg-icons';

function Theme() {
  const [selectTheme, setSelectTheme] = useState<number>(0);
  const [onModal, setOnModal] = useState<boolean>(false);
  const [onInfo, setOnInfo] = useState<string>('');
  const [flag, setFlag] = useState<boolean>(false);
  const { paperTitle } = useParams();
  // selecting Theme
  const [checkMonotone, setCheckMonotone] = useState<boolean>(false);
  const [checkLove, setCheckLove] = useState<boolean>(false);
  const [checkCongratulation, setCheckongratulation] = useState<boolean>(false);

  const { user, kakaoToken } = useAuthState();
  const userId = user?.userId;

  const sendInfo = async () => {
    try {
      await axios({
        method: 'post',
        url: EnvConfig.CREATE_PAPER,
        data: {
          paper: {
            paperTitle: paperTitle,
            skin: selectTheme,
          },
          user: {
            userId: userId,
          },
        },
      });
      setOnInfo('성공적으로 페이퍼가 \n 개설 되었습니다.');
      setOnModal(true);
      setFlag(true);
    } catch (err: any) {
      if (err.response.status === 400) {
        setOnInfo(
          '페이퍼 제목은 \n 50자 미만으로 가능하며 \n 페이퍼는 하루에 \n 1회만 개설 가능합니다.'
        );
        setOnModal(true);
        setFlag(true);
      } else if (err.response.status === 409) {
        setOnInfo('페이퍼 제목이 중복되었습니다.');
        setOnModal(true);
        setFlag(false);
      } else if (err.response.status === 500) {
        setOnInfo('관리자에게 문의해주십시오.');
        setOnModal(true);
        setFlag(true);
      }
    }
  };

  const choice = (name: string) => {
    switch (name) {
      case '기본':
        setCheckMonotone(true);
        setCheckongratulation(false);
        setCheckLove(false);
        setSelectTheme(1);
        break;
      case '축하':
        setCheckongratulation(true);
        setCheckLove(false);
        setCheckMonotone(false);
        setSelectTheme(2);
        break;
      case '사랑':
        setCheckLove(true);
        setCheckongratulation(false);
        setCheckMonotone(false);
        setSelectTheme(3);
        break;
    }
  };

  const onClick = () => {
    if (flag) {
      window.location.href = '/main';
    } else {
      setOnModal(false);
    }
  };

  return (
    <>
      <Header pageNm="롤링페이퍼 만들기" to="/createPaper/decideName" />
      {onModal ? (
        <Modal
          info={onInfo}
          confirm={false}
          onModal={onModal}
          setOnModal={setOnModal}
          onClick={onClick}
        />
      ) : null}
      <WholeStyle>
        <InfoStyle>테마를 선택해주세요.</InfoStyle>
        <ComponentStyle>
          <ItemStyle>
            <ImgComponent
              className={checkMonotone ? `select-img` : `not-select-img`}
            >
              <img
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                }}
                onClick={() => choice('기본')}
                src={monotone}
                alt="기본"
              />
              <FontAwesomeStyle>
                <FontAwesomeIcon
                  className={checkMonotone ? `select-img` : `not-select-img`}
                  onClick={() => choice('기본')}
                  icon={faCircleDot}
                />
              </FontAwesomeStyle>
            </ImgComponent>
            <TextStyle>
              <MainName>기본</MainName>
              <SubName>Monotone</SubName>
            </TextStyle>
          </ItemStyle>
          <ItemStyle>
            <ImgComponent
              className={checkCongratulation ? `select-img` : `not-select-img`}
            >
              <img
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                }}
                onClick={() => choice('축하')}
                src={congratulations}
                alt="축하"
              />
              <FontAwesomeStyle>
                <FontAwesomeIcon
                  className={
                    checkCongratulation ? `select-img` : `not-select-img`
                  }
                  onClick={() => choice('축하')}
                  icon={faCircleDot}
                />
              </FontAwesomeStyle>
            </ImgComponent>
            <TextStyle>
              <MainName>축하</MainName>
              <SubName>Congratulations</SubName>
            </TextStyle>
          </ItemStyle>
          <ItemStyle>
            <ImgComponent
              className={checkLove ? `select-img` : `not-select-img`}
            >
              <img
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                }}
                onClick={() => choice('사랑')}
                src={love}
                alt="축하"
              />
              <FontAwesomeStyle>
                <FontAwesomeIcon
                  className={checkLove ? `select-img` : `not-select-img`}
                  onClick={() => choice('사랑')}
                  icon={faCircleDot}
                />
              </FontAwesomeStyle>
            </ImgComponent>
            <TextStyle>
              <MainName>사랑, 우정</MainName>
              <SubName>Love, Friendship</SubName>
            </TextStyle>
          </ItemStyle>
        </ComponentStyle>
      </WholeStyle>
      <BottomBtn
        text="다음"
        onclick={sendInfo}
        disabled={selectTheme > 0 ? false : true}
      ></BottomBtn>
    </>
  );
}

const WholeStyle = styled.main`
  height: 100%;
  margin: 5rem 1rem;
`;

const InfoStyle = styled.label`
  font-size: 1rem;
  font-weight: bold;
  display: inline-block;
  margin: 20px 0;
`;

const ComponentStyle = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  height: auto;
  gap: 0.5rem;
`;

const ItemStyle = styled.div`
  border-radius: 1rem;
  margin-bottom: 0.2rem;
  word-break: break-all;
  width: auto;
  height: 220px;
  > .not-select-img {
    border: 1.5px solid lightgrey;
  }
  > .select-img {
    border: 3px solid #111111;
  }
`;

const ImgComponent = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 1rem;
  margin-bottom: 0.5rem;
  width: 144px;
  height: 144px;
  > .not-select-img {
    border: 3px solid lightgrey;
  }
  > .select-img {
    border: 3px solid #111111;
  }
`;

const FontAwesomeStyle = styled.div`
  position: absolute;
  margin: 0.7rem 0.7rem 0;
  top: 0;
  right: 0;
  > .not-select-img {
    color: #cccccc;
  }
  > .select-img {
    color: #111111;
  }
`;

const TextStyle = styled.div`
  text-align: center;
  margin-top: 0.8rem;
`;

const MainName = styled.div`
  font-weight: bold;
  color: #333333;
`;

const SubName = styled.div`
  margin-top: 0.5rem;
  color: #999999;
`;

export default Theme;
