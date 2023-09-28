import { FiThumbsDown, FiThumbsUp } from "react-icons/fi";
import { iReview } from "../util/Interfaces";

interface VotesProps {
  element: {
    helpfulVotes?: number | undefined;
    unhelpfulVotes?: number | undefined;
  };
}

const Votes: React.FC<VotesProps> = ({ element }) => {
  return (
    <div className=" flex flex-row gap-4 py-2 justify-start">
      <div className="flex items-center gap-1">
        <FiThumbsUp className="text-myTheme-success" />
        <p className=" text-xs font-light tracking-tight ">
          {element.helpfulVotes}
        </p>
      </div>
      <div className="flex items-center gap-1">
        <FiThumbsDown className="text-myTheme-danger" />
        <p className=" text-xs font-light tracking-tight ">
          {element.unhelpfulVotes}
        </p>
      </div>
    </div>
  );
};

export default Votes;
