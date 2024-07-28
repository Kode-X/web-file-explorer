import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import EditorActions from './EditorActions';

jest.mock('../customLibrary/Button', () => ({ variant, onClick, children }: any) => (
  <button onClick={onClick} className={variant}>
    {children}
  </button>
));

describe('EditorActions', () => {
  const handleSave = jest.fn();
  const handleCancel = jest.fn();
  const setIsEditing = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders "Save" and "Cancel" buttons when isEditing is true', () => {
    render(
      <EditorActions
        isEditing={true}
        handleSave={handleSave}
        handleCancel={handleCancel}
        setIsEditing={setIsEditing}
      />
    );

    expect(screen.getByText('Save')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
  });

  test('renders "Edit" button when isEditing is false', () => {
    render(
      <EditorActions
        isEditing={false}
        handleSave={handleSave}
        handleCancel={handleCancel}
        setIsEditing={setIsEditing}
      />
    );

    expect(screen.getByText('Edit')).toBeInTheDocument();
  });

  test('calls handleSave when "Save" button is clicked', () => {
    render(
      <EditorActions
        isEditing={true}
        handleSave={handleSave}
        handleCancel={handleCancel}
        setIsEditing={setIsEditing}
      />
    );

    const saveButton = screen.getByText('Save');
    fireEvent.click(saveButton);

    expect(handleSave).toHaveBeenCalled();
  });

  test('calls handleCancel when "Cancel" button is clicked', () => {
    render(
      <EditorActions
        isEditing={true}
        handleSave={handleSave}
        handleCancel={handleCancel}
        setIsEditing={setIsEditing}
      />
    );

    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);

    expect(handleCancel).toHaveBeenCalled();
  });

  test('calls setIsEditing with true when "Edit" button is clicked', () => {
    render(
      <EditorActions
        isEditing={false}
        handleSave={handleSave}
        handleCancel={handleCancel}
        setIsEditing={setIsEditing}
      />
    );

    const editButton = screen.getByText('Edit');
    fireEvent.click(editButton);

    expect(setIsEditing).toHaveBeenCalledWith(true);
  });
});
