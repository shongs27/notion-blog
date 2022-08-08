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
  clickedBlog: boolean;
  selectedTag: string;
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
  clickedBlog: false,
  selectedTag: "전체",
  contactForm: {
    name: "",
    email: "",
    message: "",
  },
  search: "",
} as IinitialState;

const reducers = {
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

  setTag: (
    state: IinitialState,
    { payload: selectedTag }: PayloadAction<string>
  ) => ({
    ...state,
    selectedTag,
  }),

  setClickedBlog: (
    state: IinitialState,
    { payload: clickedBlog }: PayloadAction<boolean>
  ) => ({
    ...state,
    clickedBlog,
  }),
};

const { actions, reducer } = createSlice({
  name: "app",
  initialState,
  reducers,
});

export const { changeSearchInput, changeContactForm, setTag, setClickedBlog } =
  actions;

export default reducer;
