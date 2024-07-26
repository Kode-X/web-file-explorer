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

export const handleAddFolder = (
    folderName: string,
    parentName: string,
    setNodes: React.Dispatch<React.SetStateAction<TreeNode[]>>,
    nodes: TreeNode[]
  ) => {
    const addFolderToNode = (nodes: TreeNode[]): TreeNode[] => {
      return nodes.map((node) => {
        if (node.name === parentName && node.type === "folder") {
          const newFolder: TreeNode = {
            id: Date.now(), // Ensure unique ID
            name: folderName,
            type: "folder",
            children: [],
          };
          return {
            ...node,
            children: [...(node.children ?? []), newFolder],
          };
        }
        if (node.children) {
          return {
            ...node,
            children: addFolderToNode(node.children),
          };
        }
        return node;
      });
    };
  
    setNodes(addFolderToNode(nodes));
  };