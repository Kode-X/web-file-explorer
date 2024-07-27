// components/tree/Tree.tsx
import React from "react";
import { useFileContext } from "../../context/FileContext";
import TreeView from "./TreeView";
import { handleFileClick } from "../../utils/getHandlers";

import { TreeNode } from "../../types/types";
import SearchTree from "./SearchTree";
import { filteredNodes } from "../../utils/getHelpers";

const Tree: React.FC = () => {
  const {
    nodes,
    searchTerm,
    setSearchTerm,
    setSelectedFile,
    setFileContent,
    setOriginalContent,
    setIsEditing,
  } = useFileContext();

  const onFileClick = (node: TreeNode) => {
    handleFileClick(
      node,
      setSelectedFile,
      setFileContent,
      setOriginalContent,
      setIsEditing
    );
  };

  return (
    <div>
      <div className="text-xl font-semibold mb-4">My Files</div>
      <SearchTree searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <TreeView
        nodes={filteredNodes(nodes, searchTerm)}
        onFileClick={onFileClick}
      />
    </div>
  );
};

export default Tree;
