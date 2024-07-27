// components/tree/Tree.tsx
import React from 'react';
import { useFileContext } from '../../context/FileContext';
import TreeView from './TreeView';
import { filteredNodes } from '../../utils/getFileHandlers';
import { TreeNode } from '../../types/types';

const Tree: React.FC = () => {
  const { nodes, searchTerm, setSearchTerm, setSelectedFile, setFileContent, setIsEditing, setOriginalContent } = useFileContext();

  const handleFileClick = (node: TreeNode) => {
    if (node.type === 'file') {
      const fileContent = node.content || '';
      setFileContent(fileContent);
      setOriginalContent(fileContent);
      setSelectedFile(node);
      setIsEditing(false);
    }
  };

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
