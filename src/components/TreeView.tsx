import React, { useState } from "react";
import {
  ChevronDownIcon,
  ChevronRightIcon,
  PlusIcon,
  TrashIcon,
  FolderIcon,
  DocumentIcon,
} from "@heroicons/react/solid";
import classNames from "classnames";
import { TreeNode } from "../types/types";

interface TreeViewProps {
  nodes: TreeNode[];
  onFileClick: (node: TreeNode) => void;
  onDelete: (fileName: string) => void;
}

const TreeView: React.FC<TreeViewProps> = ({
  nodes,
  onFileClick,
  onDelete,
}) => {
  return (
    <div className="space-y-2">
      {nodes.map((node) => (
        <TreeNodeComponent
          key={node.name}
          node={node}
          onFileClick={onFileClick}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

const TreeNodeComponent: React.FC<{
  node: TreeNode;
  onFileClick: (node: TreeNode) => void;
  onDelete: (fileName: string) => void;
}> = ({ node, onFileClick, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const hasChildren = (node.children ?? []).length > 0;

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="flex items-center space-x-2 cursor-pointer"
        onClick={() => node.type === "folder" && setIsOpen(!isOpen)}
      >
        {node.type === "folder" && (
          <>
            <button className="text-gray-500 hover:text-gray-700 focus:outline-none">
              {isOpen ? (
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
                e.stopPropagation(); /* Prevent click event from propagating to the folder */
              }}
            >
              <PlusIcon className="w-5 h-5" />
            </button>
            <button
              className="text-red-500 hover:text-red-700 focus:outline-none"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(
                  node.name
                ); /* Prevent click event from propagating to the folder */
              }}
            >
              <TrashIcon className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
      {node.type === "folder" && isOpen && node.children && (
        <div className="pl-4">
          <TreeView
            nodes={node.children}
            onFileClick={onFileClick}
            onDelete={onDelete}
          />
        </div>
      )}
    </div>
  );
};

export default TreeView;
