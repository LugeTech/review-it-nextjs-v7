
const ArrangeByPanel = () => {
  return (
    <div className='flex flex-1 flex-col p-4 w-full'>
      <div className='flex w-full'>
        <p className='flex-1 text-center'>Arrange by rating</p>
      </div>
      <div className="btn-group flex w-full">
        <button className="btn flex-1 bg-myTheme-primary ">Any</button>
        <button className="btn flex-1 bg-myTheme-primary ">3.0+</button>
        <button className="btn flex-1 bg-myTheme-primary">4.0+</button>
        <button className="btn flex-1 bg-myTheme-primary">4.5+</button>
      </div>
    </div>
  )
}

export default ArrangeByPanel
