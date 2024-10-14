// UseScrollToComment.tsx
import { useEffect, useState, useCallback } from "react";

const useScrollToComment = (
  commentId: string,
  options = { maxAttempts: 10, intervalDuration: 500 },
) => {
  const [isCommentLoaded, setIsCommentLoaded] = useState(false);

  const scrollToComment = useCallback(() => {
    let attempts = 0;

    const tryScroll = () => {
      const element = document.getElementById(commentId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
        setIsCommentLoaded(true);
      } else if (attempts < options.maxAttempts) {
        attempts++;
        setTimeout(tryScroll, options.intervalDuration);
      } else {
        setIsCommentLoaded(false);
      }
    };

    tryScroll();
  }, [commentId, options.maxAttempts, options.intervalDuration]);

  useEffect(() => {
    if (commentId) {
      scrollToComment();
    }
    // Clean-up function
    return () => {
      setIsCommentLoaded(false);
    };
  }, [commentId, scrollToComment]);

  return isCommentLoaded;
};

export default useScrollToComment;
