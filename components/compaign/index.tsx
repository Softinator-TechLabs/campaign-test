'use client';
import { useRouter } from 'next/navigation';

export const CompaignBtn = () => {
  const router = useRouter();
  return (
    <button
      onClick={() => router.push('/create-compaign')}
      className="flex items-center px-2 py-1 border border-gray-300 my-2 rounded text-gray-500 hover:text-gray-700 hover:border-gray-400"
    >
      <svg
        className="w-4 h-4 mr-1"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 4v16m8-8H4"
        ></path>
      </svg>
      Add Campaign
    </button>
  );
};
