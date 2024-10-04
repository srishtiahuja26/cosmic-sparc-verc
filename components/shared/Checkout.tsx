import React, { useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import Link from "next/link";
import { IEvent } from "@/lib/database/models/event.model";
import { Button } from "../ui/button";
import { checkoutOrder } from "@/lib/actions/order.actions";

loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const Checkout = ({
  event,
  id,
  userId,
}: {
  event: IEvent;
  id: String;
  userId: string;
}) => {
  return (
    <>
      <Button type="button" role="link" size="lg" className="button sm:w-fit">
        <Link href={`/events/${id}/register`}>Register!</Link>
      </Button>
    </>
  );
};

export default Checkout;
