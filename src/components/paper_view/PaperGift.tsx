import React, { useEffect, useState } from 'react';
import Header from '../layout/Header';
import { TextInput } from '../common/TextInput';
import styled from 'styled-components';
import BottomBtn from '../common/BottomBtn';
import axios from 'axios';
import EnvConfig from '../../config/EnvConfig';
import { useAuthState } from '../../../src/context';
import Modal from '../common/Modal';

function PaperGift() {
  const { user, token } = useAuthState();
  const userEmail = user?.email;

  const [selectPaperId, setSelectPaperId] = useState<number>(0);
  const [paperList, setPaperList] = useState<any>([]);
  const [emailVerify, setEmailVerify] = useState<string>();
  const [giftEmail, setGiftEmail] = useState<string>();
  const [onModal, setOnModal] = useState<boolean>(false);
  const [info, setInfo] = useState<string>('');

  const loadPaperList = async () => {
    try {
      const getResponse = await axios({
        method: 'get',
        headers: {
          'User-Email': `${userEmail}`,
        },
        url: `${EnvConfig.CREATE_PAPER}`,
      });
      setPaperList(getResponse.data.paper);
    } catch (e) {
      console.log(e);
    }
  };

  const handleDropBox = (e: any) => {
    setSelectPaperId(e.target.value);
  };

  const checkEmail = async () => {
    if (selectPaperId !== 0) {
      if (giftEmail === emailVerify) {
        try {
          const putResponse = await axios({
            method: 'put',
            url: `${EnvConfig.CREATE_PAPER}/gift/${selectPaperId}`,
            data: {
              user: {
                email: `${userEmail}`,
              },
              recipient: {
                email: `${giftEmail}`,
              },
            },
          });
          setOnModal(true);
          setInfo('페이퍼가 선물 되었습니다!');
        } catch (e) {
          setOnModal(true);
          setInfo('이메일이 동일하지 않습니다.');
        }
      } else {
        setOnModal(true);
        setInfo('존재하지 않는 이메일 입니다.');
      }
    } else {
      setOnModal(true);
      setInfo('페이퍼를 선택해주십시오.');
    }
  };

  useEffect(() => {
    loadPaperList();
  }, []);

  return (
    <>
      <Header pageNm="롤링페이퍼 만들기" to="/createPaper" />
      {onModal ? (
        <Modal
          info={info}
          confirm={false}
          onModal={onModal}
          setOnModal={setOnModal}
          onButtonHref={'/createPaper'}
        />
      ) : null}
      <main>
        <Wrapper>
          <StyledLabel> 롤링 페이퍼를 선택해주세요.</StyledLabel>
          <DropDown onChange={handleDropBox}>
            <option key="0" value={0}>
              선택해주세요
            </option>
            {paperList.map((el: any) => {
              if (el.giftyn === 'n') {
                return (
                  <option key={el.paperId} value={el.paperId}>
                    {el.paperTitle}
                  </option>
                );
              }
            })}
          </DropDown>
        </Wrapper>
        <TextInput
          title="페이퍼를 보낼 이메일 주소를 입력해주세요."
          htmlFor="giftEmail"
          background="white"
          border="1px solid black"
          onChange={(e: any) => setGiftEmail(e.target.value)}
        />
        <TextInput
          title="이메일을 한 번 더 입력해주세요."
          htmlFor="giftEmail"
          background="white"
          border="1px solid black"
          onChange={(e: any) => setEmailVerify(e.target.value)}
        />
      </main>
      <BottomBtn text="다음" onclick={checkEmail} />
    </>
  );
}

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

export default PaperGift;
