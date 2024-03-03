import { Rubik, Inter } from "next/font/google";

const rubik = Rubik({ subsets: ["latin"], weight: "variable", variable: "--font-rubik" });

// TODO: Decide whether we want Inter at all or just use default fonts?
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export { rubik, inter };
