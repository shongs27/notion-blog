import { render, fireEvent } from '@testing-library/react';
import Posts from '@/components/Posts';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';

jest.mock('react-redux');

describe('Posts', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();

    useAppDispatch.mockImplementation(() => dispatch);
    useAppSelector.mockImplementation((selector) =>
      selector({
        selectedTag: '전체',
        page: {
          PER_PAGE_COUNT: 6,
          currentPage: 1,
          offSet: 0,
        },
      }),
    );
  });

  const tags = [
    { name: 'Next', color: 'red' },
    { name: 'Jest', color: 'brown' },
  ];
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

  context('when tag button clicked', () => {
    it('render changed posts', () => {
      const { getByTestId, getByText } = render(<Posts posts={posts} tags={tags} />);
      const tag = tags[0].name;
      const { title, description } = posts[0];
      const nextButton = getByTestId(tag);

      fireEvent.click(nextButton);

      expect(getByText(title)).not.toBeNull();
      expect(getByText(description)).not.toBeNull();
    });
  });

  context('when tag button not clicked', () => {
    it('render initial posts', () => {
      const { getByTestId, getByText } = render(<Posts posts={posts} tags={tags} />);

      expect(getByTestId('전체')).not.toBeNull();
      posts.forEach(({ title, description }) => {
        expect(getByText(title)).not.toBeNull();
        expect(getByText(description)).not.toBeNull();
      });
    });
  });
});
