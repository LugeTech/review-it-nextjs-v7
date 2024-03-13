
const ArrangeByPanel = () => {
  return (
    <div className='flex flex-1 flex-col p-2 w-full bg-myTheme-lightbg dark:bg-myTheme-dark dark:text-myTheme-light'>
      <div className='flex w-full'>
        <p className='flex-1 text-center'>Arrange by rating</p>
      </div>
      <div className="btn-group flex w-full ">
        <button className="btn flex-1 bg-myTheme-secondary text-myTheme-dark ">Any</button>
        <button className="btn flex-1 bg-myTheme-primary text-myTheme-dark ">3.0+</button>
        <button className="btn flex-1 bg-myTheme-primary text-myTheme-dark ">4.0+</button>
        <button className="btn flex-1 bg-myTheme-primary text-myTheme-dark ">4.5+</button>
      </div>
    </div>
  )
}

export default ArrangeByPanel
