export interface TreeNode {
  id: number;
  name: string;
  type: "file" | "folder";
  path?: string;
  children?: TreeNode[];
}

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
      },
      {
        id: 3,
        name: "config.json",
        type: "file",
        path: "public/config.json",
      },
      {
        id: 4,
        name: "image.png",
        type: "file",
        path: "public/image.png",
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
      },
      {
        id: 7,
        name: "settings.json",
        type: "file",
        path: "server/settings.json",
      },
      {
        id: 8,
        name: "logo.png",
        type: "file",
        path: "server/logo.png",
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
      },
      {
        id: 11,
        name: "data.json",
        type: "file",
        path: "src/data.json",
      },
      {
        id: 12,
        name: "banner.png",
        type: "file",
        path: "src/banner.png",
      },
    ],
  },
];
