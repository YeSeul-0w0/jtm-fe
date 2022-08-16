import React, { MouseEventHandler } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { IBtnStyle } from '../interface/IStyled';

export interface IBtn {
  text: string;
  href?: string;
  link?: string;
  color?: string;
  background?: string;
  logo?: string;
  width?: string;
  height?: string;
  padding?: string;
  imgSize?: string;
  center?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}
/*
공통 버튼 컴포넌트
href: 외부링크 (a 태그를 쓴다)
link: 내부링크 (라우터로 이동)
*/
const Btn = ({ ...props }: IBtn) => {
  return (
    <>
      {props.href && <HrefBtn {...props} />}
      {props.link && <LinkBtn {...props} />}
    </>
  );
};

const HrefBtn = ({ ...props }: IBtn) => {
  return (
    <StyledBtn
      href={props.href}
      color={props.color}
      background={props.background}
      width={props.width}
      height={props.height}
      padding={props.padding}
      center={props.center}
      onClick={props.onClick}
    >
      {props.logo && (
        <Img
          width="18px"
          src={`${process.env.PUBLIC_URL}/icons/${props.logo}`}
          alt="login"
        />
      )}
      {props.text}
    </StyledBtn>
  );
};

const LinkBtn = ({ ...props }: IBtn) => {
  const link = props.link ? props.link : '';
  return (
    <StyledLink
      to={link}
      color={props.color}
      background={props.background}
      width={props.width}
      height={props.height}
      padding={props.padding}
      center={props.center}
    >
      {props.logo && (
        <Img
          width="18px"
          src={`${process.env.PUBLIC_URL}/icons/${props.logo}`}
          alt="login"
        />
      )}
      {props.text}
    </StyledLink>
  );
};

const StyledLink = styled(Link)<IBtnStyle>`
  display: flex;
  width: ${props => props.width || `15rem`};
  height: ${props => props.height || ''};
  margin: 1rem 1rem 0;
  padding: ${props => props.padding || '1rem 1.5rem;'};
  border-radius: 24px;
  justify-content: center;
  gap: 0.5rem;
  background: ${props => props.background || 'initial'};
  color: ${props => props.color || 'initial'};
`;

const StyledBtn = styled.a<IBtnStyle>`
  display: flex;
  width: ${props => props.width || `15rem`};
  height: ${props => props.height || ''};
  margin: 1rem 1rem 0;
  padding: ${props => props.padding || '1rem 1.5rem;'};
  border-radius: 24px;
  justify-content: center;
  gap: 0.5rem;
  background: ${props => props.background || 'initial'};
  color: ${props => props.color || 'initial'};
`;

const Img = styled.img`
  width: ${props => props.width || 'unset'};
`;

export { Btn };
