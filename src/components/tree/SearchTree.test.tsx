import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchTree from './SearchTree';

describe('SearchTree', () => {
  const mockSetSearchTerm = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders the input field with the correct placeholder and value', () => {
    render(
      <SearchTree searchTerm="test" setSearchTerm={mockSetSearchTerm} />
    );

    const inputElement = screen.getByPlaceholderText('Search files...');
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveValue('test');
  });

  test('calls setSearchTerm with the correct value when input changes', () => {
    render(
      <SearchTree searchTerm="" setSearchTerm={mockSetSearchTerm} />
    );

    const inputElement = screen.getByPlaceholderText('Search files...');

    fireEvent.change(inputElement, { target: { value: 'new search term' } });

    expect(mockSetSearchTerm).toHaveBeenCalledWith('new search term');
  });
});
