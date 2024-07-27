import { TreeNode } from "../types/types";
import { createNode, sortChildren, updateChildren } from "./getHelpers";

// export const handleFileClick = (
//   node: TreeNode,
//   setSelectedFile: (node: TreeNode | null) => void,
//   setFileContent: (content: string) => void,
//   fetchFileContent: (path: string) => void,
//   setIsEditing: (isEditing: boolean) => void
// ) => {
//   setSelectedFile(node);
//   if (
//     node.type === "file" &&
//     (node.name.endsWith(".txt") || node.name.endsWith(".json"))
//   ) {
//     fetchFileContent(node.path!);
//   } else {
//     setFileContent("This file type is not supported for editing.");
//   }
//   setIsEditing(false);
// };

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
    // Εδώ μπορείτε να προσθέσετε τον κώδικα για να αποθηκεύσετε το περιεχόμενο του αρχείου
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
    if (nodes.length === 0) {
      const newNode = createNode(name, type, "");
      return [newNode];
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
  name: string,
  type: string,
  setNodes: React.Dispatch<React.SetStateAction<TreeNode[]>>,
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
