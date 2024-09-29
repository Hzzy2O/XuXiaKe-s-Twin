'use client'
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  const [text, setText] = useState('');
  const fullText = 'Xu Xiake (1587-1641), a traveler, geographer, and writer of the Ming Dynasty. He traveled across the vast lands of China, leaving behind numerous records of his geographical explorations. His masterpiece, "Xu Xiake\'s Travels," is hailed as "a monumental work in Chinese geography." Xu Xiake’s spirit of exploration and scientific approach has had a profound influence on future generations.';

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      setText(fullText.slice(0, index));
      index++;
      if (index > fullText.length) {
        clearInterval(timer);
      }
    }, 16);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
    <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
        <div className="min-w-md mx-auto">
            <div className="flex items-center space-x-5">
            <div className="block relative">
                <Image
                src="/intro.jpeg"
                alt="Portrait of Xu Xiake"
                priority
                width={100}
                height={100}
                className="rounded-md"
                />
            </div>
            <div className="block pl-2 font-semibold text-xl self-start text-gray-700">
                <h2 className="leading-relaxed">Xu Xiake</h2>
                <p className="text-sm text-gray-500 font-normal leading-relaxed">Ming Dynasty Traveler and Geographer</p>
            </div>
            </div>
            <div className="divide-y divide-gray-200">
            <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <p>{text}</p>
            </div>
            <div className="pt-6 text-base leading-6 font-bold sm:text-lg sm:leading-7">
                <Link href="/chat" className="text-cyan-600 hover:text-cyan-700">
                Start Chatting &rarr;
                </Link>
            </div>
            </div>
        </div>
        </div>
    </div>
    </div>
    );
}
