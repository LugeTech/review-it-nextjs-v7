import React from 'react'

const ManageYourBusiness = () => {
  return (
    <section className="w-full py-5 bg-gradient-to-r from-myTheme-reviewBlue to-myTheme-accent sm:py-6">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 w-full ">
        <div className="text-center sm:flex sm:items-center sm:justify-center sm:text-left">
          <h2 className="text-4xl font-bold text-white">Get full access to your product</h2>

          <a href="/mybusinesses" title="" className="inline-flex items-center justify-center flex-shrink-0 px-4 py-4 mt-8 text-base font-semibold text-gray-900 transition-all duration-200 bg-yellow-300 rounded-md sm:mt-0 sm:ml-8 lg:ml-16 hover:bg-yellow-400 focus:bg-yellow-400" role="button">
            Get instant access
          </a>
        </div>
      </div>
    </section>
  )
}

export default ManageYourBusiness
