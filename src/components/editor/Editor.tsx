import React from "react";
import EditorActions from "./EditorActions";
import EditorView from "./EditorView";
import { TreeNode } from "../../types/types";

interface EditorProps {
  selectedFile: TreeNode | null;
  isEditing: boolean;
  handleSave: () => void;
  handleCancel: () => void;
  setIsEditing: (isEditing: boolean) => void;
  fileContent: string;
  setFileContent: (content: string) => void;
}

const Editor: React.FC<EditorProps> = ({
  selectedFile,
  isEditing,
  handleSave,
  handleCancel,
  setIsEditing,
  fileContent,
  setFileContent,
}) => {
  return (
    <>
      {selectedFile ? (
        <>
          <div className="text-lg font-semibold mb-2">
            Path: {selectedFile.path}
          </div>
          <EditorActions
            isEditing={isEditing}
            handleSave={handleSave}
            handleCancel={handleCancel}
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

export default Editor;
