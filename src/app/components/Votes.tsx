import { FiThumbsDown, FiThumbsUp } from "react-icons/fi";
import { iReview } from "../util/Interfaces";

interface VotesProps {
  review: iReview;
}

const Votes: React.FC<VotesProps> = ({ review }) => {
  return (
    <div className=" flex flex-row gap-4">
      <div className="flex items-center gap-1">
        <FiThumbsUp className="text-myTheme-success" />
        <p className=" text-xs font-light tracking-tight ">
          {review.helpfulVotes}
        </p>
      </div>
      <div className="flex items-center gap-1">
        <FiThumbsDown className="text-myTheme-danger" />
        <p className=" text-xs font-light tracking-tight ">
          {review.unhelpfulVotes}
        </p>
      </div>
    </div>
  );
};

export default Votes;
