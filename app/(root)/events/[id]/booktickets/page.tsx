import Link from "next/link";
import { ArrowLeft, X } from "lucide-react";
import { getEventById } from "@/lib/actions/event.actions";
import TicketSelection from "@/components/shared/TicketSelection";
import moment from "moment";
interface Params {
  params: {
    id: string;
  };
}

const BookTickets = async ({ params: { id } }: Params) => {
  const event = await getEventById(id);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href={`/events/${id}`} className="text-gray-600 hover:text-gray-900">
                <ArrowLeft className="w-6 h-6" />
              </Link>
              <h1 className="text-xl font-semibold">{event.title}</h1>
            </div>
            <button className="text-gray-600 hover:text-gray-900">
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="mt-4 flex items-center space-x-4">
            <div className="flex-1 h-1 bg-primary"></div>
            <div className="flex-1 h-1 bg-gray-200"></div>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="mb-6">
            <h2 className="text-lg font-semibold">{event.location}</h2>
            <p className="text-gray-600">{moment(event.startDateTime).format("ddd DD MMM | hh:mm A")}</p>
          </div>

          
          <TicketSelection tickets={event.tickets} maxTickets={event.maxTickets} />
        </div>
      </main>
    </div>
  );
};

export default BookTickets;
