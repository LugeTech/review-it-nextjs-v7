"use client";
import { ChangeEvent, use, useEffect, useState } from "react";
import fakeData from "@/app/fakedata/data.json";
import { useQuery, useMutation } from "@tanstack/react-query";
import { iReview } from "../util/Interfaces";
import { apiUrl } from "../util/apiUrl";
interface Suggestion {
  id: number;
  text: string;
}

const SearchSuggestions = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>(fakeData);

  // const getSuggestions = async (query: string) => {
  //   const data = await fetch(
  //     `https://api.example.com/suggestions?query=${query}`
  //   );
  //   return data.json();
  //filter the fakeData array based on the query string
  // const filteredData = fakeData.filter((item) =>
  //   item.text.toLowerCase().includes(query.toLowerCase())
  // );
  // // const data = await fakeData;
  // setSuggestions(filteredData.slice(0, 10));
  // };

  const { isLoading, error, data, isFetching } = useQuery({
    queryKey: ["getSuggestions"],
    queryFn: async () => {
      const data = await fetch(`${apiUrl}/get/reviews`, {
        method: "POST",
        body: JSON.stringify({
          include: {
            user: false,
            item: false,
          },
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(data);
      return await data.json();
    },
  });

  if (isLoading) return "Loading...";
  if (error) return "An error has occurred: " + error;
  if (data) {
    console.log(data as []);
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
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
      <div>{isFetching ? "Getting suggestions..." : ""}</div>
      <ul>
        {query && (
          <div className="absolute mt-1 rounded shadow-lg md:w-3/4 z-10">
            {data.data.map((suggestion: any) => (
              <div
                key={suggestion.id}
                className="px-4 py-2 cursor-pointer hover:bg-gray-100 last:border-b-0"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                <p className="text-gray-500 text-base font-normal">
                  {suggestion.title}
                </p>
                <div className=" w-full">
                  <p className="text-gray-400 text-sm font-extralight">
                    {suggestion.body}
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
