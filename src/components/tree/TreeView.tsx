// components/tree/TreeView.tsx
import React, { useEffect, useState } from 'react';
import { TreeNode } from '../../types/types';
import TreeNodeComponent from './TreeNodeComponent';
import useTreeActions from '../../hooks/useTreeActions';
import AddFolderAndFileWhenEmpty from './AddFolderAndFileWhenEmpty';
import { handleAddNode } from '../../utils/getHandlers';


interface TreeViewProps {
  nodes: TreeNode[];
  onFileClick: (node: TreeNode) => void;
}

const TreeView: React.FC<TreeViewProps> = ({
  nodes: initialNodes,
  onFileClick,
}) => {
  const { addNode, deleteNode } = useTreeActions();
  const [nodes, setNodes] = useState<TreeNode[]>(initialNodes);

  useEffect(() => {
    setNodes(initialNodes);
  }, [initialNodes]);

  // Handler functions for adding folder and file
  const handleAddFolder = (name: string) => {
    handleAddNode(name, '', 'folder', setNodes, nodes);
  };

  const handleAddFile = (name: string) => {
    handleAddNode(name, '', 'file', setNodes, nodes);
  };

  return (
    <div className="space-y-2">
      {nodes.length === 0 ? (
        <AddFolderAndFileWhenEmpty onAddFolder={handleAddFolder} onAddFile={handleAddFile} />
      ) : (
        nodes.map((node) => (
          <TreeNodeComponent
            key={node.id}
            node={node}
            onFileClick={onFileClick}
            onDelete={() => deleteNode(node)}
            onAddNode={(name: string, parentName: string, type: "folder" | "file") =>
              handleAddNode(name, parentName, type, setNodes, nodes)
            }
          />
        ))
      )}
    </div>
  );
};

export default TreeView;
