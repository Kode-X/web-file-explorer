import React, { useState } from "react";
import { jsonData, TreeNode } from "./types/types";
import TreeView from "./components/tree/TreeView";

import {
  handleFileClick,
  fetchFileContent,
  handleSave,
  handleCancel,
  filteredNodes,
} from "./utils/getFileHandlers";
import Editor from "./components/editor/Editor";
import Tree from "./components/tree/Tree";

const App: React.FC = () => {
  const [nodes, setNodes] = useState<TreeNode[]>(jsonData);
  const [selectedFile, setSelectedFile] = useState<TreeNode | null>(null);
  const [fileContent, setFileContent] = useState<string>("");
  const [originalContent, setOriginalContent] = useState<string>("");
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>("");

  return (
    <div className="flex h-screen">
      <div className="w-1/3 bg-gray-100 p-4">
        <Tree
          nodes={nodes}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          handleFileClick={(node) =>
            handleFileClick(
              node,
              setSelectedFile,
              setFileContent,
              (path) =>
                fetchFileContent(path, setFileContent, setOriginalContent),
              setIsEditing
            )
          }
        />
      </div>
      <div className="flex-1 p-4">
        <Editor
          selectedFile={selectedFile}
          isEditing={isEditing}
          handleSave={() =>
            handleSave(
              selectedFile,
              fileContent,
              setIsEditing,
              setOriginalContent
            )
          }
          handleCancel={() =>
            handleCancel(setFileContent, originalContent, setIsEditing)
          }
          setIsEditing={setIsEditing}
          fileContent={fileContent}
          setFileContent={setFileContent}
        />
      </div>
    </div>
  );
};

export default App;
