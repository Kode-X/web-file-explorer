import { TreeNode } from "../types/types";

export const handleFileClick = (
  node: TreeNode,
  setSelectedFile: (node: TreeNode | null) => void,
  setFileContent: (content: string) => void,
  fetchFileContent: (path: string) => void,
  setIsEditing: (isEditing: boolean) => void
) => {
  setSelectedFile(node);
  if (
    node.type === "file" &&
    (node.name.endsWith(".txt") || node.name.endsWith(".json"))
  ) {
    fetchFileContent(node.path!);
  } else {
    setFileContent("This file type is not supported for editing.");
  }
  setIsEditing(false);
};

export const fetchFileContent = (
  path: string,
  setFileContent: (content: string) => void,
  setOriginalContent: (content: string) => void
) => {
  // Εδώ μπορείτε να προσθέσετε τον κώδικα για να φορτώσετε το περιεχόμενο του αρχείου
  // Προς το παρόν θα χρησιμοποιήσουμε μια απλή προσομοίωση
  const mockContent = `Content of the file at ${path}`;
  setFileContent(mockContent);
  setOriginalContent(mockContent);
};

export const handleSave = (
  selectedFile: TreeNode | null,
  fileContent: string,
  setIsEditing: (isEditing: boolean) => void,
  setOriginalContent: (content: string) => void
) => {
  if (selectedFile) {
    // Εδώ μπορείτε να προσθέσετε τον κώδικα για να αποθηκεύσετε το περιεχόμενο του αρχείου
    console.log(`Saving content for ${selectedFile.path}:`, fileContent);
    setIsEditing(false);
    setOriginalContent(fileContent);
  }
};

export const handleCancel = (
  setFileContent: (content: string) => void,
  originalContent: string,
  setIsEditing: (isEditing: boolean) => void
) => {
  setFileContent(originalContent);
  setIsEditing(false);
};

export const filteredNodes = (
  nodes: TreeNode[],
  searchTerm: string
): TreeNode[] => {
  if (!searchTerm) return nodes;

  const searchLowerCase = searchTerm.toLowerCase();

  const filterNodes = (nodes: TreeNode[]): TreeNode[] => {
    return nodes
      .map((node) => {
        if (node.type === "folder") {
          const filteredChildren = filterNodes(node.children || []);
          return filteredChildren.length ||
            node.name.toLowerCase().includes(searchLowerCase)
            ? { ...node, children: filteredChildren }
            : null;
        } else {
          return node.name.toLowerCase().includes(searchLowerCase)
            ? node
            : null;
        }
      })
      .filter(Boolean) as TreeNode[];
  };

  return filterNodes(nodes);
};
