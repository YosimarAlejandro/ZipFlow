import Hero from "../components/home/Hero";
import UploadBox from "../components/home/UploadBox";
import HowItWorks from "../components/home/HowItWorks";
import Footer from "../components/layout/Footer";

export default function Home() {
    return (
        <>
            <Hero />
            <UploadBox />
            <HowItWorks />
            <Footer />
        </>
    );
}