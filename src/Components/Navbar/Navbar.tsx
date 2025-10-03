"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import logo from "../../../public/logo.png";
import { usePathname } from "next/navigation";
import { IoCloudDownloadOutline } from "react-icons/io5";
import { FaSignInAlt } from "react-icons/fa";
import { ModeToggle } from "../ui/ThemeToggleButton/ThemeToggleButton";
import { NavLink } from "@/src/type";

const Navbar: React.FC = () => {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const isActive = (path: string) => pathname === path;

    const navLinks: NavLink[] = [
        { name: "Home", path: "/" },
        { name: "About", path: "/about" },
        { name: "Skills", path: "/skills" },
        { name: "Projects", path: "/project" },
        { name: "Blog", path: "/blog" },
        { name: "Contact", path: "/contact" },
    ];

    const resumeViewLink: string =
        "https://drive.google.com/file/d/1NylUXKExZJz_kw984n_ZcdY30DyJwnYb/view?usp=sharing";
    const resumeDownloadLink: string =
        "https://drive.google.com/uc?export=download&id=1NylUXKExZJz_kw984n_ZcdY30DyJwnYb";

    const handleResumeDownload = (): void => {
        window.open(resumeViewLink, "_blank");
        const link = document.createElement("a");
        link.href = resumeDownloadLink;
        link.setAttribute("download", "Resume.pdf");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/80 dark:bg-black/70 border-b border-fuchsia-500 dark:border-gray-700 shadow-sm">
            <nav className="flex items-center justify-between px-3 md:px-4 py-3 container mx-auto">
                {/* Left side */}
                <Link href="/" className="flex items-center group">
                    <div className="relative w-12 h-12 overflow-hidden group-hover:scale-105 transition-transform duration-200">
                        <Image src={logo} alt="Logo" fill className="object-cover" />
                    </div>
                    <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 via-indigo-500 to-fuchsia-500 text-transparent bg-clip-text drop-shadow-md animate-text-gradient group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
                        Istiak Ahamed
                    </span>
                </Link>

                {/* Right side */}
                <div className="flex items-center gap-4">
                    {/* Desktop Menu */}
                    <ul className="hidden md:flex items-center gap-6 text-sm font-medium">
                        {navLinks.map((link) => (
                            <li key={link.path}>
                                <Link
                                    href={link.path}
                                    className={`transition-colors duration-200 ${isActive(link.path)
                                        ? "bg-gradient-to-r from-cyan-400 via-indigo-500 to-fuchsia-500 text-transparent bg-clip-text drop-shadow-md animate-text-gradient font-semibold"
                                        : "text-gray-700 hover:text-fuchsia-500 dark:text-white"
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {/* Theme Change Button */}
                    <ModeToggle />

                    {/* Login Button (Desktop) */}
                    <Link
                        href="/login"
                        className="group relative inline-flex items-center gap-2 px-5 py-3 rounded-full border border-sky-500/30 backdrop-blur-md   bg-gradient-to-r from-sky-500/10 via-indigo-500/10 to-fuchsia-500/10 text-gray-800 dark:text-white transition-all duration-300 ease-in-out shadow-md hover:shadow-lg cursor-pointer"
                    >
                        <FaSignInAlt className="text-lg group-hover:text-sky-400 transition-colors" />
                    </Link>

                    {/* Resume Button (Desktop) */}
                    <button
                        onClick={handleResumeDownload}
                        className="group relative inline-flex items-center gap-2 px-6 py-2 rounded-full border border-emerald-500/30 backdrop-blur-md  bg-gradient-to-r from-cyan-500/10 via-indigo-500/10 to-fuchsia-500/10  text-gray-800 dark:text-white transition-all duration-300 ease-in-out shadow-md hover:shadow-lg cursor-pointer"
                    >
                        <IoCloudDownloadOutline className="text-xl transition-transform duration-300 group-hover:rotate-[-15deg]" />
                        <span className="font-medium">Download Resume</span>
                    </button>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-600 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle menu"
                    >
                        <svg
                            className="h-6 w-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            {isOpen ? (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            ) : (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            )}
                        </svg>
                    </button>
                </div>
            </nav>

            {/* Mobile Dropdown Menu */}
            {isOpen && (
                <ul className="md:hidden flex flex-col items-start gap-3 px-6 py-4 bg-[#292637] text-white shadow-lg">
                    {navLinks.map((link) => (
                        <li key={link.path} className="w-full">
                            <Link
                                href={link.path}
                                onClick={() => setIsOpen(false)}
                                className={`block w-full py-1 ${isActive(link.path)
                                    ? "text-blue-500 font-semibold"
                                    : "hover:text-blue-400"
                                    }`}
                            >
                                {link.name}
                            </Link>
                        </li>
                    ))}

                    {/* Login (Mobile) */}
                    <li className="w-full">
                        <Link
                            href="/login"
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-2 py-2 hover:text-blue-400"
                        >
                            <FaSignInAlt />
                        </Link>
                    </li>

                    {/* Resume (Mobile) */}
                    <li className="w-full pt-2">
                        <button
                            onClick={() => {
                                setIsOpen(false);
                                handleResumeDownload();
                            }}
                            className="group relative inline-flex items-center gap-2 px-6 py-2 rounded-full text-white border border-emerald-500/30 bg-transparent backdrop-blur-md transition-all duration-300 ease-in-out shadow-md hover:shadow-lg cursor-pointer"
                        >
                            <IoCloudDownloadOutline className="text-xl transition-transform duration-300 group-hover:rotate-[-15deg]" />
                            <span className="font-medium">Download Resume</span>
                        </button>
                    </li>
                </ul>
            )}
        </header>
    );
};

export default Navbar;