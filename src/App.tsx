// App.tsx
import React, { useEffect } from 'react';
import { FileProvider, useFileContext } from './context/FileContext';
import Tree from './components/tree/Tree';
import Editor from './components/editor/Editor';
import { jsonData } from './types/types';

const AppContent: React.FC = () => {
  const { nodes, setNodes } = useFileContext();

  useEffect(() => {
    setNodes(jsonData);
  }, [setNodes]);

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
