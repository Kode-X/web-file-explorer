import React, { useState } from "react";
import { TreeNode } from "./types/types";
import TreeView from "./components/TreeView";

const App: React.FC = () => {
  // Define the JSON data directly in the app
  const jsonData: TreeNode[] = [
    {
      id: 1,
      name: "public",
      type: "folder",
      children: [
        {
          id: 2,
          name: "readme.txt",
          type: "file",
        },
        {
          id: 3,
          name: "config.json",
          type: "file",
        },
        {
          id: 4,
          name: "image.png",
          type: "file",
        },
      ],
    },
    {
      id: 5,
      name: "server",
      children: [
        {
          id: 6,
          name: "server.txt",
          type: "file",
        },
        {
          id: 7,
          name: "settings.json",
          type: "file",
        },
        {
          id: 8,
          name: "logo.png",
          type: "file",
        },
      ],
      type: "folder",
    },
    {
      id: 9,
      name: "src",
      children: [
        {
          id: 10,
          name: "info.txt",
          type: "file",
        },
        {
          id: 11,
          name: "data.json",
          type: "file",
        },
        {
          id: 12,
          name: "banner.png",
          type: "file",
        },
      ],
      type: "folder",
    },
  ];

  const [nodes, setNodes] = useState<TreeNode[]>(jsonData);
  const [selectedFile, setSelectedFile] = useState<TreeNode | null>(null);
  const [fileContent, setFileContent] = useState<string>("");
  const [isEditing, setIsEditing] = useState(false);

  const handleFileClick = (node: TreeNode) => {
    setSelectedFile(node);
    setFileContent(""); // Placeholder for file content
    setIsEditing(false);
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
        <TreeView nodes={nodes} onFileClick={handleFileClick} />
      </div>
      <div className="flex-1 p-4">
        {selectedFile ? (
          <>
            <div className="text-lg font-semibold mb-2">
              Path: {selectedFile.path}
            </div>
            {isEditing ? (
              <>
                <textarea
                  className="w-full h-full border border-gray-300 rounded p-2"
                  value={fileContent}
                  onChange={(e) => setFileContent(e.target.value)}
                />
                <button
                  className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
                 // onClick={handleSave}
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
          <div className="text-gray-500">
            Select a file to view its content.
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
