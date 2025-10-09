
import { notifications } from '../utils/mockData';

export default function Notifications() {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100 flex flex-col">
  

      <div className="flex-grow max-w-3xl mx-auto py-16 px-6">
        <h1 className="text-3xl font-bold mb-8">Notifications</h1>

        {notifications.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-400">No notifications at the moment.</p>
        ) : (
          <ul className="space-y-4">
            {notifications.map((note, index) => (
              <li
                key={index}
                className="p-4 rounded-lg bg-white dark:bg-gray-800 shadow hover:shadow-lg transition"
              >
                <p className="font-semibold">{note.title}</p>
                <p className="text-gray-600 dark:text-gray-300">{note.message}</p>
              </li>
            ))}
          </ul>
        )}
      </div>

    </div>
  );
}
