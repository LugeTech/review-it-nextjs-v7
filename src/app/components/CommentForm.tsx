"use client";
import React, { useState } from "react";
interface Props {
  isOpen: boolean;
  onClose: (isOpen: any) => void;
  onSubmit: (textAreaValue: string) => void;
}
import { useAtom } from "jotai";
import { currentUserAtom } from "@/app/store/store";

const CommentForm = ({ isOpen, onSubmit }: Props) => {
  const [textAreaValue, setTextAreaValue] = useState("");
  const [currentUser, _] = useAtom(currentUserAtom);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Call the parent component's callback function with the textarea value
    onSubmit(textAreaValue);
  };
  return (
    // I originally wanted to hide and show this component, will leave the functionality late might add it back
    <div
      className={` ${isOpen ? "flex" : "hidden"} flex-col justify-center item-start w-full bg-myTheme-lightbg dark:bg-myTheme-niceBlack`}
    >
      <div className="bg-myTheme-lightbg dark:bg-myTheme-niceGrey rounded-lg p-4 shadow-md w-full">
        <form onSubmit={handleSubmit}>
          {/* Your comment input fields */}
          <div>
            <label className="block text-gray-700 dark:text-myTheme-light text-sm font-bold mb-2">
              {/*FIX: when the user sign out the atom isn't cleared #bug */}
              Commenting as {currentUser?.firstName ?? "Guest"}
            </label>
          </div>
          <textarea
            className="w-full border p-2 mb-2 h-36"
            placeholder="Enter your comment"
            name="body"
            value={textAreaValue}
            onChange={(e) => setTextAreaValue(e.target.value)}
          ></textarea>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
            Submit
          </button>
        </form>
        {/* <button className="text-red-500 mt-2" onClick={onClose}>Cancel</button> */}
      </div>
    </div>
  );
};

export default CommentForm;
