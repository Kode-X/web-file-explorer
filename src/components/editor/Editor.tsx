// components/editor/Editor.tsx
import React from 'react';
import { useFileContext } from '../../context/FileContext';
import { FileNode, TreeNode } from '../../types/types';
import EditorActions from './EditorActions';
import EditorView from './EditorView';

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
    if (selectedFile && (selectedFile as FileNode).type === 'file') {
      const updatedNodes = updateNodeContent(nodes, (selectedFile as FileNode).id, fileContent);
      setNodes(updatedNodes);
      setOriginalContent(fileContent);
      setIsEditing(false);
    }
  };

  const handleEditorActionCancel = () => {
    setFileContent(originalContent);
    setIsEditing(false);
  };
console.log(selectedFile)
  return (
    <>
      {selectedFile ? (
        (selectedFile as FileNode).type === 'file' ? (
          (selectedFile as FileNode).content ? (
            <img src={(selectedFile as FileNode).content} alt={(selectedFile as FileNode).name} className="max-w-full max-h-full" />
          ) : (
            <div>No content available</div>
          )
        ) : (
          <>
            <div className="mb-2 text-lg font-semibold">
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
        )
      ) : (
        <div className="text-gray-500">Select a file to view its content.</div>
      )}
    </>
  );
};

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
