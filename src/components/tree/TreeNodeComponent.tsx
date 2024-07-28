// components/tree/TreeNodeComponent.tsx
import React, { useState } from "react";
import {
  ChevronDownIcon,
  ChevronRightIcon,
  DocumentIcon,
  FolderIcon,
} from "@heroicons/react/solid";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import classNames from "classnames";
import { TreeNode, ContentType } from "../../types/types";
import TreeView from "./TreeView";
import AddFolderAndFileModal from "./AddFolderAndFileModal";
import FolderActions from "./FolderActions";

const TreeNodeComponent: React.FC<{
  node: TreeNode;
  onFileClick: (node: TreeNode) => void;
  onDelete: () => void;
  onAddNode: (
    name: string,
    parentName: string,
    type: "folder" | "file"
  ) => void;
}> = ({ node, onFileClick, onDelete, onAddNode }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"folder" | "file">("folder");
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const openModal = (type: "folder" | "file") => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleSave = (name: string, type: "folder" | "file") => {
    if (name.trim()) {
      onAddNode(name, node.name, type);
      closeModal();
    }
  };

  const handleFileClick = (node: TreeNode) => {
    if (node.type === "file") {
      if (node.contentType === ContentType.IMAGE && node.content) {
        setImagePreview(node.content); // Assuming the content is a Base64 string
      } else {
        onFileClick(node);
      }
    }
  };

  return (
    <div className="relative">
      <Disclosure>
        {({ open }) => (
          <>
            <DisclosureButton
              className="flex items-center space-x-2 cursor-pointer"
              as="div"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {node.type === "folder" && (
                <>
                  {node.children.length > 0 && (
                    <button className="text-gray-500 hover:text-gray-700 focus:outline-none">
                      {open ? (
                        <ChevronDownIcon className="w-5 h-5" />
                      ) : (
                        <ChevronRightIcon className="w-5 h-5" />
                      )}
                    </button>
                  )}
                  <FolderIcon className="w-5 h-5 text-gray-500" />
                </>
              )}
              {node.type === "file" && (
                <DocumentIcon className="w-5 h-5 text-gray-500" />
              )}
              <span
                className={classNames("flex-1", {
                  "text-blue-500": node.type === "file",
                })}
                onClick={() => handleFileClick(node)}
              >
                {node.name}
              </span>
              {isHovered && node.type === "folder" && (
                <FolderActions
                  openModal={openModal}
                  onDelete={onDelete}
                  type={"folder"}
                />
              )}
              {isHovered && node.type === "file" && (
                <FolderActions
                  openModal={openModal}
                  onDelete={onDelete}
                  type={"file"}
                />
              )}
            </DisclosureButton>
            {node.type === "folder" && (
              <DisclosurePanel className="pl-4" key={node.children?.length}>
                {open && (
                  <TreeView
                    nodes={node.children || []}
                    onFileClick={onFileClick}
                  />
                )}
              </DisclosurePanel>
            )}
          </>
        )}
      </Disclosure>

      <AddFolderAndFileModal
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        handleSave={handleSave}
        type={modalType}
      />

      {imagePreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="p-4 bg-white rounded">
            <img src={imagePreview} alt="Preview" className="max-w-full max-h-full" />
            <button
              className="px-4 py-2 mt-2 text-white bg-red-500 rounded"
              onClick={() => setImagePreview(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TreeNodeComponent;
