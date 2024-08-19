import Image from "next/image";
import SearchBoxAndListener from "./SearchBoxAndListener";

const HeroSection = () => {
  return (
    <section className=" relative h-[400px]  md:h-[400px] lg:h-[500px] w-full">
      <Image
        src="/hero1.jpg"
        alt="Background Image"
        fill
        className="fixed inset-0 object-cover object-center"
        style={{ objectFit: "cover" }}
        quality={75}
        priority
      />
      <div className=" flex  justify-center items-center absolute top-0 left-0 right-0 bottom-0 text-center text-white bg-opacity-40 dark:bg-opacity-80 bg-myTheme-neutral">
        <div className="flex flex-1 justify-center flex-col">
          {/* <h1 className=" mt-28 text-4xl font-black text-myTheme-neutral"> */}
          {/*   Welcome */}
          {/* </h1> */}
          <div className=" flex flex-1 justify-center ">
            <div className="flex flex-col h-[300px] sm:h-[300px] w-11/12 sm:w-7/12">
              <p className="text-xl mt-1 font-normal pb-1 text-white">
                Review It is a website where you can share and read reviews on
                anything.
              </p>
              <p className="text-xl mt-0 font-normal pb-4 text-myTheme-light">
                It is easy, fun, and free to use.
              </p>
              <div className=" flex flex-1 flex-col justify-end mb-60">
                <div className=" flex sm:flex-row  flex-col w-full ">
                  <form className="flex flex-1 justify-center w-full">
                    <div className="relative w-full">
                      <SearchBoxAndListener />
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
