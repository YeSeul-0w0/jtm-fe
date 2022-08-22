import React, { MouseEventHandler } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface IBottomBtn {
  text: string;
  disabled?: boolean;
  onclick?: any; // state로도 사용 가능하고 navigate 목적도 가능
  fixed?: string;
  link?: string;
}

interface IBtnStyle {
  fixed?: string;
  disabled?: boolean;
}

const BottomBtn = ({ text, onclick, disabled, fixed, link }: IBottomBtn) => {
  //
  return (
    <>
      {link ? (
        <Link to={link}>
          <StyledBtn onClick={onclick} disabled={disabled} fixed={fixed}>
            {text}
          </StyledBtn>
        </Link>
      ) : (
        <StyledBtn onClick={onclick} disabled={disabled} fixed={fixed}>
          {text}
        </StyledBtn>
      )}
    </>
  );
};

const StyledBtn = styled.button<IBtnStyle>`
  border-radius: 12px;
  border: none;
  cursor: pointer;
  /* min-width: 90%; */
  width: 343px;
  /* width: 100%; */
  background: ${props => (props.disabled ? `gray` : 'black')};
  padding: 1rem 0;
  margin: 0.5rem;
  text-align: center;
  color: white;
  font-size: 1.2rem;
  /* position: ${props => (props.fixed ? 'fixed' : 'unset')}; */
  ${props => (props.fixed ? 'width : 343px' : '')}
  position: sticky;
  bottom: 34px;
  transform: ${props => (props.fixed ? 'translateX(-50%)' : 'unset')};
  // validation 통과한 경우에만 hover
  ${props => (props.disabled ? '' : '&:hover { background: gray }')}
`;

export default BottomBtn;
