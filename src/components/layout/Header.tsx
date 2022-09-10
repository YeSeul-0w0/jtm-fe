import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { IBtnStyle } from '../interface/IStyled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

interface IHeader {
  pageNm: string;
  background?: string;
  color?: string;
  to: string; // router link
  anotherIcon?: string;
  onClick?: () => void;
}

const Header = ({ ...props }: IHeader) => {
  return (
    <StyledHeader
      background={props.background}
      color={props.color}
      anotherIcon={props.anotherIcon && 'true'}
    >
      <Link to={props.to}>
        <FontAwesomeIcon icon={faChevronLeft} />
      </Link>
      <p>{props.pageNm}</p>
      {props.anotherIcon && (
        <img
          src={`${process.env.PUBLIC_URL}/icons/${props.anotherIcon}`}
          onClick={props.onClick && props.onClick}
        />
      )}
    </StyledHeader>
  );
};

const StyledHeader = styled.header<IBtnStyle>`
  padding: 1.5rem 0;
  color: ${props => props.color || 'initial'};
  margin-left: 0.5rem;
  background: ${props => props.background || 'initial'};
  text-align: center;
  font-weight: bold;
  font-size: 1.25rem;
  display: grid;
  width: 100%;
  grid-template-columns: ${props =>
    props.anotherIcon ? '10% 80% 10%' : '10% 80%'};
  img {
    cursor: pointer;
  }
`;

// react router dom link
// const ArrowLink = styled(Link)`
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;
//
// const ArrowLeft = styled.i`
//   border: solid black;
//   border-width: 0 2px 2px 0;
//   display: inline-block;
//   padding: 4px;
//   transform: rotate(135deg);
//   -webkit-transform: rotate(135deg);
// `;

export default Header;
