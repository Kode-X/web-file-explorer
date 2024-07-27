// components/tree/Tree.tsx
import React from 'react';
import { useFileContext } from '../../context/FileContext';
import TreeView from './TreeView';
import { filteredNodes } from '../../utils/getFileHandlers';
import { TreeNode } from '../../types/types';

const Tree: React.FC = () => {
  const { nodes, searchTerm, setSearchTerm, setSelectedFile, setFileContent, setIsEditing, setOriginalContent } = useFileContext();

  const handleFileClick = (node: TreeNode) => {
    if (node.type === 'file' && (node.name.endsWith('.txt') || node.name.endsWith('.json'))) {
      fetchFileContent(node.path!);
    } else {
      setFileContent('This file type is not supported for editing.');
    }
    setSelectedFile(node);
    setIsEditing(false);
  };

  const fetchFileContent = (path: string) => {
    // Mock content fetching
    const mockContent = `Content of the file at ${path}`;
    setFileContent(mockContent);
    setOriginalContent(mockContent);
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
