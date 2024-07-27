import { TreeNode } from "../types/types";

export const createNode = (
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

export const updateChildren = (
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

export const sortChildren = (children: TreeNode[]): TreeNode[] => {
  return children.sort((a, b) => {
    if (a.type === "folder" && b.type === "file") return -1;
    if (a.type === "file" && b.type === "folder") return 1;
    return a.name.localeCompare(b.name);
  });
};

export const generatePath = (
  parentPath: string,
  name: string,
  type: "folder" | "file"
): string => {
  return type === "file" ? `${parentPath}/${name}` : `${parentPath}/${name}`;
};

export const filteredNodes = (
  nodes: TreeNode[],
  searchTerm: string
): TreeNode[] => {
  if (!searchTerm) return nodes;

  const searchLowerCase = searchTerm.toLowerCase();

  const filterNodes = (nodes: TreeNode[]): TreeNode[] => {
    return nodes
      .map((node) => {
        if (node.type === "folder") {
          const filteredChildren = filterNodes(node.children || []);
          return filteredChildren.length ||
            node.name.toLowerCase().includes(searchLowerCase)
            ? { ...node, children: filteredChildren }
            : null;
        } else {
          return node.name.toLowerCase().includes(searchLowerCase)
            ? node
            : null;
        }
      })
      .filter(Boolean) as TreeNode[];
  };

  return filterNodes(nodes);
};

export const fetchFileContent = (
  path: string,
  setFileContent: (content: string) => void,
  setOriginalContent: (content: string) => void
) => {
  const mockContent = `Content of the file at ${path}`;
  setFileContent(mockContent);
  setOriginalContent(mockContent);
};