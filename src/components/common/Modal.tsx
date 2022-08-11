import React, { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

interface PropsType {
  info: string;
  confirm: boolean;
  onModal: boolean;
  setOnModal: Dispatch<SetStateAction<boolean>>;
  href?: string;
  onClick?: any;
}

function Modal(props: PropsType) {
  const closeModal = () => {
    if (props.onModal) {
      return props.setOnModal(false);
    }
  };
  const content: string = props.info;

  return (
    <Container>
      <ModalBody>
        <Text>
          {content.split('\\n').map((text, idx) => (
            <span key={idx}>
              {text}
              <br />
            </span>
          ))}
        </Text>
        <Btn>
          {props.confirm ? (
            <BtnsItem>
              <Button onClick={closeModal}>취소</Button>
              <Link to={props.href! ? props.href! : ''}>
                <Button
                  onClick={props.onClick ? props.onClick : ''}
                  style={{ fontWeight: 'bold' }}
                >
                  확인
                </Button>
              </Link>
            </BtnsItem>
          ) : (
            <BtnItem>
              <Button onClick={closeModal}>취소</Button>
            </BtnItem>
          )}
        </Btn>
      </ModalBody>
    </Container>
  );
}

const Container = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: #000000;
  border-radius: 10px;
  width: 250px;
  min-height: 70px;
  height: auto;
  white-space: pre-wrap;
  z-index: 3;
`;

const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
`;

const Text = styled.div`
  text-align: center;
  color: white;
  font-size: 1rem;
  white-space: pre-line;
  margin: 0.8rem;
  padding: 0.3rem;
`;

const Btn = styled.div`
  margin: 0.3rem;
  background-color: #000000;
`;

const BtnsItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

const BtnItem = styled.div`
  text-align: center;
`;

const Button = styled.button`
  width: auto;
  height: 30px;
  padding: 0.2rem 2.6rem;
  color: white;
  background-color: #000000;
  border: 2px solid rgba(255, 255, 255, 0.1);
`;

export default Modal;

// Manual
// https://www.notion.so/FE-23bc149ca8ee45028e9925eab3c4ed96#8539f99207ea429fb28498c4e1b83d4d
