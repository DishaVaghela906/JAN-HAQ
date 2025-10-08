import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Table from '../components/Table';
import { complaints } from '../utils/mockData';

export default function MyComplaints() {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100 flex flex-col">
      <Navbar />

      <div className="flex-grow max-w-6xl mx-auto py-16 px-6">
        <h1 className="text-3xl font-bold mb-8">My Complaints</h1>
        <Table data={complaints} />
      </div>

      <Footer />
    </div>
  );
}
