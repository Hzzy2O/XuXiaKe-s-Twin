import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "assets/global.css";
import '@rainbow-me/rainbowkit/styles.css';
const urban = Urbanist({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Xu Xiake Digital Twin",
    description: "",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body
                className={urban.className}
            >
                {children}
            </body>
        </html>
    );
}

