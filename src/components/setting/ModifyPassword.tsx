import React, { useState } from 'react';
import Header from '../layout/Header';
import styled from 'styled-components';
import { TextInput } from '../common/TextInput';
import BottomBtn from '../common/BottomBtn';
import { passwordTest } from 'src/config/RegExp';
import axios from 'axios';
import EnvConfig from '../../config/EnvConfig';
import { useAuthState } from '../../../src/context';
import Modal from '../common/Modal';

function ModifyPassword() {
  const [password, setPassword] = useState<string>('');
  const [checkPassword, setCheckPassword] = useState<string>('');
  const [onModal, setOnModal] = useState<boolean>(false);
  const [onInfo, setOnInfo] = useState<string>('');
  const [flag, setFlag] = useState<boolean>(false);
  const { user, kakaoToken } = useAuthState();
  const userId = user?.userId;

  const sendChangeName = async () => {
    if (passwordTest.test(password) && password === checkPassword) {
      try {
        await axios({
          method: 'put',
          url: `${EnvConfig.LANTO_SERVER}update`,
          data: {
            userId: userId,
            password: password,
          },
        });
        setOnInfo('성공적으로 변경되었습니다.');
        setFlag(true);
        setOnModal(true);
      } catch (err) {
        console.log(err);
        setOnInfo('비밀번호 변경에 실패' +
          '했습니다.');
        setOnModal(true);
      }
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
      <Header pageNm="비밀번호 변경" to="/main" />
      {onModal ? (
        <Modal
          info={onInfo}
          confirm={false}
          onModal={onModal}
          onClick={onClick}
          setOnModal={setOnModal}
        />
      ) : null}
      <main>
        <MainText>
          {' '}
          변경할 비밀번호를 <br /> 입력해주세요.{' '}
        </MainText>
        <SubText />
        <TextInput
          title=""
          isPassword={true}
          htmlFor="paperNm"
          background="white"
          border="1px solid black"
          onChange={(e: any) => setPassword(e.target.value)}
        />
        <Temp />
        <SubText> 다시 한 번 더 입력해주세요. </SubText>
        <TextInput
          title=""
          isPassword={true}
          htmlFor="paperNm"
          background="white"
          border="1px solid black"
          onChange={(e: any) => setCheckPassword(e.target.value)}
        />
      </main>
      <BottomBtn
        onclick={sendChangeName}
        text="다음"
        disabled={
          password.length > 0 && checkPassword.length > 0 ? false : true
        }
      />
    </>
  );
}

const Component = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const MainText = styled.div`
  margin-top: 3rem;
  font-weight: bold;
  font-size: 1.8rem;
  line-height: normal;
  margin-right: 6rem;
  color: #111111;
`;

const Temp = styled.div`
  height: 3vh;
`;

const SubText = styled.div`
  margin-top: 1rem;
  color: #bbbbbb;
`;

export default ModifyPassword;
