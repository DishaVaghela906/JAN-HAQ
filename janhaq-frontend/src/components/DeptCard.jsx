export default function DeptCard({ title, contact_person, phone, email, city }) {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 flex flex-col items-center text-center transition-colors duration-300">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <p className="text-gray-700 dark:text-gray-200 mb-1">
        <span className="font-medium">Contact Person:</span> {contact_person}
      </p>
      <p className="text-gray-600 dark:text-gray-400 mb-1">
        <span className="font-medium">Phone:</span> {phone}
      </p>
      <p className="text-gray-600 dark:text-gray-400 mb-1">
        <span className="font-medium">Email:</span> {email}
      </p>
      <p className="text-gray-500 dark:text-gray-400">
        <span className="font-medium">City:</span> {city}
      </p>
    </div>
  );
}
