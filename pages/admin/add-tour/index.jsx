import axios from "axios";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import Axios from "../../Axios";
import { FaAdd, FaPlus, FaUser } from "react-icons/fa";

function AddTour() {
  const [inputFields, setInputFields] = useState([]);
  const [guides, setGuides] = useState([]);
  const [selectedGuides, setSelectedGuides] = useState([]);
  const [locations, setLocations] = useState([]);
  const [dates, setDates] = useState([]);

  const [startLocation, setStartLocation] = useState({
    longitude: null,
    latitude: null,
  });

  const [formData, setFormData] = useState({
    name: "",
    duration: 0,
    price: 0,
    priceDiscount: 0,
    maxGroupSize: 0,
    difficulty: "",
    summary: "",
    description: "",
    guides: [],
    dates: [],
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  }

  const addInputField = (e) => {
    e.preventDefault();
    // Add a new input field to the inputFields array
    setInputFields([
      ...inputFields,
      { latitude: "", longitude: "", day: 0, description: "" },
    ]);
  };

  const removeInputField = (index) => {
    // Remove the input field at the specified index
    setInputFields(inputFields.filter((field, i) => i !== index));
  };

  const handleInputChange = (event, index) => {
    // Update the value of the input field at the specified index
    const newInputFields = [...inputFields];
    newInputFields[index][event.target.name] = event.target.value;
    setInputFields(newInputFields);
  };

  const getAllGuides = async () => {
    try {
      let res = await Axios.get("/users?role=guide");
      setGuides(res.data.data);
    } catch (error) {
      console.log(error.response);
    }
  };
  const loadMapData = async (e, lat, lng, day) => {
    e.preventDefault();
    try {
      let res = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${lat},${lng}.json?limit=1&access_token=pk.eyJ1IjoiamFuaXNobmVoeWFuMDMiLCJhIjoiY2t0YXlpdWZlMWs1bjJ1cGMxZDltN3hzeiJ9.pBorchZzN28cBWovhnm_xQ`
      );
      setLocations([
        ...locations,
        {
          description: res.data.features[0].place_name,
          coordinates: [lng, lat],
          day,
          address: "",
        },
      ]);
    } catch (error) {
      console.log(error);
    }
  };
  const getStartLocation = async (e, lat, lng) => {
    e.preventDefault();
    try {
      let res = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${lat},${lng}.json?limit=1&access_token=pk.eyJ1IjoiamFuaXNobmVoeWFuMDMiLCJhIjoiY2t0YXlpdWZlMWs1bjJ1cGMxZDltN3hzeiJ9.pBorchZzN28cBWovhnm_xQ`
      );

      setStartLocation({
        description: res.data.features[0].place_name,
        coordinates: [lng, lat],
      });
    } catch (error) {
      console.log(error);
    }
  };
  function addDataToArray(data) {
    const selectedOption = data;
    setSelectedGuides([...new Set([...selectedGuides, selectedOption])]);
    setFormData((prevState) => ({ ...prevState, ["guides"]: selectedGuides }));
  }

  function handleDateChange(data) {
    const selectedOption = data;
    setDates([...new Set([...dates, selectedOption])]);
    setFormData((prevState) => ({ ...prevState, ["dates"]: dates }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await Axios.post("/tours", {
        ...formData,
        locations: locations,
        startLocation: startLocation,
        guides,
        startDates: dates,
      });
      console.log(res);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    getAllGuides();
  }, []);
  return (
    <>
      <Head>
        <title>{`Tour App | Add Tour Page`} </title>
        <meta name="description" content={"Tour App Login Page"} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="lg:ml-[25%]">
        <div className="hidden sm:block" aria-hidden="true">
          <div className="py-5">
            <div className="border-t border-gray-200" />
          </div>
        </div>

        <div className="mt-10 sm:mt-0">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="mt-5 md:col-span-2 md:mt-0">
              <form action="#">
                <div className="overflow-hidden shadow sm:rounded-md">
                  <div className="bg-white px-4 py-5 sm:p-6">
                    <h1 className="my-2 uppercase font-bold text-xl text-gray-600">
                      Tour Details
                    </h1>
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="first-name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Tour name
                        </label>
                        <input
                          type="text"
                          name="name"
                          onChange={(e) => handleChange(e)}
                          id="first-name"
                          autoComplete="tour-name"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          required
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="first-name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Tour summary
                        </label>
                        <input
                          type="text"
                          name="summary"
                          onChange={(e) => handleChange(e)}
                          id="first-name"
                          autoComplete="tour-name"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          required
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="first-name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Tour Discription
                        </label>
                        <input
                          type="text"
                          name="description"
                          onChange={(e) => handleChange(e)}
                          id="first-name"
                          autoComplete="tour-name"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          required
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="last-name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Duration
                        </label>
                        <input
                          type="text"
                          name="duration"
                          onChange={(e) => handleChange(e)}
                          id="last-name"
                          autoComplete="family-name"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          required
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="first-name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Tour Price
                        </label>
                        <input
                          type="text"
                          name="price"
                          onChange={(e) => handleChange(e)}
                          id="first-name"
                          autoComplete="tour-name"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          required
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="first-name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Discount Price
                        </label>
                        <input
                          type="text"
                          name="priceDiscount"
                          id="first-name"
                          onChange={(e) => handleChange(e)}
                          autoComplete="tour-name"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          required
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="country"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Guides
                        </label>
                        <select
                          id="country"
                          name="guides"
                          autoComplete="country-name"
                          onChange={(e) => addDataToArray(e.target.value)}
                          className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                          required
                        >
                          <option hidden>Select guides</option>
                          {guides.map((guide, key) => (
                            <option value={guide._id} key={key}>
                              {guide.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="country"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Difficulty type
                        </label>
                        <select
                          id="country"
                          name="difficulty"
                          onChange={(e) => handleChange(e)}
                          autoComplete="country-name"
                          className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                          required
                        >
                          <option hidden>select difficulty</option>
                          <option value={"easy"}>easy</option>
                          <option value={"medium"}>medium</option>
                          <option value={"difficult"}>difficult</option>
                        </select>
                      </div>

                      <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                        <label
                          htmlFor="city"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Maximum size
                        </label>
                        <input
                          type="text"
                          name="maxGroupSize"
                          onChange={(e) => handleChange(e)}
                          id="city"
                          autoComplete="address-level2"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          required
                        />
                      </div>
                    </div>
                    <h1 className="text-xl uppercase text-gray-600 font-bold my-2">
                      Starting Dates
                    </h1>
                    <div className="flex my-2">
                      <div className="col-span-6 mx-2 sm:col-span-6 lg:col-span-2">
                        <input
                          type="date"
                          name="dates"
                          id="city"
                          autoComplete="address-level2"
                          onChange={(e) => handleDateChange(e.target.value)}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          required
                        />
                      </div>
                    </div>
                    {dates.length > 0 && (
                      <>
                        {dates.map((date, key) => (
                          <p key={key} className="text-blue-600 mr-2">
                            {date}
                          </p>
                        ))}
                      </>
                    )}
                    <h1 className="text-xl uppercase text-gray-600 font-bold my-2">
                      Starting Location
                    </h1>
                    <div className="flex">
                      <div className="col-span-6 mx-2 sm:col-span-6 lg:col-span-2">
                        <input
                          type="text"
                          placeholder="lattitude"
                          onChange={(e) =>
                            setStartLocation((prevState) => ({
                              ...prevState,
                              ["latitude"]: e.target.value,
                            }))
                          }
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          required
                        />
                      </div>
                      <div className="col-span-6 mx-2 sm:col-span-6 lg:col-span-2">
                        <input
                          type="text"
                          placeholder="longitude"
                          onChange={(e) =>
                            setStartLocation((prevState) => ({
                              ...prevState,
                              ["longitude"]: e.target.value,
                            }))
                          }
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          required
                        />
                      </div>
                      <div className="col-span-6 mx-2 sm:col-span-6 lg:col-span-2">
                        <button
                          onClick={(e) =>
                            getStartLocation(
                              e,
                              startLocation.latitude,
                              startLocation.longitude
                            )
                          }
                          className="inline-flex ml-3 mt-1 justify-center rounded-md border border-transparent bg-gray-900 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <h1 className="text-xl uppercase text-gray-600 font-bold my-2">
                        Locations
                      </h1>
                      <div
                        onClick={(e) => addInputField(e)}
                        className=" bg-black  p-2 ml-2 cursor-pointer"
                      >
                        <FaPlus className="text-white  " />
                      </div>
                    </div>
                    {inputFields.map((item, key) => (
                      <div className=" mb-4">
                        <div className="lg:flex">
                          <div className="col-span-6 mx-2 sm:col-span-6 lg:col-span-2">
                            <input
                              type="text"
                              name="latitude"
                              placeholder="lattitude"
                              onChange={(e) => handleInputChange(e, key)}
                              className="mt-1 block rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-3"
                              required
                            />
                          </div>
                          <div className="col-span-6 mx-2 sm:col-span-6 lg:col-span-2">
                            <input
                              type="text"
                              name="longitude"
                              placeholder="lattitude"
                              onChange={(e) => handleInputChange(e, key)}
                              className="mt-1 block rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-3"
                              required
                            />
                          </div>
                          <div className="col-span-6 mx-2 sm:col-span-6 lg:col-span-2">
                            <input
                              type="text"
                              name="day"
                              placeholder="day"
                              onChange={(e) => handleInputChange(e, key)}
                              className="mt-1 block  rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-3"
                              required
                            />
                          </div>
                        </div>
                        {locations.length > 0 && (
                          <div className="col-span-6 mx-2 sm:col-span-6 lg:col-span-2">
                            <input
                              value={locations[key]?.description}
                              readOnly
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-3"
                              required
                            />
                          </div>
                        )}

                        <button
                          type="submit"
                          onClick={(e) =>
                            loadMapData(
                              e,
                              inputFields[key].latitude,
                              inputFields[key].longitude,
                              inputFields[key].day
                            )
                          }
                          className="inline-flex ml-3 mt-1 justify-center rounded-md border border-transparent bg-gray-900 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                          Save
                        </button>
                        <button
                          type="submit"
                          onClick={(e) => removeInputField(key)}
                          className="inline-flex ml-3  mt-1 justify-center rounded-md border border-transparent bg-red-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                          remove
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="bg-gray-50 px-4 py-3  text-right sm:px-6">
                    <button
                      type="submit"
                      onClick={(e) => handleSubmit(e)}
                      className="inline-flex  justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="hidden sm:block" aria-hidden="true">
          <div className="py-5">
            <div className="border-t border-gray-200" />
          </div>
        </div>
      </div>
    </>
  );
}

export default AddTour;
export async function getStaticProps(context) {
  return {
    props: {
      protected: true,
    },
  };
}
