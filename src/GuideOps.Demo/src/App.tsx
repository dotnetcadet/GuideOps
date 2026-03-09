import { useState } from 'react';
import {
  GuideOpsProvider,
  HandbookGate,
  GuideRenderer,
  useGuides,
  type GuideOpsConfig,
} from '@guideops/sdk';

// Simulated MSAL token acquisition — in production, this calls msalInstance.acquireTokenSilent()
async function getAccessToken(): Promise<string> {
  return 'demo-bearer-token';
}

const guideOpsConfig: GuideOpsConfig = {
  apiUrl: '/graphql',
  getAccessToken,
  schoolYear: `${new Date().getFullYear()}-${new Date().getFullYear() + 1}`,
  userId: 'demo-user-object-id', // Would come from MSAL account's localAccountId
};

function EdioContent() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Simulated Edio Navigation */}
      <nav id="edio-nav" className="bg-indigo-700 text-white px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold">Edio</h1>
        <div className="flex items-center gap-4">
          <button id="edio-courses" className="text-sm hover:underline">My Courses</button>
          <button id="edio-grades" className="text-sm hover:underline">Grades</button>
          <button id="edio-profile" className="text-sm hover:underline">Profile</button>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto p-8">
        {/* Demo info banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
          <h2 className="text-blue-800 font-semibold">GuideOps SDK Demo</h2>
          <p className="text-blue-600 text-sm mt-1">
            This simulates how Edio integrates the @guideops/sdk package.
            The HandbookGate blocks content until handbooks are acknowledged.
            Guides render using driver.js tours.
          </p>
        </div>

        {/* Guide Controls */}
        <GuideControls />

        {/* Simulated Edio course content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {['Mathematics 101', 'English Literature', 'Science Lab', 'History', 'Art Studio', 'Physical Education'].map(
            (course) => (
              <div key={course} id={`course-${course.toLowerCase().replace(/\s+/g, '-')}`}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
              >
                <div className="w-full h-32 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-lg mb-4" />
                <h3 className="font-semibold text-gray-900">{course}</h3>
                <p className="text-sm text-gray-500 mt-1">Fall Semester 2025-2026</p>
                <button className="mt-4 w-full py-2 text-sm font-medium text-indigo-600 border border-indigo-200 rounded-lg hover:bg-indigo-50">
                  Enter Course
                </button>
              </div>
            ),
          )}
        </div>
      </div>

      {/* Auto-start guides if any are assigned */}
      <GuideRenderer autoStart />
    </div>
  );
}

function GuideControls() {
  const { guides, isLoading, startGuide, dismissGuide } = useGuides();
  const [expanded, setExpanded] = useState(false);

  if (isLoading || guides.length === 0) return null;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-gray-900">Available Guides ({guides.length})</h3>
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-sm text-indigo-600 hover:text-indigo-800"
        >
          {expanded ? 'Hide' : 'Show'}
        </button>
      </div>
      {expanded && (
        <div className="mt-4 space-y-3">
          {guides.map((guide) => (
            <div key={guide.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">{guide.title}</p>
                <p className="text-sm text-gray-500">{guide.description} ({guide.steps.length} steps)</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => startGuide(guide.id)}
                  className="px-3 py-1.5 text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Start Tour
                </button>
                <button
                  onClick={() => dismissGuide(guide.id)}
                  className="px-3 py-1.5 text-sm font-medium rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300"
                >
                  Dismiss
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <GuideOpsProvider config={guideOpsConfig}>
      <HandbookGate
        fallback={
          <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600" />
          </div>
        }
      >
        <EdioContent />
      </HandbookGate>
    </GuideOpsProvider>
  );
}
