import { useState } from "react";
import AIEligibilityAssistant from "./ai/AIEligibilityAssistant";

export default function ChatbotWidget() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setOpen(!open)}
        className="
          fixed
          bottom-6
          right-6
          bg-blue-600
          hover:bg-blue-700
          text-white
          w-14
          h-14
          rounded-full
          shadow-lg
          text-2xl
          z-50
          flex
          items-center
          justify-center
          transition
        "
      >
        💬
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