import { Document, Schema, model, models } from "mongoose";

export interface IUserRegistration extends Document {
  _id: string;
  fullName: string;
  email: string;
  contactNumber: string;
  collegeName: string;
  year: number; // Example values: 1, 2, 3, 4
  courseStream: string; // E.g., B.Tech, B.Sc
  eventId: string;
  registrationDate: Date;
}

const UserRegistrationSchema = new Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  contactNumber: { type: String, required: true },
  collegeName: { type: String, required: true },
  year: { type: Number, required: true }, // E.g., 1, 2, 3, 4 for year of study
  courseStream: { type: String, required: true }, // E.g., B.Tech, B.Sc, etc.
  eventId: { type: String, required: true },
  registrationDate: { type: Date, default: Date.now }, // Automatically set registration date
});

const UserRegistration =
  models.UserRegistration ||
  model<IUserRegistration>("UserRegistration", UserRegistrationSchema);

export default UserRegistration;
