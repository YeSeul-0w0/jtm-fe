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
  const { paperTitle } = useParams();
  const { user, token } = useAuthState();
  const userEmail = user?.email;

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
            email: userEmail,
          },
        },
      });
      setOnInfo('성공적으로 페이퍼가 \n 개설 되었습니다.');
      setOnUrl('/createPaper');
      setOnButton(true);
      setOnModal(true);
    } catch (err) {
      setOnInfo('페이퍼 개설에 \n 실패했습니다.');
      setOnUrl('/createPaper');
      setOnButton(false);
      setOnModal(true);
      console.log(err);
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

  return (
    <>
      <Header pageNm="롤링페이퍼 만들기" to="/createPaper/decideName" />
      {onModal ? (
        <Modal
          info={onInfo}
          confirm={onButton}
          onModal={onModal}
          setOnModal={setOnModal}
          onButtonHref={onUrl}
          href={onUrl}
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
