
const ServiceSection = () => {
    return (
        <section className="py-24 bg-[#f7f3e9]">
            <div className="container mx-auto max-w-screen-lg">
                {/* Phần tiêu đề lớn "SERVICES MENU" */}
                <p className="text-center text-sm font-semibold tracking-wide text-[#c49b66] uppercase mb-2">
                    Services
                </p>
                <h2 className="text-center text-5xl font-extrabold text-black">
                    Services Menu
                </h2>
                <p className="mt-4 text-center text-xl font-medium text-gray-600">
                    Far far away, behind the word mountains, far from the countries Vokalia and Consonantia
                </p>

                {/* Các dịch vụ */}
                <div className="grid grid-cols-1 gap-12 mt-16 md:grid-cols-4 text-center">
                    <div className="transform hover:scale-110 transition-transform duration-300">
                        <img src="./HairCut.svg" alt="Haircut Icon" className="w-28 h-auto mx-auto mb-6" />
                        <h3 className="text-2xl font-bold text-black">Haircut & Styling</h3>
                        <p className="mt-2 text-lg text-gray-500">
                            A small river named Duden flows by their place and supplies.
                        </p>
                    </div>
                    <div className="transform hover:scale-110 transition-transform duration-300">
                        <img src="./Beard.svg" alt="Beard Icon" className="w-28 h-auto mx-auto mb-6" />
                        <h3 className="text-2xl font-bold text-black">Beard</h3>
                        <p className="mt-2 text-lg text-gray-500">
                            A small river named Duden flows by their place and supplies.
                        </p>
                    </div>
                    <div className="transform hover:scale-110 transition-transform duration-300">
                        <img src="./Makeup.svg" alt="Makeup Icon" className="w-28 h-auto mx-auto mb-6" />
                        <h3 className="text-2xl font-bold text-black">Makeup</h3>
                        <p className="mt-2 text-lg text-gray-500">
                            A small river named Duden flows by their place and supplies.
                        </p>
                    </div>
                    <div className="transform hover:scale-110 transition-transform duration-300">
                        <img src="./Body.svg" alt="Body Treatment Icon" className="w-28 h-auto mx-auto mb-6" />
                        <h3 className="text-2xl font-bold text-black">Body Treatment</h3>
                        <p className="mt-2 text-lg text-gray-500">
                            A small river named Duden flows by their place and supplies.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ServiceSection
