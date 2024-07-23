import React, { useState, useEffect } from 'react';
import { TreeNode } from './types/types';
import TreeView from './components/TreeView';

const App: React.FC = () => {
  const [nodes, setNodes] = useState<TreeNode[]>([]);
  const [selectedFile, setSelectedFile] = useState<TreeNode | null>(null);
  const [fileContent, setFileContent] = useState<string>('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetch('http://localhost:5000/files')
      .then((response) => response.json())
      .then((data) => setNodes(data))
      .catch((error) => console.error('Error fetching file structure:', error));
  }, []);

  const handleFileClick = (node: TreeNode) => {
    fetch(`http://localhost:5000/file-content?path=${node.path}`)
      .then((response) => response.text())
      .then((data) => {
        setSelectedFile(node);
        setFileContent(data);
        setIsEditing(false);
      })
      .catch((error) => console.error('Error fetching file content:', error));
  };

  const handleSave = () => {
    fetch('http://localhost:5000/save-file', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ path: selectedFile?.path, content: fileContent }),
    })
      .then((response) => {
        if (response.ok) {
          alert('File saved successfully');
          setIsEditing(false);
        } else {
          alert('Error saving file');
        }
      })
      .catch((error) => console.error('Error saving file:', error));
  };

  const handleDelete = (fileName: string) => {
    fetch(`http://localhost:5000/files/${fileName}`, { method: 'DELETE' })
      .then(() => fetch('http://localhost:5000/files')
        .then((response) => response.json())
        .then((data) => setNodes(data)))
      .catch((error) => console.error('Error deleting file:', error));
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/3 bg-gray-100 p-4">
        <div className="text-xl font-semibold mb-4">My Files</div>
        <input
          type="text"
          className="w-full mb-4 p-2 border rounded"
          placeholder="Search files..."
          onChange={(e) => console.log(e.target.value)}
        />
        <TreeView nodes={nodes} onFileClick={handleFileClick} onDelete={handleDelete} />
      </div>
      <div className="flex-1 p-4">
        {selectedFile ? (
          <>
            <div className="text-lg font-semibold mb-2">Path: {selectedFile.path}</div>
            {isEditing ? (
              <>
                <textarea
                  className="w-full h-full border border-gray-300 rounded p-2"
                  value={fileContent}
                  onChange={(e) => setFileContent(e.target.value)}
                />
                <button
                  className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
                  onClick={handleSave}
                >
                  Save
                </button>
              </>
            ) : (
              <div className="relative w-full h-full border border-gray-300 rounded p-2">
                <button
                  className="absolute top-2 right-2 bg-blue-500 text-white px-4 py-1 rounded"
                  onClick={() => setIsEditing(true)}
                >
                  Edit
                </button>
                <pre>{fileContent}</pre>
              </div>
            )}
          </>
        ) : (
          <div className="text-gray-500">Select a file to view its content.</div>
        )}
      </div>
    </div>
  );
};

export default App;
