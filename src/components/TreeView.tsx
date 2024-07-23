import React from 'react';
import { Disclosure, Transition } from '@headlessui/react';
import { ChevronRightIcon, ChevronDownIcon, FolderIcon, DocumentIcon } from '@heroicons/react/solid';
import { TreeNode } from '../types/types';


type TreeViewProps = {
  data: TreeNode[];
  onFileClick: (node: TreeNode | undefined) => void;  // Updated type to TreeNode | undefined
};

const TreeNodeComponent: React.FC<{ node: TreeNode; onFileClick: (node: TreeNode | undefined) => void }> = ({ node, onFileClick }) => {
  const hasChildren = (node.children ?? []).length > 0;

  return (
    <Disclosure as="div" className="my-2">
      {({ open }) => (
        <>
          <Disclosure.Button
            className="flex items-center justify-between w-full px-4 py-2 text-sm font-medium text-left text-gray-900 bg-gray-50 rounded-lg hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75"
            onClick={() => {
              if (node.isFile) {
                onFileClick(node);
              }
            }}
          >
            <div className="flex items-center space-x-2">
              {node.isFile ? (
                <DocumentIcon className="w-5 h-5 text-gray-500" />
              ) : (
                <FolderIcon className="w-5 h-5 text-gray-500" />
              )}
              <span>{node.name}</span>
            </div>
            {hasChildren && (
              <span className={`w-5 h-5 text-gray-500 transform ${open ? 'rotate-90' : ''}`}>
                {open ? <ChevronDownIcon /> : <ChevronRightIcon />}
              </span>
            )}
          </Disclosure.Button>
          {hasChildren && (
            <Transition
              show={open}
              enter="transition duration-100 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-75 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
            >
              <div className="ml-6">
                {(node.children ?? []).map((childNode) => (
                  <TreeNodeComponent key={childNode.id} node={childNode} onFileClick={onFileClick} />
                ))}
              </div>
            </Transition>
          )}
        </>
      )}
    </Disclosure>
  );
};

const TreeView: React.FC<TreeViewProps> = ({ data, onFileClick }) => {
  return (
    <div className="w-full max-w-md mx-auto mt-4">
      {data.map((node) => (
        <TreeNodeComponent key={node.id} node={node} onFileClick={onFileClick} />
      ))}
    </div>
  );
};

export default TreeView;
