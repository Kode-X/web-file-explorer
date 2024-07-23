export type TreeNode = {
    id: number;
    name: string;
    children?: TreeNode[];
    isFile?: boolean;
    content?: string;
  };