import { createContext, useContext, useEffect, useState } from "react";


interface ThemeContextProps {
    darkMode: boolean;
    toggleTheme: () => void;
}


const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);


export function ThemeProvider({ children }: { children: React.ReactNode }) {

    const [darkMode, setDarkMode] = useState(false);


    useEffect(() => {

        const theme = localStorage.getItem("theme");

        if (theme === "dark") {
            setDarkMode(true);
            document.documentElement.classList.add("dark");
        }
        else {
            document.documentElement.classList.remove("dark");
        }

    }, []);



    const toggleTheme = () => {

        setDarkMode(prev => {

            const next = !prev;

            if (next) {
                document.documentElement.classList.add("dark");
                localStorage.setItem("theme", "dark");
            }
            else {
                document.documentElement.classList.remove("dark");
                localStorage.setItem("theme", "light");
            }

            return next;

        });

    }


    return (
        <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )

}


export function useTheme() {

    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error("useTheme debe estar dentro de ThemeProvider");
    }

    return context;
}