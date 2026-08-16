import Hero from "../../components/home/Hero";
import UploadBox from "../../components/shared/upload/UploadBox";
import HowItWorks from "../../components/home/HowItWorks";
import Footer from "../../components/layout/Footer";
import FreeCounter from "../../components/shared/FreeCounter";
import RegisterBanner from "../../components/home/RegisterBanner";
import PublicNavbar from "../../components/layout/PublicNavbar";
import useFreeCounter from "../../hooks/useFreeCounter";
import { useTheme } from "../../context/ThemeContext";

export default function Welcome() {
    const {
        remaining,
        decrement,
        hasRemaining
    } = useFreeCounter();

    const { darkMode } = useTheme();

    return (
        <div className={`min-h-screen transition-colors duration-300 ${darkMode ? "bg-slate-950 text-slate-100" : "bg-slate-50 text-slate-800"}`}>
            <PublicNavbar />
            
            <main className="pb-16">
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
            </main>

            <Footer />
        </div>
    );
}