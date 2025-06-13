import { STARTUP_BY_ID_QUERY } from '@/sanity/lib/queries';
import { notFound } from 'next/navigation';
import React from 'react'
 import { Suspense } from "react";
import { client } from '@/sanity/lib/client';
import { formatDate } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import markdownit from 'markdown-it'
import { Skeleton } from '@/components/ui/skeleton';
import View from '@/components/View';
import { PLAYLIST_BY_SLUG_QUERY } from '@/sanity/lib/queries';
import StartupCard, { StartupCardType } from '@/components/StartupCard';

const md = markdownit()

const  StartupCardDetails = async ({params}: {params: Promise<{ id: string }> }) => {
    const id  = (await params).id;

    // Sequential data fetching
    // const post = await client.fetch(STARTUP_BY_ID_QUERY, { id });
    // const {select: playlistOne } = await client.fetch(PLAYLIST_BY_SLUG_QUERY, {slug: 'startups-playlist-1'});

    // Parallel data fetching
    const [post, {select: playlistOne}] = await Promise.all([
        client.fetch(STARTUP_BY_ID_QUERY, { id }),
        client.fetch(PLAYLIST_BY_SLUG_QUERY, {slug: 'startups-playlist-1'})
    ]);
    if (!post) return notFound();

    const parsedContent = md.render(post?.pitch || '')


   
  return (
    <>
    <section className='pink_container !min-h-[230px] font-[family-name:var(--font-work-sans)]'>
      <p className='tag tag-tri bg-amber-300'>{formatDate(post?._createdAt)}</p>
      <h1 className='heading'>{post.title}</h1>
      <p className='sub-heading !max-w-5xl '>{post.description}</p>
    </section>

    <section className='section_container'>
        <Image src={post.image} alt="startup" className='w-full h-auto rounded-xl' width={400} height={400}/>
        <div className='space-y-5 mt-10 max-w-4xl mx-auto'>

            <div className=' flex-between gap-5'>
                
                <Link href={`user/${post.author?._id}`} className='flex gap-2 items-center mb-3'>
                    <Image src={post.author.image} alt='user' width={64} height={64} className='rounded-full drop-shadow-lg'/>
                    <div>
                        <p className='text-20-medium'>{post.author.name}</p>
                        <p className='text-16-medium !text-[#5c5b5b]'>@{post.author.username}</p>    
                    </div>
                </Link>
               
                <p className='category-tag bg-red-100'> {post.category}</p>
            </div>

            <h3 className='text-30-bold'>Pitch Details</h3>
            {parsedContent ? (
                <article className='prose-custom font-[family-name:var(--font-work-sans)] max-w-4xl break-all' dangerouslySetInnerHTML={{__html: parsedContent}} />
            ) : (
                <p className='no-results'>No pitch details provided.</p>
            )}
        </div>

        <hr className='divider'/>

        {playlistOne?.length > 0 && (
          <div className="max-w-4xl mx-auto">
            <p className="text-30-semibold">Editor Picks</p>

            <ul className="mt-7 card_grid-sm">
              {playlistOne.map((post: StartupCardType, i: number) => (
                <StartupCard key={i} post={post} />
              ))}
            </ul>
          </div>
        )}
    </section>

        <Suspense fallback={<Skeleton className="view_skeleton" />}>
          <View id={id} />
        </Suspense>
    
    </>
  )
}

export default StartupCardDetails

