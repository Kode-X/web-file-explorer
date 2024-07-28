
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { TreeNode } from "../../types/types";
import TreeNodeComponent from "./TreeNodeComponent";


jest.mock("./AddFolderAndFileModal", () => ({
  __esModule: true,
  default: jest.fn(({ isModalOpen, closeModal, handleSave, type }) => (
    <div>
      {isModalOpen && (
        <div>
          <span>{type} Modal</span>
          <button onClick={() => handleSave("Test", type)}>Save</button>
          <button onClick={closeModal}>Close</button>
        </div>
      )}
    </div>
  )),
}));

jest.mock("./FolderActions", () => ({
  __esModule: true,
  default: jest.fn(({ openModal, onDelete, type }) => (
    <div>
      <button onClick={() => openModal(type)}>Open Modal</button>
      <button onClick={onDelete}>Delete</button>
    </div>
  )),
}));

const mockNode: TreeNode = {
  id: 1,
  name: "Node 1",
  type: "folder",
  children: [],
};

describe("TreeNodeComponent", () => {
  const mockOnFileClick = jest.fn();
  const mockOnDelete = jest.fn();
  const mockOnAddNode = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders folder and file icons correctly", () => {
  
    render(
      <TreeNodeComponent
        node={{ ...mockNode, type: "folder" }}
        onFileClick={mockOnFileClick}
        onDelete={mockOnDelete}
        onAddNode={mockOnAddNode}
      />
    );
    expect(screen.getByText("Node 1")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Open Modal/i })
    ).toBeInTheDocument();


    render(
      <TreeNodeComponent
        node={{ ...mockNode, type: "file" }}
        onFileClick={mockOnFileClick}
        onDelete={mockOnDelete}
        onAddNode={mockOnAddNode}
      />
    );
    expect(screen.getByText("Node 1")).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /Open Modal/i })).toBeNull();
  });

  test("opens and closes the modal", () => {
    render(
      <TreeNodeComponent
        node={mockNode}
        onFileClick={mockOnFileClick}
        onDelete={mockOnDelete}
        onAddNode={mockOnAddNode}
      />
    );

    fireEvent.mouseEnter(screen.getByText("Node 1"));
    fireEvent.click(screen.getByRole("button", { name: /Open Modal/i }));

  
    expect(screen.getByText("folder Modal")).toBeInTheDocument();


    fireEvent.click(screen.getByRole("button", { name: /Close/i }));
    expect(screen.queryByText("folder Modal")).toBeNull();
  });

  test("calls handleSave with correct arguments", () => {
    render(
      <TreeNodeComponent
        node={mockNode}
        onFileClick={mockOnFileClick}
        onDelete={mockOnDelete}
        onAddNode={mockOnAddNode}
      />
    );

    fireEvent.mouseEnter(screen.getByText("Node 1"));
    fireEvent.click(screen.getByRole("button", { name: /Open Modal/i }));
    fireEvent.click(screen.getByRole("button", { name: /Save/i }));

    expect(mockOnAddNode).toHaveBeenCalledWith("Test", "Node 1", "folder");
  });

  test("shows correct icons and disclosure panel for folder nodes", () => {
    render(
      <TreeNodeComponent
        node={{
          ...mockNode,
          children: [{ id: 2, name: "Child Node", type: "file", children: [] }],
        }}
        onFileClick={mockOnFileClick}
        onDelete={mockOnDelete}
        onAddNode={mockOnAddNode}
      />
    );

    expect(
      screen.getByRole("button", { name: /Open Modal/i })
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /Open Modal/i }));
    expect(screen.getByText("Child Node")).toBeInTheDocument();
  });

  test("calls onFileClick when file is clicked", () => {
    render(
      <TreeNodeComponent
        node={{ ...mockNode, type: "file" }}
        onFileClick={mockOnFileClick}
        onDelete={mockOnDelete}
        onAddNode={mockOnAddNode}
      />
    );

    fireEvent.click(screen.getByText("Node 1"));
    expect(mockOnFileClick).toHaveBeenCalledWith(mockNode);
  });
});
