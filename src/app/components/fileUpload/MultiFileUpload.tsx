"use client";
import React, { useState } from "react";
import Dropzone, { FileRejection } from "react-dropzone";
import axios, { CancelTokenSource } from "axios";
//@ts-ignore
import FilePreview from "./FilePreview";
import UploadError from "./UploadError";
import getIconForFileType from "@/app/util/GetIconForFileType";
export const revalidate = 0;

interface FileUploadProps {
  setLinksArray: React.Dispatch<React.SetStateAction<string[]>>;
}

const FileUpload: React.FC<FileUploadProps> = ({ setLinksArray }) => {
  const [files, setFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [uploadProgress, setUploadProgress] = useState<number[]>([]);
  const [uploadErrors, setUploadErrors] = useState<string[]>([]);
  // const [otherFILES, setOtherFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);

  const handleDrop = (
    acceptedFiles: File[],
    rejectedFiles: FileRejection[],
  ) => {
    setFiles([...files, ...acceptedFiles]);
    // get all imagees files, not sure why i had this in the beginning
    // const imageFiles = acceptedFiles.filter((file) =>
    //   file.type.startsWith("image/"),
    // );

    // const otherFiles = acceptedFiles.filter(
    //   (file) => !file.type.startsWith("image/"),
    // );
    // setOtherFiles([...otherFILES, ...otherFiles]);

    const filePreviews = getIconForFileType(acceptedFiles); // files here might not be the updated in which case i will have to use a useEffect

    setImagePreviews([...imagePreviews, ...filePreviews]);

    setUploadProgress([
      ...uploadProgress,
      ...Array(acceptedFiles.length).fill(0, 0, acceptedFiles.length),
    ]);
    // Clear any previous upload errors
    setUploadErrors([]);
  };

  const removeFile = (index: number) => {
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    const updatedPreviews = [...imagePreviews];
    updatedPreviews.splice(index, 1);
    const updatedProgress = [...uploadProgress];
    updatedProgress.splice(index, 1);
    setFiles(updatedFiles);
    setImagePreviews(updatedPreviews);
    setUploadProgress(updatedProgress);
    cancelUpload(index); // keep an eye on this, not tested
  };

  const uploadFile = async (file: File, index: number) => {
    const formData = new FormData();
    formData.append("file", file);
    const cancelSource = axios.CancelToken.source();
    try {

      const response = await axios.post(
        process.env.NEXT_PUBLIC_API_PATH_UPLOAD as string,
        formData,
        {
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / (progressEvent.total || 1), // Prevent division by zero
            );
            setUploadProgress((prevProgress) => {
              const updatedProgress = [...prevProgress];
              updatedProgress[index] = percentCompleted;
              return updatedProgress;
            });
          },
          cancelToken: cancelSource.token,
        },
      );

      // NOTE: Upload successful; add some feedback here - show download links
      if (response.data.link) { // Ensure there is a link in the response
        setLinksArray((prevLinks) => [...prevLinks, response.data.link]);
      }

      setUploading(false);
    } catch (error) {
      if (axios.isCancel(error)) {
        // NOTE: User cancelled or removed file
        return;
      }

      setUploadErrors((prevErrors) => [
        ...prevErrors,
        `Error uploading ${file.name}: ${error}`,
      ]);
    }
  };

  const cancelTokenSources: CancelTokenSource[] = [];
  const cancelUpload = (index: number) => {
    cancelTokenSources[index]?.cancel("Upload canceled by user");
  };

  const uploadFiles = async () => {
    setUploading(true);

    files.forEach(async (file, index) => {
      const cancelSource = axios.CancelToken.source();
      cancelTokenSources[index] = cancelSource;
      // NOTE create blob or other modification of the file here
      await uploadFile(file, index);
    });
    // at this pooint update the front end
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <Dropzone onDrop={handleDrop} multiple={true}>
        {({ getRootProps, getInputProps }) => (
          <div className=" border-2 border-dashed border-gray-300 bg-sky-100 p-1 rounded flex flex-col items-center justify-center ">
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <div className="flex flex-col items-center justify-center w-full h-full hover:cursor-pointer">
                <p className="text-gray-500 text-center ">
                  Drag and drop some files here
                </p>
                <p className="text-gray-500 text-center ">
                  Or click to select files
                </p>
                <p className="text-gray-500 text-center font-extrabold text-2xl hover:text-3xl">
                  +
                </p>
              </div>
            </div>
          </div>
        )}
      </Dropzone>

      {files.length > 0 && (
        <div className="w-full ">
          <FilePreview
            uploading={uploading}
            imagePreviews={imagePreviews}
            files={files}
            uploadProgress={uploadProgress}
            removeFile={removeFile}
            cancelUpload={cancelUpload}
          />
        </div>
      )}
      {uploadErrors.length > 0 && <UploadError uploadErrors={uploadErrors} />}
      {files.length > 0 && (
        <button
          onClick={uploadFiles}
          className="mt-2 rounded-md bg-black px-4 py-2 text-white"
        >
          Upload Files
        </button>
      )}
    </div>
  );
};

export default FileUpload;
