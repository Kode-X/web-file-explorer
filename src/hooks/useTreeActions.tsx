// hooks/useTreeActions.tsx
import { useCallback } from "react";
import { useFileContext } from "../context/FileContext";
import { handleAddNode, handleDeleteNode } from "../utils/getHandlers";


const useTreeActions = () => {
  const { nodes, setNodes } = useFileContext();

  const addNode = useCallback(
    (name: string, parentName: string, type: "folder" | "file") => {
      handleAddNode(name, parentName, type, setNodes, nodes);
    },
    [nodes, setNodes]
  );

  const deleteNode = useCallback(
    (name: string, type: string) => {
      handleDeleteNode(name, type, setNodes, nodes);
    },
    [nodes, setNodes]
  );

  return { addNode, deleteNode };
};

export default useTreeActions;