import { TreeNode } from "../types/types";
import { createNode, sortChildren, updateChildren } from "./getHelpers";

export const handleFileClick = (
  node: TreeNode,
  setSelectedFile: (node: TreeNode | null) => void,
  setFileContent: (content: string) => void,
  setOriginalContent: (content: string) => void,
  setIsEditing: (isEditing: boolean) => void
) => {
  if (node.type === "file") {
    const fileContent = node.content || "";
    setFileContent(fileContent);
    setOriginalContent(fileContent);
    setSelectedFile(node);
    setIsEditing(false);
  }
};

export const handleSave = (
  selectedFile: TreeNode | null,
  fileContent: string,
  setIsEditing: (isEditing: boolean) => void,
  setOriginalContent: (content: string) => void
) => {
  if (selectedFile) {
    console.log(`Saving content for ${selectedFile.path}:`, fileContent);
    setIsEditing(false);
    setOriginalContent(fileContent);
  }
};

export const handleCancel = (
  setFileContent: (content: string) => void,
  originalContent: string,
  setIsEditing: (isEditing: boolean) => void
) => {
  setFileContent(originalContent);
  setIsEditing(false);
};

export const handleAddNode = (
  name: string,
  parentName: string,
  type: "folder" | "file",
  setNodes: React.Dispatch<React.SetStateAction<TreeNode[]>>,
  nodes: TreeNode[]
) => {
  const addNodeToTree = (nodes: TreeNode[]): TreeNode[] => {
    if (parentName === "") {
      const newNode = createNode(name, type, "");
      return [...nodes, newNode];
    }

    return nodes.map((node) => {
      if (node.name === parentName && node.type === "folder") {
        const newNode = createNode(name, type, node.path || "");
        const updatedChildren = updateChildren(node.children || [], newNode);
        const sortedChildren = sortChildren(updatedChildren);

        return { ...node, children: sortedChildren };
      }

      if (node.children) {
        return { ...node, children: addNodeToTree(node.children) };
      }

      return node;
    });
  };

  setNodes((prevNodes: TreeNode[]) => addNodeToTree(prevNodes));
};

export const handleDeleteNode = (
  nodeToDelete: TreeNode,
  setNodes: React.Dispatch<React.SetStateAction<TreeNode[]>>,
  nodes: TreeNode[],
  selectedFile: TreeNode | null,
  setSelectedFile: (file: TreeNode | null) => void
) => {
  const deleteNode = (nodes: TreeNode[]): TreeNode[] => {
    return nodes.filter((node) => {
      if (node.id === nodeToDelete.id) {
        return false;
      }
      if (node.children) {
        node.children = deleteNode(node.children);
      }
      return true;
    });
  };

  setNodes(deleteNode(nodes));
  if (selectedFile && selectedFile.id === nodeToDelete.id) {
    setSelectedFile(null);
  }
};
