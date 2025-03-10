import { Head, Link } from "@inertiajs/react";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import {
    BookOpenIcon,
    DocumentTextIcon,
    ChatBubbleBottomCenterTextIcon,
} from "@heroicons/react/24/solid";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function Welcome({ auth }) {
    const features = [
        {
            title: "Learning Materials",
            desc: "Gain unlimited access to high-quality study materials, including PDFs, eBook, and educational videos. Stay prepared anytime, anywhere with structured and organized resources tailored for effective learning.",
            icon: <BookOpenIcon className="w-12 h-12 text-blue-500" />,
        },
        {
            title: "Assignments and Submissions",
            desc: "Easily manage your coursework with our streamlined assignment submission system. Upload files, track deadlines, receive feedback, and keep everyting organized in one place for stress-free learning",
            icon: <DocumentTextIcon className="w-12 h-12 text-green-500" />,
        },
        {
            title: "Collaboration & Discussions",
            desc: "Engage in meaningful discussions with classmates and instructors through interactive forums and group chats. Share insights, ask questions, and participate in real-time conversations that enrich the learning experience.",
            icon: (
                <ChatBubbleBottomCenterTextIcon className="w-12 h-12 text-purple-500" />
            ),
        },
    ];

    useEffect(() => {
        gsap.from(".fade-in", {
            opacity: 0,
            y: -20,
            duration: 1,
            stagger: 0.2,
        });

        gsap.utils.toArray(".section").forEach((section) => {
            gsap.from(section, {
                opacity: 0,
                y: 50,
                duration: 1.2,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: section,
                    start: "top 80%",
                    toggleActions: "play none none none",
                },
            });
        });

        gsap.from(
            ".fade-in-image",
            {
                opacity: 0,
                y: 100,
                scale: 0.8,
                duration: 1.2,
                stagger: 0.3,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".fade-in-image",
                    start: "top 85%",
                    toggleActions: "play none none none",
                },
            },
            []
        );
    }, []);

    useEffect(() => {
        const featureCards = gsap.utils.toArray(".feature-card");

        featureCards.forEach((card, index) => {
            let animationProps = {
                opacity: 0,
                duration: 1.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: card,
                    start: "top 85%",
                    toggleActions: "play none none none",
                },
            };

            if (index === 0) {
                gsap.from(card, { ...animationProps, x: -100 });
            } else if (index === 1) {
                gsap.from(card, { ...animationProps, x: 100 });
            } else {
                gsap.from(card, { ...animationProps, y: 100 });
            }
        });
    }, []);

    const scrollToSection = (e, target) => {
        e.preventDefault();
        gsap.to(window, {
            duration: 1.5,
            scrollTo: target,
            ease: "power2.inOut",
        });
    };

    useEffect(() => {
        document.body.style.overflow = "auto";
        document.body.style.scrollbarWidth = "none";
        document.body.style.msOverflowStyle = "none";

        const style = document.createElement("style");
        style.innerHTML = `::-webkit-scrollbar { display: none; }`;
        document.head.appendChild(style);

        return () => {
            document.body.style.overflow = "auto";
            document.head.removeChild(style);
        };
    }, []);

    useEffect(() => {
        const title = document.getElementById("hero-title");

        if (title) {
            const words = title.innerText.split(" ");
            title.innerHTML = words
                .map(
                    (word) =>
                        `<span class="inline-block overflow-hidden leading-[1.2]">
                            <span class="reveal-text inline-block">${word}&nbsp;</span>
                        </span>`
                )
                .join("");

            gsap.from(".reveal-text", {
                y: "100%",
                opacity: 0,
                duration: 1.2,
                stagger: 0.2,
                ease: "power3.out",
            });

            gsap.to(".reveal-text", {
                color: ["#4F46E5", "#DC2626", "#22C55E", "#EAB308"],
                duration: 3,
                repeat: 1,
                yoyo: true,
                stagger: 0.5,
                ease: "power1.inOut",
            });
        }
    }, []);
    useEffect(() => {
        gsap.utils.toArray(".floating-image").forEach((image) => {
            gsap.to(image, {
                y: 15,
                duration: 2,
                ease: "power1.inOut",
                repeat: -1,
                yoyo: true,
            });
        });
    }, []);

    return (
        <>
            <Head title="Learning Management Repository" />
            <div className="relative bg-[#f9f9f9] text-black overflow-x-hidden font-poppins">
                {/* Navbar */}
                <nav className="fixed top-0 left-0 w-full bg-white z-50 py-4 px-8 flex items-center">
                    <div className="flex-1">
                        <h1 className="text-2xl font-bold text-blue-600">
                            E D U X
                        </h1>
                    </div>
                    <div className="flex-1 flex justify-center">
                        <ul className="flex space-x-6 text-gray-700 font-medium">
                            {[
                                "home",
                                "features",
                                "guide",
                                "developers",
                                "contact",
                            ].map((section) => (
                                <li key={section}>
                                    <a
                                        href={`#${section}`}
                                        onClick={(e) =>
                                            scrollToSection(e, `#${section}`)
                                        }
                                        className="hover:text-blue-500 transition"
                                    >
                                        {section.charAt(0).toUpperCase() +
                                            section.slice(1)}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="flex-1 flex justify-end">
                        {auth ? (
                            <Link
                                href="/dashboard"
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <Link
                                href="/login"
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                            >
                                Login/Register
                            </Link>
                        )}
                    </div>
                </nav>

                <section
                    id="home"
                    className="section h-screen flex flex-col items-center justify-center bg-white text-center px-6 mt-6"
                >
                    <h1
                        id="hero-title"
                        className="text-7xl font-bold fade-in color-changing text-gray-800"
                    >
                        Empowering Learning with Our LMS
                    </h1>
                    <p className="fade-in text-xl text-gray-600 max-w-2xl">
                        A centralized system for students and faculty to access
                        and manage learning materials easily.
                    </p>
                    <div className="fade-in mt-6">
                        <Link
                            href="/register"
                            className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg text-lg hover:bg-blue-600 transition"
                        >
                            Get Started
                        </Link>
                    </div>
                    <div className="relative h-[500px] w-full flex justify-center items-center">
                        <div className="absolute w-3/4 h-80 bg-blue-200 opacity-50 blur-3xl rounded-full"></div>

                        <div className="relative w-full max-w-6xl grid grid-cols-3 gap-6">
                            <img
                                src="/images/left.jpg"
                                alt="Learning Management System"
                                className="floating-image fade-in-image transform rotate-[-12deg] scale-90 transition-all duration-500 hover:scale-105 hover:rotate-[-5deg] shadow-xl rounded-lg"
                            />

                            <img
                                src="/images/mid.jpg"
                                alt="Learning Management System"
                                className="floating-image fade-in-image scale-110 shadow-2xl rounded-lg transition-all duration-500 hover:scale-115"
                            />

                            <img
                                src="/images/right.jpg"
                                alt="Learning Management System"
                                className="floating-image fade-in-image transform rotate-[12deg] scale-90 transition-all duration-500 hover:scale-105 hover:rotate-[5deg] shadow-xl rounded-lg"
                            />
                        </div>
                    </div>
                </section>

                <div
                    id="features"
                    className="relative flex flex-col items-center bg-gradient-to-b from-blue-50 to-white px-6 py-16 text-center"
                >
                    <h2 className="text-4xl font-bold text-gray-800">
                        🚀 Key Features
                    </h2>
                    <p className="mt-2 text-lg text-gray-600 max-w-2xl">
                        Empower your learning experience with essential tools...
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-8 mt-12">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className={`feature-card p-6 bg-white shadow-lg rounded-lg flex flex-col items-center transition-all duration-500 hover:scale-105 ${
                                    index % 2 === 0
                                        ? "translate-y-4"
                                        : "-translate-y-4"
                                }`}
                            >
                                {feature.icon}
                                <h3 className="text-xl font-semibold mt-4">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600 mt-2">
                                    {feature.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {["guide", "developers", "contact"].map((section) => (
                    <section
                        key={section}
                        id={section}
                        className="section h-screen flex items-center justify-center bg-white text-center px-6"
                    >
                        <h2 className="text-3xl font-bold fade-in text-gray-800">
                            {section.charAt(0).toUpperCase() + section.slice(1)}
                        </h2>
                    </section>
                ))}
            </div>
        </>
    );
}
