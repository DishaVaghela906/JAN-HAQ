import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/Card';

export default function Dashboard() {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100">
      <Navbar />

      <section className="max-w-7xl mx-auto py-16 px-6">
        <h1 className="text-4xl font-bold mb-8">Welcome to Your Dashboard</h1>
        <div className="grid md:grid-cols-3 gap-6">
          <Card title="My Complaints" icon="📝" description="View and track your complaints." />
          <Card title="Saved Laws & Schemes" icon="📚" description="Access your saved laws and schemes." />
          <Card title="Profile Settings" icon="⚙️" description="Update personal info and password." />
        </div>
      </section>

      <Footer />
    </div>
  );
}
