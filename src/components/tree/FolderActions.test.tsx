
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from "@testing-library/react";
import FolderActions from "./FolderActions";

jest.mock("@heroicons/react/solid", () => ({
  DocumentAddIcon: (props: any) => <svg {...props} data-testid="document-add-icon" />,
  FolderAddIcon: (props: any) => <svg {...props} data-testid="folder-add-icon" />,
  TrashIcon: (props: any) => <svg {...props} data-testid="trash-icon" />,
}));

describe("FolderActions", () => {
  const mockOpenModal = jest.fn();
  const mockOnDelete = jest.fn();

  test("renders FolderAddIcon and DocumentAddIcon when type is 'folder'", () => {
    render(
      <FolderActions
        openModal={mockOpenModal}
        onDelete={mockOnDelete}
        type="folder"
      />
    );

    expect(screen.getByTestId("folder-add-icon")).toBeInTheDocument();
    expect(screen.getByTestId("document-add-icon")).toBeInTheDocument();
    expect(screen.getByTestId("trash-icon")).toBeInTheDocument();
  });

  test("does not render FolderAddIcon and DocumentAddIcon when type is 'file'", () => {
    render(
      <FolderActions
        openModal={mockOpenModal}
        onDelete={mockOnDelete}
        type="file"
      />
    );

    expect(screen.queryByTestId("folder-add-icon")).not.toBeInTheDocument();
    expect(screen.queryByTestId("document-add-icon")).not.toBeInTheDocument();
    expect(screen.getByTestId("trash-icon")).toBeInTheDocument();
  });

  test("calls openModal with 'folder' when FolderAddIcon is clicked", () => {
    render(
      <FolderActions
        openModal={mockOpenModal}
        onDelete={mockOnDelete}
        type="folder"
      />
    );

    fireEvent.click(screen.getByTestId("folder-add-icon"));

    expect(mockOpenModal).toHaveBeenCalledWith("folder");
  });

  test("calls openModal with 'file' when DocumentAddIcon is clicked", () => {
    render(
      <FolderActions
        openModal={mockOpenModal}
        onDelete={mockOnDelete}
        type="folder"
      />
    );

    fireEvent.click(screen.getByTestId("document-add-icon"));

    expect(mockOpenModal).toHaveBeenCalledWith("file");
  });

  test("calls onDelete when TrashIcon is clicked", () => {
    render(
      <FolderActions
        openModal={mockOpenModal}
        onDelete={mockOnDelete}
        type="folder"
      />
    );

    fireEvent.click(screen.getByTestId("trash-icon"));

    expect(mockOnDelete).toHaveBeenCalled();
  });

  test("stops event propagation when FolderAddIcon is clicked", () => {
    const stopPropagation = jest.fn();
    render(
      <FolderActions
        openModal={mockOpenModal}
        onDelete={mockOnDelete}
        type="folder"
      />
    );

    const folderAddButton = screen.getByTestId("folder-add-icon");
    fireEvent.click(folderAddButton, { bubbles: true, cancelable: true, composed: true, stopPropagation });

    expect(stopPropagation).toHaveBeenCalled();
  });

  test("stops event propagation when DocumentAddIcon is clicked", () => {
    const stopPropagation = jest.fn();
    render(
      <FolderActions
        openModal={mockOpenModal}
        onDelete={mockOnDelete}
        type="folder"
      />
    );

    const documentAddButton = screen.getByTestId("document-add-icon");
    fireEvent.click(documentAddButton, { bubbles: true, cancelable: true, composed: true, stopPropagation });

    expect(stopPropagation).toHaveBeenCalled();
  });

  test("stops event propagation when TrashIcon is clicked", () => {
    const stopPropagation = jest.fn();
    render(
      <FolderActions
        openModal={mockOpenModal}
        onDelete={mockOnDelete}
        type="folder"
      />
    );

    const trashButton = screen.getByTestId("trash-icon");
    fireEvent.click(trashButton, { bubbles: true, cancelable: true, composed: true, stopPropagation });

    expect(stopPropagation).toHaveBeenCalled();
  });
});
