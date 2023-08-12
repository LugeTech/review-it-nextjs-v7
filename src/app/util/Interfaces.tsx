export interface iReview {
  id?: string;
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
  id?: string;
  user: string; // identifier for the user who wrote the comment
  body: string; // the text of the comment
  helpfulVotes?: number; // the number of helpful votes the review has received
  unhelpfulVotes?: number; // the number of unhelpful votes the review has received
  product?: string; // identifier for the product the comment is on
  review?: string; // identifier for the review the comment is on
  createdDate?: Date;
}

export interface iProduct {
  id?: string;
  address: string | null;
  createdDate: string;
  description: string;
  images: string[];
  videos: string[];
  links: string[];
  name: string;
  tags: string[];
  openingHrs: string | null;
  closingHrs: string | null;
  telephone: string | null;
  website: string[];
  rating: number;
  hasOwner: boolean | null;
  ownerId: string | null;
  createdById: string;
  isDeleted: boolean;
}
export interface iService {
  id?: string;
  name: string;
  description: string;
  images?: string[];
  createdDate?: Date;
  address?: string;
}

export interface iUser {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar?: string;
  createdDate?: Date;
}

export interface iImage {
  id?: string;
  url: string;
}

export interface SentDataReviewAndproduct {
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
  productId?: string;
  links?: string[];
  videos?: string[];
  publicMetadata?: { userInDb: boolean, id: string }
  product: {
    productSelected: boolean;
    productId?: string;
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

export interface ReviewUserAndproduct {
  id: string;
  body: string;
  comments: Comment[];
  createdDate: string;
  helpfulVotes: number;
  rating: number;
  title: string;
  unhelpfulVotes: number;
  productId: string;
  userId: string;
  isVerified: boolean | null;
  verifiedBy: string | null;
  isPublic: boolean;
  images: string[];
  videos: string[];
  links: string[];
  createdBy: string;
  isDeleted: boolean;
  user: {
    id: string;
    userName: string;
    avatar: string;
    createdDate: string;
    email: string;
    firstName: string;
    lastName: string;
    clerkUserId: string;
    isDeleted: boolean;
  };
  product: {
    id: string;
    address: string | null;
    createdDate: string;
    description: string;
    images: string[];
    videos: string[];
    links: string[];
    name: string;
    tags: string[];
    openingHrs: string | null;
    closingHrs: string | null;
    telephone: string | null;
    website: string[];
    rating: number;
    hasOwner: boolean | null;
    ownerId: string | null;
    createdById: string;
    isDeleted: boolean;
  };
}
