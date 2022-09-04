import React, { useState } from 'react';
import Header from '../layout/Header';
import BottomBtn from '../common/BottomBtn';
import ThemeList from './ThemeList';
import styled from 'styled-components';
import monotone from '../../static/theme/monotone.jpg';
import congratulations from '../../static/theme/congratulations.jpg';
import love from '../../static/theme/love.jpg';
import axios from 'axios';
import EnvConfig from '../../config/EnvConfig';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthState } from '../../../src/context';
import Modal from '../common/Modal';

function Theme() {
  const [selectTheme, setSelectTheme] = useState<number>(0);
  const [onModal, setOnModal] = useState<boolean>(false);
  const [onButton, setOnButton] = useState<boolean>(false);
  const [onInfo, setOnInfo] = useState<string>('확인 중...');
  const [onUrl, setOnUrl] = useState<string>('/');
  const [flag, setFlag] = useState<boolean>(false);
  const { paperTitle } = useParams();
  const { user, kakaoToken } = useAuthState();
  const userId = user?.userId;

  const inputSelectTheme = (x: number) => {
    setSelectTheme(x);
  };

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
          '페이퍼 제목은 \n 10자 미만으로 가능하며 \n 페이퍼는 하루에 \n 1회만 개설 가능합니다.'
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

  const theme = [
    {
      id: 1,
      path: monotone,
      name: '기본',
      eng: 'Monotone',
      isChecked: false,
    },
    {
      id: 2,
      path: congratulations,
      name: '축하',
      eng: 'Congratulations',
      isChecked: false,
    },
    {
      id: 3,
      path: love,
      name: '사랑,우정',
      eng: 'Love, Friendship',
      isChecked: false,
    },
  ];

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
        <TextStyle>테마를 선택해주세요.</TextStyle>
        <ComponentStyle>
          {theme.map(value => (
            <ThemeList
              set={inputSelectTheme}
              path={value.path}
              name={value.name}
              eng={value.eng}
              key={value.id}
            />
          ))}
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

const TextStyle = styled.label`
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

export default Theme;
