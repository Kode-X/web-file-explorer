import React, { useState, useMemo } from 'react';
import TreeView from './components/TreeView';
import { TreeNode } from './types/types';


const treeData: TreeNode[] = [
  {
    id: 1,
    name: 'Documents',
    children: [
      {
        id: 2,
        name: 'Projects',
        children: [
          { id: 3, name: 'Project1.docx', isFile: true, content: 'This is the content of Project1.docx.' },
          { id: 4, name: 'Project2.docx', isFile: true, content: 'This is the content of Project2.docx.' },
        ],
      },
      {
        id: 5,
        name: 'Photos',
        children: [
          { id: 6, name: 'Vacation.jpg', isFile: true, content: 'This is an image file content.' },
          { id: 7, name: 'Birthday.png', isFile: true, content: 'This is another image file content.' },
        ],
      },
    ],
  },
  {
    id: 8,
    name: 'Downloads',
    children: [
      { id: 9, name: 'Software.exe', isFile: true, content: 'This is the content of Software.exe.' },
    ],
  },
];

const getPath = (node: TreeNode, path: string[] = []): string[] => {
  if (!node) return path;
  if (node.isFile) return [...path, node.name];
  return node.children?.reduce((acc, child) => getPath(child, [...path, node.name]) || acc, path) || path;
};

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFileContent, setSelectedFileContent] = useState<string | null>(null);
  const [filePath, setFilePath] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const filterTreeData = (data: TreeNode[], query: string): TreeNode[] => {
    const lowerCaseQuery = query.toLowerCase();

    const filterNode = (node: TreeNode): TreeNode | null => {
      if (node.isFile) {
        return node.name.toLowerCase().includes(lowerCaseQuery) ? node : null;
      }

      const filteredChildren = (node.children ?? [])
        .map(filterNode)
        .filter(Boolean) as TreeNode[];

      if (filteredChildren.length > 0 || node.name.toLowerCase().includes(lowerCaseQuery)) {
        return { ...node, children: filteredChildren };
      }

      return null;
    };

    return data.map(filterNode).filter(Boolean) as TreeNode[];
  };

  const filteredData = useMemo(() => filterTreeData(treeData, searchQuery), [searchQuery]);

  const handleFileClick = (node: TreeNode | undefined) => {
    if (node?.isFile) {
      setSelectedFileContent(node.content || null);
      const path = getPath(node);
      setFilePath(path.join(' / '));
      setIsEditing(false); // Disable editing mode when a new file is selected
    } else {
      setSelectedFileContent(null);
      setFilePath(null);
    }
  };

  const handleEditClick = () => {
    setIsEditing((prev) => !prev); // Toggle edit mode
  };

  const handleContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSelectedFileContent(event.target.value);
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/4 bg-gray-50 border-r border-gray-200 p-4">
        <h1 className="text-2xl font-bold mb-4">My Files</h1>
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded mb-4"
        />
        <TreeView data={filteredData} onFileClick={handleFileClick} />
      </div>
      <div className="flex-1 p-4">
        {filePath && <div className="text-sm text-gray-600 mb-2">{filePath}</div>}
        {selectedFileContent ? (
          <div>
            <button
              onClick={handleEditClick}
              className="mb-2 px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
            >
              {isEditing ? 'Save' : 'Edit'}
            </button>
            <textarea
              className="w-full h-full p-2 border border-gray-300 rounded"
              value={selectedFileContent}
              onChange={handleContentChange}
              readOnly={!isEditing}
            />
          </div>
        ) : (
          <div className="text-gray-500">Select a file to view its content.</div>
        )}
      </div>
    </div>
  );
};

export default App;
