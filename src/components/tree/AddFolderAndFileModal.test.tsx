import '@testing-library/jest-dom';
import { fireEvent, render, screen } from "@testing-library/react";
import AddFolderAndFileModal from "./AddFolderAndFileModal";

jest.mock("../customLibrary/Button", () => (props: any) => (
  <button {...props}>{props.children}</button>
));

describe("AddFolderAndFileModal", () => {
  const mockCloseModal = jest.fn();
  const mockHandleSave = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders with correct title and input field", () => {
    render(
      <AddFolderAndFileModal
        isModalOpen={true}
        closeModal={mockCloseModal}
        handleSave={mockHandleSave}
        type="folder"
      />
    );

    expect(screen.getByText("Add New folder")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("folder name")).toBeInTheDocument();
  });

  test("shows modal when isModalOpen is true", () => {
    render(
      <AddFolderAndFileModal
        isModalOpen={true}
        closeModal={mockCloseModal}
        handleSave={mockHandleSave}
        type="file"
      />
    );

    expect(screen.getByText("Add New file")).toBeVisible();
  });

  test("hides modal when isModalOpen is false", () => {
    render(
      <AddFolderAndFileModal
        isModalOpen={false}
        closeModal={mockCloseModal}
        handleSave={mockHandleSave}
        type="file"
      />
    );

    expect(screen.queryByText("Add New file")).not.toBeVisible();
  });

  test("updates input field value on change", () => {
    render(
      <AddFolderAndFileModal
        isModalOpen={true}
        closeModal={mockCloseModal}
        handleSave={mockHandleSave}
        type="file"
      />
    );

    const input = screen.getByPlaceholderText("file name");
    fireEvent.change(input, { target: { value: "test.txt" } });
    expect(input).toHaveValue("test.txt");
  });

  test("calls handleSave with correct arguments and clears input when Save button is clicked", () => {
    render(
      <AddFolderAndFileModal
        isModalOpen={true}
        closeModal={mockCloseModal}
        handleSave={mockHandleSave}
        type="file"
      />
    );

    const input = screen.getByPlaceholderText("file name");
    fireEvent.change(input, { target: { value: "test.txt" } });

    fireEvent.click(screen.getByText("Save"));

    expect(mockHandleSave).toHaveBeenCalledWith("test.txt", "file");
    expect(input).toHaveValue("");
  });

  test("displays error message when invalid file name is provided", () => {
    render(
      <AddFolderAndFileModal
        isModalOpen={true}
        closeModal={mockCloseModal}
        handleSave={mockHandleSave}
        type="file"
      />
    );

    const input = screen.getByPlaceholderText("file name");
    fireEvent.change(input, { target: { value: "invalid" } });

    fireEvent.click(screen.getByText("Save"));

    expect(screen.getByText("Invalid file name. Please use one of the following extensions: .txt, .json, .png")).toBeInTheDocument();
  });

  test("calls closeModal when Cancel button is clicked", () => {
    render(
      <AddFolderAndFileModal
        isModalOpen={true}
        closeModal={mockCloseModal}
        handleSave={mockHandleSave}
        type="folder"
      />
    );

    fireEvent.click(screen.getByText("Cancel"));

    expect(mockCloseModal).toHaveBeenCalled();
  });

  test("calls handleSave when Enter key is pressed", () => {
    render(
      <AddFolderAndFileModal
        isModalOpen={true}
        closeModal={mockCloseModal}
        handleSave={mockHandleSave}
        type="file"
      />
    );

    const input = screen.getByPlaceholderText("file name");
    fireEvent.change(input, { target: { value: "test.png" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

    expect(mockHandleSave).toHaveBeenCalledWith("test.png", "file");
  });
});
