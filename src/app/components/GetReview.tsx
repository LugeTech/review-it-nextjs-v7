'use client'
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import {useState} from 'react';
import {iReview} from '@/app/util/Interfaces';

const GetReview = () => {
    const [selectedKey, setSelectedKey] = useState('');
    const [selectedValue, setSelectedValue] = useState('');
    const [reviewData, setReviewData] = useState<iReview[] | null>(null);

    const getReview = async () => {
        const data = await axios.get('http://localhost:8000/db/getreview', {
            params: {
                [selectedKey]:
                selectedValue
            },
        })

        console.log(data.data.review)
        setReviewData(data.data.review)

    };

    const {mutate, isLoading, isError, isSuccess} = useMutation(getReview);

//   const handleKeyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     setSelectedKey(event.target.value);
//   };

//   const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setSelectedValue(event.target.value);
//   };

    const handleButtonClick = () => {
        // const obj = {selectedKey:selectedValue}
        mutate();
    };

    return (
        <div>
            <div>
                <select value={selectedKey} onChange={(e) => {
                    setSelectedKey(e.target.value)
                }}>
                    <option value="">Select a key</option>
                    <option value="title">Title</option>
                    <option value="comment">Comment</option>
                    <option value="rating">Rating</option>
                </select>
                {selectedKey && (
                    <input type="text" value={selectedValue} onChange={(e) => {
                        setSelectedValue(e.target.value)
                    }} placeholder={`Enter ${selectedKey}`}/>
                )}
                <button onClick={handleButtonClick}>Get Review</button>
                <div>
                    {selectedValue}
                </div>
            </div>
            {isLoading ? (
                'getting data...'
            ) : (
                <>
                    {isError ? <div>An error occurred</div> : null}
                    {isSuccess && reviewData && reviewData.map((review) => (
                        <div key={review._id}>
                            <h1>{review.title}</h1>
                            <p>{review.body}</p>
                            <p>Rating: {review.rating}</p>
                            <p>Date: {review.date?.toString()}</p>
                        </div>
                    ))}
                </>
            )}
        </div>
    );
};

export default GetReview;
