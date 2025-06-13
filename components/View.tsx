

"use client";
import { useEffect, useState } from "react";
import Ping from "@/components/Ping";

const View = ({ id }: { id: string }) => {
  const [views, setViews] = useState<number | null>(null);

  useEffect(() => {
    // Function to fetch views without incrementing
    const fetchViews = () => {
      fetch(`/api/views/${id}`, { method: "GET" })
        .then(res => res.json())
        .then(data => setViews(data.views));
    };

    // Increment views on mount
    fetch(`/api/views/${id}`, { method: "POST" })
      .then(res => res.json())
      .then(data => setViews(data.views));

    // Poll every 5 seconds
    const interval = setInterval(fetchViews, 5000);

    return () => clearInterval(interval);
  }, [id]);

  return (
    <div className="view-container font-[family-name:var(--font-work-sans)]">
      <div className="absolute -top-2 -right-2">
        <Ping />
      </div>
      <p className="view-text bg-[#e4bac0]">
        <span className="font-black">
          Views: {views !== null ? views : "Loading..."}
        </span>
      </p>
    </div>
  );
};

export default View;




// import React from 'react'
// import Ping from './Ping'
// import { sanityFetch } from '@/sanity/lib/live';
// import { STARTUP_VIEWS_QUERY } from '@/sanity/lib/queries';
// // import { writeClient } from '@/sanity/lib/write-client';


// const View = async ({params}: {params: Promise<{ id: string }> }) => {

//     const id  = (await params).id;
    
//     const { data: post } = await sanityFetch({query: STARTUP_VIEWS_QUERY, params: {id}});

    
//   return (
//     <div className='view-container font-[family-name:var(--font-work-sans)]'>
//       <div className='absolute -top-2 -right-2'>
//         <Ping />
//       </div>

//       <p className='view-text  bg-[#e4bac0]'>
//         <span className='font-black'>{post.views} {post.views >= 2 ? 'Views' : 'View'}</span> 
//       </p>
//     </div>

    
//   )
// }

// export default View






// import Ping from "@/components/Ping";
// import { client } from "@/sanity/lib/client";
// import { STARTUP_VIEWS_QUERY } from "@/sanity/lib/queries";
// import { writeClient } from "@/sanity/lib/write-client";
// import {  after } from "next/server";
// import { SanityLive } from "@/sanity/lib/live";

// const View = async ({ id }: { id: string }) => {
//   const { views: totalViews } = await client
//     .withConfig({ useCdn: false })
//     .fetch(STARTUP_VIEWS_QUERY, { id });

//   after(
//     async () =>
//       await writeClient
//         .patch(id)
//         .set({ views: totalViews + 1 })
//         .commit(),
//   );

//   return (
//     <>
//       <div className="view-container font-[family-name:var(--font-work-sans)]">
//         <div className="absolute -top-2 -right-2">
//           <Ping />
//         </div>

//         <p className="view-text bg-[#e4bac0]">
//           <span className="font-black">Views: {totalViews}</span>
//         </p>
//       </div>
      
//     </>
//   );
// };
// export default View;

