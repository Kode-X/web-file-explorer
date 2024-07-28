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
    return true;
  };

  const onSave = () => {
    if (validateName(newName)) {
      handleSave(newName, type);
      setNewName("");
      setErrorMessage("");
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
        <div className="w-full max-w-sm p-6 bg-white rounded shadow-lg">
          <DialogTitle className="text-lg font-semibold">{`Add New ${type}`}</DialogTitle>
          <input
            type="text"
            className="w-full p-2 mt-2 border rounded"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={`${type} name`}
          />
          {errorMessage && (
            <p className="mt-2 text-sm text-red-500">{errorMessage}</p>
          )}
          <div className="flex justify-end mt-4 space-x-2">
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
