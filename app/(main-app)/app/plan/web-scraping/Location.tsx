"use client";
import { Fragment, SetStateAction, useEffect, useState } from "react";
import { Plus, Search, X } from "lucide-react";
import BulkDialog from "./components/BulkDialog";
import axios from "axios";
import { API_URL } from "@/lib/api";
// import LocationMap from "./Location";
import AssistantsTable from "./Table";
import { LoadScript, GoogleMap, Marker } from "@react-google-maps/api";
import Link from "next/link";

interface Place {
  title: string;
  address: string;
  latitude: number;
  longitude: number;
}

interface Props {
  places: Place[];
}

const containerStyle = {
  width: "100%",
  height: "600px",
};

const LocationMap: React.FC<Props> = ({ places }) => {
  const [center, setCenter] = useState<{ lat: number; lng: number }>({
    lat: 39.0997,
    lng: -94.5786,
  }); // Initial center for Kansas City, MO
  const [location, setLocation] = useState("Kansas City, MO"); // Initial location state
  const [inputCountry, setInputCountry] = useState(""); // State for country input

  useEffect(() => {
    if (places.length > 0) {
      setLocation(`${places[0].title}, ${places[0].address}`); // Set initial location based on first place
      setCenter({ lat: places[0].latitude, lng: places[0].longitude }); // Set initial map center based on first place
    }
  }, [places]);

  const handleLocationChange = (e: { target: { value: SetStateAction<string> } }) => {
    setLocation(e.target.value); // Update location state on input change
  };

  const handleCountryInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputCountry(e.target.value);
  };

  const handleCountrySearch = async () => {
    try {
      const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json`, {
        params: {
          key: "YOUR_OPENCAGE_API_KEY",
          q: inputCountry,
        },
      });
      const { lat, lng } = response.data.results[0].geometry;
      setCenter({ lat, lng });
    } catch (error) {
      console.error("Error fetching country coordinates:", error);
    }
  };

  return (
    <Fragment>
      <section className="mt-8 space-y-2">
        <p className="font-medium">Location</p>
        <div className="bg-[#F2F2F2] border border-[#E4E4E4] py-2 pl-5 pr-2 flex items-center gap-4 rounded-xl focus-within:border-gray-300">
          <Search className="text-primary-green" />
          <input className="h-10 bg-transparent w-full" placeholder="Enter location" value={location} onChange={handleLocationChange} />
          <Link href={`https://www.google.com/maps?q=${encodeURIComponent(location)}`} className="w-full max-w-fit" target="_blank" rel="noopener noreferrer">
            <button className="flex items-center gap-3 hover:bg-primary-green/10 sheen min-w-fit py-3 px-4 rounded-lg transition-all duration-300">
              <Search className="text-primary-green" />
              View Map
            </button>
          </Link>
          <Link href="/app/plan/web-scraping/add-prospect" className="w-full max-w-fit">
            <button className="flex items-center gap-3 hover:bg-primary-green/10 sheen min-w-fit py-3 px-4 rounded-lg transition-all duration-300">
              <Search className="text-primary-green" />
              Add prospect manually
            </button>
          </Link>
        </div>
      </section>
      <div className="mt-6">
        <h2 className="text-lg font-semibold">Country</h2>
        <div className="flex items-center gap-4 mt-2">
          <input
            type="text"
            className="h-12 bg-[#F2F2F2] rounded-xl text-primary-black px-5 w-full"
            placeholder="Enter country name"
            value={inputCountry}
            onChange={handleCountryInputChange}
          />
          <button className="bg-white h-12 px-8 rounded-xl text-primary-green flex items-center gap-3 font-medium" onClick={handleCountrySearch}>
            Search Country
          </button>
        </div>
      </div>
      <div className="mt-8">
        <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
          <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
            {/* Render markers for each place */}
            {places.map((place, index) => (
              <Marker key={index} position={{ lat: place.latitude, lng: place.longitude }} title={place.title} />
            ))}
          </GoogleMap>
        </LoadScript>
      </div>
    </Fragment>
  );
};

