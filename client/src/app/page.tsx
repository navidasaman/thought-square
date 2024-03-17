import Footer from '../components/footer';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between p-34">
      <div className="mt-12 dark:drop-shadow-[0_0_0.3rem_#00000] dark:invert relative flex items-center before:absolute before:h-[300px] before:w-full sm:before:w-[480px] before:-translate-x-3/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[100px] after:w-full sm:after:w-[240px] after:translate-x-3/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[160px] z-[-1]">
        <h1 className="rock3D mt-10 text-center text-4xl">Thought Square</h1>
      </div>
      <Footer/>
    </main>
  );
}
