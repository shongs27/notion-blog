import { AnyAction, createSlice, PayloadAction, ThunkAction } from '@reduxjs/toolkit';
import { RootState } from './store';

interface IpageTags {
  tag: string;
  count: number;
}

export interface IcontactForm {
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

interface IPage {
  currentPage: number;
  PER_PAGE_COUNT: number;
  offSet: number;
}

interface IinitialState {
  isMainDoor: boolean;
  selectedTag: string;
  contactForm: IcontactForm;
  search: string;
  post: string;
  postTags: [];
  pageTotalTags: number;
  pageTags: IpageTags[];
  pagePosts: IpagePosts[];
  posts: [];
  page: IPage;
}

const initialState = {
  isMainDoor: true,
  selectedTag: '전체',
  contactForm: {
    name: '',
    email: '',
    message: '',
  },
  search: '',
  page: {
    PER_PAGE_COUNT: 6,
    currentPage: 1,
    offSet: 0,
  },
} as IinitialState;

const reducers = {
  changeSearchInput: (state: IinitialState, { payload: text = '' }: PayloadAction<string>) => ({
    ...state,
    search: text,
  }),
  changeContactForm: (
    state: IinitialState,
    { payload: { name, value } }: PayloadAction<{ name: string; value: string }>,
  ) => ({
    ...state,
    contactForm: {
      ...state.contactForm,
      [name]: value,
    },
  }),

  setTag: (state: IinitialState, { payload: selectedTag }: PayloadAction<string>) => ({
    ...state,
    selectedTag,
  }),

  setIsMainDoor: (state: IinitialState, { payload: isMainDoor }: PayloadAction<boolean>) => ({
    ...state,
    isMainDoor,
  }),

  setCurrentPage: (
    state: IinitialState,
    { payload: { currentPage, offSet } }: PayloadAction<{ currentPage: number; offSet: number }>,
  ) => ({
    ...state,
    page: {
      ...state.page,
      currentPage,
      offSet,
    },
  }),

  initialContactForm: (state: IinitialState) => ({
    ...state,
    contactForm: { name: '', email: '', message: '' },
  }),
};

const { actions, reducer } = createSlice({
  name: 'app',
  initialState,
  reducers,
});

export const { changeSearchInput, changeContactForm, setTag, setIsMainDoor, setCurrentPage, initialContactForm } =
  actions;

export default reducer;

export function sendContact(): ThunkAction<void, RootState, unknown, AnyAction> {
  return async (dispatch, getState) => {
    const contactForm = getState();

    const result = await fetch('/api/contactForm', {
      method: 'POST',
      body: JSON.stringify(contactForm),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (result.status !== 200) {
      return alert(`오류가 발생했습니다 상태코드 : ${result.status}`);
    }

    dispatch(initialContactForm());
    alert('성공적으로 전송되었습니다');
  };
}

export function changeCurrentPage(pageNumber: number): ThunkAction<void, RootState, unknown, AnyAction> {
  return async (dispatch, getState) => {
    const {
      page: { PER_PAGE_COUNT },
    } = getState();

    const offSet = (pageNumber - 1) * PER_PAGE_COUNT;
    const currentPage = pageNumber;

    dispatch(setCurrentPage({ currentPage, offSet }));
  };
}
