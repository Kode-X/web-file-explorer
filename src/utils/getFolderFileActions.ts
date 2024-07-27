import { TreeNode } from "../types/types";

export const handleDelete = (
  name: string,
  type: string,
  setNodes: (arg0: TreeNode[]) => void,
  nodes: TreeNode[]
) => {
  const deleteNode = (nodes: TreeNode[]): TreeNode[] => {
    return nodes.filter((node) => {
      if (node.name === name) {
        return false;
      }
      if (node.children) {
        node.children = deleteNode(node.children);
      }
      return true;
    });
  };

  setNodes(deleteNode(nodes));
};

export const handleAddNode = (
  name: string,
  parentName: string,
  type: "folder" | "file", // Correct usage
  setNodes: React.Dispatch<React.SetStateAction<TreeNode[]>>,
  nodes: TreeNode[]
) => {
  const addNodeToTree = (nodes: TreeNode[]): TreeNode[] => {
    return nodes.map((node) => {
      if (node.name === parentName && node.type === "folder") {
        const newNode: TreeNode = {
          id: Date.now(), // Ensure unique ID
          name,
          type, // Correctly assigned "folder" or "file"
          children: type === "folder" ? [] : undefined, // Folders have children, files do not
        };

        // Create a sorted list where folders come before files
        const updatedChildren = [
          ...(newNode.type === "folder"
            ? [newNode] // Insert new folder first
            : []),
          ...(node.children ?? []).filter((child) => child.type === "folder"), // Existing folders
          ...(newNode.type === "file"
            ? [newNode] // Insert new file last
            : []),
          ...(node.children ?? []).filter((child) => child.type === "file"), // Existing files
        ];

        return {
          ...node,
          children: updatedChildren,
        };
      }

      if (node.children) {
        return {
          ...node,
          children: addNodeToTree(node.children),
        };
      }

      return node;
    });
  };

  setNodes(addNodeToTree(nodes));
};
