import Link from 'next/link';

export default function About() {
  return (
    <main>
      <div className="overflow-hidden	w-screen h-screen m-auto bg-gradient-to-br from-opacity-10 to-transparent backdrop-blur-md border border-opacity-20 shadow-lg p-4 text-center" style={{ background: 'linear-gradient(135deg, rgba(51, 153, 255, 0.1), rgba(255,255,255,0))', WebkitBackdropFilter: 'blur(10px)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)', boxShadow: '0 8px 32px 0 rgba(0,0,0,0.37)' }}>
        <h1 className="rock3D mt-10 text-center text-4xl mb-5">About</h1>
        <div className="flex justify-center items-center hover:text-blue-600 transition duration-500 ease-in-out transform hover:scale-110">
          <div className="w-fit">
            <p className="italic">Release that thought.</p>
            <p className="italic">Give out that advice.</p>
            <p className="italic">Share your story.</p>
          </div>
          <div className="h-20 border-l border-gray-300 m-5"></div>
          <div className="w-fit text-8xl">♡</div>
        </div>
        <Link href="/" className='cursor-pointer text-5xl mt-10 text-blue-600'>🡠</Link>
      </div>
    </main>
  )
}