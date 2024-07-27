// components/editor/Editor.tsx
import React from 'react';
import { useFileContext } from '../../context/FileContext';
import EditorActions from './EditorActions';
import EditorView from './EditorView';

const Editor: React.FC = () => {
  const {
    selectedFile,
    isEditing,
    fileContent,
    originalContent,
    setFileContent,
    setIsEditing,
    setOriginalContent,
    setSelectedFile
  } = useFileContext();

  const handleSave = () => {
    if (selectedFile) {
      // Εδώ μπορείτε να προσθέσετε τον κώδικα για να αποθηκεύσετε το περιεχόμενο του αρχείου
      console.log(`Saving content for ${selectedFile.path}:`, fileContent);
      setIsEditing(false);
      setOriginalContent(fileContent);
    }
  };

  const handleCancel = () => {
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
