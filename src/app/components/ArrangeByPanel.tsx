import { iProduct } from "../util/Interfaces";
import TagView from "@/app/components/TagView";
import SearchBox from "@/app/components/SearchBox";

const ArrangeByPanel = ({
  products,
  setSelectedRating,
  selectedTags,
  setSelectedTags,
}: {
  products: iProduct[];
  setSelectedRating: (rating: number | null) => void;
  selectedTags: string[];
  setSelectedTags: (tags: string[]) => void;
}) => {
  const allTags = products.flatMap((item) => item.tags);
  const uniqueTagsSet = new Set(allTags);
  const uniqueTags = [...uniqueTagsSet];

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
  };

  return (
    <div className="flex flex-1 flex-col p-2 w-full bg-myTheme-lightbg ">
      <div className="flex w-full">
        <p className="flex-1 text-center">Arrange by rating</p>
      </div>
      <div className="btn-group flex w-full ">
        <button
          className="btn flex-1 bg-myTheme-secondary text-myTheme-dark "
          onClick={() => setSelectedRating(null)}
        >
          Any
        </button>
        <button
          className="btn flex-1 bg-myTheme-primary text-myTheme-dark "
          onClick={() => setSelectedRating(3)}
        >
          3.0
        </button>
        <button
          className="btn flex-1 bg-myTheme-primary text-myTheme-dark "
          onClick={() => setSelectedRating(4)}
        >
          4.0
        </button>
        <button
          className="btn flex-1 bg-myTheme-primary text-myTheme-dark "
          onClick={() => setSelectedRating(4.5)}
        >
          4.5+
        </button>
      </div>
      <div className="w-full">
        <SearchBox />
      </div>
      <div className="flex w-full ">
        <button
          className="btn btn-outline btn-primary"
          onClick={handleClearAll}
        >
          Clear
        </button>
      </div>
      <div className="flex flex-col w-full">
        {uniqueTags.map((tag) => (
          <TagView
            tag={tag}
            key={tag}
            onClick={() => handleTagClick(tag)}
            isSelected={selectedTags.includes(tag)}
          />
        ))}
      </div>
    </div>
  );
};

export default ArrangeByPanel;
