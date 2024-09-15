'use client'
import { useState, useEffect } from "react";
import Link from "next/link";
import { FaDiscord, FaFacebook, FaTwitter, FaInstagram, FaSignOutAlt } from "react-icons/fa";
import { BackgroundBeams } from "./ui/background-beams";
import { FaArrowRight } from "react-icons/fa";
import Image from "next/image";
import { useCookies } from "react-cookie";

const socialMediaLinks = [
  { href: "https://www.facebook.com", icon: <FaFacebook size={24} /> },
  { href: "https://www.twitter.com", icon: <FaTwitter size={24} /> },
  { href: "https://www.instagram.com", icon: <FaInstagram size={24} /> },
  { href: "https://www.discord.com", icon: <FaDiscord size={24} /> },
];

const mainButtons = [
  { href: "/form", text: "Player Evaluation", icon: <FaArrowRight size={16} /> },
  { href: "/form", text: "Score Prediction", icon: <FaArrowRight size={16} /> },
];

function HeroSection() {
  const [cookies, setCookie, removeCookie] = useCookies(["authToken"]);
  const [authToken, setAuthToken] = useState(null);

  useEffect(() => {
    // This code runs only on the client
    setAuthToken(cookies.authToken || null);
  }, [cookies.authToken]);

  const handleLogout = () => {
    // Clear the token from cookies and update the state
    removeCookie("authToken");
    setAuthToken(null);
  };

  // Conditional buttons based on authToken
  const ghostButtons = authToken
    ? [] // No buttons if the user is logged in
    : [
        { href: "/login", text: "Login" },
        { href: "/signup", text: "Sign Up" },
      ];

  return (
    <div className="h-auto md:h-[50rem] w-full rounded-md flex flex-col items-center justify-center relative overflow-hidden mx-auto py-10 md:py-0">
      <BackgroundBeams className="absolute top-0 left-0 w-full h-full z-0" />
      <div className="absolute top-11 left-10 z-20">
        <Link href="/">
          <Image src="/logo.png" alt="Left Image" width={60} height={60} />
        </Link>
      </div>
      <div className="absolute bottom-10 left-12 z-20 flex flex-col space-y-4">
        <div
          style={{
            borderTop: "40px solid grey",
            width: "5px",
            height: "40px",
            marginLeft: "8px",
          }}
        />
        {socialMediaLinks.map((link, index) => (
          <Link key={index} href={link.href} target="_blank">
            <div className="text-neutral-300 hover:text-white">{link.icon}</div>
          </Link>
        ))}
      </div>
      <div className="absolute top-12 right-12 z-20 flex space-x-4">
        {authToken ? (
          <button
            onClick={handleLogout}
            className="inline-flex h-10 items-center justify-center rounded-md border border-neutral-300 bg-transparent text-neutral-300 hover:bg-neutral-800 hover:text-white transition-colors px-4 font-medium focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
          >
            Logout <FaSignOutAlt className="ml-2" />
          </button>
        ) : (
          ghostButtons.map((button, index) => (
            <Link key={index} href={button.href}>
              <button className="inline-flex h-10 items-center justify-center rounded-md border border-neutral-300 bg-transparent text-neutral-300 hover:bg-neutral-800 hover:text-white transition-colors px-4 font-medium focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                {button.text}
              </button>
            </Link>
          ))
        )}
      </div>
      <div className="p-4 relative z-10 w-full text-center">
        <h1 className="mt-60 mb-5 md:mt-60 text-2xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
          Welcome to
        </h1>
        <h1 className="mt-20 md:mt-0 text-6xl md:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
          Socculator 1.0
        </h1>
        <h1 className="mt-20 font-normal text-base md:text-lg text-neutral-300 max-w-lg mx-auto">
          Predict. Improve. Play.
        </h1>
        <h1 className="mt-4 font-normal text-base md:text-2xl text-neutral-300 mx-auto">
          <b> Advanced AI Model,</b> for Player&apos;s Evaluation
        </h1>
        <div className="mb-4 mt-14 p-4 align-middle">
          {mainButtons.map((button, index) => (
            <Link key={index} className="m-4" href={button.href}>
              <button className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                <span>{button.text}</span>
                <span className="ml-2">{button.icon}</span>
              </button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
