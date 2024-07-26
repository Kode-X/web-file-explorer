// TreeView.tsx

import React, { useState } from "react";
import { TreeNode } from "../types/types";
import { handleDelete, handleAddFolder } from "../utils/getFolderFileActions";
import TreeNodeComponent from "./TreeNodeComponent";

interface TreeViewProps {
  nodes: TreeNode[];
  onFileClick: (node: TreeNode) => void;
}

const TreeView: React.FC<TreeViewProps> = ({
  nodes: initialNodes,
  onFileClick,
}) => {
  const [nodes, setNodes] = useState<TreeNode[]>(initialNodes);

  const onDelete = (name: string, type: string) => {
    handleDelete(name, type, setNodes, nodes);
  };

  const onAddFolder = (name: string, parentName: string) => {
    handleAddFolder(name, parentName, setNodes, nodes);
  };

  return (
    <div className="space-y-2">
      {nodes.map((node) => (
        <TreeNodeComponent
          key={node.id}
          node={node}
          onFileClick={onFileClick}
          onDelete={() => onDelete(node.name, node.type)}
          onAddFolder={onAddFolder}
        />
      ))}
    </div>
  );
};

export default TreeView;
