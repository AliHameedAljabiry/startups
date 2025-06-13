'use client';

import React, { useEffect, useState } from 'react';
import StartupCard from './StartupCard';
import { Button } from '@/components/ui/button';
import { StartupCardType } from './StartupCard';

type Playlist = {
  _id: string;
  slug: { current: string };
  title: string;
  select: StartupCardType[];
};

type AllStartupsProps = {
  query?: string;
};

const AllStartups = ({ query }: AllStartupsProps) => {
  const [selectedSlug, setSelectedSlug] = useState('all-startups');
  const [playlists, setPlaylists] = useState<Playlist[]>([]);

  useEffect(() => {
    const fetchPlaylists = async () => {
      const res = await fetch('/api/playlists');
      const data = await res.json();
      setPlaylists(data.playlists || []);
    };
    fetchPlaylists();
  }, []);

  const allStartups = playlists.flatMap(pl => pl.select);
  const filteredStartups =
    selectedSlug === 'all-startups'
      ? allStartups
      : playlists.find(pl => pl.slug.current === selectedSlug)?.select || [];

  // Apply search filter
  const searchFilteredStartups = filteredStartups.filter(startup =>
    !query ||
    startup.title?.toLowerCase().includes(query.toLowerCase()) ||
    startup.category?.toLowerCase().includes(query.toLowerCase()) ||
    startup.author?.name?.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-2">
        <Button
          className={selectedSlug === 'all-startups' ? 'active_filter' : 'hover:bg-black hover:text-white'}
          onClick={() => setSelectedSlug('all-startups')}
        >
          All Startups
        </Button>
        {playlists.map(pl => (
          <Button
            key={pl._id}
            className={selectedSlug === pl.slug.current ? 'active_filter' : 'hover:bg-black hover:text-white'}
            onClick={() => setSelectedSlug(pl.slug.current)}
          >
            {pl.title}
          </Button>
        ))}
      </div>
      <ul className="mt-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {searchFilteredStartups.length > 0 ? (
          searchFilteredStartups.map((startup: StartupCardType) => (
            <StartupCard key={startup._id} post={startup} />
          ))
        ) : (
          <li className="no-results">No Startups Found</li>
        )}
      </ul>
    </div>
  );
};

export default AllStartups;