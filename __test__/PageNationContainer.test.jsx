import { render, fireEvent } from '@testing-library/react';
import PageNationContainer from '@/components/PageNationContainer';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';

jest.mock('react-redux');

describe('PageNationContainer', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    useAppDispatch.mockImplementation(() => dispatch);
    useAppSelector.mockImplementation((selector) =>
      selector({
        selectedTag: '전체',
        page: {
          PER_PAGE_COUNT: 1,
          currentPage: 2,
          offSet: 1,
        },
      }),
    );
  });

  const posts = [
    {
      postId: 1,
      title: 'Next에 대해서',
      tags: [{ name: 'Next', color: 'red' }],
      description: 'Next는 3개의 대표적인 DataFetching 함수가 있다',
      thumbnail: '',
      createdTime: '',
      link: 'https://www.naver.com',
    },
    {
      postId: 2,
      title: 'Jest에 대해서',
      tags: [{ name: 'Jest', color: 'brown' }],
      description: 'Jest는 testinglibrary를 활용하여 간편하게 테스팅 할 수 있다',
      thumbnail: '',
      createdTime: '',
      link: 'https://www.naver.com',
    },
  ];

  it('render posts according to PageNation', () => {
    const { container, getByRole } = render(<PageNationContainer posts={posts} />);
    const prevButton = getByRole('button', { name: /Prev/ });
    const firstButton = getByRole('button', { name: /1/ });

    expect(container).toHaveTextContent(posts[1].description);

    fireEvent.click(prevButton);

    expect(dispatch).toBeCalled();

    fireEvent.click(firstButton);

    expect(dispatch).toBeCalled();
  });
});
