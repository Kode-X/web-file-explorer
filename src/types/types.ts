export interface BaseTreeNode {
  id: number;
  name: string;
  type: "file" | "folder";
  path?: string;
  children?: TreeNode[]; // Only relevant for folders
}

// Interface for "folder" nodes
export interface FolderNode extends BaseTreeNode {
  type: "folder";
  children: TreeNode[]; // Folders must have children
}

// Interface for "file" nodes
export interface FileNode extends BaseTreeNode {
  type: "file";
  content?: string; // Files may have content
}

// Union type of TreeNode
export type TreeNode = FolderNode | FileNode;

export const jsonData: TreeNode[] = [
  {
    id: 1,
    name: "public",
    type: "folder",
    path: "public",
    children: [
      {
        id: 2,
        name: "readme.txt",
        type: "file",
        path: "public/readme.txt",
        content: "",
      },
      {
        id: 3,
        name: "config.json",
        type: "file",
        path: "public/config.json",
        content: "",
      },
      {
        id: 4,
        name: "image.png",
        type: "file",
        path: "public/image.png",
        content: "",
      },
    ],
  },
  {
    id: 5,
    name: "server",
    type: "folder",
    path: "server",
    children: [
      {
        id: 6,
        name: "server.txt",
        type: "file",
        path: "server/server.txt",
        content: "",
      },
      {
        id: 7,
        name: "settings.json",
        type: "file",
        path: "server/settings.json",
        content: "",
      },
      {
        id: 8,
        name: "logo.png",
        type: "file",
        path: "server/logo.png",
        content: "",
      },
    ],
  },
  {
    id: 9,
    name: "src",
    type: "folder",
    path: "src",
    children: [
      {
        id: 10,
        name: "info.txt",
        type: "file",
        path: "src/info.txt",
        content: "",
      },
      {
        id: 11,
        name: "data.json",
        type: "file",
        path: "src/data.json",
        content: "",
      },
      {
        id: 12,
        name: "banner.png",
        type: "file",
        path: "src/banner.png",
        content: "",
      },
    ],
  },
];
