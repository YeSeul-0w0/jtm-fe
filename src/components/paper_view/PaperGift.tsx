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
  const { user, kakaoToken } = useAuthState();
  const userId = user?.userId;

  const [selectPaperId, setSelectPaperId] = useState<number>(0);
  const [paperList, setPaperList] = useState<any>([]);
  const [emailVerify, setEmailVerify] = useState<string>();
  const [giftEmail, setGiftEmail] = useState<string>();
  const [onModal, setOnModal] = useState<boolean>(false);
  const [info, setInfo] = useState<string>('');
  const [flag, setFlag] = useState<boolean>(false);

  const loadPaperList = async () => {
    try {
      const getResponse = await axios({
        method: 'get',
        headers: {
          'User-Id': `${userId}`,
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

  const checkValues = async () => {
    if (selectPaperId !== 0) {
      if (giftEmail === emailVerify) {
        try {
          const putResponse = await axios({
            method: 'put',
            url: `${EnvConfig.CREATE_PAPER}/gift/${selectPaperId}`,
            data: {
              user: {
                userId: `${userId}`,
              },
              recipient: {
                email: `${giftEmail}`,
              },
            },
          });
          setOnModal(true);
          setFlag(true);
          setInfo('페이퍼가 선물 되었습니다!');
        } catch (e) {
          setOnModal(true);
          setInfo(
            '페이퍼 선물에 실패했습니다. \n 이메일 혹은 페이퍼를 확인하세요.'
          );
        }
      }
    }
  };

  useEffect(() => {
    loadPaperList();
    // setSelectPaperId(paperList[0].paperId);
  }, []);

  const onClick = () => {
    if (flag) {
      window.location.href = '/main';
    } else {
      setOnModal(false);
    }
  };

  return (
    <>
      <Header pageNm="롤링페이퍼 선물하기" to="/main" />
      {onModal ? (
        <Modal
          info={info}
          confirm={false}
          onModal={onModal}
          setOnModal={setOnModal}
          onClick={onClick}
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
      <BottomBtn text="다음" onclick={checkValues} />
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
