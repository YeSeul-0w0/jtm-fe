import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleDot } from '@fortawesome/free-solid-svg-icons';

interface PropsType {
  path: string;
  name: string;
  eng: string;
  set: any;
}

function ThemeList(props: PropsType) {
  const [choose, setChoose] = useState<boolean>(false);

  const choice = () => {
    const selecting = props.name;
    setChoose(!choose);
    switch (selecting) {
      case '기본':
        props.set(1);
        break;
      case '축하':
        props.set(2);
        break;
      case '사랑,우정':
        props.set(3);
        break;
    }
  };

  return (
    <ItemStyle>
      <ImgComponent className={choose ? `select-img` : `not-select-img`}>
        <img
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
          onClick={choice}
          src={props.path}
          alt={props.name}
        />
        <FontAwesomeStyle>
          <FontAwesomeIcon
            className={choose ? `select-img` : `not-select-img`}
            onClick={choice}
            icon={faCircleDot}
          />
        </FontAwesomeStyle>
      </ImgComponent>
      <TextStyle>
        <MainName>{props.name}</MainName>
        <SubName>{props.eng}</SubName>
      </TextStyle>
    </ItemStyle>
  );
}

const ItemStyle = styled.div`
  border-radius: 1rem;
  margin-bottom: 0.2rem;
  word-break: break-all;
  width: auto;
  height: 220px;
  > .not-select-img {
    border: 1.5px solid lightgrey;
  }
  > .select-img {
    border: 3px solid #111111;
  }
`;

const ImgComponent = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 1rem;
  margin-bottom: 0.5rem;
  width: 144px;
  height: 144px;
  > .not-select-img {
    border: 3px solid lightgrey;
  }
  > .select-img {
    border: 3px solid #111111;
  }
`;

const FontAwesomeStyle = styled.div`
  position: absolute;
  margin: 0.7rem 0.7rem 0;
  top: 0;
  right: 0;
  > .not-select-img {
    color: #cccccc;
  }
  > .select-img {
    color: #111111;
  }
`;

const TextStyle = styled.div`
  text-align: center;
  margin-top: 0.8rem;
`;

const MainName = styled.div`
  font-weight: bold;
  color: #333333;
`;

const SubName = styled.div`
  margin-top: 0.5rem;
  color: #999999;
`;

export default ThemeList;
