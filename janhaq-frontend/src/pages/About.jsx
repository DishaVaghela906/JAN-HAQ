import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function About() {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100 flex flex-col">
      <Navbar />

      <div className="flex-grow max-w-5xl mx-auto py-16 px-6 space-y-12">
        <h1 className="text-3xl font-bold text-center">About JanHaq</h1>
        <p className="text-lg text-center">
          JanHaq is a civic rights platform helping citizens access laws, schemes, and file complaints
          with transparency and ease. Our mission is to empower people with knowledge and tools to
          make their voice heard.
        </p>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Our Team</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow text-center">
              <p className="font-bold">Krisha Gandhi</p>
              <p className="text-gray-600 dark:text-gray-300">Frontend Developer</p>
            </div>
            <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow text-center">
              <p className="font-bold">John Doe</p>
              <p className="text-gray-600 dark:text-gray-300">Backend Developer</p>
            </div>
            <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow text-center">
              <p className="font-bold">Jane Smith</p>
              <p className="text-gray-600 dark:text-gray-300">UI/UX Designer</p>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
