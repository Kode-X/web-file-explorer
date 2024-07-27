// components/editor/EditorActions.tsx
import React from "react";
import Button from "../customLibrary/Button";

interface EditorActionsProps {
  isEditing: boolean;
  handleSave: () => void;
  handleCancel: () => void;
  setIsEditing: (isEditing: boolean) => void;
}

const EditorActions: React.FC<EditorActionsProps> = ({
  isEditing,
  handleSave,
  handleCancel,
  setIsEditing,
}) => {
  return (
    <div className="mb-2 p-2 bg-gray-200 border border-gray-300 rounded space-x-2">
      {isEditing ? (
        <>
          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>
          <Button variant="cancel" onClick={handleCancel}>
            Cancel
          </Button>
        </>
      ) : (
        <Button variant="secondary" onClick={() => setIsEditing(true)}>
          Edit
        </Button>
      )}
    </div>
  );
};

export default EditorActions;
