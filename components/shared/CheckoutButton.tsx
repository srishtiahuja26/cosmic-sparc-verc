"use client";

import { IEvent } from "@/lib/database/models/event.model";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import Checkout from "./Checkout";

const CheckoutButton = ({ event, id }: { event: IEvent; id: String }) => {
  const hasEventFinished = new Date(event.endDateTime) < new Date();

  return (
    <div className="flex items-center gap-3">
      {hasEventFinished ? (
        <p className="p-2 text-red-400">
          Sorry, tickets are no longer available.
        </p>
      ) : (
        <>
          <Button asChild className="button rounded-md" size="lg">
            <Link href="/sign-in">Register!</Link>
          </Button>

          <Checkout id={id} event={event} userId="2" />
        </>
      )}
    </div>
  );
};

export default CheckoutButton;
