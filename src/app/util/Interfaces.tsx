export interface iReview {
  _id?: string;
  product: string; // identifier for the product being reviewed
  user: string; // identifier for the user who wrote the review
  rating: number; // a number between 1 and 5 indicating the rating for the product
  title: string; // the title of the review
  body: string; // the main text of the review
  date?: Date; // the date the review was written
  helpfulVotes?: number; // the number of helpful votes the review has received
  unhelpfulVotes?: number; // the number of unhelpful votes the review has received
  comments: iComment[]; // an array of comments on the review
  createdDate?: Date;
  images?: iImage[]; // an array of images on the review
  confirmed?: boolean; // a boolean indicating whether the review has been confirmed
  deleted?: boolean; // a boolean indicating whether the review has been deleted
  deletedDate?: Date; // the date the review was deleted
  deletedBy?: string; // the user who deleted the review
  deletedReason?: string; // the reason the review was deleted
}

export interface iComment {
  _id?: string;
  user: string; // identifier for the user who wrote the comment
  body: string; // the text of the comment
  helpfulVotes?: number; // the number of helpful votes the review has received
  unhelpfulVotes?: number; // the number of unhelpful votes the review has received
  product?: string; // identifier for the product the comment is on
  review?: string; // identifier for the review the comment is on
  createdDate?: Date;
}

export interface iProduct {
  _id?: string;
  name: string;
  description: string;
  images?: string[];
  createdDate?: Date;
  address?: string;
}
export interface iItem {
  _id?: string;
  name: string;
  description: string;
  images?: string[];
  createdDate?: Date;
  address?: string;
}
export interface iService {
  _id?: string;
  name: string;
  description: string;
  images?: string[];
  createdDate?: Date;
  address?: string;
}

export interface iUser {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar?: string;
  createdDate?: Date;
}

export interface iImage {
  _id?: string;
  url: string;
}

export interface SentDataReviewAndItem {
  userId: string; // identifier for the user who wrote the review
  rating: number; // a number between 1 and 5 indicating the rating for the product
  title: string; // the title of the review
  body: string; // the main text of the review
  helpfulVotes?: number; // the number of helpful votes the review has received
  unhelpfulVotes?: number; // the number of unhelpful votes the review has received
  comments: string[]; // an array of comments on the review
  createdDate?: Date;
  images?: string[]; // an array of images on the review
  confirmed?: boolean; // a boolean indicating whether the review has been confirmed
  deleted?: boolean; // a boolean indicating whether the review has been deleted
  deletedDate?: Date; // the date the review was deleted
  deletedBy?: string; // the user who deleted the review
  deletedReason?: string; // the reason the review was deleted
  itemId?: string;
  links?: string[];
  videos?: string[];
  publicMetadata?: {userInDb: boolean, id: string}
  item:{
    itemSelected: boolean;
    itemId?: string;
    name: string;
    description: string;
    images?: string[];
    createdDate?: Date;
    address?: string;
    tags?: string[];
    openingHrs?: string;
    closingHrs?: string;
    telephone?: string;
    website?: string[];
    hasOwner?: boolean;
    owner?: string;
    ownerId?: string;
    isService?: boolean;
    isProduct?: boolean;
    videos?: string[];
    links?: string[];
  }

}
