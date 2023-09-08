import React from 'react';

interface SearchResult {
  id: number;
  name: string;
  details: string;
}

interface SearchResultsProps {
  results: SearchResult[];
  onItemClick: (result: SearchResult) => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({
  results,
  onItemClick,
}) => {
  return (
    <ul>
      {results.map((result) => (
        <li
          key={result.id}
          onClick={() => onItemClick(result)}
          className="cursor-pointer p-2 border hover:bg-gray-100"
        >
          <div className="text-xl font-bold">{result.name}</div>
          <div className="text-sm font-light">{result.details}</div>
        </li>
      ))}
    </ul>
  );
};

export default SearchResults;
