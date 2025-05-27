import StartupCard, { StartupTypeCard } from "@/components/StartupCard";
import SearchForm from "../../components/SearchForm";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
// import { auth } from "@/auth";

interface HomeProps {
  searchParams: Promise<{ query?: string }>;
}

export default async function Home ({
  searchParams,
}: HomeProps ) {
  const query = (await searchParams).query;
  const params = {search: query || null};
  
  // const session = await auth();
  const {data: posts} = await sanityFetch({query: STARTUPS_QUERY, params});
  
  
  // const posts = await client.fetch(STARTUPS_QUERY);
  // console.log(JSON.stringify(posts, null, 2))
  // const posts = [
  //   {
  //     _createdAt: new Date(),
  //     views: 55,
  //     author: { _id: 1, name: "Adrian" },
  //     _id: 1,
  //     description: "This is description.",
  //     image:
  //       "https://img.jagranjosh.com/images/2022/August/1082022/what-is-a-start-up-types-funding-compressed.webp",
  //     category: 'Robots',
  //     title: 'We Robots',
  //   },
  // ];

  return (
    <>
      <section className="pink_container">
        <h1 className="heading bg-primary-100">
          Pitch Your Startup, connect with entrepreneurs
        </h1>
        <p className="sub-heading !max-w-3xl">
          Submit Ideas, Vote on Pitches, and Get Noticed in Virtual Competitions
        </p>

        <SearchForm query={query} />
      </section>

      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Search results for ${query}` : "All Startups"}
        </p>

        <ul className="mt-7 card_grid">
          {posts?.length > 0 ? (
            posts.map((post: StartupTypeCard) => {
              return (
                <StartupCard key={post._id} post={post}/>
              )
            })
          ) : (
            <p className="no-results"> No startups found</p>
          )}
        </ul>
      </section>

      <SanityLive />
    </>
  );
}
