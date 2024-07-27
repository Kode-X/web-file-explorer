// components/editor/Editor.tsx
import React from 'react';
import { useFileContext } from '../../context/FileContext';
import EditorActions from './EditorActions';
import EditorView from './EditorView';
import { TreeNode } from '../../types/types';

const Editor: React.FC = () => {
  const {
    selectedFile,
    fileContent,
    originalContent,
    isEditing,
    setFileContent,
    setIsEditing,
    setOriginalContent,
    setSelectedFile,
    setNodes,
    nodes
  } = useFileContext();

  const handleEditorActionSave = () => {
    if (selectedFile) {
      const updatedNodes = updateNodeContent(nodes, selectedFile.id, fileContent);
      setNodes(updatedNodes);
      setOriginalContent(fileContent);
      setIsEditing(false);
    }
  };

  const handleEditorActionCancel = () => {
    setFileContent(originalContent);
    setIsEditing(false);
  };

  return (
    <>
      {selectedFile ? (
        <>
          <div className="text-lg font-semibold mb-2">
            Path: {selectedFile.path}
          </div>
          <EditorActions
            isEditing={isEditing}
            handleSave={handleEditorActionSave}
            handleCancel={handleEditorActionCancel}
            setIsEditing={setIsEditing}
          />
          <EditorView
            isEditing={isEditing}
            fileContent={fileContent}
            setFileContent={setFileContent}
          />
        </>
      ) : (
        <div className="text-gray-500">Select a file to view its content.</div>
      )}
    </>
  );
};

// Helper function to update the content in nodes
const updateNodeContent = (nodes: TreeNode[], fileId: number, newContent: string): TreeNode[] => {
  const updateNode = (nodes: TreeNode[]): TreeNode[] =>
    nodes.map(node => {
      if (node.id === fileId && node.type === 'file') {
        return { ...node, content: newContent };
      }
      if (node.children) {
        return { ...node, children: updateNode(node.children) };
      }
      return node;
    });

  return updateNode(nodes);
};

export default Editor;
