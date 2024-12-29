import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

function Hero() {
  return (
    <div className='bg-green-700 px-28 lg:px-36'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-10 pt-20'>
        <div>
          <h2 className='font-extrabold text-5xl text-white'>
            Speed Up your Creative Workflow
          </h2>
          <p className='text-gray-200 mt-5'>
            Join a growing family of 45,000 designers, creators, and makers from around the world.
          </p>
          <div className='flex gap-5 mt-8'>
            <Link href={'/explore'}>
            <Button >Explore</Button>
            </Link>
            <Link href={'/dashboard'}>
            <Button className="bg-red-500">Sell</Button>
            </Link>
          </div>
        </div>
        <div className='flex justify-center items-center'>
          <Image
            src="/pc.png"
            alt="A computer setup illustrating a creative workflow"
            width={300}
            height={300} // Adjust width and height based on the aspect ratio
            className='scale-x-[-1]'
          />
        </div>
      </div>
    </div>
  );
}

export default Hero;
