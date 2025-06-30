"use client"
import { PartyStateContext, reducer, State } from "@/app/hooks/usePartyState";
import Lobby from "@/components/lobby";
import Party from "@/components/party";
import { LiveKitRoom } from "@livekit/components-react";
import { use, useReducer } from "react";

 

type PartyIdType = { party_id: string } 

type PartyPageProps = {
    params: Promise<PartyIdType>
}

const initialState: State = {
    token: undefined,
    serverUrl: "",
    shouldConnect: false,
    captionsEnabled: true,
    captionsLanguage: "en",
    isHost: false,
  };

export default function PartyPage({params}: PartyPageProps) {
    const [state, dispatch] = useReducer(reducer, initialState) 
    const {party_id} = use<PartyIdType>(params)

    return (
        <PartyStateContext.Provider value={{ state, dispatch}}>
        <LiveKitRoom
        token={state.token} 
        serverUrl={state.serverUrl} 
        connect={state.shouldConnect} 
        audio={state.isHost} 
        className="w-full h-full"
        >
            {state.shouldConnect ? <Party/> : <Lobby partyId={party_id}/>}
        </LiveKitRoom>
        </PartyStateContext.Provider>
    )

}