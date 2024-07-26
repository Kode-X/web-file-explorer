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
          return {
            ...node,
            children: [...(node.children ?? []), newNode],
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
  