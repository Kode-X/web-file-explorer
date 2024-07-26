// TreeView.tsx

import React, { useState } from "react";
import { TreeNode } from "../types/types";
import { handleAddNode, handleDelete } from "../utils/getFolderFileActions";
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

  const onAddNode = (
    name: string,
    parentName: string,
    type: "folder" | "file"
  ) => {
    handleAddNode(name, parentName, type, setNodes, nodes);
  };
  return (
    <div className="space-y-2">
      {nodes.map((node) => (
        <TreeNodeComponent
          key={node.id}
          node={node}
          onFileClick={onFileClick}
          onDelete={() => onDelete(node.name, node.type)}
          onAddNode={onAddNode}
        />
      ))}
    </div>
  );
};

export default TreeView;
