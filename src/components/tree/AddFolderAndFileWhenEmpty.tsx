// components/tree/AddNodeButtons.tsx
import React, { useState } from "react";
import AddFolderAndFileModal from "./AddFolderAndFileModal";

interface AddFolderAndFileWhenEmptyProps {
  onAddFolder: (name: string) => void;
  onAddFile: (name: string) => void;
}

const AddFolderAndFileWhenEmpty: React.FC<AddFolderAndFileWhenEmptyProps> = ({
  onAddFolder,
  onAddFile,
}) => {
  const [isFolderModalOpen, setFolderModalOpen] = useState(false);
  const [isFileModalOpen, setFileModalOpen] = useState(false);

  // Open and close modal handlers
  const openFolderModal = () => setFolderModalOpen(true);
  const closeFolderModal = () => setFolderModalOpen(false);

  const openFileModal = () => setFileModalOpen(true);
  const closeFileModal = () => setFileModalOpen(false);

  // Handler functions for adding folder and file
  const handleAddFolder = (name: string) => {
    onAddFolder(name);
    closeFolderModal();
  };

  const handleAddFile = (name: string) => {
    onAddFile(name);
    closeFileModal();
  };

  return (
    <div className="flex space-x-4">
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded"
        onClick={openFolderModal}
      >
        Add Folder
      </button>
      <button
        className="px-4 py-2 bg-green-500 text-white rounded"
        onClick={openFileModal}
      >
        Add File
      </button>

      {/* Modals for adding folder and file */}
      <AddFolderAndFileModal
        isModalOpen={isFolderModalOpen}
        closeModal={closeFolderModal}
        handleSave={handleAddFolder}
        type="folder"
      />
      <AddFolderAndFileModal
        isModalOpen={isFileModalOpen}
        closeModal={closeFileModal}
        handleSave={handleAddFile}
        type="file"
      />
    </div>
  );
};

export default AddFolderAndFileWhenEmpty;
