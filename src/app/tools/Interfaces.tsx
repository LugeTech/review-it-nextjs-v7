export interface Review {
    _id?: string; // unique identifier for the review
    productId?: string; // identifier for the product being reviewed
    userId?: string; // identifier for the user who wrote the review
    rating: number; // a number between 1 and 5 indicating the rating for the product
    title: string; // the title of the review
    body: string; // the main text of the review
    date?: Date; // the date the review was written
    helpfulVotes?: number; // the number of helpful votes the review has received
    unhelpfulVotes?: number; // the number of unhelpful votes the review has received
    comments: Comment[]; // an array of comments on the review
  }
  
  export interface Comment {
    id: string; // unique identifier for the comment
    userId: string; // identifier for the user who wrote the comment
    body: string; // the text of the comment
    date: Date; // the date the comment was written
  }

  export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
  }

export interface User {
      id: string;
    name: string;
    email: string;
  avatar: string;
}
  

  
  
  