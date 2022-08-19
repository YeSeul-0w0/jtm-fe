import React, { useState } from 'react';
import Header from '../layout/Header';
import styled from 'styled-components';
import { TextInput } from '../common/TextInput';
import BottomBtn from '../common/BottomBtn';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import EnvConfig from '../../config/EnvConfig';
import { useAuthState } from '../../../src/context';
import Modal from '../common/Modal';

function ModifyNickName() {
  const [paperName, setPaperName] = useState<string>('');
  const [onModal, setOnModal] = useState<boolean>(false);
  const [onInfo, setOnInfo] = useState<string>('');
  const navigate = useNavigate();
  const { user, token } = useAuthState();
  const userEmail = user?.email;

  const [selectPaperId, setSelectPaperId] = useState<number>(0);
  const { paperId } = useParams();
  const nav = useNavigate();

  const sendChangeName = async () => {
    try {
      await axios({
        method: 'put',
        url: `${EnvConfig.LANTO_SERVER}paper/${paperId}`,
        data: {
          paper: {
            paperTitle: paperName,
            skin: selectPaperId,
          },
          user: {
            email: userEmail,
          },
        },
      });
      setOnInfo('성공적으로 변경되었습니다.');
      setOnModal(true);
    } catch (err) {
      console.log(err);
      setOnInfo('이미 사용중인 페이퍼 이름입니다.');
      setOnModal(true);
    }
  };

  const themeList = [
    { id: 1, name: '기본' },
    { id: 2, name: '축하' },
    { id: 3, name: '사랑, 우정' },
  ];

  const handleDropBox = (e: any) => {
    setSelectPaperId(e.target.value);
  };

  const closeModal = () => {
    setOnModal(!onModal);
  };

  return (
    <>
      <Header pageNm="페이퍼 변경" to="/createPaper" />
      {onModal ? (
        <Modal
          info={onInfo}
          confirm={false}
          onModal={onModal}
          setOnModal={setOnModal}
          onButtonHref={'/createPaper'}
        />
      ) : null}
      <Component>
        <MainText>
          {' '}
          변경할 제목을 <br /> 입력해주세요.{' '}
        </MainText>
        <SubText> 10자 이하만 가능해요. </SubText>
        <TextInput
          title=""
          htmlFor="paperNm"
          background="white"
          border="1px solid black"
          onChange={(e: any) => setPaperName(e.target.value)}
        />
        <Margin />
        <SubText> 테마도 변경 하실 건가요? </SubText>
        <Wrapper>
          <StyledLabel htmlFor="" />
          <DropDown onChange={handleDropBox}>
            <option key="0" value={0}>
              선택해주세요
            </option>
            {themeList.map((el: any) => {
              return (
                <option key={el.id} value={el.id}>
                  {' '}
                  {el.name}{' '}
                </option>
              );
            })}
          </DropDown>
        </Wrapper>
        <Temp />
        <BottomBtn
          onclick={sendChangeName}
          text="변경하기"
          disabled={paperName.length <= 0 && selectPaperId > 0 ? true : false}
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

const Margin = styled.div`
  height: 10vh;
`;

const Temp = styled.div`
  height: 37vh;
`;

const SubText = styled.div`
  margin-top: 0.8rem;
  color: #bbbbbb;
`;

const Wrapper = styled.div`
  margin-bottom: 1rem;
  display: flex;
  flex-flow: column nowrap;
  padding: 0 5%;
`;

const StyledLabel = styled.label`
  font-size: 1rem;
  font-weight: bold;
  display: inline-block;
  margin: 15px 0;
`;

const DropDown = styled.select`
  padding: 0.8rem;
  font-size: 1rem;
  background-color: white;
  border: 1px solid black;
  border-radius: 12px;

  &:focus {
    border: 2px solid black;
  }

  &::placeholder {
    color: #b2b8bf;
    line-height: inherit !important;
  }
`;

export default ModifyNickName;
