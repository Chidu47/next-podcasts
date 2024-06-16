"use client";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import Image from "next/image";
import React from "react";
import PodcastDetailPlayer from "@/components/PodcastDetailPlayer";
import LoaderSpinner from "@/components/LoaderSpinner";
import { podcastData } from "@/constants";
import PodcastCard from "@/components/PodcastCard";
import EmptyState from "@/components/EmptyState";
import { useUser } from "@clerk/nextjs";

const PodcastDetails = ({
  params: { podcastId },
}: {
  params: { podcastId: Id<"podcasts"> };
}) => {
  const { user } = useUser();

  // const podcast = useQuery(api.podcast.getAllPodcastById, { podcastId });
  // const similarPodcasts = useQuery(api.podcast.getPodcastByVoiceType, {
  //   podcastId,
  // });

  const isOwner = user?.id ? true : false;
  // const isOwner = user?.id === podcast?.authorId;

  // if (!podcast || !similarPodcasts) {
  //   return <LoaderSpinner />;
  // }

  return (
    <section className="flex w-full flex-col">
      <div className="mt-9 flex items-center justify-between">
        <h1 className="text-20 font-bold text-white-1">Currently Playing</h1>
        <figure className="flex gap-3 items-center">
          <Image
            src={"/icons/headPhone.svg"}
            alt="headphone"
            width={24}
            height={24}
          />
          <h2 className="text-16 font-bold text-white-1">
            {/* {podcast.views } */}
            200 views
          </h2>
        </figure>
      </div>
      <PodcastDetailPlayer
        isOwner={isOwner}
        // podcastId={podcastId}
        //  podcastId={podcast?._id}
        // {...podcast}

        podcastTitle="Javascript Jungle Podcast"
        author="Jeo Rogan"
        authorImageUrl="https://lovely-flamingo-139.convex.cloud/api/storage/221ee4bd-435f-42c3-8e98-4a001e0d806e"
        authorId="asdasdfdsa"
        audioUrl={
          "https://traffic.megaphone.fm/GLT2855677705.mp3?updated=1718290553"
        }
        imageUrl="https://lovely-flamingo-139.convex.cloud/api/storage/221ee4bd-435f-42c3-8e98-4a001e0d806e"
        audioStorageId={"asdasdfdsa" as Id<"_storage">}
        imageStorageId={
          "221ee4bd-435f-42c3-8e98-4a001e0d806e" as Id<"_storage">
        }
        podcastId={"sdd" as Id<"podcasts">}
      />

      <p className="text-white-1 text-16 pb-8 pt-[45px] font-medium max-md:text-center">
        {/* {podcast?.podcastDescription} */}
        Welcome to the &quot;Javascript Jungle Podcast&quot;! Join us as we
        navigate through the dense and ever-evolving world of JavaScript.
        Whether you&lsquo;re a seasoned developer or just starting your journey,
        our podcast has something for everyone.
      </p>

      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <h1 className="text-18 font-bold text-white-1">Transcription</h1>
          <p className="text-16 font-medium text-white-2 gap-2">
            {/* {podcast?.voicePrompt} */}
            Introduction: Welcome to JavaScript Jungle, your go-to podcast for
            all things JavaScript! In today&apos;s episode, we&apos;re diving
            deep into the fascinating world of JavaScript and exploring some of
            the most interesting aspects of this powerful programming language.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <h1 className="text-18 font-bold text-white-1">Thumbnail Prompt</h1>
          <p className="text-16 font-medium text-white-2 gap-2">
            {/* {podcast?.imagePrompt} */}
            Welcome to JavaScript Jungle, your go-to podcast for all things
            JavaScript! In today&apos;s episode, we&apos;re diving deep into the
            fascinating world of JavaScript and exploring some of the most
            interesting aspects of this powerful programming language.
          </p>
        </div>
      </div>
      <section className="mt-8 flex flex-col gap-5">
        <h1 className="text-20 font-bold text-white-1">Similar Podcast</h1>

        {false ? (
          <div className="podcast_grid">
            {podcastData.map(({ id, imgURL, title, description }, index) => {
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
          <EmptyState
            title="No similar podcast found"
            buttonLink="/discover"
            buttonText="Discover More Podcasts"
          />
        )}
      </section>
    </section>
  );
};

export default PodcastDetails;
