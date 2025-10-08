export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto py-10 px-6 grid md:grid-cols-3 gap-6">
        <div>
          <h3 className="text-xl font-semibold mb-3 text-blue-600 dark:text-blue-400">
            JanHaq
          </h3>
          <p className="text-sm leading-relaxed">
            Empowering citizens with legal awareness and simplified access to
            government schemes and complaint systems.
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="/laws" className="hover:text-blue-500">Laws</a></li>
            <li><a href="/schemes" className="hover:text-blue-500">Schemes</a></li>
            <li><a href="/departments" className="hover:text-blue-500">Departments</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Contact</h4>
          <p className="text-sm">Email: support@janhaq.in</p>
          <p className="text-sm">Phone: +91-9876543210</p>
        </div>
      </div>

      <div className="bg-gray-200 dark:bg-gray-800 py-4 text-center text-sm">
        © {new Date().getFullYear()} JanHaq. All rights reserved.
      </div>
    </footer>
  );
}
