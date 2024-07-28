import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { TreeNode } from "../../types/types";
import TreeView from "./TreeView";

jest.mock("../../hooks/useTreeActions", () => ({
  __esModule: true,
  default: () => ({
    addNode: jest.fn(),
    deleteNode: jest.fn(),
  }),
}));

const mockAddNode = jest.fn();
const mockDeleteNode = jest.fn();

jest.mock("../../hooks/useTreeActions", () => ({
  __esModule: true,
  default: () => ({
    addNode: mockAddNode,
    deleteNode: mockDeleteNode,
  }),
}));

const initialNodes: TreeNode[] = [
  {
    id: 1,
    name: "Node 1",
    type: "folder",
    children: [],
  },
  {
    id: 2,
    name: "Node 2",
    type: "file",
    children: [],
  },
];

describe("TreeView", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders TreeNodeComponent for each node", () => {
    render(<TreeView nodes={initialNodes} onFileClick={jest.fn()} />);

    expect(screen.getByText("Node 1")).toBeInTheDocument();
    expect(screen.getByText("Node 2")).toBeInTheDocument();
  });

  test("updates TreeNodeComponent when initialNodes prop changes", () => {
    const { rerender } = render(
      <TreeView nodes={initialNodes} onFileClick={jest.fn()} />
    );

    const newNodes: TreeNode[] = [
      {
        id: 3,
        name: "Node 3",
        type: "folder",
        children: [],
      },
    ];

    rerender(<TreeView nodes={newNodes} onFileClick={jest.fn()} />);

    expect(screen.queryByText("Node 1")).not.toBeInTheDocument();
    expect(screen.queryByText("Node 2")).not.toBeInTheDocument();
    expect(screen.getByText("Node 3")).toBeInTheDocument();
  });

  test("calls addNode and deleteNode functions on TreeNodeComponent actions", () => {
    const onFileClick = jest.fn();

    render(<TreeView nodes={initialNodes} onFileClick={onFileClick} />);

    const nodeComponent = screen.getByText("Node 1").closest("div");
    if (nodeComponent) {
      fireEvent.mouseEnter(nodeComponent);
      fireEvent.click(screen.getByRole("button", { name: /Add Folder/i }));
    }

    expect(mockAddNode).toHaveBeenCalled();

    fireEvent.click(screen.getByRole("button", { name: /Delete/i }));
    expect(mockDeleteNode).toHaveBeenCalled();
  });
});
