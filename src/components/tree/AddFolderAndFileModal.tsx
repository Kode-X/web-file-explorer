import { Dialog, DialogTitle } from "@headlessui/react";
import { useState } from "react";
import Button from "../customLibrary/Button";

// Υπολογισμός Base64 για εικόνα
const getBase64 = (file: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

interface AddFolderAndFileModalProps {
  isModalOpen: boolean;
  closeModal: () => void;
  handleSave: (folderName: string, type: "folder" | "file", content?: string) => void;
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
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);

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

  const onSave = async () => {
    if (validateName(newName)) {
      let content: string | undefined;
      if (type === "file" && selectedFile) {
        content = await getBase64(selectedFile);
      }
      handleSave(newName, type, content);
      setNewName(""); // Reset input after saving
      setErrorMessage(""); // Clear error message
      setSelectedFile(null); // Clear selected file
      setFilePreview(null); // Clear file preview
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

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file && file.type === 'image/png') {
      setSelectedFile(file);
      const base64 = await getBase64(file);
      setFilePreview(base64);

      // Αυτόματη συμπλήρωση του ονόματος του αρχείου
      setNewName(file.name);
    } else {
      setErrorMessage('Please select a valid PNG file.');
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
          {type === "file" && (
            <>
              <input
                type="file"
                accept=".png"
                className="mt-2"
                onChange={handleFileChange}
              />
              {filePreview && (
                <img src={filePreview} alt="Preview" className="mt-2 border rounded" />
              )}
            </>
          )}
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
