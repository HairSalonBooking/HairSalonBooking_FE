import Header from "@/components/layout/Header/Header";
import Footer from "@/components/layout/Footer/Footer";

const AboutPage = () => {
    return (
        <>
            <Header />
            <div className="bg-gray-800 text-white py-16">
                <div className="container mx-auto px-4">
                    {/* Breadcrumb */}
                    <nav className="text-sm mb-5 flex justify-center">
                        <a href="/home" className="text-white hover:text-yellow-500">
                            Home
                        </a>
                        <span className="mx-2 text-gray-400">/</span>
                        <a href="/about" className="text-gray-400">
                            About Us
                        </a>
                    </nav>

                    {/* Title */}
                    <h1 className="text-center text-4xl font-bold mb-5">About Us</h1>

                    {/* Section 1 */}
                    <div className="mb-16">
                        <h2 className="text-3xl font-bold mb-4">
                            HairCare Salon: Celebrating Your Natural Beauty
                        </h2>
                        <p className="text-lg mb-6">
                            At HairCare Salon, we believe that hair is not just part of your appearance but a unique reflection of each individual’s personality. Founded with the mission to provide perfection in every detail, HairCare Salon is proud to offer professional hair care services, from haircuts and styling to intensive hair restoration treatments.
                        </p>
                        <img
                            src="https://archello.s3.eu-central-1.amazonaws.com/images/2022/04/25/noke-architects-hair-salon-interiors-inspired-by-desert-landscape-wellness-centres-archello.1650910390.2929.jpg" // Replace with the correct image URL
                            alt="Xing Salon"
                            className="max-w-xs md:max-w-md lg:max-w-lg mx-auto h-auto mb-8 rounded-lg shadow-lg"
                        />
                    </div>

                    {/* Section 2 */}
                    <div className="mb-16">
                        <h2 className="text-3xl font-bold mb-4">
                            Xing Hair Salon: Hair Beauty - Creating Your Own Identity
                        </h2>
                        <p className="text-lg mb-6">
                            With a team of experienced professionals and dedication in every action, we commit to providing customers not only a new look but also absolute confidence and satisfaction. HairCare Salon constantly updates the latest hair fashion trends, using high-end hair care products to ensure your hair is always nourished and healthy.
                        </p>
                        <img
                            src="https://images.squarespace-cdn.com/content/v1/5e29bc191bc1146fbde14230/1633447847079-C597QL7C8T0C6T284ECU/salon+interior+design.jpg" // Replace with the correct image URL
                            alt="Xing Salon Interior"
                            className="max-w-xs md:max-w-md lg:max-w-lg mx-auto h-auto mb-8 rounded-lg shadow-lg"
                        />
                    </div>

                    {/* Section 3 */}
                    <div className="mb-16">
                        <h2 className="text-3xl font-bold mb-4">Services at Xing Hair Salon</h2>
                        <p className="text-lg mb-6">
                            At the salon, we offer cutting, styling, and special hair care services tailored specifically for our customers. Whatever your hair needs, we are always ready to provide the best solution.
                        </p>
                        <p className="text-lg mb-6">
                            With a modern space and luxurious style, customers coming to us not only for beauty treatments but also to experience a wonderful relaxing space. Each of our services comes with premium hair care products, ensuring absolute satisfaction.
                        </p>
                        <img
                            src="https://www.takarahairdressing.co.uk/images/salon-design/step-2-left.jpg" // Replace with the correct image URL
                            alt="Xing Salon Interior"
                            className="max-w-xs md:max-w-md lg:max-w-lg mx-auto h-auto mb-8 rounded-lg shadow-lg"
                        />
                    </div>

                    {/* Section 4 */}
                    <div className="mb-16">
                        <h2 className="text-3xl font-bold mb-4">
                            Quality and Customers Above All
                        </h2>
                        <p className="text-lg mb-6">
                            The luxurious and comfortable space of HairCare Salon is designed to give you a full relaxing experience during your beauty treatments. Here, customers not only enjoy perfect hair care services but also receive attentive and thoughtful service with professionalism.
                        </p>
                        <img
                            src="https://cdn.prod.website-files.com/65e78d77c85e6169e48b2f17/66331c087fcec9581f31394d_interior1%2520%25281%2529.jpeg" // Replace with the correct image URL
                            alt="Xing Salon Interior"
                            className="max-w-xs md:max-w-md lg:max-w-lg mx-auto h-auto mb-8 rounded-lg shadow-lg"
                        />
                    </div>

                    {/* Section 5 */}
                    <div className="mb-16">
                        <h2 className="text-3xl font-bold mb-4">
                            Contact HairCare Salon Today
                        </h2>
                        <p className="text-lg mb-6">
                            If you are looking for a high-quality and trustworthy salon to dye and beautify your hair in District 9, come to Xing Hair Salon at Tower S5.02 - The Rainbow - Vinhomes Grand Park. We will turn your dream of perfect hair into reality. Let HairCare Salon help you shine and express your personality through your hair.
                        </p>
                        <img
                            src="https://img.freepik.com/premium-photo/industrial-hair-dressing-barbershop-hair-salon-interior-design-concept_861577-1497.jpg" // Replace with the correct image URL
                            alt="Xing Salon Interior"
                            className="max-w-xs md:max-w-md lg:max-w-lg mx-auto h-auto mb-8 rounded-lg shadow-lg"
                        />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default AboutPage;
