import { useRoomContext } from "@livekit/components-react";
import { Button } from "../ui/button";
import { Mic, MicOff } from "lucide-react";

export default function MicToggle() {
  const room = useRoomContext();

  return (
    <Button
      variant="outline"
      onClick={(e) => {
        room.localParticipant.setMicrophoneEnabled(
          !room.localParticipant.isMicrophoneEnabled
        );
      }}
    >
      {room.localParticipant.isMicrophoneEnabled ? (
        <Mic style={{ width: "16px", height: "16px" }} />
      ) : (
        <MicOff style={{ width: "16px", height: "16px" }} />
      )}
    </Button>
  );
}