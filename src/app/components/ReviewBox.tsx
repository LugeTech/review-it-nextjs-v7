'use client'
import { useState } from 'react'
import { Rating } from '@smastrom/react-rating'
import { Review, User, Comment, Product } from "../tools/Interfaces"
import Image from 'next/image';
import Votes from './Votes'
import { Heart } from '@smastrom/react-rating'

interface ReviewBoxProps {
    review: Review;
    users: User[];
    comments: Comment[];
    products: Product[];
}


const ReviewBox: React.FC<ReviewBoxProps> = ({ review: review, users: users, comments: comments, products: products }) => {
    // const [styleForRating, setStyleForRating] = useRecoilState(ratingStyle)
    const [rating, setRating] = useState(review.rating) // Initial value

    const styleForRating = {
        itemShapes: Heart,
        activeFillColor: '#F18C8E',
        inactiveFillColor: '#c8c9ca'
    }


    const ratingChanged = (newRating: number) => {
        setRating(newRating)
    };

    return (
        <div className="sm:w-6/12  my-1 border border-gray-300 dark:border-gray-500 rounded-xl shadow-xl">
            <div className="  block h-full max-w-sm gap-2 p-2 bg-mycolours-light dark:bg-mycolours-dark rounded-xl hover:bg-gray-100 dark:hover:bg-neutral-950">
                <div className="flex flex-col justify-start items-center gap-1">
                    <div className="flex flex-1 flex-col w-full sm:ml-2 text-xs text-mycolours-dark dark:text-mycolours-light justify-start items-center ">
                        <div >
                            <div onClick={() => { }} className='cursor-pointer'>
                                <div className="flex flex-col justify-start items-center">
                                    {review?.userId ? <Image src={users.find(user => user.id === review.userId)?.avatar!} alt="avatar" width={60} height={60} className=" flex rounded-full" /> : null}
                                    <p>{users.find(user => user.id === review.userId)?.name} reviewed </p>
                                    <p className=" font-bold">{products.find(product => product.id === review.productId)?.name}</p>
                                </div>
                                <div className=" font-semibold flex flex-col gap-2 justify-start items-start pt-3">
                                    {review.title.length > 30 ? review.title.slice(0, 30) + '...' : review.title}
                                </div>
                                <div className=" font-normal tracking-tight ">
                                    {review.body.slice(0, 90) + '... read more'}
                                    <Rating itemStyles={styleForRating} style={{ maxWidth: 100 }} value={rating} onChange={ratingChanged} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Top comment */}
                <div className='text-xs mt-2  text-gray-700 dark:text-gray-400 tracking-tighter font-semibold'>Top Comment</div>
                <div className=" text-xs mt-1 text-gray-700 dark:text-gray-400 flex flex-row gap-1 pb-2">
                    <div className="">
                        {/* will di this calculation in a useState above */}
                        {review?.title ? <Image src={users.find(user => user.id === review.comments[0].userId)?.avatar!} alt="avatar" width={60} height={60} className=" flex rounded-full" /> : null}
                    </div>
                    <div className="flex flex-col">
                        {comments.find(comment => comment.userId === review.comments[0].userId)?.body.slice(0, 90) + '... read more'}
                        <Votes review={review} />
                    </div>


                </div>

            </div>
        </div>
    )
}

export default ReviewBox
