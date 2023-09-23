'use client'
import React, { useState } from 'react';
interface Props {
  isOpen: boolean;
  onClose: (isOpen: any) => void;
  onSubmit: (textAreaValue: string) => void;
}
const CommentForm = ({ isOpen, onClose, onSubmit }: Props) => {
  const [textAreaValue, setTextAreaValue] = useState('');
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Call the parent component's callback function with the textarea value
    onSubmit(textAreaValue);
  };
  return (
    // I originally wanted to hide and show this component, will leave the functionality late might add it back
    <div className={` ${isOpen ? 'flex' : 'hidden'} flex-col justify-center item-start w-full`}>
      <div className="bg-white rounded-lg p-4 shadow-md w-full">
        {/* <h2 className="text-2xl font-semibold mb-4">Add a Comment</h2> */}
        {/* Add form inputs for the comment */}
        <form onSubmit={handleSubmit}>
          {/* Your comment input fields */}
          <textarea className="w-full border p-2 mb-2 h-36" placeholder="Enter your comment"
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
