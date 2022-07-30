import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IpageTags {
  tag: string;
  count: number;
}

interface IcontactForm {
  name: string;
  email: string;
  message: string;
}

interface IpagePosts {
  id: string;
  title: string;
  writer: string;
  date: string;
  tags: string[];
  contents: string;
}

interface IinitialState {
  currentPage: number;
  contactForm: IcontactForm;
  search: string;
  post: string;
  postTags: [];
  pageTotalTags: number;
  pageTags: IpageTags[];
  pagePosts: IpagePosts[];
  posts: [];
  postsID: string[];
}

const initialState = {
  currentPage: 1,
  contactForm: {
    name: "",
    email: "",
    message: "",
  },
  search: "",
  // 3. PostDetail
  post: "",
  postTags: [],
  // 2. TagPosts에서 쓰임 [미구현]
  // ?notion에서 API를 보내 따로 받아와서 pagePosts에 저장
  // pagePosts-> pageTags와 pageTotalTags도 비동기 함수로 클라이언트에서 만듦
  pageTotalTags: 10,
  pageTags: [
    { tag: "Javascript", count: 4 },
    { tag: "브라우저", count: 5 },
    { tag: "CS", count: 2 },
  ],
  pagePosts: [
    {
      id: "37f234a3081e4b898b0ad79ca2aeb7af",
      title: "브라우저의 렌더링 과정",
      writer: "홍원배",
      date: "2022-05-28",
      tags: ["브라우저", "Javascript"],
      contents:
        "DOM(Document Object Model 의 약자)- 문서에 대한 모든 내용을 담고있는 객체. 도큐먼트에 관련 된 내용 모두 - 문서 즉 열려진 페이지에 대한 정보를 따로 객체화 시켜서 관리함",
    },
    {
      id: "060753dff10a4a2ab9df5e940a81c84a",

      title: "호이스팅",
      writer: "홍원배",
      date: "2022-05-28",
      tags: ["Javascript"],
      contents:
        "식별자의 **선언문**이 스코프의 선두로 끌어 올려진 것처럼 동작하는 자바스크립트 고유의 특징으로 선언문 코드 이전에 변수나 함수를 참조하거나 함수를 호출할 수 있게 만든다 JavaScript에서 **호이스팅**(hoisting)이란, 인터프리터가 변수와 함수의 메모리 공간을 선언 전에 미리 할당하는 것을 의미합니다 - MDN",
    },
    {
      id: "72751ae7a3124d6a865743202dcdbad1",

      title: "클로저",
      writer: "홍원배",
      date: "2022-05-29",
      tags: ["Javascript"],
      contents:
        "클로저는 독립적인 자유 변수를 가리키는 함수이다. 또는, 클로저 안에 정의된 함수는 만들어진 환경을 ‘기억한다’. - 예전 MDN  함수 안에 함수가 포함되고, 그 포함된 함수는 외부함수의 변수(자유 변수)를 기억하고 있다는 것",
    },
    {
      id: "this-495aaded184344c9ba60df3f42f8f22d",

      title: "this, 브라우저 저장소",
      writer: "홍원배",
      date: "2022-05-29",
      tags: ["브라우저", "Javascript"],
      contents:
        "원래 java this는 인스턴스 자신(self)를 가리키는 참조변수 한가지의 의미 javascript에서 바인딩되는 객체는 **호출방식**에 달렸다 렉시컬 스코프는 함수가 선언될 때 객체의 계층적인 구조로 결정되는 스코프를 이야기한다",
    },
    {
      id: "44ff251f82a24300b3179b3add46ac4d",

      title: "싱글스레드와 이벤트루프",
      writer: "홍원배",
      date: "2022-05-29",
      tags: ["CS", "브라우저"],
      contents:
        "자바스크립트의 런타임환경은 싱글 쓰레드 기반이며 논 블로킹 방식의 비동기적인 동시성 언어이며 콜 스택, 이벤트 루프와 콜백 큐 그리고 여러가지 다른 API들을 가지고 있다. 싱글스레드이기 때문에 자바스크립트 엔진은 하나의 콜스택을 가지고 작업을 수행한다. 그렇기에 콜스택에 연산이 오래 걸리면 UI가 멈출 우려가 있다.",
    },
    {
      id: "css-91fc5fd38ec445479eb122634c0690c9",

      title: "CSS",
      writer: "홍원배",
      date: "2022-05-29",
      tags: ["브라우저"],
      contents:
        "일반적인 문서흐름에 따라 배치하고, 가장 가까운 블록레벨 조상+ 스크롤 되는 요소를 기준으로 상대적으로 배치하고, 주어진 경계선을 지나면 고정 위치를 갖게 된다 - will change로 성능 개선 - relative와 fixed 위치 지정을 합친 것으로 생각할 수 있습니다.",
    },
    {
      id: "b9da1873cca446a182c9574b33aaf67b",

      title: "이벤트 루프",
      writer: "홍원배",
      date: "2022-05-29",
      tags: ["CS", "브라우저"],
      contents:
        "이벤트가 등록되면 브라우저가 감지하여 콜백함수를 돌려주게 되고, 매크로 태스크 큐에 쌓여 있다가 콜스택으로 이동하여 실행된다 (자바스크립트의 싱글스레드 동작)",
    },
  ],
  // 1. postsID에 맞추어 posts에 다 받아오기
  posts: [],
  postsID: [
    "37f234a3081e4b898b0ad79ca2aeb7af",
    "060753dff10a4a2ab9df5e940a81c84a",
    "72751ae7a3124d6a865743202dcdbad1",
    "this-495aaded184344c9ba60df3f42f8f22d",
    "44ff251f82a24300b3179b3add46ac4d",
    "css-91fc5fd38ec445479eb122634c0690c9",
    "b9da1873cca446a182c9574b33aaf67b",
  ],
} as IinitialState;

const reducers = {
  setPost: (
    state: IinitialState,
    { payload: post }: PayloadAction<string>
  ) => ({
    ...state,
    post,
  }),
  setPostTags: (
    state: IinitialState,
    { payload: postTags }: PayloadAction<[]>
  ) => ({
    ...state,
    postTags,
  }),
  setPosts: (state: IinitialState, { payload: posts }: PayloadAction<[]>) => ({
    ...state,
    posts,
  }),
  changeSearchInput: (
    state: IinitialState,
    { payload: text = "" }: PayloadAction<string>
  ) => ({
    ...state,
    search: text,
  }),
  changeContactForm: (
    state: IinitialState,
    { payload: { name, value } }: PayloadAction<{ name: string; value: string }>
  ) => ({
    ...state,
    contactForm: {
      ...state.contactForm,
      [name]: value,
    },
  }),
  setCurrentPage: (
    state: IinitialState,
    { payload: currentPage }: PayloadAction<number>
  ) => ({
    ...state,
    currentPage,
  }),
};

const { actions, reducer } = createSlice({
  name: "app",
  initialState,
  reducers,
});

export const {
  setPost,
  setPostTags,
  setPosts,
  changeSearchInput,
  changeContactForm,
  setCurrentPage,
} = actions;

export default reducer;
