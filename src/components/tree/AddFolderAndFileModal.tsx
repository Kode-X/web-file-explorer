import { Dialog, DialogTitle } from "@headlessui/react";
import { useState } from "react";
import Button from "../../customLibrary/Button";
import { ContentType } from "../../types/types";

// Calculate Base64 for image
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
  handleSave: (
    folderName: string,
    type: "folder" | "file",
    content?: string
  ) => void;
  type: "folder" | "file"; // Ensure this type is "folder" or "file"
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
  const [selectedTextContent, setSelectedTextContent] = useState<string>(""); // Added for text content

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
      // Check if type is "file" and handle content accordingly
      if (type === "file" && selectedFile) {
        // Determine the content type based on file extension or MIME type
        if (newName.endsWith(".png")) {
          content = await getBase64(selectedFile); // Convert image file to base64
        } else if (newName.endsWith(".txt") || newName.endsWith(".json")) {
          content = await getFileAsString(selectedFile); // Convert file to string
        }
      } else if (type === "folder") {
        // No content for folders
        content = undefined;
      }
      
      handleSave(newName, type, content); // Save the file
      setNewName(""); // Reset input after saving
      setErrorMessage(""); // Clear error message
      setSelectedFile(null); // Clear selected file
      setFilePreview(null); // Clear file preview
      setSelectedTextContent(""); // Clear text content if used
    } else {
      setErrorMessage(
        "Invalid file name. Please use one of the following extensions: .txt, .json, .png"
      );
    }
  };
  
  // Function to get file content as a string (for JSON files)
  const getFileAsString = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(new Error("Failed to read file"));
      reader.readAsText(file); // Read file as text
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSave();
    }
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      const fileName = file.name.toLowerCase();
      if (fileName.endsWith(".png")) {
        setSelectedFile(file);
        const base64 = await getBase64(file);
        setFilePreview(base64);
        setNewName(fileName); // Auto-fill the file name
      } else if (fileName.endsWith(".txt") || fileName.endsWith(".json")) {
        setSelectedFile(file);
        const textContent = await getFileAsString(file);
        setSelectedTextContent(textContent); // Handle text content
        setNewName(fileName); // Auto-fill the file name
      } else {
        setErrorMessage("Please select a valid file.");
      }
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
          {type === "file" && (
            <>
              <div className="mt-5">
                <label
                  htmlFor="file-upload"
                  className="px-4 py-2 mt-5 text-sm font-medium text-white transition-transform duration-300 ease-in-out transform rounded-lg shadow-lg hover:scale-105 bg-gradient-to-r from-yellow-400 to-yellow-600 hover:shadow-xl"
                >
                  Select File
                </label>
                <input
                  id="file-upload"
                  type="file"
                  accept=".png,.txt,.json"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>
              {filePreview && (
                <div className="mt-2">
                  <img
                    src={filePreview}
                    alt="Preview"
                    className="border rounded"
                  />
                </div>
              )}
            </>
          )}
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
