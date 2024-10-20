import React, { useState, useEffect } from "react";

interface BugReport {
  username: string;
  title: string;
  description: string;
  browser: string;
  device: string;
  mobile_os?: string;
}

const BugReportList: React.FC = () => {
  const [bugReports, setBugReports] = useState<BugReport[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBugReports = async () => {
      try {
        const response = await fetch("/api/get/all/bugreports");
        if (!response.ok) {
          throw new Error("Failed to fetch bug reports");
        }
        const data: { bugReports: BugReport[] } = await response.json();
        setBugReports(data.bugReports);
        setLoading(false);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred",
        );
        setLoading(false);
      }
    };

    fetchBugReports();
  }, []);

  if (loading) return <div className="text-center py-4">Loading...</div>;
  if (error)
    return <div className="text-center py-4 text-red-500">Error: {error}</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Bug Reports</h2>
      {bugReports.length === 0 ? (
        <p className="text-center italic text-gray-500">
          No bugs are currently being tracked.
        </p>
      ) : (
        <div className="space-y-6">
          {bugReports.map((report, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm"
            >
              <h3 className="text-lg font-semibold text-gray-800">
                {report.username}
              </h3>
              <h4 className="text-md font-medium text-blue-600 mt-2">
                {report.title}
              </h4>
              <p className="mt-3">
                <strong className="text-gray-700">Description:</strong>{" "}
                {report.description}
              </p>
              <p className="mt-2">
                <strong className="text-gray-700">Browser:</strong>{" "}
                {report.browser}
              </p>
              <p className="mt-2">
                <strong className="text-gray-700">Device:</strong>{" "}
                {report.device}
              </p>
              {report.mobile_os && (
                <p className="mt-2">
                  <strong className="text-gray-700">Mobile OS:</strong>{" "}
                  {report.mobile_os}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BugReportList;
