
export default function Profile() {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100 flex flex-col">

      <div className="flex-grow max-w-3xl mx-auto py-16 px-6">
        <h1 className="text-3xl font-bold mb-8">Profile Settings</h1>
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg space-y-6">
          <div>
            <label className="block mb-1 font-semibold">Full Name</label>
            <input
              type="text"
              placeholder="John Doe"
              className="w-full p-3 rounded-lg border border-gray-300 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Email</label>
            <input
              type="email"
              placeholder="john@example.com"
              className="w-full p-3 rounded-lg border border-gray-300 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full p-3 rounded-lg border border-gray-300 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold hover:opacity-90 transition">
            Save Changes
          </button>
        </div>
      </div>

    </div>
  );
}
