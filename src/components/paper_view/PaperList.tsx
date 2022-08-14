import { IMessage, IPaper } from 'src/interfaces/IPaper';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { MessageItem, NoMessageItem } from './MessageItem';
import EnvConfig from 'src/config/EnvConfig';

interface IPaperAndMsg {
  paper: IPaper[];
}

const PaperList = ({ userEmail }: { userEmail: string }) => {
  const [paperAndMsgs, setPaperAndMsgs] = useState<IPaper[]>();
  const [onComponent, setOnComponent] = useState<boolean>(true);

  useEffect(() => {
    async function fetchAndSetPapers() {
      const allData = await getPaperList(userEmail);
      setPaperAndMsgs(allData);

      const paperLength = allData?.length || 0;
      localStorage.setItem('userPaperCnt', paperLength.toString());
    }
    fetchAndSetPapers();
  }, [userEmail]);

  const navigate = useNavigate();

  const viewPaperDetail = (pId: string) => {
    if (parseInt(pId) >= 0) navigate(`/paper/${pId}`);
  };

  const modifyPaper = (pId: string) => {
    console.log('modify', pId);
    navigate(`/changePaperName/${pId}`);
  };

  const deletePaper = (pId: string) => {
    console.log('deleted', pId);
  };

  return (
    <StyledPaperList>
      {paperAndMsgs?.map((p: IPaper) => (
        <>
          {onComponent ? (
            <ModifyDelete>
              <Item onClick={() => modifyPaper(p.paperId)}>
                {' '}
                페이퍼 제목 수정하기{' '}
              </Item>
              <Item onClick={() => deletePaper(p.paperId)}>
                {' '}
                페이퍼 삭제하기{' '}
              </Item>
            </ModifyDelete>
          ) : null}
          <PaperItem key={p.paperId}>
            <TitleDiv onClick={() => viewPaperDetail(p.paperId)}>
              <StyledPaperTitle>{p.paperTitle}</StyledPaperTitle>
              <p style={{ cursor: 'pointer' }}>․․․</p>
            </TitleDiv>
            <ul>
              {p.messageCount > 0 ? (
                p.messages.map((msg, idx) => <MessageItem key={idx} {...msg} />)
              ) : (
                <NoMessageItem />
              )}
            </ul>
          </PaperItem>
        </>
      ))}
    </StyledPaperList>
  );
};

const TitleDiv = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  p {
    font-weight: bold;
    font-size: 20px;
    padding-right: 2rem;
  }
`;

const StyledPaperList = styled.section`
  margin: 3rem 0 2rem 2rem;
  overflow: scroll;
  max-height: 65vh;
`;

const PaperItem = styled.div`
  margin: 1rem 0 2rem;
  ul {
    display: flex;
    flex-flow: row nowrap;
    overflow-x: scroll;
    li {
      &:hover {
        filter: brightness(90%);
      }
    }
  }
`;

const StyledPaperTitle = styled.p`
  font-weight: bold;
  font-size: 1.25rem;
  margin-bottom: 1rem;
  cursor: pointer;
  &:hover {
    // color:
  }
`;

const ModifyDelete = styled.div`
  bottom: 0;
  height: 60px;
`;

const Item = styled.button`
  width: 100%;
  font-size: 0.8rem;
`;

const getPaperList = async (email: string) => {
  try {
    const response = await axios({
      method: 'get',
      url: `${EnvConfig.LANTO_SERVER}paper`,
      headers: {
        ['User-Email']: email,
      },
    });
    if (response.status == 200) {
      const paperMsgData: IPaperAndMsg = response.data;
      return paperMsgData.paper;
    }
  } catch (e) {
    console.log(e);
  }
};

export default PaperList;
