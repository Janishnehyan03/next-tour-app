import Image from "next/image";
import React from "react";
import { StarIcon } from "@heroicons/react/solid";
import moment from "moment/moment";

function ReviewCard({ reviews }) {
  return (
    <>
    <h1 className="text-center font-semibold text-3xl text-[#514aba]">
      Reviews
    </h1>
      {reviews.map((review, key) => (
        <div className="mb-2 lg:w-3/4 w-full lg:mx-auto shadow-lg rounded-t-8xl rounded-b-5xl overflow-hidden">
          <div className="pt-3 pb-3 md:pb-1 px-4 md:px-16 bg-white bg-opacity-40">
            <div className="flex flex-wrap items-center jus">
              <Image
                src={`https://tours-api.onrender.com/img/users/${review.user.photo}`}
                alt={review.user.name}
                className="h-12 w-12 rounded-full mr-2"
                height={300}
                width={300}
              />
              <h4 className="w-full md:w-auto text-xl font-heading font-medium">
                Faustina H. Fawn
              </h4>
              <div className="w-full md:w-px h-2 md:h-8 mx-8 bg-transparent md:bg-gray-200" />
              <span className="mr-4 text-xl font-heading font-medium">
                {review.rating}
              </span>
              <div className="inline-flex">
                {[...Array(5)].map((item, key) => (
                  <StarIcon
                    className={
                      review.rating > key
                        ? "h-5 w-5 flex-shrink-0 text-[#9089FC]"
                        : "h-5 w-5 flex-shrink-0 text-gray-300"
                    }
                    aria-hidden="true"
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="px-4 overflow-hidden md:px-16 pt-8 pb-12 bg-white">
            <div className="flex flex-wrap">
              <div className="w-full md:w-2/3 mb-6 md:mb-0">
                <p className="mb-8 max-w-2xl text-darkBlueGray-400 leading-loose">
                  {review.review}
                </p>
              </div>
            </div>
          <p className="text-sm text-gray-500">{moment(review.createdAt).format("DD-MM-YYYY")}</p>
          </div>
        </div>
      ))}
    </>
  );
}

export default ReviewCard;

export async function getStaticPaths() {
  const res = await fetch(`https://tours-api.onrender.com/api/v1/tours`);
  const data = await res.json();
  const path = data.data.map((item) => {});
  return {
    path,
    fallback: false,
  };
}
