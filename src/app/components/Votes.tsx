
import { FiThumbsDown, FiThumbsUp } from 'react-icons/fi'
import { Review } from '../tools/Interfaces'

interface VotesProps {
    review: Review
}

const Votes: React.FC<VotesProps> = ({ review }) => {
    return (
        <div className=" flex flex-row gap-4">
            <div className="flex items-center gap-1">
                <FiThumbsUp className="text-green-500" />
                <h6 className=" font-normal tracking-tight ">{review.helpfulVotes}</h6>
            </div>
            <div className="flex items-center gap-1">
                <FiThumbsDown className="text-red-500" />
                <h6 className=" font-normal tracking-tight ">{review.unhelpfulVotes}</h6>
            </div>
        </div>
    )
}

export default Votes