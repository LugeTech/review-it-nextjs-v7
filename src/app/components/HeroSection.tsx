import Image from "next/image";

const HeroSection = () => {
  return (
    <section className=" relative h-[400px]  md:h-[400px] lg:h-[500px] w-full">
      <Image
        src="https://res.cloudinary.com/dhglzlaqf/image/upload/v1680311568/book_y8ekbr.png"
        alt="Background Image"
        fill
        className="fixed inset-0 object-cover object-center"
        style={{ objectFit: "cover" }}
        quality={100}
        />
      <div className=" flex  justify-center items-center absolute top-0 left-0 right-0 bottom-0 text-center text-white bg-opacity-30 bg-mycolours-dark">
        <div className="flex flex-1 justify-center flex-col">
          <h1 className=" mt-28 text-4xl font-black text-mycolours-dark">
            Welcome
          </h1>
          <div className=" flex flex-1 justify-center ">
            <div className="flex flex-col h-[300px] sm:h-[400px] w-11/12 sm:w-7/12">
              <p className="text-xl mt-1 font-normal pb-1 text-mycolours-light">
                Review It is a website where you can share and read reviews on
                anything.
              </p>
              <p className="text-xl mt-0 font-normal pb-4 text-mycolours-light">
                It is easy, fun, and free to use.
              </p>
              <div className=" flex flex-1 flex-col justify-end mb-60">
                <div className=" flex sm:flex-row  flex-col w-full ">
                  <form className="flex flex-1 justify-center w-full">
                    <label
                      htmlFor="default-search"
                      className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                    >
                      Search
                    </label>
                    <div className="relative w-full">
                      <input
                        type="search"
                        id="default-search"
                        className="block w-full p-4 pl-10 text-sm text-black border border-gray-300 rounded-lg bg-gray-50 focus:ring-mycolours-c4 focus:border-mycolours-c4 dark:bg-mycolours-dark dark:border-mycolours-c5 dark:placeholder-mycolours-c4 dark:text-mycolours-light dark:focus:ring-mycolours-c5 dark:focus:border-mycolours-c3"
                        placeholder="Company | Service | Product..."
                        required
                      />
                      <button
                        type="submit"
                        className="text-white dark:text-black  absolute right-2.5 bottom-2.5 bg-mycolours-dark hover:bg-mycolours-c5 focus:ring-4 focus:outline-none focus:ring-mycolours-c3 font-medium rounded-lg text-sm px-4 py-2 dark:bg-mycolours-light dark:hover:bg-mycolours-c5 dark:focus:ring-mycolours-c2"
                      >
                        Search
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
