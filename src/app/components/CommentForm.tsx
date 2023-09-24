'use client'
import React, { useState } from 'react';
interface Props {
  isOpen: boolean;
  onClose: (isOpen: any) => void;
  onSubmit: (textAreaValue: string) => void;
}
import { useAtom } from 'jotai';
import { currentUserAtom } from '@/app/store/store';
// import { useQuery } from '@tanstack/react-query';
// import { getUser } from '../util/serverFunctions';
// import { iUser } from '../util/Interfaces';
// import LoadingSpinner from './LoadingSpinner';

const CommentForm = ({ isOpen, onClose, onSubmit }: Props) => {
  const [textAreaValue, setTextAreaValue] = useState('');
  const [currentUser, setCurrentUser] = useAtom(currentUserAtom);

  // const { data, isLoading, isError, error } = useQuery({
  //   queryKey: ["getCurrentUser"],
  //   queryFn: () => getUser(),
  //   refetchOnWindowFocus: false,
  // }) as any


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Call the parent component's callback function with the textarea value
    onSubmit(textAreaValue);
  };

  // if (isLoading) return <LoadingSpinner />;
  // if (isError) return <p>{error?.toString()}</p>;
  // const user = data?.data as iUser
  return (
    // I originally wanted to hide and show this component, will leave the functionality late might add it back
    <div className={` ${isOpen ? 'flex' : 'hidden'} flex-col justify-center item-start w-full`}>
      <div className="bg-white rounded-lg p-4 shadow-md w-full">
        {/* <h2 className="text-2xl font-semibold mb-4">Add a Comment</h2> */}
        {/* Add form inputs for the comment */}
        <form onSubmit={handleSubmit}>
          {/* Your comment input fields */}
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Commenting as {currentUser?.firstName}
            </label>
          </div>
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
