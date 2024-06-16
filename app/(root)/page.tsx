"use client";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import React from "react";

import PodcastCard from "@/components/PodcastCard";
import { podcastData } from "@/constants";
import { Id } from "@/convex/_generated/dataModel";

const Home = () => {
  const trendingPodcasts = useQuery(api.podcast.getAllPodcasts);
  console.log(trendingPodcasts);
  return (
    <div className="mt-9 flex flex-col gap-9 md:overflow-hidden ">
      <section className="flex flex-col gap-5">
        <h1 className="text-20 font-bold text-white-1">Trending Podcasts</h1>
        <div className="podcast_grid">
          {trendingPodcasts?.map(
            ({ _id, imageUrl, podcastTitle, podcastDescription }, index) => {
              return (
                <PodcastCard
                  key={index}
                  imgUrl={imageUrl!}
                  title={podcastTitle}
                  description={podcastDescription}
                  podCastId={_id}
                />
              );
            }
          )}

          {trendingPodcasts?.length === 0 &&
            podcastData.map(({ id, imgURL, title, description }, index) => {
              return (
                <PodcastCard
                  key={index}
                  imgUrl={imgURL!}
                  title={title}
                  description={description}
                  podCastId={id.toString() as Id<"podcasts">}
                />
              );
            })}
        </div>
      </section>
    </div>
  );
};

export default Home;
