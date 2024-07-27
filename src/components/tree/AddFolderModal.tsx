// AddFolderModal.tsx

import { Dialog, DialogTitle } from "@headlessui/react";
import { useState } from "react";

interface AddFolderModalProps {
  isModalOpen: boolean;
  closeModal: () => void;
  handleSave: (folderName: string, type: "folder" | "file") => void;
  type: "folder" | "file";
}

const AddFolderModal: React.FC<AddFolderModalProps> = ({
  isModalOpen,
  closeModal,
  handleSave,
  type,
}) => {
  const [newName, setNewName] = useState("");

  const onSave = () => {
    console.log(type);
    handleSave(newName, type);
    setNewName(""); // Reset input after saving
  };

  return (
    <Dialog
      open={isModalOpen}
      onClose={closeModal}
      className="fixed inset-0 z-10 overflow-y-auto"
    >
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white p-6 rounded shadow-lg">
          <DialogTitle>{`Add New ${type}`}</DialogTitle>
          <input
            type="text"
            className="border p-2 w-full mt-2"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder={`${type} name`}
          />
          <div className="mt-4 flex justify-end">
            <button
              className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
              onClick={closeModal}
            >
              Cancel
            </button>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={onSave}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default AddFolderModal;
