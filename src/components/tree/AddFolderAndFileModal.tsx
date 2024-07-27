import { Dialog, DialogTitle } from "@headlessui/react";
import { useState } from "react";
import Button from "../customLibrary/Button";

interface AddFolderAndFileModalProps {
  isModalOpen: boolean;
  closeModal: () => void;
  handleSave: (folderName: string, type: "folder" | "file") => void;
  type: "folder" | "file";
}

const AddFolderAndFileModal: React.FC<AddFolderAndFileModalProps> = ({
  isModalOpen,
  closeModal,
  handleSave,
  type,
}) => {
  const [newName, setNewName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const validateName = (name: string) => {
    if (type === "file") {
      const validExtensions = [".txt", ".json", ".png"];
      const hasValidExtension = validExtensions.some((ext) =>
        name.endsWith(ext)
      );
      return hasValidExtension;
    }
    return true; // For folders, no specific validation needed
  };

  const onSave = () => {
    if (validateName(newName)) {
      handleSave(newName, type);
      setNewName(""); // Reset input after saving
      setErrorMessage(""); // Clear error message
    } else {
      setErrorMessage(
        "Invalid file name. Please use one of the following extensions: .txt, .json, .png"
      );
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSave();
    }
  };

  return (
    <Dialog
      open={isModalOpen}
      onClose={closeModal}
      className="fixed inset-0 z-10 overflow-y-auto"
    >
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="bg-white p-6 rounded shadow-lg w-full max-w-sm">
          <DialogTitle className="text-lg font-semibold">{`Add New ${type}`}</DialogTitle>
          <input
            type="text"
            className="border p-2 w-full mt-2 rounded"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={`${type} name`}
          />
          {errorMessage && (
            <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
          )}
          <div className="mt-4 flex justify-end space-x-2">
            <Button variant="primary" onClick={onSave}>
              Save
            </Button>
            <Button variant="cancel" onClick={closeModal}>
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default AddFolderAndFileModal;
