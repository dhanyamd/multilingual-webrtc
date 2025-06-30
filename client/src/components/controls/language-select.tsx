import { usePartyState } from "../../app/hooks/usePartyState";
import { useRoomContext, useVoiceAssistant } from "@livekit/components-react";
import { useEffect, useState } from "react";
import { Select, SelectValue, SelectTrigger, SelectItem, SelectContent } from "../ui/select";


interface Language {
    code: string;
    name: string;
    flag: string;
}

const LanguageSelect = () => {
    const room = useRoomContext()
    const {agent} = useVoiceAssistant() 
    const {state, dispatch} = usePartyState() 
    const [languages, setLanguages] = useState<Language[]>([]) 

    const handleChange = async (value: string) => {
        dispatch({
            type: 'SET_CAPTIONS_ENABLED' as any,
            payload: value,
        });
        await room.localParticipant.setAttributes({
            captions_langauge: value,
        })
    }

    useEffect(() => {
        async function getLanguages() {
            try{
                const response = await room.localParticipant.performRpc({
                    destinationIdentity: "agent",
                    method: "get/languages",
                    payload: ""
                }); 
             const languages = JSON.parse(response) 
             setLanguages(languages)
            }catch(error) {
              console.log("RPC call failed", error) 
            }
        }
        if (agent) {
            getLanguages()
        }
    }, [room, agent])

    return (
        <div className="flex items-center">
          <Select
            value={state.captionsLanguage}
            onValueChange={handleChange}
            disabled={!state.captionsEnabled}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Captions language" />
            </SelectTrigger>
            <SelectContent>
              {languages.map((lang) => (
                <SelectItem key={lang.code} value={lang.code}>
                  {lang.flag} {lang.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      );
    };
    
    export default LanguageSelect;