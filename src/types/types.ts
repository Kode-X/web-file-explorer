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
  children?: TreeNode[];
}

export interface FolderNode extends BaseTreeNode {
  type: "folder";
  children: TreeNode[];
}

export interface FileNode extends BaseTreeNode {
  type: "file";
  content?: string;
  contentType?: ContentType;
}

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
