// App.tsx
import React from "react";
import Editor from "./components/editor/Editor";
import Tree from "./components/tree/Tree";
import { FileProvider } from "./context/FileContext";

const AppContent: React.FC = () => {
  return (
    <div className="flex h-screen">
      <div className="w-1/3 bg-gray-100 p-4">
        <Tree />
      </div>
      <div className="flex-1 p-4">
        <Editor />
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <FileProvider>
      <AppContent />
    </FileProvider>
  );
};

export default App;
