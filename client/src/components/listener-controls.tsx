import CaptionsToggle from "./controls/captions-toggle";
import LanguageSelect from "./controls/language-select";
import LeaveButton from "./controls/leave-button";

export default function ListenerControls() {
  return (
    <div className="flex items-center justify-center gap-4">
      <CaptionsToggle />
      <LanguageSelect />
      <LeaveButton />
    </div>
  );
}