// components/tree/SearchTree.tsx
import React from 'react';

interface SearchTreeProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const SearchTree: React.FC<SearchTreeProps> = ({ searchTerm, setSearchTerm }) => {
  return (
    <input
      type="text"
      className="w-full mb-4 p-2 border rounded"
      placeholder="Search files..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  );
};

export default SearchTree;
