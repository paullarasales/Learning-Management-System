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
            desc: "Gain unlimited access to high-quality study materials, including PDFs, eBooks, and videos.",
            icon: <BookOpenIcon className="w-12 h-12 text-blue-500" />,
        },
        {
            title: "Assignments and Submissions",
            desc: "Easily manage assignments, track deadlines, and receive feedback in an organized manner.",
            icon: <DocumentTextIcon className="w-12 h-12 text-green-500" />,
        },
        {
            title: "Collaboration & Discussions",
            desc: "Engage in discussions, ask questions, and participate in real-time conversations with peers and instructors.",
            icon: (
                <ChatBubbleBottomCenterTextIcon className="w-12 h-12 text-purple-500" />
            ),
        },
    ];

    useEffect(() => {
        // Fade-in animations for sections
        gsap.utils.toArray(".fade-in").forEach((element) => {
            gsap.from(element, {
                opacity: 0,
                y: 20,
                duration: 1.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: element,
                    start: "top 85%",
                    toggleActions: "play none none none",
                },
            });
        });

        // Image fade-in animation
        gsap.utils.toArray(".fade-in-image").forEach((image) => {
            gsap.to(image, {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 1.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: image,
                    start: "top 90%",
                    toggleActions: "play none none none",
                },
            });
        });

        // Feature cards animation
        gsap.utils.toArray(".feature-card").forEach((card, index) => {
            gsap.from(card, {
                opacity: 0,
                x: index % 2 === 0 ? -100 : 100,
                duration: 1.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: card,
                    start: "top 85%",
                    toggleActions: "play none none none",
                },
            });
        });

        // // Floating effect for images
        // gsap.utils.toArray(".floating-image").forEach((image) => {
        //     gsap.to(image, {
        //         y: 10,
        //         duration: 2,
        //         ease: "power1.inOut",
        //         repeat: -1,
        //         yoyo: true,
        //     });
        // });

        return () => {
            // Cleanup animations when component unmounts
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
            gsap.killTweensOf(".fade-in");
            gsap.killTweensOf(".fade-in-image");
            gsap.killTweensOf(".feature-card");
            gsap.killTweensOf(".floating-image");
        };
    }, []);

    const scrollToSection = (e, target) => {
        e.preventDefault();
        gsap.to(window, {
            duration: 1.5,
            scrollTo: target,
            ease: "power2.inOut",
        });
    };

    return (
        <>
            <Head title="Learning Management Repository" />
            <div className="relative bg-[#f9f9f9] text-black overflow-x-hidden font-poppins scroll-container">
                {/* Navbar */}
                <nav className="fixed top-0 left-0 w-full bg-white z-50 py-4 px-8 flex items-center">
                    <div className="flex-1">
                        <h1 className="text-3xl font-bold text-blue-600">
                            E <span className="text-orange-600">D</span> U{" "}
                            <span className="text-orange-600">X</span>
                        </h1>
                    </div>
                    <div className="flex-1 flex justify-center">
                        <ul className="flex space-x-12 text-gray-700 font-medium">
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
                    className="section min-h-screen h-screen flex flex-col items-center justify-center bg-white text-center px-10 pt-20"
                >
                    <h1
                        id="hero-title"
                        className="text-7xl font-semibold fade-in color-changing text-gray-800"
                    >
                        Enhancing Education with Our Interactive Learning System
                    </h1>
                    <p className="fade-in text-xl text-gray-600 max-w-2xl mt-3">
                        Easily access and manage learning materials in one
                        place.
                    </p>

                    <div className="w-full flex items-center justify-center mt-10">
                        <img
                            src="/images/Untitled.jpg"
                            alt="Learning System"
                            className="w-[50%] max-w-[1100px] h-auto object-contain"
                        />
                    </div>
                </section>

                <section
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
                                className={`feature-card p-6 bg-white shadow-md rounded-lg flex flex-col items-center transition-all duration-500 hover:scale-105 ${
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
                </section>

                <section
                    id="guide"
                    className="section h-screen flex items-center justify-center bg-white"
                ></section>

                <section
                    id="developers"
                    className="section h-screen flex items-center justify-center bg-blue-500"
                ></section>
            </div>
        </>
    );
}
