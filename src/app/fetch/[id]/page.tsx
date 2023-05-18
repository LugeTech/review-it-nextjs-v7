// import { iReview } from '@/app/util/Interfaces'
// interface Props {
//     params: {
//         id: string
//     }
// }


// const page = async ({ params }: Props) => {



//     const response = await fetch('http://localhost:3000/api/getallreviews', { cache: 'no-store' })
//     const { reviews }: { reviews: iReview[] } = await response.json()
//     console.log(reviews)
//     return (
//         <div>
//             <h1>{params.id}</h1>
//             <h1>{JSON.stringify(reviews)}</h1>
//         </div>


//     )
// }

// export default page


const page = () => {
    return (
        <div>page</div>
    )
}

export default page