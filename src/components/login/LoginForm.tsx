import React from 'react';

import styled from 'styled-components';
import { MoveBtn } from '../common/MoveBtn';
import { ITextInput, TextInput } from '../common/TextInput';

const LoginForm = ({
  email,
  password,
  onChange,
  disabled,
  autocomplete,
}: {
  email: string;
  password: string;
  onChange: any;
  disabled?: boolean;
  autocomplete?: string;
}) => {
  // const emailInputRef = useRef<HTMLInputElement>(null);

  // useEffect(() => {
  //   emailInputRef.current?.focus();
  // }, []);

  return (
    <StyledFormWrapper>
      <SearchInput
        // ref={emailInputRef}
        htmlFor="email"
        value={email}
        title="이메일"
        name="email"
        onChange={onChange}
        disabled={disabled}
        autocomplete={autocomplete}
      />
      <TextInput
        isPassword
        htmlFor="password"
        autocomplete="current-password"
        value={password}
        title="비밀번호"
        name="password"
        onChange={onChange}
        disabled={disabled}
      />
      <MoveBtn text="아직 회원이 아니신가요?" link="signUp" />
    </StyledFormWrapper>
  );
};

const SearchInput = React.forwardRef<HTMLInputElement, ITextInput>(
  ({ ...props }, ref) => <TextInput {...props} ref={ref} />
);

const StyledFormWrapper = styled.form`
  display: flex;
  flex-flow: column nowrap;
  align-self: stretch;
  margin: auto 1rem;
`;

export default React.memo(LoginForm);
