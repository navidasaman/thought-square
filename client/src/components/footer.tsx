'use client';

import { BsGithub } from "react-icons/bs";

export default function Footer() {
  const handleGithubLink = () => {
    window.open("https://github.com/navidasaman/thought-square", "_blank", "noopener noreferrer");
  };

  return (
    <div className="fixed bottom-0 left-0 w-full bg-gradient-to-br from-opacity-10 to-transparent backdrop-blur-md border border-opacity-20 shadow-lg p-4 text-center flex flex-col  h-fit-content justify-center items-center py-3 px-0" style={{ background: 'linear-gradient(135deg, rgba(51, 153, 255, 0.1), rgba(255,255,255,0))', WebkitBackdropFilter: 'blur(10px)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)', boxShadow: '0 8px 32px 0 rgba(0,0,0,0.37)' }}>
      <span onClick={handleGithubLink} className="cursor-pointer inline-flex ml-2" style={{ WebkitBoxReflect: 'below 0px linear-gradient(transparent 10%, rgba(255, 255, 255, 0.277)', color: '#e6e6e6', gap: '25px', marginBottom: '10px' }}>
        Made with NextJS, TypeScript & TailwindCSS
        <BsGithub />
      </span>
    </div>
  );
}