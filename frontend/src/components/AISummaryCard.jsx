/**
 * MedSec - AI Summary Card Component
 * Reusable component to display AI-generated medical report summary
 * Shows: Summary, Diseases Found, Medicines Found
 */

const AISummaryCard = ({ summary }) => {
  if (!summary) return null;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-purple-100 overflow-hidden">
      {/* Card Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-4">
        <h2 className="text-white font-semibold text-lg flex items-center gap-2">
          🤖 Gemini AI Analysis
        </h2>
        <p className="text-purple-200 text-xs mt-0.5">Powered by Google Gemini AI</p>
      </div>

      <div className="p-6 space-y-5">
        {/* Summary Section */}
        <div>
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
            📝 Summary
          </h3>
          <p className="text-gray-800 text-sm leading-relaxed bg-gray-50 rounded-lg p-4">
            {summary.summary || "No summary available"}
          </p>
        </div>

        {/* Diseases Section */}
        <div>
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
            🏥 Diseases / Conditions Found
          </h3>
          <div className="bg-red-50 rounded-lg p-4">
            {summary.diseases && summary.diseases !== "None found" ? (
              <div className="flex flex-wrap gap-2">
                {summary.diseases.split(",").map((disease, i) => (
                  <span
                    key={i}
                    className="bg-red-100 text-red-800 text-xs font-medium px-3 py-1.5 rounded-full"
                  >
                    {disease.trim()}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No diseases found in this report</p>
            )}
          </div>
        </div>

        {/* Medicines Section */}
        <div>
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
            💊 Medicines / Prescriptions
          </h3>
          <div className="bg-green-50 rounded-lg p-4">
            {summary.medicines && summary.medicines !== "None found" ? (
              <div className="flex flex-wrap gap-2">
                {summary.medicines.split(",").map((medicine, i) => (
                  <span
                    key={i}
                    className="bg-green-100 text-green-800 text-xs font-medium px-3 py-1.5 rounded-full"
                  >
                    {medicine.trim()}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No medicines found in this report</p>
            )}
          </div>
        </div>

        {/* Footer Note */}
        <div className="border-t border-gray-100 pt-4">
          <p className="text-xs text-gray-400 text-center">
            ⚠️ AI analysis is for assistance only. Always verify with clinical judgment.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AISummaryCard;
