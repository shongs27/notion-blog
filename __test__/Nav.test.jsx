import { render, fireEvent } from '@testing-library/react';
import Nav from '../src/components/layout/Nav';
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

  it('render title', async () => {
    const { getByAltText, getByRole } = render(<Nav />);
    const titleButton = getByRole('button', { name: /ongs Blog/ });
    const titleImage = getByAltText('hongs favicon');

    expect(titleImage).toHaveAttribute('src');
    expect(titleButton).not.toBeNull();

    fireEvent.click(titleButton);

    expect(router.push).toBeCalledWith(`/`);
  });

  it('renders input ', () => {
    const { getByPlaceholderText, getByText } = render(<Nav />);
    const input = getByPlaceholderText('타이틀로 검색하세요');

    expect(input.value).toBe('이터레이터');

    fireEvent.change(input, { target: { value: 'setTimeout' } });

    expect(dispatch).toBeCalled();
  });

  context('when Blog menu clicked', () => {
    it('routes home', () => {
      const { getByText } = render(<Nav />);
      const menu = 'Blog';

      fireEvent.click(getByText(menu));

      expect(dispatch).toBeCalled();
      expect(router.push).toBeCalledWith(`/`);
    });
  });

  context('when Other menus clicked', () => {
    it('routes menu', () => {
      const { getByText } = render(<Nav />);
      const menus = ['Works', 'About', 'Contact'];

      menus.forEach((menu) => {
        fireEvent.click(getByText(menu));

        expect(dispatch).toBeCalled();
        expect(router.push).toBeCalledWith(`/${menu.toLowerCase()}`);
      });
    });
  });
});
