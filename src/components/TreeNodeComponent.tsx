import {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
} from "@headlessui/react";
import {
    ChevronDownIcon,
    ChevronRightIcon,
    DocumentIcon,
    FolderIcon,
    PlusIcon,
    TrashIcon,
} from "@heroicons/react/solid";
import classNames from "classnames";
import React, { useState } from "react";
import { TreeNode } from "../types/types";
import AddFolderModal from "./AddFolderModel";
import TreeView from "./TreeView";

// TreeNodeComponent.tsx

const TreeNodeComponent: React.FC<{
    node: TreeNode;
    onFileClick: (node: TreeNode) => void;
    onDelete: () => void;
    onAddFolder: (name: string, parentName: string) => void;
  }> = ({ node, onFileClick, onDelete, onAddFolder }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [newFolderName, setNewFolderName] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const hasChildren = (node.children ?? []).length > 0;
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => {
      setIsModalOpen(false);
      setNewFolderName(""); // reset the input field when closing the modal
    };
  
    const handleSave = (folderName: string) => {
      if (folderName.trim()) {
        onAddFolder(folderName, node.name);
        closeModal(); // close the modal after saving
      }
    };
  
    return (
      <div
        className="relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Disclosure>
          {({ open }) => (
            <>
              <DisclosureButton
                className="flex items-center space-x-2 cursor-pointer"
                as="div"
              >
                {node.type === "folder" && (
                  <>
                    <button className="text-gray-500 hover:text-gray-700 focus:outline-none">
                      {open ? (
                        <ChevronDownIcon className="w-5 h-5" />
                      ) : (
                        <ChevronRightIcon className="w-5 h-5" />
                      )}
                    </button>
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
                  onClick={() => node.type === "file" && onFileClick(node)}
                >
                  {node.name}
                </span>
                {isHovered && node.type === "folder" && (
                  <div className="flex space-x-2 ml-2">
                    <button
                      className="text-green-500 hover:text-green-700 focus:outline-none"
                      onClick={(e) => {
                        e.stopPropagation();
                        openModal();
                      }}
                    >
                      <PlusIcon className="w-5 h-5" />
                    </button>
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
                )}
              </DisclosureButton>
              {node.type === "folder" && (
                <DisclosurePanel className="pl-4" key={node.children?.length}>
                  {hasChildren && (
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
  
        <AddFolderModal
          isModalOpen={isModalOpen}
          closeModal={closeModal}
          handleSave={handleSave}
        />
      </div>
    );
  };
  
  export default TreeNodeComponent;
  