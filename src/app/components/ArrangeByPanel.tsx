import { iProduct } from "../util/Interfaces";
import TagView from "@/app/components/TagView";
import { useEffect, useState } from "react";

const ArrangeByPanel = ({
  products,
  selectedRating,
  setSelectedRating,
  selectedTags,
  setSelectedTags,
  filteredProductsLength,
  availableTags,
}: {
  products: iProduct[];
  setSelectedRating: (rating: number | null) => void;
  selectedTags: string[];
  selectedRating: number | null;
  setSelectedTags: (tags: string[]) => void;
  filteredProductsLength: number;
  availableTags: string[];
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterUniqueTags, setFilterUniqueTags] = useState<string[]>([]);

  const handleTagClick = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleClearAll = () => {
    setSelectedTags([]);
    setSelectedRating(null);
    setSearchTerm("");
  };

  useEffect(() => {
    if (searchTerm.length > 0) {
      setFilterUniqueTags(
        availableTags.filter((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase()),
        ),
      );
    } else {
      setFilterUniqueTags(availableTags);
    }
  }, [searchTerm, availableTags]);

  return (
    <div className="flex flex-col h-full bg-myTheme-lightbg rounded-lg shadow-md overflow-hidden">
      <div className="p-4">
        <h2 className="text-xl font-semibold text-myTheme-dark mb-4">
          Arrange by
        </h2>

        <div className="mb-6">
          <h3 className="text-lg font-medium text-myTheme-dark mb-2">Rating</h3>
          <div className="grid grid-cols-4 gap-2">
            {["Any", "3.0", "4.0", "4.5+"].map((rating, index) => (
              <button
                key={rating}
                className={`btn ${
                  (selectedRating === null && index === 0) ||
                  (selectedRating === 3 && index === 1) ||
                  (selectedRating === 4 && index === 2) ||
                  (selectedRating === 5 && index === 3)
                    ? "bg-myTheme-primary"
                    : "bg-myTheme-secondary"
                } text-myTheme-dark hover:opacity-90 transition-opacity`}
                onClick={() =>
                  setSelectedRating(index === 0 ? null : index + 2)
                }
              >
                {rating}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-medium text-myTheme-dark mb-2">
            Search Tags
          </h3>
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search tags..."
              className="w-full px-4 py-2 border border-myTheme-secondary rounded-md focus:outline-none focus:ring-2 focus:ring-myTheme-primary focus:border-transparent"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-myTheme-dark hover:text-myTheme-primary"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {(searchTerm.length > 0 ||
          selectedRating !== null ||
          selectedTags.length > 0) && (
          <button
            className="btn btn-ghost text-myTheme-dark hover:bg-myTheme-secondary mb-4"
            onClick={handleClearAll}
          >
            Clear All Filters
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="flex flex-wrap gap-2">
          {filterUniqueTags.map((tag) => (
            <div key={tag} className="flex-grow">
              <TagView
                tag={tag}
                onClick={() => handleTagClick(tag)}
                isSelected={selectedTags.includes(tag)}
                count={filteredProductsLength}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArrangeByPanel;
