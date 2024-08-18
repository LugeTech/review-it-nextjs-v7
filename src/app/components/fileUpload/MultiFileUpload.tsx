"use client";
import React, { useCallback, useState } from "react";
import Dropzone, { FileRejection } from "react-dropzone";
import axios, { CancelTokenSource } from "axios";
//@ts-ignore
import FilePreview from "./FilePreview";
import UploadError from "./UploadError";
import getIconForFileType from "@/app/util/GetIconForFileType";
import { useImageResizer } from "@/app/util/useImageResizer";
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
  const { processImage, isResizing } = useImageResizer();

  const handleDrop = useCallback(async (
    acceptedFiles: File[],
    rejectedFiles: FileRejection[],
  ) => {
    const imageFiles = acceptedFiles.filter((file) =>
      file.type.startsWith("image/")
    );

    const resizedFiles: File[] = [];
    const newPreviews: string[] = [];
    const newProgress: number[] = [];

    for (const file of imageFiles) {
      try {
        const result = await processImage(file, { maxDimension: 500 });
        resizedFiles.push(result.file);
        const preview = getIconForFileType([result.file]);
        newPreviews.push(...preview);
        newProgress.push(0);
      } catch (error) {
        console.error('Error processing image:', error);
        setUploadErrors(prev => [...prev, `Error processing ${file.name}`]);
      }
    }

    setFiles(prevFiles => [...prevFiles, ...resizedFiles]);
    setImagePreviews(prevPreviews => [...prevPreviews, ...newPreviews]);
    setUploadProgress(prevProgress => [...prevProgress, ...newProgress]);

    // Handle rejected files
    if (rejectedFiles.length > 0) {
      const rejectionErrors = rejectedFiles.map(
        rejection => `${rejection.file.name}: ${rejection.errors[0].message}`
      );
      setUploadErrors(prev => [...prev, ...rejectionErrors]);
    }
  }, [processImage]);


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
        "/api/create/image-link",
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
      if (response.data.link) {
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
          <div className="w-full border-2 border-dashed border-gray-300 bg-gray-50 p-1 rounded flex flex-col items-center justify-center ">
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <div className="flex flex-col items-center justify-center w-full h-full hover:cursor-pointer">
                <p className="text-gray-500 text-center ">
                  Drag and drop images here
                </p>
                <p className="text-gray-500 text-center ">
                  Or click to select files
                </p>
                <p className="text-gray-500 text-center font-bold text-2xl hover:text-3xl">
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
          {isResizing && <p>Resizing image...</p>}

        </div>
      )}
      {uploadErrors.length > 0 && <UploadError uploadErrors={uploadErrors} />}
      {files.length > 0 && (
        <button
          type="button"
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
