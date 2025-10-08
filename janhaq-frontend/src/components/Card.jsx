export default function Card({ title, icon, description }) {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-md hover:shadow-xl transition rounded-2xl p-8 text-center border border-gray-100 dark:border-gray-700">
      <div className="text-5xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      {description && (
        <p className="text-gray-600 dark:text-gray-300 text-sm">
          {description}
        </p>
      )}
    </div>
  );
}
