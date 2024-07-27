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

const createNode = (
  name: string,
  type: "folder" | "file",
  parentPath: string
): TreeNode => {
  return type === "folder"
    ? {
        id: Date.now(),
        name,
        type: "folder",
        path: `${parentPath ? parentPath + "/" : ""}${name}`,
        children: [], // Folders start with no children
      }
    : {
        id: Date.now(),
        name,
        type: "file",
        path: `${parentPath ? parentPath + "/" : ""}${name}`,
        content: "", // Default content for new files
      };
};

const updateChildren = (
  children: TreeNode[],
  newNode: TreeNode
): TreeNode[] => {
  const updatedChildren = [
    ...(children.filter((child) => child.type === "folder") || []), // Existing folders
    ...(children.filter((child) => child.type === "file") || []), // Existing files
  ];

  updatedChildren.push(newNode); // Add the new node

  return updatedChildren;
};

const sortChildren = (children: TreeNode[]): TreeNode[] => {
  return children.sort((a, b) => {
    if (a.type === "folder" && b.type === "file") return -1;
    if (a.type === "file" && b.type === "folder") return 1;
    return a.name.localeCompare(b.name);
  });
};

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

  setNodes((prevNodes) => addNodeToTree(prevNodes));
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
