import { render, screen } from '@testing-library/react';
import Nav from './Nav';
import '@testing-library/jest-dom';

jest.mock('react-redux');
jest.mock('@/assets/search.svg', () => 'svg');

describe('Home', () => {
  it('renders a heading', () => {
    render(<Nav />);

    // const button = container.querySelector('.title');
    // expect(button).toHaveTextContent('ongs');
  });
});
