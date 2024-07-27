// hooks/useTreeActions.tsx
import { useCallback } from "react";
import { useFileContext } from "../context/FileContext";
import { handleAddNode, handleDeleteNode } from "../utils/getHandlers";
import { TreeNode } from "../types/types";

const useTreeActions = () => {
  const { nodes, setNodes, selectedFile, setSelectedFile } = useFileContext();

  const addNode = useCallback(
    (name: string, parentName: string, type: "folder" | "file") => {
      handleAddNode(name, parentName, type, setNodes, nodes);
    },
    [nodes, setNodes]
  );

  const deleteNode = useCallback(
    (node: TreeNode) => {
      handleDeleteNode(node, setNodes, nodes, selectedFile, setSelectedFile);
    },
    [nodes, setNodes, selectedFile, setSelectedFile]
  );

  return { addNode, deleteNode };
};

export default useTreeActions;
