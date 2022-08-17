import { searchPage } from "@/apis";
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
  postsIDs: string[];
  isMainDoor: boolean;
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
}

const initialState = {
  isMainDoor: true,
  selectedTag: "전체",
  contactForm: {
    name: "",
    email: "",
    message: "",
  },
  search: "",
  postsIDs: [""],
  currentPage: 1,
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

  setIsMainDoor: (
    state: IinitialState,
    { payload: isMainDoor }: PayloadAction<boolean>
  ) => ({
    ...state,
    isMainDoor,
  }),

  setPostsIDs: (
    state: IinitialState,
    { payload: postsIDs }: PayloadAction<string[]>
  ) => ({
    ...state,
    postsIDs,
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
  changeSearchInput,
  changeContactForm,
  setTag,
  setIsMainDoor,
  setPostsIDs,
  setCurrentPage,
} = actions;

export default reducer;
