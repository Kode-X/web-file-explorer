import React from "react";

interface EditorViewProps {
  isEditing: boolean;
  fileContent: string;
  setFileContent: (content: string) => void;
}

const EditorView: React.FC<EditorViewProps> = ({
  isEditing,
  fileContent,
  setFileContent,
}) => {
  return (
    <>
      {isEditing ? (
        <textarea
          className="w-full h-full border border-gray-300 rounded p-2"
          value={fileContent}
          onChange={(e) => setFileContent(e.target.value)}
        />
      ) : (
        <div className="relative w-full h-full border border-gray-300 rounded p-2">
          <pre>{fileContent}</pre>
        </div>
      )}
    </>
  );
};

export default EditorView;
