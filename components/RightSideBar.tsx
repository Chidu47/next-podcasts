"use client";
import { SignedIn, UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Header from "./Header";
import Carousel from "./Carousel";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { profileSlides } from "@/constants";
import { useRouter } from "next/navigation";
import LoaderSpinner from "./LoaderSpinner";
import { useAudio } from "@/providers/AudioProvider";
import { cn } from "@/lib/utils";

const RightSideBar = () => {
  const { user } = useUser();
  const router = useRouter();
  const topPodcasters = useQuery(api.users.getTopUserByPodcastCount);

  // if (!topPodcasters) return <LoaderSpinner />;

  const { audio } = useAudio();

  return (
    <section
      className={cn("right_sidebar h-[calc(100vh-5px)] text-white-1", {
        "h-[calc(100vh-140px)]": audio?.audioUrl,
      })}
    >
      <SignedIn>
        <Link href={`/profile/${user?.id}`} className="flex gap-3 pb-12">
          <UserButton />
          <div className="flex w-full items-center justify-between">
            <h1 className="text-16 font-semibold truncate text-white-1">
              {user?.fullName}
            </h1>
            <Image
              src={"/icons/right-arrow.svg"}
              alt="right arrow"
              width={24}
              height={24}
            />
          </div>
        </Link>
      </SignedIn>
      <section className="flex flex-col gap-8 ">
        <Header headerTitle="Fans Like you" />
        <Carousel fansLikeDetail={topPodcasters!} />
      </section>
      <section className="flex flex-col gap-8 pt-12">
        <Header headerTitle="Top Podcasts" />
        <div className="flex flex-col gap-6">
          {profileSlides?.map((item) => (
            <div
              key={item.id}
              className="flex cursor-pointer justify-between"
              onClick={() => router.push(`/podcasts/${item.id}`)}
            >
              <figure className="flex gap-2 items-center">
                <Image
                  src={item.imgURL}
                  alt={item.title}
                  width={44}
                  height={44}
                  className="aspect-square rounded-lg"
                />
                <h2 className="text-14 font-semibold truncate text-white-1">
                  {item.title}
                </h2>
              </figure>
              <div className="flex items-center">
                <p className="text-12 font-normal">{item.id * 2} Podcasts</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </section>
  );
};

export default RightSideBar;
