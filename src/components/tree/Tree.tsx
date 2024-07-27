import React from "react";
import { useFileContext } from "../../context/FileContext";
import TreeView from "./TreeView";
import { handleFileClick } from "../../utils/getFileHandlers"; // Βεβαιώσου ότι έχεις την σωστή διαδρομή
import { filteredNodes } from "../../utils/getFileHandlers"; // Εάν χρειάζεται
import { TreeNode } from "../../types/types";
import SearchTree from "./SearchTree";

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
