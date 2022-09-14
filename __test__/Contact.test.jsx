import { render, fireEvent } from '@testing-library/react';
import Contact from '@/pages/Contact';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';

jest.mock('react-redux');
jest.mock('next/router');

describe('Posts', () => {
  const dispatch = jest.fn();
  const router = {
    push: jest.fn(),
  };

  beforeEach(() => {
    dispatch.mockClear();
    router.push.mockClear();

    useAppDispatch.mockImplementation(() => dispatch);
    useAppSelector.mockImplementation((selector) =>
      selector({
        contactForm: {
          name: '',
          email: '',
          message: '안녕하세요',
        },
      }),
    );
    useRouter.mockReturnValue(router);
  });

  it('render input control and value', () => {
    const { container, getByLabelText } = render(<Contact />);

    expect(getByLabelText('이름')).not.toBeNull();
    expect(container).toContainHTML('type="email"');
    expect(getByLabelText('메시지').value).toBe('안녕하세요');
  });

  it('listen change Events', () => {
    const { getByLabelText } = render(<Contact />);

    fireEvent.change(getByLabelText('이메일'), { target: { name: 'email', value: 'dkxm7942@gmail.com' } });

    expect(dispatch).toBeCalled();
  });

  it('listen submit Events', () => {
    const { getByRole } = render(<Contact />);
    const sendButton = getByRole('button', { name: /전송/ });

    fireEvent.click(sendButton);

    expect(dispatch).toBeCalled();
    expect(router.push).toBeCalledWith('/');
  });
});
