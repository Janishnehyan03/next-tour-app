import React from "react";
import Link from "next/link";
import { FaLocationArrow, FaCalendar, FaFlag, FaUser } from "react-icons/fa";
import moment from "moment";
import Image from "next/image";

function TourCard({ tour }) {
  return (
    <>
      <div className=" bg-white p-3 rounded-lg">
        <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1">
          <div
            style={{
              width: "100%",
              height: "100%",
            }}
          >
            <Image
              src={`https://tours-api.onrender.com/img/tours/${tour.imageCover}`}
              alt={tour.name}
              className="h-full w-full object-cover object-center"
              fill={'contain'}
            />
          </div>
        </div>
        <div className="mt-6 mb-2 uppercase text-xl font-bold text-[#9089FC]">
          <a href={tour.href}>
            <span className="" />
            {tour.name}
          </a>
        </div>
        <p className="text-base  italic text-[#3d393a]">{tour.summary}</p>

        <p className=" font-semibold uppercase my-3 text-[#1d394d]">
          {tour.difficulty} - {tour.duration} days
        </p>
        <div className=" p-3">
          <div className="flex justify-between mt-3 items-center">
            <div className="flex my-2 items-center">
              <FaLocationArrow className="text-[#9089fc] mr-1" />
              <p>{tour.startLocation.description}</p>
            </div>
            <div className="flex my-2 items-center">
              <FaCalendar className="text-[#9089fc] mr-1" />
              <p>{moment(tour.startDates[0]).format("MMM DD yyyy")}</p>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex my-2 items-center">
              <FaFlag className="text-[#9089fc] mr-1" />
              <p>{tour.locations.length} stops</p>
            </div>
            <div className="flex my-2 items-center">
              <FaUser className="text-[#9089fc] mr-1" />
              <p>{tour.maxGroupSize} members</p>
            </div>
          </div>
        </div>
        <div className="flex justify-between mt-5 p-3">
          <Link
            href={`/tours/${tour.slug}`}
            className="bg-[#1f1d3f] px-4 mt-2 uppercase text-white cursor-pointer rounded-[20px] py-2"
          >
            Go To Details
          </Link>

          <div>
            <h1 className="font-bold">₹{tour.price} /person</h1>
            <h1 className="text-gray-600">
              {tour.rating} rating ({tour.ratingsQuantity}){" "}
            </h1>
          </div>
        </div>
      </div>
    </>
  );
}

export default TourCard;
