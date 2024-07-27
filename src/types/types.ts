// Enum για τους τύπους περιεχομένου
export enum ContentType {
  TEXT = "text",
  IMAGE = "image",
  JSON = "json",
}

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
  contentType?: ContentType; // Τύπος περιεχομένου
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
        content: "This is a text file.",
        contentType: ContentType.TEXT,
      },
      {
        id: 3,
        name: "config.json",
        type: "file",
        content: '{"key": "value"}',
        contentType: ContentType.JSON,
      },
      {
        id: 4,
        name: "image.png",
        type: "file",
        path: "public/image.png",
        content: "Base64EncodedImageString",
        contentType: ContentType.IMAGE,
      },
    ],
  },
  {
    id: 5,
    name: "server",
    type: "folder",
    path: "server",
    children: [],
  },
  {
    id: 9,
    name: "src",
    type: "folder",
    path: "src",
    children: [],
  },
];
