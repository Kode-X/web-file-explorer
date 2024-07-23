import { ReactNode } from "react";

// export type TreeNode = {
//     path: ReactNode;
//     type: string;
//     id: number;
//     name: string;
//     children?: TreeNode[];
//     isFile?: boolean;
//     content?: string;
//   };


  export interface TreeNode {
    name: string;
    type: 'file' | 'folder';
    path?: string;
    children?: TreeNode[];
  }