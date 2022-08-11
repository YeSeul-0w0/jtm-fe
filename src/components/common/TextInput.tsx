import React from 'react';
import styled from 'styled-components';
export interface ITextInput {
  title: string;
  placeholder?: string;
  htmlFor: string;
  value?: any;
  onChange?: any;
  disabled?: boolean;
  background?: string;
  border?: string;
  isPassword?: boolean;
  ref?: any;
  autocomplete?: string;
  name?: string;
}

/*
공통 텍스트 인풋 (로그인 등)
*/
const TextInput = (props: ITextInput) => {
  const inputProps = {
    id: props.htmlFor,
    type: props?.isPassword ? 'password' : 'text',
    placeholder: props?.placeholder,
    ...props,
  };
  return (
    <Wrapper>
      <StyledLabel htmlFor={props.htmlFor}>{props.title}</StyledLabel>
      <StyledTextInput
        // id={props.htmlFor}
        // type={props?.isPassword ? 'password' : 'text'}
        // placeholder={props.placeholder ? props.placeholder : ''}
        // {...props}
        {...inputProps}
      />
    </Wrapper>
  );
};

const StyledLabel = styled.label`
  font-size: 1rem;
  font-weight: bold;
  display: inline-block;
  margin: 15px 0;
`;

const StyledTextInput = styled.input<ITextInput>`
  padding: 0.8rem;
  font-size: 1.25rem;
  border: ${props => props.border || 'none'};
  background: ${props => props.background || '#f2f2f2'};
  border-radius: 12px;
  &:focus {
    border: 2px solid rgba(0, 0, 0, 0.6);
  }
  &::placeholder {
    color: #b2b8bf;
    line-height: inherit !important;
  }
`;

const Wrapper = styled.section`
  margin-bottom: 1rem;
  display: flex;
  flex-flow: column nowrap;
  padding: 0 5%;
`;

export { TextInput };
