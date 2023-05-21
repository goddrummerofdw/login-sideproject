'use client';

import { useEffect } from 'react';
export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);
  console.log(error.message)
  return (
    <section className="flex items-center h-screen p-16 dark:dark:bg-black dark:dark:text-gray-100">
      <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
        <div className="max-w-md text-center">
          <h2 className="mb-8 font-extrabold text-9xl dark:dark:text-gray-600">
            {error.name}
          </h2>
          <p className="text-2xl font-semibold md:text-3xl">{error.message}.</p>
          <p className="mt-4 mb-8 dark:dark:text-gray-400">Click on the "Retry" button below or just go back to the Homepage.</p>
          <button rel="noopener noreferrer" className="px-8 py-3 font-semibold rounded dark:dark:bg-rose-400 dark:dark:text-gray-900 mr-4" onClick={() => reset()}>Retry</button>
          <button rel="noopener noreferrer" className="px-8 py-3 mt-4 font-semibold rounded dark:dark:bg-rose-400 dark:dark:text-gray-900"><a href='http://localhost:3000'>Back To Homepage</a></button>
        </div>
      </div>
    </section>
  );
}