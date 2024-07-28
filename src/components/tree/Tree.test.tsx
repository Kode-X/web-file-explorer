import { render, screen, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import Tree from "./Tree";
import { useFileContext } from "../../context/FileContext";
import { filteredNodes } from "../../utils/getHelpers";
import { handleAddNode, handleFileClick } from "../../utils/getHandlers";

jest.mock("../../context/FileContext", () => ({
  __esModule: true,
  useFileContext: jest.fn(),
}));

jest.mock("../../utils/getHelpers", () => ({
  __esModule: true,
  filteredNodes: jest.fn(),
}));

jest.mock("../../utils/getHandlers", () => ({
  __esModule: true,
  handleAddNode: jest.fn(),
  handleFileClick: jest.fn(),
}));

const mockSetNodes = jest.fn();
const mockSetSearchTerm = jest.fn();
const mockSetSelectedFile = jest.fn();
const mockSetFileContent = jest.fn();
const mockSetOriginalContent = jest.fn();
const mockSetIsEditing = jest.fn();

const mockNodes: any[] = [];
const mockSearchTerm = "";

const mockContext = {
  nodes: mockNodes,
  setNodes: mockSetNodes,
  searchTerm: mockSearchTerm,
  setSearchTerm: mockSetSearchTerm,
  setSelectedFile: mockSetSelectedFile,
  setFileContent: mockSetFileContent,
  setOriginalContent: mockSetOriginalContent,
  setIsEditing: mockSetIsEditing,
};

describe("Tree Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useFileContext as jest.Mock).mockReturnValue(mockContext);
    (filteredNodes as jest.Mock).mockReturnValue(mockNodes);
  });

  test("renders SearchTree, AddFolderAndFileButtons, and TreeView", () => {
    render(<Tree />);

    expect(screen.getByText("My Files")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Add Folder/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Add File/i })
    ).toBeInTheDocument();

    expect(screen.queryByText(/Node/i)).not.toBeInTheDocument();
  });

  test("calls handleAddFolder and handleAddFile on button click", () => {
    render(<Tree />);

    fireEvent.click(screen.getByRole("button", { name: /Add Folder/i }));
    expect(handleAddNode).toHaveBeenCalledWith(
      expect.any(String),
      "",
      "folder",
      mockSetNodes,
      mockNodes
    );

    fireEvent.click(screen.getByRole("button", { name: /Add File/i }));
    expect(handleAddNode).toHaveBeenCalledWith(
      expect.any(String),
      "",
      "file",
      mockSetNodes,
      mockNodes
    );
  });

  test("calls handleFileClick with the correct arguments", () => {
    const mockNode = { id: "1", name: "File 1", type: "file", children: [] };
    render(<Tree />);

    act(() => {
      mockContext.setSelectedFile(mockNode);
      mockContext.setFileContent("Content");
      mockContext.setOriginalContent("Original Content");
      mockContext.setIsEditing(true);
    });

    expect(handleFileClick).toHaveBeenCalledWith(
      mockNode,
      mockSetSelectedFile,
      mockSetFileContent,
      mockSetOriginalContent,
      mockSetIsEditing
    );
  });
});
