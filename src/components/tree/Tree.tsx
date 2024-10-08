import React from "react";
import { useFileContext } from "../../context/FileContext";
import TreeView from "./TreeView";
import { handleAddNode, handleFileClick } from "../../utils/getHandlers";

import { TreeNode } from "../../types/types";
import SearchTree from "./SearchTree";
import { filteredNodes } from "../../utils/getHelpers";
import AddFolderAndFileButtons from "./AddFolderAndFileButtons";

const Tree: React.FC = () => {
  const {
    nodes,
    setNodes,
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

  const handleAddFolder = (name: string) => {
    handleAddNode(name, "", "folder", setNodes, nodes);
  };

  const handleAddFile = (name: string) => {
    handleAddNode(name, "", "file", setNodes, nodes);
  };

  return (
    <div>
      <div className="mb-4 text-xl font-semibold">My Files</div>
      <SearchTree searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <AddFolderAndFileButtons
        onAddFolder={handleAddFolder}
        onAddFile={handleAddFile}
      />
      <TreeView
        nodes={filteredNodes(nodes, searchTerm)}
        onFileClick={onFileClick}
      />
    </div>
  );
};

export default Tree;
