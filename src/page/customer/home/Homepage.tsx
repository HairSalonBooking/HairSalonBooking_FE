import Header from "@/components/layout/Header/Header";

const Home = () => {
  return (
    <>
      <Header />
      <div className="mx-auto max-w-7xl px-6 md:px-12 xl:px-6">
        <section>
          <div className="relative" id="home"></div>
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-hero-pattern bg-cover bg-center"
          ></div>
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-black opacity-60"
          ></div>
          <div className="relative ml-auto pt-36">
            <div className="mx-auto text-center lg:w-2/3">
              <h2 className="mt-8 text-2xl font-semibold text-white dark:text-white md:text-3xl">
                Welcome to HairCare, the best place to get your hair done.
              </h2>
              <h1 className="text-5xl font-bold text-yellow-600 dark:text-white md:text-6xl xl:text-7xl">
                Revive Your Look{" "}
                <span className="text-primary text-white dark:text-white">
                  Refresh Your Spirit.
                </span>
              </h1>
              <div className="mt-16 flex flex-wrap justify-center gap-x-6 gap-y-4">
                <a
                  href="#"
                  className="relative flex h-11 w-full items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:bg-yellow-600 before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max"
                >
                  <span className="relative text-base font-semibold text-white">
                    Book now
                  </span>
                </a>
              </div>
            </div>
          </div>
        </section>
        <div className="py-12"></div>
        <section className="relative py-12 dark:bg-gray-900 z-10">
          <div className="mx-auto max-w-7xl px-6 md:px-12">
            <h2 className="text-center text-4xl font-extrabold text-white dark:text-white">
              Our Services
            </h2>
            <p className="mt-4 text-center text-lg font-bold text-white dark:text-gray-400">
              Discover our wide range of services tailored to meet your needs.
            </p>
            <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="p-6 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
                <h3 className="text-xl font-semibold text-white dark:text-white drop-shadow-lg">
                  Hair Styling
                </h3>
                <p className="mt-2 font-bold text-white dark:text-gray-400">
                  Professional haircuts and styling for every occasion.
                </p>
              </div>
              <div className="p-6 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
                <h3 className="text-xl font-bold text-white dark:text-white drop-shadow-lg">
                  Color Treatment
                </h3>
                <p className="mt-2 text-white font-bold dark:text-gray-400">
                  Premium coloring services using the best products.
                </p>
              </div>
              <div className="p-6 border font-bold border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
                <h3 className="text-xl font-semibold text-white dark:text-white drop-shadow-lg">
                  Scalp Care
                </h3>
                <p className="mt-2 text-white font-bold dark:text-gray-400">
                  Special treatments for a healthy scalp and stronger hair.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>

  );
};

export default Home;