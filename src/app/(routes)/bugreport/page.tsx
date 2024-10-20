"use client";
import BugReportList from "@/app/components/BugReportList";
import { useUser } from "@clerk/nextjs";
import React, { useState, FormEvent, useEffect } from "react";

type Browser = "chrome" | "firefox" | "edge" | "other";
type Device = "desktop" | "mobile";
type MobileOS = "android" | "ios" | "";

interface BugReport {
  browser: Browser;
  title: string;
  description: string;
  device: Device;
  mobileOS: MobileOS;
  username: string | null;
}

const initialBugReportState: BugReport = {
  browser: "chrome",
  title: "",
  description: "",
  device: "desktop",
  mobileOS: "",
  username: null,
};

export default function BugReport() {
  const { user } = useUser();
  const [bugReport, setBugReport] = useState<BugReport>(initialBugReportState);

  useEffect(() => {
    if (user) {
      setBugReport((prev) => ({ ...prev, username: user.username }));
    }
  }, [user]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setBugReport((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) {
      alert("You must be logged in to submit a bug report.");
      return;
    }

    try {
      const response = await fetch("/api/create/bugreport", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bugReport),
      });

      if (response.ok) {
        alert("Bug report submitted successfully!");
        setBugReport({ ...initialBugReportState, username: user.username });
        window.location.reload();
      } else {
        const errorData = await response.json();
        console.error("Error response:", errorData);
        throw new Error(errorData.message || "Failed to submit bug report");
      }
    } catch (error) {
      console.error("Error submitting bug report:", error);
      alert("Failed to submit bug report. Please try again.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Bug Report</h1>
      {user ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col">
            <label htmlFor="browser" className="mb-2 font-medium">
              Browser:
            </label>
            <select
              id="browser"
              name="browser"
              value={bugReport.browser}
              onChange={handleChange}
              required
              className="p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="chrome">Chrome</option>
              <option value="firefox">Firefox</option>
              <option value="edge">Edge</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label htmlFor="title" className="mb-2 font-medium">
              Title:
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={bugReport.title}
              onChange={handleChange}
              required
              className="p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="description" className="mb-2 font-medium">
              Description:
            </label>
            <textarea
              id="description"
              name="description"
              value={bugReport.description}
              onChange={handleChange}
              required
              className="p-2 border border-gray-300 rounded-md h-32 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="device" className="mb-2 font-medium">
              Device:
            </label>
            <select
              id="device"
              name="device"
              value={bugReport.device}
              onChange={handleChange}
              required
              className="p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="desktop">Desktop</option>
              <option value="mobile">Mobile</option>
            </select>
          </div>

          {bugReport.device === "mobile" && (
            <div className="flex flex-col">
              <label htmlFor="mobileOS" className="mb-2 font-medium">
                Mobile OS:
              </label>
              <select
                id="mobileOS"
                name="mobileOS"
                value={bugReport.mobileOS}
                onChange={handleChange}
                required
                className="p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select mobile OS</option>
                <option value="android">Android</option>
                <option value="ios">iOS</option>
              </select>
            </div>
          )}

          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Submit Bug Report
          </button>
        </form>
      ) : (
        <p>Please log in to submit a bug report.</p>
      )}

      <div className="mt-12">
        <BugReportList />
      </div>
    </div>
  );
}
