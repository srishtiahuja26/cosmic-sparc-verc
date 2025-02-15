import { Document, Schema, model, models } from 'mongoose';
export interface ITicket {
	id: number;
	name: string;
	price: number;
	description: string;
	status: string; 
  }

export interface IEvent extends Document {
	_id: string;
	title: string;
	description?: string;
	location?: string;
	createdAt: Date;
	imageUrl: string;
	startDateTime: Date;
	endDateTime: Date;
	price: string;
	isFree: boolean;
	url?: string;
	category: { _id: string; name: string };
	organizer: { _id: string; firstName: string; lastName: string };
	maxTickets: number;
	tickets: ITicket[];
}

const TicketSchema = new Schema({
	id: { type: Number, required: true },
	name: { type: String, required: true },
	price: { type: Number, required: true },
	description: { type: String, required: true },
	status: { type: String, required: true },
  });

const EventSchema = new Schema({
	title: { type: String, required: true },
	description: { type: String },
	location: { type: String },
	createdAt: { type: Date, default: Date.now },
	imageUrl: { type: String, required: true },
	startDateTime: { type: Date, default: Date.now },
	endDateTime: { type: Date, default: Date.now },
	price: { type: String },
	url: { type: String },
	category: { type: Schema.Types.ObjectId, ref: 'Category' },
	organizer: { type: String, ref: 'User' },
	maxTickets: { type: Number, required: true },
	ticket_details: { type: [TicketSchema], default: [] },
});

const Event = models.Event || model('Event', EventSchema);

export default Event;
