import React from 'react'
import {formatDate} from '../lib/utils'
import Link from 'next/link'
import { EyeIcon } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Startup } from '@/sanity/types';
import { Author } from '@/sanity/types';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

export type StartupCardType = Omit<Startup, "author"> & {author?: Author };


const StartupCard = ({post}: {post: StartupCardType}) => {

  
  return (
    <li className="startup-card group shadow-[#EE2B69] hover:border-[#EE2B69] transition-all duration-500 hover:shadow-pink-300 hover:bg-pink-100">
      <div className='flex-between'>
        <p className='strartup_card_date'>
          {post._createdAt ? formatDate(post._createdAt) : 'Unknown Date'}
        </p>

        <div className='flex gap-1.5'>
          <EyeIcon className='size-6 text-pink-400' />
          <span className='font-bold'>{post.views}</span>
        </div>
      </div>
      <div className='flex-between mt-5 gap-5'>
        <div className='flex-1'>
          {post.author ? (
            <Link href={`/user/${post.author?._id}`} >
              <p className='text-16-medium line-clamp-1'>{post.author?.name}</p>
            </Link>
          ) : (
            <p className='text-16-medium line-clamp-1 text-gray-400'>Unknown Author</p>
          )}
          <Link href={`/startup/${post._id}`} >
            <h3 className='text-26-semibold line-clamp-1'>{post.title}</h3>
          </Link>
        </div>
        <Link href={`/startup/${post.author?._id}`} >
          <Image src={post.author?.image ?? "https://placehold.co/48x48"} alt={post.author?.name ?? "Author"} className='object-cover rounded-full' width={48} height={48} />
        </Link>
      </div>

      <Link href={`/startup/${post._id}`}>
        <p className='startup-card_desc'>
          {post.description}
        </p>

        <Image src={post.image ?? "https://placehold.co/400x400"} alt="startup" className='startup-card_img' width={400} height={400} />
      </Link>

      <div className='flex-between gap-3 mt-5'>
        <Link href={`/?query=${post.category?.toLowerCase() ?? ''}`} className=''>
          <p className='text-16-medium'>{post.category ?? 'Unknown Category'}</p>
        </Link>
        <Button className='startup-card_btn' asChild>
          <Link href={`/startup/${post._id}`} className='text-white'>
            Details
          </Link>
        </Button>
      </div>
      
    </li>
  )
}


export const StartupCardSkeleton = () => (
  <>
    {[0, 1, 2, 3, 4].map((index: number) => (
      <li key={cn("skeleton", index)}>
        <Skeleton className="startup-card_skeleton" />
      </li>
    ))}
  </>
);

export default StartupCard