export default function FeatureCard({ title, description, icon }) {
  return (
    <div className="bg-white border border-blue-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition duration-300 hover:-translate-y-1">

      {/* 🔷 Icon */}
      {icon && (
        <div className="text-2xl mb-3 text-blue-600">
          {icon}
        </div>
      )}

      {/* 🧠 Title */}
      <h3 className="text-lg font-semibold text-slate-800 mb-2">
        {title}
      </h3>

      {/* 📄 Description */}
      <p className="text-slate-600 text-sm leading-relaxed">
        {description}
      </p>

      {/* 🔥 Bottom Accent Line */}
      <div className="mt-4 h-1 w-10 bg-blue-500 rounded-full opacity-70"></div>

    </div>
  );
}