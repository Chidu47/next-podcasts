"use client";
import EmptyState from "@/components/EmptyState";
import LoaderSpinner from "@/components/LoaderSpinner";
import PodcastCard from "@/components/PodcastCard";
import SearchBar from "@/components/SearchBar";
import { podcastData as data } from "@/constants";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

import { useQuery } from "convex/react";
import React from "react";

const Discover = ({
  searchParams: { search },
}: {
  searchParams: { search: string };
}) => {
  const podcastsData = useQuery(api.podcast.getPodcastBySearch, {
    search: search || "",
  });

  return (
    <div className="flex flex-col gap-9">
      <SearchBar />
      <div className="flex flex-col gap-9">
        <h1 className="text-20 font-bold text-white-1">
          {!search ? "Discover Trending Podcasts" : "Search results for "}
          {search && <span className="text-white-2">{search}</span>}
        </h1>
        {podcastsData ? (
          <>
            {podcastsData.length === 0 ? (
              <div className="podcast_grid">
                {podcastsData?.map(
                  (
                    { _id, imageUrl, podcastTitle, podcastDescription },
                    index
                  ) => {
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

                {data.map(({ id, imgURL, title, description }, index) => {
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
            ) : (
              <EmptyState title="no results found" />
            )}
          </>
        ) : (
          <LoaderSpinner />
        )}
      </div>
    </div>
  );
};

export default Discover;
