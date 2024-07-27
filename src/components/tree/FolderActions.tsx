import {
  DocumentAddIcon,
  FolderAddIcon,
  TrashIcon,
} from "@heroicons/react/solid";

interface FolderActionsProps {
  openModal: (type: "folder" | "file") => void;
  onDelete: () => void;
  type: "folder" | "file";
}

const FolderActions: React.FC<FolderActionsProps> = ({
  openModal,
  onDelete,
  type,
}) => {
  return (
    <div className="flex space-x-2 ml-2">
      {type !== "file" && (
        <>
          <button
            className="text-green-500 hover:text-green-700 focus:outline-none"
            onClick={(e) => {
              e.stopPropagation();
              openModal("folder");
            }}
          >
            <FolderAddIcon className="w-5 h-5" />
          </button>
          <button
            className="text-green-500 hover:text-green-700 focus:outline-none"
            onClick={(e) => {
              e.stopPropagation();
              openModal("file");
            }}
          >
            <DocumentAddIcon className="w-5 h-5" />
          </button>
        </>
      )}
      <button
        className="text-red-500 hover:text-red-700 focus:outline-none"
        onClick={(e) => {
          e.stopPropagation();
          onDelete(); /* Prevent click event from propagating to the folder */
        }}
      >
        <TrashIcon className="w-5 h-5" />
      </button>
    </div>
  );
};

export default FolderActions;
