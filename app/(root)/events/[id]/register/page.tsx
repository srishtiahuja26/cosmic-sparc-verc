"use client";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import React from "react";
import { SearchParamProps } from "@/types";
import { useRouter } from "next/navigation";
import { checkoutOrder } from "@/lib/actions/order.actions";

export default function page({
  params: { id },
  searchParams,
}: SearchParamProps) {
  const { user } = useUser();
  const eventId = id;
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    contactNumber: "",
    collegeName: "",
    year: "",
    courseStream: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // Combine form data with eventId
    const dataToSubmit = {
      ...formData,
      eventId, // Add eventId to the form data
      buyerId: user?.id,
    };

    try {
      const newReg = await checkoutOrder(dataToSubmit);
      newReg.status === 200
        ? router.replace("/thankyou")
        : alert("Error while submiting form, please try again!");
    } catch (error) {}
  };
  return (
    <form
      onSubmit={handleSubmit}
      action={"POST"}
      className="max-w-full px-20  bg-white p-14 rounded-lg shadow-lg"
    >
      <h2 className="text-2xl  mb-6 text-left  text-gray-800">
        Fill in your details :
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Full Name:
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Contact Number:
          </label>
          <input
            type="text"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">
            College Name:
          </label>
          <input
            type="text"
            name="collegeName"
            value={formData.collegeName}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Year:</label>
          <input
            type="number"
            name="year"
            value={formData.year}
            onChange={handleChange}
            required
            min="1"
            max="4"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Type of Course/Stream:
          </label>
          <input
            type="text"
            name="courseStream"
            value={formData.courseStream}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full mt-6 bg-primary-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-orange-300  transition-colors duration-300"
      >
        Register
      </button>
    </form>
  );
}
