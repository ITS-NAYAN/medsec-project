import { useState } from "react";
import AIEligibilityAssistant from "./ai/AIEligibilityAssistant";
import chatbotImage from "../assets/chatbot.png";

export default function ChatbotWidget() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating Chat Button */}
<button
  onClick={() => setOpen(!open)}
  className="
    fixed
    -bottom-10
    -right-10
    w-80
    h-80
    z-50
    flex
    items-center
    justify-center
    hover:scale-105
    transition-all
    duration-300
  "
>
  <img
    src={chatbotImage}
    alt="Chatbot"
    className="
      w-full
      h-full
      object-contain
      scale-150
      drop-shadow-[0_0_18px_rgba(59,130,246,0.35)]
    "
  />
</button>

      {/* Chat Popup */}
      {open && (
        <div
          className="
            fixed
            bottom-24
            right-6
            w-[360px]
            max-w-[95vw]
            h-[460px]
            max-h-[80vh]
            bg-white
            rounded-2xl
            shadow-2xl
            overflow-hidden
            z-50
            border
            border-slate-200
            flex
            flex-col
          "
        >
          {/* AI Assistant */}
          <div className="h-full w-full overflow-hidden">
            <AIEligibilityAssistant
              onClose={() => setOpen(false)}
            />
          </div>
        </div>
      )}
    </>
  );
}