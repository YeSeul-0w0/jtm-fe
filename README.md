# 별말, 씀

## Introduce

준비중

## how to run project

1. `git clone https://github.com/pullingoff/jtm-fe.git` : 깃허브 저장소 클론
2. `npm install` : package.json 기반으로 파일 의존성 설치
   - node version : 16
3. `npm start`: tsc-watch가 .ts를 .js로 컴파일한 후 변환에 모두 성공하면 `react-script start`
4. 추후 repo 에 내용이 업데이트 되면
   - `git pull`
   - `npm run start`

## 라이브러리 부가설명

- `tsc-watch`: ts 파일이 변경되는 걸 감시하면서 내용이 바뀔 때마다 js로 변환
- `node-sass`: .scss를 사용하기 위해 필요
- `styled-component`: CSS in JS, 재사용하기 편한 styled 컴포넌트를 만듦

- `npm i -D typescript @babel/core @babel/preset-env @babel/preset-typescript @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint prettier eslint-plugin-prettier`: eslint를 사용할 때 install 해줘야 하는 목록들
