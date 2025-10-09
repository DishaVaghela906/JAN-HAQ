
import Card from '../components/Card';
import { savedLaws } from '../utils/mockData';

export default function SavedLaws() {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100 flex flex-col">

      <div className="flex-grow max-w-7xl mx-auto py-16 px-6">
        <h1 className="text-3xl font-bold mb-8">Saved Laws & Schemes</h1>
        {savedLaws.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-400">You have not saved any laws yet.</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {savedLaws.map((law, index) => (
              <Card
                key={index}
                title={law.title}
                description={law.description}
                icon="💾"
              />
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
