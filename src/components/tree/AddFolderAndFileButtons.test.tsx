import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import AddFolderAndFileButtons from "./AddFolderAndFileButtons";

jest.mock("./AddFolderAndFileModal", () => ({
  __esModule: true,
  default: (props: any) => (
    <div
      data-testid={`modal-${props.type}`}
      style={{ display: props.isModalOpen ? "block" : "none" }}
    >
      <button onClick={() => props.handleSave("test-name")}>Save</button>
      <button onClick={props.closeModal}>Close</button>
    </div>
  ),
}));

jest.mock("../customLibrary/Button", () => (props: any) => (
  <button {...props}>{props.children}</button>
));

describe("AddFolderAndFileButtons", () => {
  const mockOnAddFolder = jest.fn();
  const mockOnAddFile = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders Add Folder and Add File buttons", () => {
    render(
      <AddFolderAndFileButtons
        onAddFolder={mockOnAddFolder}
        onAddFile={mockOnAddFile}
      />
    );

    expect(screen.getByText("Add Folder")).toBeInTheDocument();
    expect(screen.getByText("Add File")).toBeInTheDocument();
  });

  test("opens folder modal when Add Folder button is clicked", () => {
    render(
      <AddFolderAndFileButtons
        onAddFolder={mockOnAddFolder}
        onAddFile={mockOnAddFile}
      />
    );

    fireEvent.click(screen.getByText("Add Folder"));

    expect(screen.getByTestId("modal-folder")).toBeVisible();
  });

  test("opens file modal when Add File button is clicked", () => {
    render(
      <AddFolderAndFileButtons
        onAddFolder={mockOnAddFolder}
        onAddFile={mockOnAddFile}
      />
    );

    fireEvent.click(screen.getByText("Add File"));

    expect(screen.getByTestId("modal-file")).toBeVisible();
  });

  test("calls onAddFolder and closes modal when Save button in folder modal is clicked", () => {
    render(
      <AddFolderAndFileButtons
        onAddFolder={mockOnAddFolder}
        onAddFile={mockOnAddFile}
      />
    );

    fireEvent.click(screen.getByText("Add Folder"));
    fireEvent.click(screen.getByText("Save"));

    expect(mockOnAddFolder).toHaveBeenCalledWith("test-name");
    expect(screen.queryByTestId("modal-folder")).not.toBeVisible();
  });

  test("calls onAddFile and closes modal when Save button in file modal is clicked", () => {
    render(
      <AddFolderAndFileButtons
        onAddFolder={mockOnAddFolder}
        onAddFile={mockOnAddFile}
      />
    );

    fireEvent.click(screen.getByText("Add File"));
    fireEvent.click(screen.getByText("Save"));

    expect(mockOnAddFile).toHaveBeenCalledWith("test-name");
    expect(screen.queryByTestId("modal-file")).not.toBeVisible();
  });

  test("closes folder modal when Close button is clicked", () => {
    render(
      <AddFolderAndFileButtons
        onAddFolder={mockOnAddFolder}
        onAddFile={mockOnAddFile}
      />
    );

    fireEvent.click(screen.getByText("Add Folder"));
    fireEvent.click(screen.getByText("Close"));

    expect(screen.queryByTestId("modal-folder")).not.toBeVisible();
  });

  test("closes file modal when Close button is clicked", () => {
    render(
      <AddFolderAndFileButtons
        onAddFolder={mockOnAddFolder}
        onAddFile={mockOnAddFile}
      />
    );

    fireEvent.click(screen.getByText("Add File"));
    fireEvent.click(screen.getByText("Close"));

    expect(screen.queryByTestId("modal-file")).not.toBeVisible();
  });
});
