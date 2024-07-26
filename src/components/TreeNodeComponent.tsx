import React, { useEffect, useState } from "react";
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
import { TreeNode } from "../types/types";
import TreeView from "./TreeView";
import AddFolderModal from "./AddFolderModel";
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
                <FolderActions openModal={openModal} onDelete={onDelete} />
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

      <AddFolderModal
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        handleSave={handleSave}
        type={modalType}
      />
    </div>
  );
};

export default TreeNodeComponent;
