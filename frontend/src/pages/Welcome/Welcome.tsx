import Hero from "../../components/home/Hero";
import UploadBox from "../../components/home/UploadBox";
import HowItWorks from "../../components/home/HowItWorks";
import Footer from "../../components/layout/Footer";
import FreeCounter from "../../components/home/FreeCounter";
import RegisterBanner from "../../components/home/RegisterBanner";
import PublicNavbar from "../../components/layout/PublicNavbar";
import useFreeCounter from "../../hooks/useFreeCounter";

export default function Welcome() {

    const {

        remaining,

        decrement,

        hasRemaining

    } = useFreeCounter();

    return (

        <>

            <PublicNavbar />
            <Hero />

            {hasRemaining ? (

                <FreeCounter remaining={remaining} />

            ) : (

                <RegisterBanner />

            )}

            <UploadBox
                onCompressionSuccess={decrement}
            />

            <HowItWorks />

            <Footer />

        </>

    );

}