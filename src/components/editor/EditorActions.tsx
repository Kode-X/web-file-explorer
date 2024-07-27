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
    <div className="mb-2 p-2 bg-gray-200 border border-gray-300 rounded">
      {isEditing ? (
        <>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
            onClick={handleSave}
          >
            Save
          </button>
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </>
      ) : (
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => setIsEditing(true)}
        >
          Edit
        </button>
      )}
    </div>
  );
};

export default EditorActions;
