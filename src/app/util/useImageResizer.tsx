import { useState, useCallback } from 'react';

interface ResizeResult {
  file: File;
  resized: boolean;
}

interface ResizeOptions {
  maxDimension: number;
  maxFileSize?: number; // Optional, in bytes
}

const DEFAULT_MAX_FILE_SIZE = 300 * 1024; // 300 KB in bytes

export const useImageResizer = () => {
  const [isResizing, setIsResizing] = useState(false);

  const resizeImage = useCallback(async (file: File, options: ResizeOptions): Promise<ResizeResult> => {
    setIsResizing(true);

    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        // Resize if width or height is greater than maxDimension
        if (width > options.maxDimension || height > options.maxDimension) {
          if (width > height) {
            height *= options.maxDimension / width;
            width = options.maxDimension;
          } else {
            width *= options.maxDimension / height;
            height = options.maxDimension;
          }
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              const resizedFile = new File([blob], file.name, {
                type: file.type,
                lastModified: Date.now(),
              });

              setIsResizing(false);
              resolve({
                file: resizedFile,
                resized: resizedFile.size !== file.size,
              });
            } else {
              setIsResizing(false);
              resolve({ file, resized: false });
            }
          },
          file.type,
          1.0
        );
      };

      img.onerror = () => {
        setIsResizing(false);
        resolve({ file, resized: false });
      };

      img.src = URL.createObjectURL(file);
    });
  }, []);

  const processImage = useCallback(async (file: File, options: ResizeOptions): Promise<ResizeResult> => {
    if (file.type.startsWith('image/')) {
      const maxFileSize = options.maxFileSize || DEFAULT_MAX_FILE_SIZE;
      let result = await resizeImage(file, options);

      // Check if the file size is still too large
      if (result.file.size > maxFileSize) {
        let quality = 0.8;
        while (result.file.size > maxFileSize && quality > 0.1) {
          quality -= 0.1;
          result = await resizeImage(result.file, options);
        }
      }

      return result;
    }
    return { file, resized: false };
  }, [resizeImage]);

  return { processImage, isResizing };
};
