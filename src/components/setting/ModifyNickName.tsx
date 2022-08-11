import React, { useState } from 'react';
import Header from '../layout/Header';
import styled from 'styled-components';
import { TextInput } from '../common/TextInput';
import BottomBtn from '../common/BottomBtn';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import EnvConfig from '../../config/EnvConfig';
import { useAuthState } from '../../../src/context';
import Modal from '../common/Modal';

function ModifyNickName() {
  const [nickName, setNickName] = useState<string>('');
  const [onModal, setOnModal] = useState<boolean>(false);
  const [onInfo, setOnInfo] = useState<string>('');
  const navigate = useNavigate();
  const { user, token } = useAuthState();
  const userEmail = user?.email;

  const sendChangeName = async () => {
    try {
      await axios({
        method: 'put',
        url: `${EnvConfig.LANTO_SERVER}update`,
        data: {
          email: userEmail,
          userName: nickName,
          password: '123',
        },
      });
      setOnInfo('성공적으로 변경되었습니다.');
      setOnModal(true);
    } catch (err) {
      console.log(err);
      setOnInfo('닉네임 변경에 실패했습니다.');
      setOnModal(true);
    }
  };

  return (
    <>
      <Header pageNm="닉네임 변경" to="/createPaper" />
      {onModal ? (
        <Modal
          info={onInfo}
          confirm={false}
          onModal={onModal}
          setOnModal={setOnModal}
        />
      ) : null}
      <Component>
        <MainText>
          {' '}
          변경할 닉네임을 <br /> 입력해주세요.{' '}
        </MainText>
        <SubText> 10자 이하만 가능해요. </SubText>
        <TextInput
          title=""
          htmlFor="paperNm"
          background="white"
          border="1px solid black"
          onChange={(e: any) => setNickName(e.target.value)}
        />
        <Temp />
        <BottomBtn
          onclick={sendChangeName}
          text="다음"
          disabled={nickName.length <= 0 ? true : false}
        />
      </Component>
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
  height: 50vh;
`;

const SubText = styled.div`
  margin-top: 0.8rem;
  margin-bottom: 3rem;
  color: #bbbbbb;
`;

export default ModifyNickName;
