"use client";
import { ChangeEvent, use, useEffect, useState } from "react";
import fakeData from "@/app/fakedata/data.json";
interface Suggestion {
  id: number;
  text: string;
}

const SearchSuggestions = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>(fakeData);

  const fetchSuggestions = async (query: string) => {
    // const response = await fetch(
    //   `https://api.example.com/suggestions?query=${query}`
    // );
    //filter the fakeData array based on the query string
    const filteredData = fakeData.filter((item) =>
      item.text.toLowerCase().includes(query.toLowerCase())
    );
    // const data = await fakeData;
    setSuggestions(filteredData.slice(0, 10));
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);

    // Fetch suggestions when the query changes
    fetchSuggestions(newQuery);
  };

  const handleSuggestionClick = (suggestion: Suggestion) => {
    // Perform search based on the selected suggestion
    console.log("Performing search with suggestion:", suggestion);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search"
        value={query}
        onChange={handleInputChange}
      />
      <ul>
        {query && (
          <div className="absolute mt-1 rounded shadow-lg md:w-3/4 z-10">
            {suggestions.map((suggestion) => (
              <div
                key={suggestion.id}
                className="px-4 py-2 cursor-pointer hover:bg-gray-100 last:border-b-0"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                <p className="text-gray-500 text-base font-normal">
                  {suggestion.text.slice(0, 40)}
                </p>
                <div className=" w-full">
                  <p className="text-gray-400 text-sm font-extralight">
                    address goes here address goes here address
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </ul>
    </div>
  );
};

export default SearchSuggestions;
