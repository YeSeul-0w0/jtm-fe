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
import { nickNameTest } from 'src/config/RegExp';

function ModifyNickName() {
  const [nickName, setNickName] = useState<string>('');
  const [onModal, setOnModal] = useState<boolean>(false);
  const [onInfo, setOnInfo] = useState<string>('');
  const [flag, setFlag] = useState<boolean>(false);
  const navigate = useNavigate();
  const { user, kakaoToken } = useAuthState();
  const userId = user?.userId;

  const sendChangeName = async () => {
    console.log(nickName);
    if (nickNameTest.test(nickName)) {
      try {
        await axios({
          method: 'put',
          url: `${EnvConfig.LANTO_SERVER}user/name`,
          data: {
            userId: userId,
            userName: nickName,
          },
        });
        const userData = JSON.parse(
          localStorage.getItem('currentUser') as string
        );
        userData.userName = nickName;
        localStorage.setItem('currentUser', JSON.stringify(userData));
        setOnInfo('성공적으로 변경되었습니다.');
        setOnModal(true);
        setFlag(true);
      } catch (err: any) {
        console.log(err.response.status);
        if (err.response.status === 409) {
          setOnInfo('중복된 닉네임입니다.');
          setOnModal(true);
        } else if (err.response.status === 500) {
          setOnInfo('관리자에게 문의하십시오.');
          setOnModal(true);
        }
      }
    } else {
      setOnInfo('닉네임 양식이 틀렸습니다ㅣ. \n 양식을 확인해주세요.');
      setOnModal(true);
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
      <Header pageNm="닉네임 변경" to="/main" />
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
        {/* <Temp /> */}
      </main>
      <BottomBtn
        onclick={sendChangeName}
        text="완료"
        disabled={nickName.length <= 0 ? true : false}
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
  height: 50vh;
`;

const SubText = styled.div`
  margin-top: 0.8rem;
  margin-bottom: 3rem;
  color: #bbbbbb;
`;

export default ModifyNickName;
