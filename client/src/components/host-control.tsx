"use client";

import MicToggle from "./controls/mic-toggle";
import LeaveButton from "./controls/leave-button";
import CaptionsToggle from "./controls/captions-toggle";
import LanguageSelect from "./controls/language-select";
import DeviceSelector from "./controls/device-selector";

export default function HostControls() {
  return (
    <div className="flex items-center justify-center gap-4">
      <DeviceSelector />
      <MicToggle />
      <CaptionsToggle />
      <LanguageSelect />
      <LeaveButton />
    </div>
  );
}