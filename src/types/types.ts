export interface TreeNode {
  id: number;
  name: string;
  type: "file" | "folder";
  path?: string;
  children?: TreeNode[];
}
