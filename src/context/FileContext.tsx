// context/FileContext.tsx
import React, { createContext, useContext, useState } from 'react';
import { TreeNode } from '../types/types';

interface FileContextType {
  nodes: TreeNode[];
  selectedFile: TreeNode | null;
  fileContent: string;
  originalContent: string;
  isEditing: boolean;
  searchTerm: string;
  setNodes: (nodes: TreeNode[]) => void;
  setSelectedFile: (file: TreeNode | null) => void;
  setFileContent: (content: string) => void;
  setOriginalContent: (content: string) => void;
  setIsEditing: (isEditing: boolean) => void;
  setSearchTerm: (term: string) => void;
}

const FileContext = createContext<FileContextType | undefined>(undefined);

export const FileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [nodes, setNodes] = useState<TreeNode[]>([]);
  const [selectedFile, setSelectedFile] = useState<TreeNode | null>(null);
  const [fileContent, setFileContent] = useState<string>('');
  const [originalContent, setOriginalContent] = useState<string>('');
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>('');

  return (
    <FileContext.Provider
      value={{
        nodes,
        selectedFile,
        fileContent,
        originalContent,
        isEditing,
        searchTerm,
        setNodes,
        setSelectedFile,
        setFileContent,
        setOriginalContent,
        setIsEditing,
        setSearchTerm,
      }}
    >
      {children}
    </FileContext.Provider>
  );
};

export const useFileContext = () => {
  const context = useContext(FileContext);
  if (!context) {
    throw new Error('useFileContext must be used within a FileProvider');
  }
  return context;
};
