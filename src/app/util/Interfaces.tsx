export interface ReviewSummaryData {
  percentage5Stars: number;
  percentage4Stars: number;
  percentage3Stars: number;
  percentage2Stars: number;
  percentage1Star: number;
  totalCount: number;
}

export interface ReviewLike {
  reviewId: string;
  userId: string;

  review: iReview;
  user: iUser;
}

export interface iProduct {
  id?: string;
  address?: string | null;
  createdDate: Date;
  description: string;
  display_image: string;
  images: string[];
  videos: string[];
  links: string[];
  name: string;
  tags: string[];
  openingHrs?: string | null;
  closingHrs?: string | null;
  telephone?: string | null;
  website: string[];
  rating: number;
  hasOwner?: boolean | null;
  ownerId?: string | null;
  reviews?: iReview[];
  createdBy?: iUser | null;
  createdById: string;
  isDeleted: boolean;
}

export interface iVoteCount {
  id: string;
  reviewId: string;
  review: iReview;
  helpfulVotes: number;
  unhelpfulVotes: number;
}

export interface iReview {
  id?: string;
  body: string;
  createdDate?: Date;
  helpfulVotes?: number;
  unhelpfulVotes?: number;
  rating: number;
  title: string;
  product?: iProduct | null;
  user?: iUser | null;
  productId: string;
  userId: string;
  isVerified?: boolean;
  verifiedBy?: string;
  isPublic: boolean;
  images: string[];
  videos: string[];
  links: string[];
  createdBy?: string;
  isDeleted?: boolean;
  comments: iComment[];
  voteCount?: iVoteCount | null;
  likedBy: iUser[];
}

export interface iComment {
  id?: string;
  body: string;
  createdDate?: Date;
  review?: iReview;
  user?: iUser;
  reviewId: string;
  userId?: string;
  isDeleted?: boolean;
}

export interface iUser {
  id: string;
  userName: string;
  avatar?: string;
  createdDate: Date;
  email: string;
  firstName: string;
  lastName: string;
  reviews: iReview[];
  clerkUserId: string;
  product: iProduct[];
  isDeleted?: boolean;
  comments: iComment[];
  likedReviews: iReview[];
}

export interface iService {
  id?: string;
  name: string;
  description: string;
  images?: string[];
  createdDate?: Date;
  address?: string;
}

export interface iImage {
  id?: string;
  url: string;
}

export interface SentDataReviewAndProduct {
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
    display_image: string
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

// Interface representing user data
export interface UserDATA {
  avatar?: string;
  azp: string;
  email: string;
  exp: number;
  firstName: string;
  lastName: string;
  fullName: string;
  iat: number;
  iss: string;
  jti: string;
  nbf: number;
  sub: string;
  userId: string;
  userName: string;
  metadata: {
    id: string;
    userInDb: boolean;
  };
}


export interface iCalculatedRating {
  roundedRating: number;
  roundedRatingOneDecimalPlace: number;
  numberOfReviews: number;
}

export interface UserCreatedEvent {
  object: string;
  type: string;

  data: {
    birthday: string;
    created_at: number;
    email_addresses: Array<{
      email_address: string;
      id: string;
      linked_to: Array<string>;
      object: string;
      verification: {
        status: string;
        strategy: string;
      };
    }>;
    external_accounts: Array<string>;
    external_id: string;
    first_name: string;
    gender: string;
    id: string;
    image_url: string;
    last_name: string;
    last_sign_in_at: number;
    object: string;
    password_enabled: boolean;
    phone_numbers: Array<string>;
    primary_email_address_id: string;
    primary_phone_number_id: string | null;
    primary_web3_wallet_id: string | null;
    private_metadata: {};
    profile_image_url: string;
    public_metadata: {};
    two_factor_enabled: boolean;
    unsafe_metadata: {};
    updated_at: number;
    username: string | null;
    web3_wallets: Array<string>;
  };
}

