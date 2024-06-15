import { GeneratePodcastProps } from "@/types";
import React, { useState } from "react";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Loader } from "lucide-react";
import { Button } from "./ui/button";
import { v4 as uuidv4 } from "uuid";
import { useAction, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

import { useUploadFiles } from "@xixixao/uploadstuff/react";
import { useToast } from "@/components/ui/use-toast";

const useGeneratePodcast = ({
  setAudio,
  voiceType,
  voicePrompt,
  setAudioStorageId,
}: GeneratePodcastProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  //login for podcast generation

  const { toast } = useToast();

  const generateAudio = useAction(api.openai.generateAudioAction);
  const getAudioUrl = useMutation(api.podcast.getUrl);

  const generateUploadUrl = useMutation(api.files.generateUploadUrl);

  const { startUpload } = useUploadFiles(generateUploadUrl);

  const generatePodcast = async () => {
    setIsGenerating(true);
    setAudio("");

    if (!voicePrompt) {
      toast({
        title: "Please provide a voiceType to generate a Podcast",
      });
      return setIsGenerating(false);
    }

    try {
      const response = await generateAudio({
        voice: voiceType!,
        input: voicePrompt,
      });

      const blob = new Blob([response], { type: "audio/mpeg" });
      const fileName = `podcast-${uuidv4()}.mp3`;

      const file = new File([blob], fileName, { type: "audio/mpeg" });

      const uploaded = await startUpload([file]);
      const storageId = (uploaded[0].response as any).storageId;

      setAudioStorageId(storageId);
      const audioUrl = await getAudioUrl({
        storageId,
      });

      setAudio(audioUrl!);
      setIsGenerating(false);
      toast({
        title: "Please provide a voiceType to generate a Podcast",
      });
      toast({
        title: "Podcast generated successfully",
      });
      //todo show success message
    } catch (error) {
      toast({
        title: "Error creating a Podcast",
        variant: "destructive",
      });
      console.log("there is an error generating podcast", error);
      setIsGenerating(false);
    }
  };

  return {
    isGenerating,
    generatePodcast,
  };
};

const GeneratePodcast = (props: GeneratePodcastProps) => {
  const { isGenerating, generatePodcast } = useGeneratePodcast(props);

  return (
    <div>
      <div className="flex flex-col gap-2.5 ">
        <Label className="text-16 font-bold text-white-1">
          AI Prompt to Generate Podcast
        </Label>
        <Textarea
          className="input-class font-light focus-visible:ring-offset-orange-1"
          placeholder="Provide text to generate audio"
          rows={5}
          value={props.voicePrompt}
          onChange={(e) => props.setVoicePrompt(e.target.value)}
        />
      </div>
      <div className="w-full mt-5 max-w-[200px]">
        <Button
          type="submit"
          onClick={generatePodcast}
          className="text-16 bg-orange-1 py-4 font-bold  text-white-1"
          disabled={isGenerating}
        >
          {isGenerating ? (
            <>
              <Loader size={20} className="animate-spin mr-2" /> Submitting...
            </>
          ) : (
            "Generate"
          )}
        </Button>
      </div>
      {props.audio && (
        <audio
          controls
          src={props.audio}
          autoPlay
          className="mt5"
          onLoadedMetadata={(e) => {
            props.setAudioDuration(e.currentTarget.duration);
          }}
        />
      )}
    </div>
  );
};

export default GeneratePodcast;
