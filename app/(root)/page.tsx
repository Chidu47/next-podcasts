"use client";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import React from "react";

import PodcastCard from "@/components/PodcastCard";

const Home = () => {
  const trendingPodcasts = useQuery(api.podcast.getAllPodcasts);
  console.log(trendingPodcasts);
  return (
    <div className="mt-9 flex flex-col gap-9">
      <section className="flex flex-col gap-5">
        <h1 className="text-20 font-bold text-white-1">Trending Podcasts</h1>
        <div className="podcast_grid">
          {trendingPodcasts?.map(
            ({ _id, imageUrl, podcastTitle, podcastDescription }, index) => {
              return (
                <PodcastCard
                  key={index}
                  imgURL={imageUrl!}
                  title={podcastTitle}
                  description={podcastDescription}
                  podcastId={_id}
                />
              );
            }
          )}
          {trendingPodcasts?.length === 0 && (
            <h1 className="text-20 font-bold text-white-1">No Podcasts</h1>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
