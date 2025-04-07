import { Head, Link } from "@inertiajs/react";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function Welcome({ auth }) {
    useEffect(() => {
        gsap.utils.toA;

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

        return () => {
            // Cleanup animations when component unmounts
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
            gsap.killTweensOf(".fade-in");
            gsap.killTweensOf(".fade-in-image");
            gsap.killTweensOf(".feature-card");
        };
    }, []);

    useEffect(() => {
        // Set initial state (just to be safe, but Tailwind already did it)
        gsap.set([".hero-title", ".title-description", ".hero-image"], {
            opacity: 0,
            y: 50,
            visibility: "hidden",
        });

        gsap.set(".hero-wrapper", { opacity: 1 });

        const tl = gsap.timeline({
            defaults: { ease: "power3.out", duration: 1 },
        });

        tl.to(".hero-title", {
            opacity: 1,
            y: 0,
            visibility: "visible",
        })
            .to(
                ".title-description",
                {
                    opacity: 1,
                    y: 0,
                    visibility: "visible",
                },
                ">0.2"
            )
            .to(
                ".hero-image",
                {
                    opacity: 1,
                    y: 0,
                    visibility: "visible",
                },
                ">0.2"
            );
    }, []);

    useEffect(() => {
        gsap.set(
            [
                ".description",
                ".description-title",
                ".left-img",
                ".right-top-img",
                ".right-bottom-img",
            ],
            {
                opacity: 0,
                y: 50,
                visibility: "hidden",
            }
        );

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: "#features",
                start: "top 80%",
                toggleActions: "play none none none",
            },
            defaults: { ease: "power3.out", duration: 1 },
        });

        tl.to(".description", {
            opacity: 1,
            y: 0,
            visibility: "visible",
        })
            .to(
                ".description-title",
                {
                    opacity: 1,
                    y: 0,
                    visibility: "visible",
                },
                ">0.2"
            )
            .to(
                ".left-img",
                {
                    opacity: 1,
                    y: 0,
                    visibility: "visible",
                },
                ">0.2"
            )
            .to(
                ".right-top-img",
                {
                    opacity: 1,
                    y: 0,
                    visibility: "visible",
                },
                ">0.2"
            )
            .to(
                ".right-bottom-img",
                {
                    opacity: 1,
                    y: 0,
                    visibility: "visible",
                },
                ">0.2"
            );
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
                <nav className="fixed top-0 left-0 w-full bg-white z-50 py-4 px-8 flex items-center justify-around h-14">
                    <div className="w-3/6 flex items-center gap-1">
                        <h1 className="text-2xl font-semibold">E D U</h1>
                        <img src="logo/paul.png" alt="" className="h-10 w-12" />
                    </div>
                    <div className="w-3/6 flex justify-center">
                        <ul className="flex space-x-12 text-gray-700 font-medium">
                            {["home", "features", "guide", "about"].map(
                                (section) => (
                                    <li key={section}>
                                        <a
                                            href={`#${section}`}
                                            onClick={(e) =>
                                                scrollToSection(
                                                    e,
                                                    `#${section}`
                                                )
                                            }
                                            className="hover:text-blue-500 transition"
                                        >
                                            {section.charAt(0).toUpperCase() +
                                                section.slice(1)}
                                        </a>
                                    </li>
                                )
                            )}
                        </ul>
                    </div>
                    <div className="w-3/6 flex justify-end">
                        {auth && auth.user ? (
                            <Link
                                href="/dashboard"
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <Link
                                href="/login"
                                className="text-gray-700 px-4 py-2 font-medium transition"
                            >
                                Sign in
                            </Link>
                        )}
                    </div>
                </nav>

                <section
                    id="home"
                    className="section min-h-screen h-screen flex flex-col items-center justify-center bg-white text-center px-10 pt-20 opacity-0 hero-wrapper"
                >
                    <h1
                        id="hero-title"
                        className="text-6xl font-semibold hero-title text-gray-800 opacity-0"
                    >
                        Enhancing Education with Our Interactive Learning System
                    </h1>
                    <p className="title-description text-xl text-gray-600 max-w-2xl mt-3 opacity-0">
                        Easily access and manage learning materials in one
                        place.
                    </p>

                    <div className="w-full flex items-center justify-center mt-10">
                        <img
                            src="/images/Untitled.jpg"
                            alt="Learning System"
                            className="w-[50%] max-w-[1100px] h-auto object-contain hero-image opacity-0"
                        />
                    </div>
                </section>

                <section
                    id="features"
                    className="section min-h-screen h-screen flex flex-col items-center justify-center bg-white text-center px-10 pt-20"
                >
                    <p className="text-xl text-blue-400 tracking-wide description">
                        Features
                    </p>
                    <h2 className="text-4xl font-semibold text-gray-800 tracking-wide description-title">
                        Discover tools that simplify, Enhance, and transform
                        your learning experience.
                    </h2>

                    <div className="h-[80vh] w-11/12 flex gap-6 mt-6">
                        <div className="w-2/3 flex items-center justify-center rounded-2xl shadow-lg overflow-hidden">
                            <img
                                src="/images/video.png"
                                alt="Learning System"
                                className="w-full h-full object-contain left-img"
                            />
                        </div>

                        <div className="w-1/3 flex flex-col gap-6">
                            <div className="h-1/2 rounded-2xl shadow-lg overflow-hidden flex items-center justify-center">
                                <img
                                    src="/images/materials.png"
                                    alt="Materials"
                                    className="w-full h-full object-contain right-top-img"
                                />
                            </div>
                            <div className="h-1/2 rounded-2xl shadow-lg overflow-hidden flex items-center justify-center">
                                <img
                                    src="/images/assignment.png"
                                    alt="Assignment"
                                    className="w-full h-full object-contain right-bottom-img"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                <section
                    id="guide"
                    className="section min-h-screen h-screen flex flex-col items-center justify-center bg-white text-center px-10 pt-20"
                >
                    <p className="text-xl text-blue-400 tracking-wide">Guide</p>
                    <div className="relative h-[80vh] w-3/4 flex flex-col justify-center items-center">
                        {/* Vertical line */}
                        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-400"></div>
                        {/* Steps */}
                        <div className="w-full flex flex-col gap-10">
                            <div className="flex justify-between items-center w-full">
                                <div className="w-1/2 text-right pr-10">
                                    <h3 className="text-lg font-bold guide-step-1">
                                        Register & Log In
                                    </h3>
                                    <p className="text-gray-600 guide-step-desc-1">
                                        Create an account and access your
                                        dashboard
                                    </p>
                                </div>
                                <div className="w-5 h-5 bg-blue-500 rounded-full"></div>
                                <div className="w-1/2"></div>
                            </div>

                            <div className="flex justify-between items-center w-full">
                                <div className="w-1/2"></div>
                                <div className="w-5 h-5 bg-blue-500 rounded-full"></div>
                                <div className="w-1/2 text-left pl-10">
                                    <h3 className="text-lg font-bold guide-step-2">
                                        Wait for Instructor
                                    </h3>
                                    <p className="text-gray-600 guide-step-desc-2">
                                        Your instructor will add you to class.
                                    </p>
                                </div>
                            </div>

                            <div className="flex justify-between items-center w-full">
                                <div className="w-1/2 text-right pr-10">
                                    <h3 className="text-lg font-bold guide-step-3">
                                        Explore Class Dashboard
                                    </h3>
                                    <p className="text-gray-600 guide-step-desc-3">
                                        Find discussions, materials, and
                                        assignments.
                                    </p>
                                </div>
                                <div className="w-5 h-5 bg-blue-500 rounded-full"></div>
                                <div className="w-1/2"></div>
                            </div>

                            <div className="flex justify-between items-center w-full">
                                <div className="w-1/2"></div>
                                <div className="w-5 h-5 bg-blue-500 rounded-full"></div>
                                <div className="w-1/2 text-left pl-10">
                                    <h3 className="text-lg font-bold guide-step-4">
                                        Submit Assignments
                                    </h3>
                                    <p className="text-gray-600 guide-step-desc-4">
                                        View and complete tasks before the
                                        deadline.
                                    </p>
                                </div>
                            </div>

                            <div className="flex justify-between items-center w-full">
                                <div className="w-1/2 text-right pr-10">
                                    <h3 className="text-lg font-bold guide-step-5">
                                        Attend Live Classes
                                    </h3>
                                    <p className="text-gray-600 guide-step-desc-5">
                                        Join live sessions and interact in
                                        real-time.
                                    </p>
                                </div>
                                <div className="w-5 h-5 bg-blue-500 rounded-full"></div>
                                <div className="w-1/2"></div>
                            </div>

                            <div className="flex justify-between items-center w-full">
                                <div className="w-1/2"></div>
                                <div className="w-5 h-5 bg-blue-500 rounded-full"></div>
                                <div className="w-1/2 text-left pl-10">
                                    <h3 className="text-lg font-bold guide-step-6">
                                        Check Grades and & Updates
                                    </h3>
                                    <p className="text-gray-600 guide-step-desc-6">
                                        Stay updated with the feedback and
                                        announcement.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section
                    id="about"
                    className="section min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white px-6 py-16"
                >
                    {/* Title & Description */}
                    <div className="text-center mb-12">
                        <p className="text-xl text-blue-500 tracking-widest font-medium uppercase">
                            Our Team
                        </p>
                        <h2 className="text-5xl font-bold text-gray-800 mt-2">
                            Meet the Creators
                        </h2>
                        <div className="w-16 h-1 bg-blue-500 mx-auto mt-3"></div>
                        <p className="text-gray-600 max-w-2xl mx-auto mt-4 text-lg">
                            We are students from Pangasinan State University,
                            passionate about bringing innovative solutions to
                            life.
                        </p>
                    </div>

                    {/* Grid Layout for Developers */}
                    <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                        {[
                            {
                                name: "John Paul Sales",
                                role: "Full Stack Developer",
                                img: "us/paul.jpg",
                            },
                            {
                                name: "Reejay Figueres",
                                role: "Backend Developer",
                                img: "us/reejay.jpg",
                            },
                            {
                                name: "Angelvic Claudio",
                                role: "UI/UX Designer",
                                img: "us/angelvic.jpg",
                            },
                            {
                                name: "Margaret Rivera",
                                role: "Project Manager",
                                img: "us/marga.jpg",
                            },
                        ].map((dev, index) => (
                            <div
                                key={index}
                                className={`relative group transform transition duration-500 hover:-translate-y-3 ${
                                    index % 2 !== 0 ? "md:-translate-y-6" : ""
                                }`}
                            >
                                <div className="relative bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-200">
                                    <div className="w-full h-[280px] relative overflow-hidden">
                                        <img
                                            src={dev.img}
                                            alt={dev.name}
                                            className="w-full h-full object-cover rounded-t-2xl"
                                        />
                                        <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
                                            <p className="text-white font-semibold text-lg">
                                                👋 Hey there!
                                            </p>
                                        </div>
                                    </div>
                                    <div className="p-5 text-center">
                                        <p className="text-xl font-semibold text-gray-800">
                                            {dev.name}
                                        </p>
                                        <p className="text-sm text-blue-500 font-medium">
                                            {dev.role}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="w-full h-[350px] flex items-center justify-evenly bg-white shadow-md gap-11">
                    <div className="w-2/5 h-full flex flex-col justify-center px-10 gap-4">
                        <div className="flex flex-row items-center w-full">
                            <h1 className="text-2xl font-semibold">E D U</h1>
                            <img
                                src="logo/paul.png"
                                alt=""
                                className="h-12 w-14"
                            />
                        </div>
                        <p className="tracking-wide">
                            A collaborative learning platform designed for
                            seamless communication between instructors and
                            students. It provides tools for managing classes,
                            sharing, sharing materials, assigning coursework,
                            and conducting video-calls--all in one place. With
                            an intuitive interface, it enhances online learning
                            and engagement.
                        </p>
                    </div>
                    <div className="w-1/3 flex flex-col items-start justify-between gap-3">
                        <h1 className="text-xl font-semibold">Useful Link</h1>
                        <ul className="flex flex-col gap-3 text-gray-700 font-medium">
                            {["home", "features", "guide", "about"].map(
                                (section) => (
                                    <li key={section}>
                                        <a
                                            href={`#${section}`}
                                            onClick={(e) =>
                                                scrollToSection(
                                                    e,
                                                    `#${section}`
                                                )
                                            }
                                            className="hover:text-blue-500 transition"
                                        >
                                            {section.charAt(0).toUpperCase() +
                                                section.slice(1)}
                                        </a>
                                    </li>
                                )
                            )}
                        </ul>
                    </div>
                    <div className=" w-2/5 flex flex-col items-start justify-between gap-3 mb-16">
                        {" "}
                        <h1 className="text-xl font-semibold">Follow us</h1>
                        <ul className="flex flex-col gap-3  text-gray-700 font-medium">
                            <li>Facebook</li>
                            <li>Instragram</li>
                        </ul>
                    </div>
                </section>
            </div>
        </>
    );
}
