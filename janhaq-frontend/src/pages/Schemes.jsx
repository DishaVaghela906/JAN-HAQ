import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/Card';
import { schemes } from '../utils/mockData';

export default function Schemes() {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100 flex flex-col">
      <Navbar />

      <div className="flex-grow max-w-7xl mx-auto py-16 px-6">
        <h1 className="text-3xl font-bold mb-8">Government Schemes</h1>
        <div className="grid md:grid-cols-3 gap-6">
          {schemes.map((scheme, index) => (
            <Card
              key={index}
              title={scheme.title}
              description={scheme.description}
              icon="💡"
            />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
