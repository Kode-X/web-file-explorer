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

// Function to generate a unique ID (Consider using a library like uuid for production)
const generateUniqueId = (): number => Date.now(); // Simplistic unique ID generator

export const handleAddNode = (
  name: string,
  parentName: string,
  type: "folder" | "file",
  setNodes: React.Dispatch<React.SetStateAction<TreeNode[]>>,
  nodes: TreeNode[]
) => {
  const addNodeToTree = (nodes: TreeNode[]): TreeNode[] => {
    return nodes.map((node) => {
      if (node.name === parentName && node.type === "folder") {
        const newNode: TreeNode = type === "folder"
          ? {
              id: Date.now(),
              name,
              type: "folder",
              path: `${node.path ? node.path + '/' : ''}${name}`,
              children: [], // Folders start with no children
            }
          : {
              id: Date.now(),
              name,
              type: "file",
              path: `${node.path ? node.path + '/' : ''}${name}`,
              content: "" // Default content for new files
            };

        const updatedChildren = [
          ...(node.children?.filter(child => child.type === "folder") || []), // Existing folders
          newNode, // New node
          ...(node.children?.filter(child => child.type === "file") || []) // Existing files
        ];

        return { ...node, children: updatedChildren };
      }

      if (node.children) {
        return { ...node, children: addNodeToTree(node.children) };
      }

      return node;
    });
  };

  setNodes(addNodeToTree(nodes));
};

export const generatePath = (
  parentPath: string,
  name: string,
  type: "folder" | "file"
): string => {
  return type === "file" ? `${parentPath}/${name}` : `${parentPath}/${name}`;
};

export const handleUpdateNodeName = (
  oldName: string,
  newName: string,
  nodes: TreeNode[]
): TreeNode[] => {
  const updateNode = (nodes: TreeNode[], parentPath: string): TreeNode[] =>
    nodes.map((node) => {
      if (node.name === oldName) {
        const updatedNode: TreeNode = {
          ...node,
          name: newName,
          path: generatePath(parentPath, newName, node.type),
        };
        return updatedNode;
      }
      if (node.children) {
        return {
          ...node,
          children: updateNode(node.children, `${parentPath}/${node.name}`),
        };
      }
      return node;
    });

  return updateNode(nodes, "");
};
