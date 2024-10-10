import { useState, useEffect, useCallback } from "react";

interface ScrollToCommentOptions {
  maxAttempts?: number;
  intervalDuration?: number;
}

function useScrollToComment(
  cId: string,
  options: ScrollToCommentOptions = {},
): boolean {
  const [isCommentLoaded, setIsCommentLoaded] = useState<boolean>(false);
  const { maxAttempts = 20, intervalDuration = 500 } = options;

  const scrollToComment = useCallback((): boolean => {
    const commentElement = document.getElementById(cId);
    if (commentElement) {
      commentElement.scrollIntoView({ behavior: "smooth", block: "center" });
      return true;
    }
    return false;
  }, [cId]);

  useEffect(() => {
    if (cId === "") return;

    let attempts = 0;
    let intervalId: NodeJS.Timeout | undefined;

    const checkAndScroll = () => {
      if (scrollToComment()) {
        setIsCommentLoaded(true);
      } else if (attempts >= maxAttempts) {
        console.log("Max attempts reached, stopping scroll attempts");
        if (intervalId) clearInterval(intervalId);
      }
      attempts++;
    };

    // Start checking for the comment element
    intervalId = setInterval(checkAndScroll, intervalDuration);

    // Cleanup function
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [cId, scrollToComment, maxAttempts, intervalDuration]);

  // Early return if cId is empty
  if (cId === "") return false;

  return isCommentLoaded;
}

export default useScrollToComment;
