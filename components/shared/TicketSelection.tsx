"use client";

import { useState } from "react";
import { Info, ChevronDown, ChevronUp } from "lucide-react";

interface Ticket {
  id: number;
  name: string;
  price: number;
  description: string;
  status: string;
}

interface TicketSelectionProps {
  tickets: Ticket[];
  maxTickets: number;
}

const TicketSelection: React.FC<TicketSelectionProps> = ({ tickets, maxTickets }) => {
  const [selectedTickets, setSelectedTickets] = useState<{ [key: number]: number }>({});
  const [expandedTicket, setExpandedTicket] = useState<number | null>(null);

  const handleAddTicket = (ticketId: number) => {
    const currentCount = selectedTickets[ticketId] || 0;
    if (getTotalTickets() < maxTickets) {
      setSelectedTickets({
        ...selectedTickets,
        [ticketId]: currentCount + 1,
      });
    }
  };

  const handleRemoveTicket = (ticketId: number) => {
    const currentCount = selectedTickets[ticketId] || 0;
    if (currentCount > 0) {
      setSelectedTickets({
        ...selectedTickets,
        [ticketId]: currentCount - 1,
      });
    }
  };

  const toggleDescription = (ticketId: number) => {
    setExpandedTicket(expandedTicket === ticketId ? null : ticketId);
  };

  const getTotalTickets = () => {
    return Object.values(selectedTickets).reduce((sum, count) => sum + count, 0);
  };

  const getTotalAmount = () => {
    return tickets.reduce((sum, ticket) => {
      return sum + ticket.price * (selectedTickets[ticket.id] || 0);
    }, 0);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-sm text-gray-600">Select Tickets</h3>
      {tickets && tickets.map((ticket) => (
        <div key={ticket.id} className="bg-white border rounded-lg p-4">
          <div className="flex justify-between items-start">
            <div className="flex-grow">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold">{ticket.name}</h3>
                  <p className="text-xl font-semibold mt-1">₹{ticket.price}</p>
                </div>
                {selectedTickets[ticket.id] ? (
                  <div className="flex items-center space-x-3">
                    <button onClick={() => handleRemoveTicket(ticket.id)} className="w-8 h-8 rounded-full border">
                      -
                    </button>
                    <span className="w-8 text-center">{selectedTickets[ticket.id]}</span>
                    <button
                      onClick={() => handleAddTicket(ticket.id)}
                      className="w-8 h-8 rounded-full border disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={getTotalTickets() >= maxTickets}
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => handleAddTicket(ticket.id)}
                    className="px-6 py-2 bg-white text-primary rounded-lg border-primary border hover:bg-primary/90 transition-colors hover:text-white"
                    disabled={getTotalTickets() >= maxTickets}
                  >
                    Add
                  </button>
                )}
              </div>
              <div className="flex items-center mt-2">
                <button onClick={() => toggleDescription(ticket.id)} className="flex items-center text-gray-600">
                  <Info className="w-4 h-4 mr-1" />
                  <span className="text-sm">Details</span>
                  {expandedTicket === ticket.id ? <ChevronUp className="w-4 h-4 ml-1" /> : <ChevronDown className="w-4 h-4 ml-1" />}
                </button>
              </div>
              {expandedTicket === ticket.id && (
                <div className="mt-3 p-3 bg-gray-50 rounded-md">
                  <p className="text-sm text-gray-600">{ticket.description}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
      {
        (tickets ===undefined || tickets?.length === 0) && (
          <div className="bg-white border rounded-lg p-4">
            <p className="text-center text-gray-600">No tickets available</p>
          </div>
        )
      }
      {getTotalTickets() > 0 && (
        <footer className="fixed bottom-0 left-0 right-0 bg-white border-t">
          <div className="max-w-3xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Amount</p>
                <p className="text-xl font-semibold">₹{getTotalAmount()}</p>
              </div>
              <button className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors">
                Proceed
              </button>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};

export default TicketSelection;