export default function WebScraping() {
  const [fields, setFields] = useState([{ id: 1, value: "" }]);
  const [count, setCount] = useState(1); // State to keep track of count
  const [bulkInput, setBulkInput] = useState(""); // State for bulk input
  const [countryCode, setCountryCode] = useState(""); // State for user's country code
  const [inputCountry, setInputCountry] = useState(""); // State for input country name
  const [places, setPlaces] = useState([]); // State for places
  const [showTable, setShowTable] = useState(false); // State to control table visibility

  useEffect(() => {
    // Fetch user's country code on component mount
    getGeoInfo();
  }, []);

  const getGeoInfo = (countryName = "") => {
    let url = "https://ipapi.co/json/";
    if (countryName) {
      url = `https://restcountries.com/v3.1/name/${countryName}`;
    }
    axios
      .get(url)
      .then((response) => {
        let data = response.data;
        if (countryName) {
          data = data[0];
          console.log("Fetched country code by country name:", data);
          setCountryCode(data.cca3); // Use the correct property from the response
        } else {
          console.log("Fetched country code by IP:", data);
          setCountryCode(data.country_code_iso3); // Use the correct property from the response
        }
      })
      .catch((error) => {
        console.error("Error fetching country code:", error);
      });
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
    const updatedFields = fields.map((field) => (field.id === id ? { ...field, value } : field));
    setFields(updatedFields);
  };

  const handleBulkAdd = (terms: string[]) => {
    setBulkInput(terms.join(",")); // Combine terms into a comma-separated string for bulk input
  };

  const handleCountryInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputCountry(e.target.value);
  };

  const handleCountrySearch = () => {
    if (inputCountry) {
      getGeoInfo(inputCountry);
    }
  };

  const handleBulkSubmit = async () => {
    // Combine bulk input and individual fields into a single array of terms
    const allTerms = [
      ...bulkInput
        .split(",")
        .map((term) => term.trim())
        .filter(Boolean),
      ...fields.map((field) => field.value.trim()).filter(Boolean),
    ];

    console.log("All terms:", allTerms); // Log combined terms
    console.log("Country code:", countryCode); // Log country code

    try {
      // Prepare data to send to API
      const postData = {
        queries: allTerms,
        country_code: countryCode, // Use fetched country code here
      };

      console.log("Post data:", postData); // Log post data to verify

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
            <p className="flex items-center gap-2 text-[#3D3D3D] text-opacity-50 text-[15px]">Google my business scraping tool</p>
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
                  <button className="bg-[#F2F2F2] p-3 rounded-full grid place-content-center" onClick={() => removeField(field.id)}>
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
                <button className="bg-white h-12 px-8 rounded-xl text-primary-green flex items-center gap-3 font-medium" onClick={addField}>
                  <Plus size={23} />
                  Add field
                </button>
              </div>
            </div>
            <div className="mt-6">
              <h2 className="text-lg font-semibold">Country</h2>
              <div className="flex items-center gap-4 mt-2">
                <input
                  type="text"
                  className="h-12 bg-[#F2F2F2] rounded-xl text-primary-black px-5 w-full"
                  placeholder="Enter country name"
                  value={inputCountry}
                  onChange={handleCountryInputChange}
                />
                <button className="bg-white h-12 px-8 rounded-xl text-primary-green flex items-center gap-3 font-medium" onClick={handleCountrySearch}>
                  Search Country
                </button>
              </div>
            </div>
          </section>
          <LocationMap places={places} />
          {showTable} {/* Render the table when showTable is true */}
          <div className="flex justify-center mt-10">
            <button className="bg-primary-green h-14 text-white sheen w-full max-w-[200px] mx-auto rounded-xl" onClick={handleBulkSubmit}>
              Start
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
