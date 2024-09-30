import React, { useState } from "react";
import { genTags } from "../util/serverFunctions";
import { Button } from "@/components/ui/button";
import { iProduct } from "../util/Interfaces";

interface Props {
  description: string;
  handleArrayInput: (field: keyof iProduct, value: string) => void;
  handleRemoveArrayItem: (field: keyof iProduct, index: number) => void;
  field: keyof iProduct;
}

const SmartTags = ({ handleArrayInput, description, field }: Props) => {
  const [aiTags, setAiTags] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const onClickHandle = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await genTags(description);
      setAiTags(data);
    } catch (error) {
      console.error("Error generating tags:", error);
      setError("Failed to generate tags. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleTagClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    tag: string,
  ) => {
    e.preventDefault();
    handleArrayInput(field, tag);
    setAiTags((prevTags) => prevTags.filter((t) => t !== tag));
  };

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center">
          <p>Loading tags...</p>
        </div>
      ) : error ? (
        <div className="flex items-center justify-center text-red-500">
          <p>{error}</p>
        </div>
      ) : aiTags.length === 0 ? (
        <div className="flex items-center justify-center">
          <p>Having trouble thinking of categories? Try using AI.</p>
          <Button type="button" variant="ghost" onClick={onClickHandle}>
            Use AI
          </Button>
        </div>
      ) : (
        aiTags.map((tag, index) => (
          <div key={index}>
            <Button
              className="items-center rounded-full px-2 py-1 cursor-pointer bg-myTheme-white hover:bg-myTheme-primary transition duration-200 ease-in-out"
              onClick={(e) => handleTagClick(e, tag)}
              aria-label={`Add tag ${tag}`}
            >
              + {tag}
            </Button>
          </div>
        ))
      )}
    </>
  );
};

export default SmartTags;
