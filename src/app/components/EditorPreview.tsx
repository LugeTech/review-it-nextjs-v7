"use client";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import parse from "html-react-parser";
import RatingModule from "./RatingModule";
import { iReview } from "../util/Interfaces";
import { useUser } from "@clerk/nextjs";

interface editorPreviewProps {
  reviewData: iReview;
}

const EditorPreview = ({ reviewData }: editorPreviewProps) => {
  const { user } = useUser();

  const handleParse = (node: any): any => {
    //in the html i get two p tags when should be <br> so i manually replace the empty p tags
    if (
      node.type === "tag" &&
      node.name === "p" &&
      (!node.children || node.children.length === 0)
    ) {
      // If empty <p> tag, replace it with a newline
      return <br />;
    }
    return undefined; // Return undefined to keep the default behavior
  };

  const options = {
    replace: handleParse,
  };

  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className=" bg-myTheme-accent hover:bg-myTheme-secondary text-white font-base p-2 rounded-md w-full"
      >
        Preview
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Preview
                  </Dialog.Title>
                  <div className="mt-2">
                    <div className="flex flex-col flex-1 dark:bg-myTheme-dark p-4 rounded-md lg:w-1/2 bg-slate-100 overflow-scroll ">
                      <div className="flex flex-1 flex-col p-4 overflow-scroll bg-slate-200">
                        <h1 className="font-bold underline text-center">
                          {parse(reviewData.title)}
                        </h1>

                        {reviewData.title && (
                          <div className="font-extralight text-xs italic no-underline pl-2 text-center">
                            by {user?.username}
                          </div>
                        )}

                        {reviewData.title && (
                          <div className="flex flex-row gap-2 justify-center mt-2">
                            <RatingModule
                              name="rating"
                              rating={reviewData.rating}
                              ratingChanged={() => {
                                alert("Can't change rating here");
                              }}
                              size={70}
                            />
                          </div>
                        )}

                        <div className=" text-start">
                          {parse(reviewData.body, options)}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Close
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default EditorPreview;
