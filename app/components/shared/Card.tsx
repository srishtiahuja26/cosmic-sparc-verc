'use client';

import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

type CardProps = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  price: string;
  category: string;
};

const Card = ({ id, title, description, imageUrl, price, category }: CardProps) => {
  const { data: session } = useSession();

  return (
    <div className="group relative flex min-h-[380px] w-full max-w-[400px] flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg md:min-h-[438px]">
      <Link 
        href={session ? `/events/${id}/register` : '/api/auth/signin'}
        style={{ backgroundImage: `url(${imageUrl})` }}
        className="flex-center flex-grow bg-gray-50 bg-cover bg-center text-grey-500"
      >
        <div className="flex-center flex-col gap-4">
          <h3 className="text-2xl font-bold">{title}</h3>
          <p className="text-sm">{description}</p>
          <div className="flex-center gap-4">
            <span className="p-semibold-14 w-min rounded-full bg-green-100 px-4 py-1 text-green-60">
              {category}
            </span>
            <p className="p-semibold-14 text-grey-600">
              {price === '0' ? 'FREE' : `$${price}`}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Card; 