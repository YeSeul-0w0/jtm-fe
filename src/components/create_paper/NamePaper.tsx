import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BottomBtn from '../common/BottomBtn';
import { TextInput } from '../common/TextInput';
import Header from '../layout/Header';

export const NamePaper = () => {
  const [title, setTitle] = useState<string>('');
  const navigate = useNavigate();

  return (
    <>
      <Header pageNm="롤링페이퍼 만들기" to="/createPaper" />
      <main>
        <TextInput
          title="롤링페이퍼의 제목을 정해주세요."
          htmlFor="paperNm"
          background="white"
          placeholder="2글자 이상 입력"
          border="1px solid black"
          onChange={(e: any) => setTitle(e.target.value)}
        />
      </main>
      <BottomBtn
        onclick={() => navigate(`/createPaper/selectTheme/${title}`)}
        text="다음"
        disabled={title.length <= 2 ? true : false}
      />
    </>
  );
};
