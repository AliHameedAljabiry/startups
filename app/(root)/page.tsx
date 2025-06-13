import SearchForm from "../../components/SearchForm";
// import StartupCard from "../../components/StartupCard";
// import { STARTUPS_QUERY } from "../../sanity/lib/queries";
// import {StartupCardType} from "@/components/StartupCard";
import { SanityLive } from "@/sanity/lib/live";
// import { client } from "@/sanity/lib/client";
import AllStartups from "@/components/AllStartups";

const  Home = async ({searchParams}: { searchParams: Promise<{ query?: string }> }) => {

  const query = (await searchParams).query;
  // const params = { search: query || null };

  
  // Fetching posts from Sanity
  // const posts = await client.withConfig({ useCdn: false }).fetch(STARTUPS_QUERY, params);
  // console.log(JSON.stringify(posts, null, 2));

  

  return (
    <>
      <section className="pink_container ">
        <h1 className="heading">Pitch Your Startup, <br /> Connect with Entrepreneurs</h1>

        <p className="sub-heading">
          Submit Ideas, Vote on Pitches, and Get Noticed in Virtual Competitions.
        </p>

        <SearchForm query={query}/> 
      </section>

      <section className="section_container">
        <p className="text-30-semibold text-center">
          {query ? `Search results for "${query}"` : "All Startups"}
        </p>

        <AllStartups query={query} />
        
      </section>
      <SanityLive/>
    </>
  );
}

export default Home;
