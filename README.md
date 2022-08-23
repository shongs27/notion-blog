# Notion Blog

# 🚀 배포

[배포 앱](https://notion-blog-shongs27.vercel.app/)

# 폴더 구조

```sh
src
│
├─ assets  # 이미지 파일(svg)을 컴포넌트로 사용하기 위해 모아놓은 폴더
├─ hooks # redux hooks와 로딩화면을 위한 Custom hook이 있는 폴더
├─ components  # 컴포넌트를 모아놓은 폴더
│     ├─ layout  # layout구성을 위한 컴포넌트가 있는 폴더
│     ├─ MainDoor # Home화면 접속시 환영하며 블로그를 소개하는 컴포넌트
│     ├─ Loading # 검색 시 로딩바를 위한 컴포넌트
│     ├─ PageNation # PostList에 페이지네이션을 위한 컴포넌트
│     ├─ Posts # PostList에 포스트들
│     ├─ PostList # 포스트들을 Grid 형태로 보여주는 리스트 화면
│     ├─ Tags # PostList에 태그들
│     └─ PostNav # 포스트 상세화면에서 다른 포스트로 넘어가는 링크
├─ pages # 라우팅 별로 이동가능한 페이지
│     ├─ _app  # 공통 페이지
│     ├─ about  # 이력서 페이지
│     ├─ contact  # 방명록 기능의 페이지
│     ├─ index  # Home 화면 페이지
│     ├─ search  # 검색 페이지
│     └─ works  # 프로젝트 모아놓은 페이지
├─ stores  # 리덕스 설정을 위한 slice, store가 있는 폴더
├─ styles  # CSS 글로벌 스타일을 위한 폴더
└─ types  # Typescript 정의 파일

```

# 📝 기술 스택

- Typescript
- NextJS
- ReactJS
- Redux toolkit
- SCSS

# 📌 구현 내용

## 1. [Notion API](https://developers.notion.com/reference/intro)

Notion을 CMS로 이용함으로서 블로그 포스트를 관리

![image](https://user-images.githubusercontent.com/55541745/185651801-c957c76c-9ddb-46bf-a09b-7b1e7fd23355.png)

## 2. 혼합 렌더링 방식

> ### SSR

검색 시 SSR을 통해 서버에서 검색 데이터를 받아와 동적인 페이지를 만들어서 제공

> ### SSG

동적인 변화가 필요없는 정적인 포스트 페이지들은 SSG를 통해 pre-rendering한 페이지를 제공받아 UX 향상을 꾀합니다

> ### CSR

redux/toolkit을 이용하여 flux 구조의 상태관리를 통해 CSR을 사용했습니다

## 3. UX 고려

> ### 다양한 렌더링 방식으로 최적화

혼합 렌더링 방식을 사용하여 특정 기능에 최적화된 렌더링 방식을 적용하여 UX 향상

> ### 관심사별 태그

블로그 UX에서 중요한 것은 관심사별로 포스트를 확인할 수 있는 경험이라고 판단하여 태그를 통해 관련있는 포스트를 손쉽게 확인할 수 있도록 구성했습니다

## 4. 최적화를 위한 노력

> ### Next/image

최적화된 이미지를 제공 받도록 하였으며, SVG 파일은 이미 최적화된 벡터요소기 때문에 컴포넌트로 구성하여 CSS fill 속성으로 이미지를 자유롭게 수정하도록 만들었습니다

> ### 소스코드 용량

1. 블로그 포스트들과 프로젝트들의 항목을 공통화된 PostList 컴포넌트로 통일 시켜 불필요한 컴포넌트를 만들지 않기 위해 노력했으며

2. lib 라이브러리를 통해 서버사이드에서만 사용되는 코드를 분리함으로서 클라이언트에서의 불필요한 코드를 로드하지 않도록 고민했습니다

# 📸 구현 결과

|                                                             포스트                                                             |                                                            프로젝트                                                            |                                                           검색 기능                                                            |
| :----------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------: |
| <img src="https://user-images.githubusercontent.com/55541745/185759747-8d2f38e3-7e1f-4ee6-96bd-b9e12d1249a5.gif" width="200"/> | <img src="https://user-images.githubusercontent.com/55541745/185759762-082f6ced-ac31-44f2-83d1-76228bc000b3.gif" width="200"/> | <img src="https://user-images.githubusercontent.com/55541745/185759767-176466f9-6067-42ef-a5c7-ba6aece824e8.gif" width="200"/> |


<!-- ## 추가 할 것

- svg 오류 픽스
- share안눌러도 react-notion-x가 렌더링 할 수 있게? (브라우저에서 access user, token2)
- 각 태그 숫자 구하는 API
- seo
- 폴더구조 변경
- table-content
- 로딩화면 로딩 첫번째부터도
- eslint, type 정리
- 테스트 코드 -->
