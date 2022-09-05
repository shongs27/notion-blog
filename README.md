# Notion Blog

# 🚀 배포

[배포 앱](https://notion-blog-shongs27.vercel.app/)

# 폴더 구조

```sh
src
│
├─ assets  # 이미지 파일(svg)을 컴포넌트로 사용하기 위해 모아놓은 폴더
├─ hooks # 여러 custom hook이 모여있는 폴더
├─ components  # 컴포넌트를 모아놓은 폴더
│     ├─ layout  # layout구성을 위한 컴포넌트가 있는 폴더
│     ├─ MainDoor # Home화면 접속시 환영하며 블로그를 소개하는 컴포넌트
│     ├─ Loading # 검색 시 로딩바를 위한 컴포넌트
│     ├─ MappedNotion # mapImageUrl이 override된 notionRenderer
│     ├─ PageNation # PostList에 페이지네이션을 위한 컴포넌트
│     ├─ TableofContents # 포스트 내용 페이지의 목록을 보여주는 컴포넌트
│     ├─ PostDetail # 포스트 내용 페이지를 보여주는 상세 컴포넌트
│     ├─ Posts # PostList에 포스트들
│     ├─ PostList # 포스트들을 Grid 형태로 보여주는 리스트 화면
│     ├─ Tags # PostList에 태그들
│     └─ PostNav # 포스트 상세화면에서 다른 포스트로 넘어가는 링크
│
├─ pages # 라우팅 별로 이동가능한 페이지
│     ├─ _app  # 공통 페이지
│     ├─ about  # 이력서 페이지
│     ├─ contact  # 방명록 기능의 페이지
│     ├─ index  # Home 화면 페이지
│     ├─ search  # 검색 페이지
│     └─ works  # 프로젝트 모아놓은 페이지
│
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

## 2. 렌더링 최적화

다양한 렌더링 방식을 사용하여 최적화된 블로그를 설계했습니다

> ### SSR

검색 시 SSR을 통해 서버에서 검색 데이터를 받아와 동적인 페이지를 만들어서 제공

> ### SSG

동적인 변화가 필요없는 정적인 포스트 페이지들은 SSG를 통해 pre-rendering한 페이지를 제공받아 UX 향상을 꾀합니다

> ### CSR

redux/toolkit을 이용한 flux 구조의 상태관리를 통해 CSR을 사용합니다

## 3. UX 향상

> ### 다양한 렌더링 방식

다양한 렌더링 방식을 함께 사용해서 필요한 기능에 최적화된 렌더링 방식을 적용하여 UX를 향상 했습니다

> ### 반응형 웹 디자인
>
> 반응형 웹 디자인을 적용해서 태블릿, 모바일에서도 이용할 수 있게 구성했으며, 이외에도 responsive한 움직임에 따라 UI의 구성을 고민해서 구성했습니다.

> ### 관심사별 태그

블로그 UX에서 중요한 것은 관심사별로 포스트를 확인할 수 있는 경험이라고 판단하여 태그를 통해 관련있는 포스트를 손쉽게 확인할 수 있도록 구성했습니다

> ### Table of contents, 검색기능, 로딩바..

table of contents, 검색기능 등을 사용하여 포스트 친화적인 블로그의 특성을 고려했습니다

## 4. 최적화를 위한 노력

> ### Next/image가 아닌 svg 컴포넌트

public을 통한 next/image의 정적인 이미지 파일을 사용하지 않고, svg의 경우 컴포넌트로 구성하여 css fill 속성등으로 자유롭게 수정할 수 있도록 만들었습니다.
[참조](https://github.com/shongs27/notion-blog/tree/main/src/assets)

> ### 소스코드 용량

1. 포스트와 프로젝트의 목록을 보여주는 항목을 공통화한 PostList 컴포넌트로 통일 시켜 재활용성 있는 컴포넌트 사용을 고민했고,

2. lib 라이브러리를 통해 서버사이드에서만 사용되는 코드를 분리하여 설계하여 클라이언트에서 불필요한 JS코드를 로드하지 않게 했습니다.

# 📸 구현 결과

|                                                             포스트                                                             |                                                            프로젝트                                                            |                                                           검색 기능                                                            |
| :----------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------: |
| <img src="https://user-images.githubusercontent.com/55541745/185759747-8d2f38e3-7e1f-4ee6-96bd-b9e12d1249a5.gif" width="200"/> | <img src="https://user-images.githubusercontent.com/55541745/185759762-082f6ced-ac31-44f2-83d1-76228bc000b3.gif" width="200"/> | <img src="https://user-images.githubusercontent.com/55541745/185759767-176466f9-6067-42ef-a5c7-ba6aece824e8.gif" width="200"/> |

<!-- ## 추가 할 것

- share안눌러도 react-notion-x가 렌더링 할 수 있게? (브라우저에서 access user, token2)
- 각 태그 숫자 구하는 API
- seo
- 로딩화면 로딩 첫번째부터도
- eslint, type 정리
- 테스트 코드 -->
