"use client";
import { Fragment, useEffect, useState } from "react";
import { Plus, X } from "lucide-react";
import BulkDialog from "./components/BulkDialog";
import axios from "axios";
import { API_URL } from "@/lib/api";
import LocationMap from "./Location";
import Table from "./Table";

export default function WebScapping() {
  const [fields, setFields] = useState([{ id: 1, value: "" }]);
  const [count, setCount] = useState(1); // State to keep track of count
  const [bulkInput, setBulkInput] = useState(""); // State for bulk input
  const [countryCode, setCountryCode] = useState(""); // State for user's country code
  const [places, setPlaces] = useState([]); // State for places
  const [showTable, setShowTable] = useState(false); // State to control table visibility

  useEffect(() => {
    // Fetch user's country code on component mount
    fetchCountryCode();
  }, []);

  const fetchCountryCode = () => {
    // Attempt to get user's country code using geolocation API
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          // Use a geolocation service like Geocode.xyz to get country code
          axios
            .get(`https://geocode.xyz/${latitude},${longitude}?json=1`)
            .then((response) => {
              const country = response.data.country_code;
              setCountryCode(country);
            })
            .catch((error) => {
              console.error("Error fetching country code:", error);
            });
        },
        (error) => {
          console.error("Error getting geolocation:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  const addField = () => {
    const newField = { id: count + 1, value: "" }; // Increment count for new field
    setFields([...fields, newField]);
    setCount(count + 1); // Update count
  };

  const removeField = (id: number) => {
    const updatedFields = fields.filter((field) => field.id !== id);
    setFields(updatedFields);
  };

  const handleInputChange = (id: number, value: string) => {
    const updatedFields = fields.map((field) =>
      field.id === id ? { ...field, value } : field
    );
    setFields(updatedFields);
  };

  const handleBulkAdd = (terms: string[]) => {
    setBulkInput(terms.join(",")); // Combine terms into a comma-separated string for bulk input
  };

  const handleBulkSubmit = async () => {
    // Combine bulk input and individual fields into a single array of terms
    const allTerms = [
      ...bulkInput.split(",").map((term) => term.trim()).filter(Boolean),
      ...fields.map((field) => field.value.trim()).filter(Boolean),
    ];

    console.log("All terms:", allTerms); // Log combined terms

    try {
      // Prepare data to send to API
      const postData = {
        queries: allTerms,
        country_code: countryCode, // Use fetched country code here
      };

      // Send POST request to API
      const response = await axios.post(`${API_URL}/ai/api/v1/webscrape`, postData);
      console.log("Response from API:", response.data.data[0].places);

      // Update places state with response data
      setPlaces(
        response.data.data[0].places.map((place: any) => ({
          title: place.name,
          address: place.formatted_address,
          latitude: place.geometry.location.lat,
          longitude: place.geometry.location.lng,
        }))
      );

      setShowTable(true); // Show the table after successful API response
    } catch (error) {
      console.error("Error sending data to API:", error);
      // Handle error
    }
  };

  return (
    <Fragment>
      <div className="flex flex-col h-full flex-1">
        <div className="mt-8">
          <div className="space-y-2 w-full">
            <h1 className="text-2xl font-semibold">Web scraping</h1>
            <p className="flex items-center gap-2 text-[#3D3D3D] text-opacity-50 text-[15px]">
              Google my business scraping tool
            </p>
          </div>
          <section className="bg-primary-green p-10 rounded-3xl mt-4 text-white">
            <h1 className="text-xl font-semibold">Search Terms</h1>
            {fields.map((field) => (
              <div key={field.id} className="flex items-center gap-4 mt-5">
                <span className="text-lg font-semibold">{field.id}.</span>
                <input
                  type="text"
                  className="h-12 bg-[#F2F2F2] rounded-xl text-primary-black px-5 w-full"
                  placeholder="Enter search term"
                  value={field.value}
                  onChange={(e) => handleInputChange(field.id, e.target.value)}
                />
                {fields.length > 1 && (
                  <button
                    className="bg-[#F2F2F2] p-3 rounded-full grid place-content-center"
                    onClick={() => removeField(field.id)}
                  >
                    <X className="text-[#FF0000]" />
                  </button>
                )}
              </div>
            ))}
            <div className="flex justify-between mt-6 ml-7 mr-16">
              <button className=" h-12 px-7 rounded-xl text-primary-green flex items-center gap-3 font-medium">
                {/* Functionality for the first button */}
              </button>
              <div className="flex items-center gap-4">
                <BulkDialog onBulkAdd={handleBulkAdd} />
                <button
                  className="bg-white h-12 px-8 rounded-xl text-primary-green flex items-center gap-3 font-medium"
                  onClick={addField}
                >
                  <Plus size={23} />
                  Add field
                </button>
              </div>
            </div>
          </section>
          <LocationMap places={places} />
          {showTable }
          <div className="flex justify-center mt-10">
            <button
              className="bg-primary-green h-14 text-white sheen w-full max-w-[200px] mx-auto rounded-xl"
              onClick={handleBulkSubmit}
            >
              Start
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
