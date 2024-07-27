// components/tree/TreeView.tsx
import React, { useEffect, useState } from 'react';
import { TreeNode } from '../../types/types';
import TreeNodeComponent from './TreeNodeComponent';
import useTreeActions from '../../hooks/useTreeActions';

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

  return (
    <div className="space-y-2">
      {nodes.map((node) => (
        <TreeNodeComponent
          key={node.id}
          node={node}
          onFileClick={onFileClick}
          onDelete={() => deleteNode(node.name, node.type)}
          onAddNode={(name: string, parentName: string, type: "folder" | "file") =>
            addNode(name, parentName, type)
          }
        />
      ))}
    </div>
  );
};

export default TreeView;
