
import React from 'react';

interface SearchTreeProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const SearchTree: React.FC<SearchTreeProps> = ({ searchTerm, setSearchTerm }) => {
  return (
    <input
      type="text"
      className="w-full p-2 mb-4 border rounded"
      placeholder="Search files..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  );
};

export default SearchTree;
