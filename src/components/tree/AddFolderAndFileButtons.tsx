import React, { useState } from "react";
import AddFolderAndFileModal from "./AddFolderAndFileModal";
import Button from "../customLibrary/Button";

interface AddFolderAndFileButtonsProps {
  onAddFolder: (name: string) => void;
  onAddFile: (name: string) => void;
}

const AddFolderAndFileButtons: React.FC<AddFolderAndFileButtonsProps> = ({
  onAddFolder,
  onAddFile,
}) => {
  const [isFolderModalOpen, setFolderModalOpen] = useState(false);
  const [isFileModalOpen, setFileModalOpen] = useState(false);

  const openFolderModal = () => setFolderModalOpen(true);
  const closeFolderModal = () => setFolderModalOpen(false);

  const openFileModal = () => setFileModalOpen(true);
  const closeFileModal = () => setFileModalOpen(false);

  const handleAddFolder = (name: string) => {
    onAddFolder(name);
    closeFolderModal();
  };

  const handleAddFile = (name: string) => {
    onAddFile(name);
    closeFileModal();
  };

  return (
    <div className="flex pb-5 mb-5 space-x-4 border-b border-gray-300">
      <Button variant="primary" onClick={openFolderModal}>
        Add Folder
      </Button>
      <Button variant="secondary" onClick={openFileModal}>
        Add File
      </Button>

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

export default AddFolderAndFileButtons;
