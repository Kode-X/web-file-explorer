import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Editor from './Editor';
import { useFileContext } from '../../context/FileContext';

jest.mock('../../context/FileContext', () => ({
  useFileContext: jest.fn(),
}));

const mockSetFileContent = jest.fn();
const mockSetIsEditing = jest.fn();
const mockSetOriginalContent = jest.fn();
const mockSetSelectedFile = jest.fn();
const mockSetNodes = jest.fn();

describe('Editor', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders message when no file is selected', () => {
    (useFileContext as jest.Mock).mockReturnValue({
      selectedFile: null,
      fileContent: '',
      originalContent: '',
      isEditing: false,
      setFileContent: mockSetFileContent,
      setIsEditing: mockSetIsEditing,
      setOriginalContent: mockSetOriginalContent,
      setSelectedFile: mockSetSelectedFile,
      setNodes: mockSetNodes,
      nodes: [],
    });

    render(<Editor />);

    expect(screen.getByText('Select a file to view its content.')).toBeInTheDocument();
  });

  test('renders editor with file details and actions when a file is selected', () => {
    (useFileContext as jest.Mock).mockReturnValue({
      selectedFile: { id: 1, path: 'path/to/file', type: 'file' },
      fileContent: 'File content',
      originalContent: 'Original content',
      isEditing: false,
      setFileContent: mockSetFileContent,
      setIsEditing: mockSetIsEditing,
      setOriginalContent: mockSetOriginalContent,
      setSelectedFile: mockSetSelectedFile,
      setNodes: mockSetNodes,
      nodes: [],
    });

    render(<Editor />);

    expect(screen.getByText('Path: path/to/file')).toBeInTheDocument();
  });

  test('calls handleEditorActionSave correctly', () => {
    const mockSetNodes = jest.fn();
    const mockSetOriginalContent = jest.fn();
    const mockSetIsEditing = jest.fn();

    (useFileContext as jest.Mock).mockReturnValue({
      selectedFile: { id: 1, path: 'path/to/file', type: 'file' },
      fileContent: 'Updated content',
      originalContent: 'Original content',
      isEditing: true,
      setFileContent: mockSetFileContent,
      setIsEditing: mockSetIsEditing,
      setOriginalContent: mockSetOriginalContent,
      setSelectedFile: mockSetSelectedFile,
      setNodes: mockSetNodes,
      nodes: [
        { id: 1, name: 'file1', type: 'file', content: 'Original content', children: [] }
      ],
    });

    render(<Editor />);

    const saveButton = screen.getByText('Save');
    fireEvent.click(saveButton);

    expect(mockSetNodes).toHaveBeenCalledWith([
      { id: 1, name: 'file1', type: 'file', content: 'Updated content', children: [] }
    ]);
    expect(mockSetOriginalContent).toHaveBeenCalledWith('Updated content');
    expect(mockSetIsEditing).toHaveBeenCalledWith(false);
  });

  test('calls handleEditorActionCancel correctly', () => {
    (useFileContext as jest.Mock).mockReturnValue({
      selectedFile: { id: 1, path: 'path/to/file', type: 'file' },
      fileContent: 'Edited content',
      originalContent: 'Original content',
      isEditing: true,
      setFileContent: mockSetFileContent,
      setIsEditing: mockSetIsEditing,
      setOriginalContent: mockSetOriginalContent,
      setSelectedFile: mockSetSelectedFile,
      setNodes: mockSetNodes,
      nodes: [],
    });

    render(<Editor />);

    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);

    expect(mockSetFileContent).toHaveBeenCalledWith('Original content');
    expect(mockSetIsEditing).toHaveBeenCalledWith(false);
  });
});
