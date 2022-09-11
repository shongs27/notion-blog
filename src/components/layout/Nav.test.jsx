import { render, screen, fireEvent } from '@testing-library/react';
import Nav from './Nav';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';

jest.mock('react-redux');
jest.mock('next/router');

describe('Nav', () => {
  const dispatch = jest.fn();
  const router = {
    push: jest.fn(), // 해당 컴포넌트 라우터는 push만을 쓴다
  };

  beforeEach(() => {
    dispatch.mockClear();
    router.push.mockClear();

    useAppDispatch.mockImplementation(() => dispatch);
    useAppSelector.mockImplementation((selector) =>
      selector({
        search: '이터레이터',
      }),
    );
    useRouter.mockReturnValue(router);
  });

  it('renders a Nav Bar ', () => {
    const { debug, container, getByPlaceholderText, getByText } = render(<Nav />);

    const menus = ['Works', 'About', 'Contact'];

    expect(container).toHaveTextContent('ongs Blog');
    expect(getByPlaceholderText('타이틀로 검색하세요').value).toBe('이터레이터');

    menus.forEach((menu) => {
      fireEvent.click(getByText(menu));

      expect(dispatch).toBeCalled();
      expect(router.push).toBeCalledWith(`/${menu.toLowerCase()}`);
    });
  });
});
