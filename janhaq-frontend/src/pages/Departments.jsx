
import Card from '../components/Card';
import { departments } from '../utils/mockData';

export default function Departments() {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100 flex flex-col">

      <div className="flex-grow max-w-7xl mx-auto py-16 px-6">
        <h1 className="text-3xl font-bold mb-8">Departments & Authorities</h1>
        <div className="grid md:grid-cols-3 gap-6">
          {departments.map((dept, index) => (
            <Card
              key={index}
              title={dept.name}
              description={dept.contact}
              icon="🏛️"
            />
          ))}
        </div>

        {/* Example: Map iframe */}
        <div className="mt-12 rounded-lg overflow-hidden shadow-lg">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345093745!2d144.95373531583453!3d-37.81720974202153!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d43f1f06f31%3A0x5045675218ce7e33!2sVictoria%20State%20Library!5e0!3m2!1sen!2sus!4v1689616800000!5m2!1sen!2sus"
            width="100%"
            height="400"
            className="border-0"
            allowFullScreen=""
            loading="lazy"
            title="Departments Map"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
