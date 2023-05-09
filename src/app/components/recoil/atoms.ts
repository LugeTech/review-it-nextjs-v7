'use client';
// @ts-ignore
import { Heart } from '@smastrom/react-rating'
import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist()
interface AtomReviews {
    title: string,
    address: string,
    telephone: string,
    website?: string,
    comment: string,
    stars: number,

}

export const textState = atom({
    key: 'textState', // unique ID (with respect to other atoms/selectors)
    default: '', // default value (aka initial value)
    effects_UNSTABLE: [persistAtom]
});

export const reviewsRecoilState = atom({
    key: 'reviewsRecoilState', // unique ID (with respect to other atoms/selectors)
    default: [] as AtomReviews[], // default value (aka initial value)
}); // default value (aka initial value)


export const ratingStyle = atom({
    key: 'ratingStyle',
    default: {
        itemShapes: Heart,
        activeFillColor: '#F18C8E',
        inactiveFillColor: '#c8c9ca'
    },
})

export const showVerticalNav = atom({
    key: 'showVerticalNav', // unique ID (with respect to other atoms/selectors)
    default: false, // default value (aka initial value)
});