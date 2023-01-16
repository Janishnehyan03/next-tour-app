import { StarIcon } from "@heroicons/react/solid";
import moment from "moment";
import Head from "next/head";
import mapboxgl from "mapbox-gl";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import ReviewCard from "../../components/ReviewCard";
import Axios from "../";

export async function getStaticPaths() {
  const res = await fetch(`https://tours-api.onrender.com/api/v1/tours`);
  const data = await res.json();
  const paths = data.data.map((item) => {
    return {
      params: { slug: item.slug.toString() },
    };
  });
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  // Fetch data from external API
  const slug = context.params.slug;
  const res = await fetch(`https://tours-api.onrender.com/api/v1/tours?slug=` + slug);
  const data = await res.json();
  const reviewRes = await fetch(
    `https://tours-api.onrender.com/api/v1/tours/${data.data[0]._id}/reviews`
  );
  const reviewData = await reviewRes.json();
  // Pass data to the page via props
  return { props: { tour: data.data[0], reviews: reviewData.data } };
}

export default function TourDetails({ tour, reviews }) {
  mapboxgl.accessToken =
    "pk.eyJ1IjoiamFuaXNobmVoeWFuMDMiLCJhIjoiY2t0YXlpdWZlMWs1bjJ1cGMxZDltN3hzeiJ9.pBorchZzN28cBWovhnm_xQ";
  const mapContainer = useRef(null);
  const map = useRef(null);

  const [lng, setLng] = useState(tour.locations[0].coordinates[0]);
  const [lat, setLat] = useState(tour.locations[0].coordinates[1]);
  const [zoom, setZoom] = useState(9);

  const orderNow = async (e) => {
    try {
      let res = await Axios.post();
    } catch (error) {}
  };
  
  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [lng, lat],
      zoom: zoom,
    });
  });
  return (
    <>
      <Head>
        <title>{`Tour App | ${tour.name}`} </title>
        <meta name="description" content={tour.summary} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="bg-white">
        <div className="pt-6">
          <h1 className="text-center text-3xl lg:text-5xl mb-3 font-bold uppercase text-[#9089fc]">
            {tour.name}
          </h1>
          <p className="text-center text-violet-800 uppercase text-sm">
            {tour.summary}
          </p>
          {/* Image gallery */}
          <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
            <div className="aspect-w-3 aspect-h-4  overflow-hidden lg:block">
              <div
                style={{ width: "100%", height: "100%" }}
                className="rounded-lg"
              >
                <Image
                  src={`https://tours-api.onrender.com/img/tours/${tour.imageCover}`}
                  alt={tour.name}
                  className="h-full w-full object-cover object-center m-2"
                  width="500"
                  height="600"
                />
              </div>
            </div>
            <div className="lg:grid lg:grid-cols-1 lg:gap-y-8">
              <div
                style={{ width: "100%", height: "100%" }}
                className="aspect-w-3 aspect-h-2 overflow-hidden rounded-lg m-2"
              >
                <Image
                  src={`https://tours-api.onrender.com/img/tours/${tour.images[0]}`}
                  alt={tour.name}
                  className="h-full w-full object-cover object-center"
                  width="500"
                  height="600"
                />
              </div>

              <div
                style={{ width: "100%", height: "100%" }}
                className="aspect-w-3 aspect-h-2 overflow-hidden rounded-lg m-2"
              >
                <Image
                  src={`https://tours-api.onrender.com/img/tours/${tour.images[1]}`}
                  alt={tour.name}
                  className="h-full w-full object-cover object-center"
                  height="600"
                  width="500"
                />
              </div>
            </div>
            <div
              style={{ width: "100%", height: "100%" }}
              className="aspect-w-4 aspect-h-5 sm:overflow-hidden m-2 sm:rounded-lg lg:aspect-w-3 lg:aspect-h-4"
            >
              <Image
                src={`https://tours-api.onrender.com/img/tours/${tour.images[2]}`}
                alt={tour.name}
                className="h-full w-full object-cover object-center"
                width="500"
                height="600"
              />
            </div>
          </div>

          {/* Product info */}
          <div className="mx-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pt-16 lg:pb-24">
            <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
              <h1 className="text-2xl font-bold tracking-tight text-gray-600 sm:text-3xl">
                About The Package
              </h1>
            </div>

            {/* Options */}
            <div className="mt-4 lg:row-span-3 lg:mt-0">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl tracking-tight text-gray-900">
                {tour.startLocation.description}
              </p>

              {/* Reviews */}
              <div className="mt-6">
                <h3 className="sr-only">Reviews</h3>
                <div className="flex items-center">
                  <div className="flex items-center">
                    {[...Array(5)].map((rating, key) => (
                      <StarIcon
                        className={
                          tour.rating > key
                            ? "h-5 w-5 flex-shrink-0 text-[#9089FC]"
                            : "h-5 w-5 flex-shrink-0 text-gray-300"
                        }
                        aria-hidden="true"
                      />
                    ))}
                    ({tour.rating})
                  </div>
                  <a
                    // href={reviews.href}
                    className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    {tour.ratingsQuantity} reviews
                  </a>
                </div>
              </div>
              <div>
                <h1 className="mt-5 text-xl">Our Guides </h1>
                {tour.guides.map((guide, key) => (
                  <div key={key} className="my-2 items-center flex">
                    <img
                      src={`https://tours-api.onrender.com/img/users/${guide.photo}`}
                      className="h-12 rounded-full mr-2"
                    />
                    <h1 className="font-semibold uppercase">{guide.name}</h1>
                  </div>
                ))}
              </div>
              <form className="mt-10">
                <p className="text-3xl tracking-tight text-gray-900">
                  ₹ {tour.price} /person
                </p>
                <button
                  type="submit"
                  onClick={(e) => orderNow(e)}
                  className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Buy Now
                </button>
              </form>
            </div>

            <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pt-6 lg:pb-16 lg:pr-8">
              {/* Description and details */}
              <div>
                <h3 className="sr-only">Description</h3>

                <div className="space-y-6">
                  <p className="text-base text-gray-900">{tour.description}</p>
                </div>
              </div>

              <div className="mt-10">
                <h3 className="text-sm font-medium text-gray-900">
                  Highlights
                </h3>

                <div className="mt-4">
                  <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                    <li className="text-gray-400">
                      <span className="text-gray-600">
                        {tour.duration} Days
                      </span>
                    </li>
                    <li className="text-gray-400">
                      <span className="text-gray-600">
                        Starts on {""}
                        {moment(tour.startDates[0]).format("MMM DD yyyy")}
                      </span>
                    </li>
                    <li className="text-gray-400">
                      <span className="text-gray-600">
                        Difficulty Level
                        {""} ({tour.difficulty})
                      </span>
                    </li>
                    <li className="text-gray-400">
                      <span className="text-gray-600">
                        Participants
                        {""} ({tour.maxGroupSize})
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ReviewCard reviews={reviews} />
      </div>
      <div ref={mapContainer} className="h-[400px]" />
    </>
  );
}
