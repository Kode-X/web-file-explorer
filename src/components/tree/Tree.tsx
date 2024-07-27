import React from "react";
import TreeView from "./TreeView";
import { TreeNode } from "../../types/types";
import { filteredNodes } from "../../utils/getFileHandlers";

interface TreeProps {
  nodes: TreeNode[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  handleFileClick: (node: TreeNode) => void;
}

const Tree: React.FC<TreeProps> = ({
  nodes,
  searchTerm,
  setSearchTerm,
  handleFileClick,
}) => {
  return (
    <div>
      <div className="text-xl font-semibold mb-4">My Files</div>
      <input
        type="text"
        className="w-full mb-4 p-2 border rounded"
        placeholder="Search files..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <TreeView
        nodes={filteredNodes(nodes, searchTerm)}
        onFileClick={handleFileClick}
      />
    </div>
  );
};

export default Tree;
