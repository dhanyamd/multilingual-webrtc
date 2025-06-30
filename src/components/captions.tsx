import { usePartyState } from "@/app/hooks/usePartyState";
import { useRoomContext } from "@livekit/components-react";
import { Participant, RoomEvent, TrackPublication, TranscriptionSegment } from "livekit-client";
import { useEffect, useState } from "react";

export default function Captions(){
    const room = useRoomContext() 
    const {state} = usePartyState() 
    const [transcriptions, setTranscriptions] = useState<{
        [language: string]: {
          [id: string]: TranscriptionSegment;
        };
      }>({});

    useEffect(() => {
        const updateTranscriptions = (
            segments: TranscriptionSegment[],
            participant?: Participant,
            publication?: TrackPublication
        ) => {
            setTranscriptions((prev) => {
                const newTranscriptions = {...prev} 
                for (const segment of segments) {
                    let {language, id} = segment

                    if (language === ""){
                        language = "en"
                    }

                    if (!newTranscriptions[language]) {
                        newTranscriptions[language] = {};
                      }
            
                      // Update or add the transcription segment in the correct group
                      newTranscriptions[language][id] = segment;
                    }
            
                    return newTranscriptions;
                })
            }
            room.on(RoomEvent.TranscriptionReceived, updateTranscriptions);
    return () => {
      room.off(RoomEvent.TranscriptionReceived, updateTranscriptions);
    };
  }, [room]);   
                
  return (
    <ul
      className={`text-center${
        state.captionsEnabled ? " visible" : " invisible"
      }`}
    >
      {/* Safely access the transcriptions for the selected captionsLanguage */}
      {Object.values(transcriptions[state.captionsLanguage] || {})
        .sort((a, b) => a.firstReceivedTime - b.firstReceivedTime)
        .slice(-2)
        .map((segment, i, arr) => (
          <li
            key={segment.id}
            className={i === 0 && arr.length > 1 ? "opacity-50" : "opacity-100"}
          >
            {segment.text}
          </li>
        ))}
    </ul>
  );
}