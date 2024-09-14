"use client";
import { WavyBackground } from "./ui/wavy-background";
import { AnimatedTooltip } from "./ui/animated-tooltip";

const winners = [
  {
    id: 1,
    name: "Arun Rathore",
    designation: "Frontend Developer",
    image: "/arun.jpeg",
  },
  {
    id: 2,
    name: "Karan Manglani",
    designation: "Backend Developer",
    image: "/karan.jpeg",
  },
  {
    id: 3,
    name: "Shaurya Bansal",
    designation: "Full Stack Developer",
    image: "/shaurya.jpeg",
  },
];

function Winners() {
  return (
    <div className="relative h-[40rem] overflow-hidden flex items-center justify-center">
      <WavyBackground className="w-full max-w-7xl mx-auto flex flex-col items-center justify-center h-full">
        <h2 className="text-2xl md:text-4xl lg:text-7xl text-white font-bold text-center mb-8">
          3X Hackathon Winners
        </h2>
        <p className="text-base md:text-lg text-white text-center mb-4">
          &quot;Success is not the key to happiness. Happiness is the key to
          success. If you love what you are doing, you will be successful.&quot;
        </p>
        <div className="flex flex-row items-center justify-center mt-10 mb-10 w-full">
          <AnimatedTooltip items={winners} />
        </div>
      </WavyBackground>
    </div>
  );
}

export default Winners;
