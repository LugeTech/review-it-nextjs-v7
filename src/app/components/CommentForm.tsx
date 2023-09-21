import React from 'react';
interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
}
const CommentModal = ({ isOpen, onClose, onSubmit }: Props) => {
  return (
    <div className={`fixed inset-0 z-50 ${isOpen ? 'block' : 'hidden'}`}>
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white rounded-lg p-4 shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Add a Comment</h2>
          {/* Add form inputs for the comment */}
          <form onSubmit={onSubmit}>
            {/* Your comment input fields */}
            <textarea className="w-full border p-2 mb-2" placeholder="Enter your comment"></textarea>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
              Submit
            </button>
          </form>
          <button className="text-red-500 mt-2" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default CommentModal;
