import NewProductForm from '../components/NewProductForm'

const page = () => {
  return (
    <div className='flex flex-col w-full h-full p-2 sm:pt-8 bg-myTheme-light justify-start items-center'>
      <NewProductForm />
    </div>
  )
}

export default page
