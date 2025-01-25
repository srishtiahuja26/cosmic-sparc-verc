'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import * as XLSX from 'xlsx';

interface Event {
  _id: string;
  title: string;
  description: string;
  date: Date;
  collegeId: {
    name: string;
  };
}

export default function AdminDashboard() {
  const [events, setEvents] = useState<Event[]>([]);
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated' || (session?.user?.role !== 'ADMIN')) {
      router.push('/');
      return;
    }

    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/events');
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error('Failed to fetch events:', error);
      }
    };

    fetchEvents();
  }, [session, status, router]);

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(events.map(event => ({
      Title: event.title,
      Description: event.description,
      Date: new Date(event.date).toLocaleDateString(),
      College: event.collegeId.name,
    })));

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Events");
    XLSX.writeFile(workbook, "events.xlsx");
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <button
          onClick={exportToExcel}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Export to Excel
        </button>
      </div>

      <div className="grid gap-4">
        {events.map((event) => (
          <div
            key={event._id}
            className="border p-4 rounded shadow"
          >
            <h2 className="text-xl font-semibold">{event.title}</h2>
            <p className="text-gray-600">{event.description}</p>
            <div className="mt-2 text-sm text-gray-500">
              <p>Date: {new Date(event.date).toLocaleDateString()}</p>
              <p>College: {event.collegeId.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 