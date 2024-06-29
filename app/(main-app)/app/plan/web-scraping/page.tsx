"use client";
import { Fragment, useEffect, useState } from "react";
import { Plus, Search, X } from "lucide-react";
import axios from "axios";
import { API_URL } from "@/lib/api";
import "leaflet/dist/leaflet.css";
import { LatLngExpression } from "leaflet"; // Import LatLngExpression instead
import BulkDialog from "./components/BulkDialog";
import Link from "next/link";
import { Table, TableBody, TableCell, TableHeader, TableHead, TableRow } from "@/components/ui/table";
import dynamic from "next/dynamic";

const MapContainer = dynamic(() => import("react-leaflet").then((module) => module.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then((module) => module.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then((module) => module.Marker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then((module) => module.Popup), { ssr: false });

interface Place {
  latitude: number;
  longitude: number;
  title: string;
  address: string;
  phoneNumber: string;
  rating: number;
  ratingCount: number;
  website: string;
}

const WebScraping: React.FC = () => {
  const [fields, setFields] = useState<{ id: number; value: string }[]>([{ id: 1, value: "" }]);
  const [count, setCount] = useState(1);
  const [bulkInput, setBulkInput] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [inputCountry, setInputCountry] = useState("");
  const [places, setPlaces] = useState<Place[]>([]);
  const [showTable, setShowTable] = useState(false);
  const [center, setCenter] = useState<LatLngExpression>([39.0997, -94.5786]);
  const [zoom, setZoom] = useState(6); // Default zoom level

  useEffect(() => {
    if (places.length > 0) {
      setCenter([places[0].latitude, places[0].longitude]);
      setZoom(10); // Adjust zoom level if needed
    }
  }, [places]);

  useEffect(() => {
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
          setCountryCode(data.cca3);
          setCenter([data.latlng[0], data.latlng[1]]); // Update map center based on fetched coordinates
          setZoom(6); // Adjust zoom level if needed
        } else {
          console.log("Fetched country code by IP:", data);
          setCountryCode(data.country_code);
        }
      })
      .catch((error) => {
        console.error("Error fetching country code:", error);
      });
  };

  const addField = () => {
    const newField = { id: count + 1, value: "" };
    setFields([...fields, newField]);
    setCount(count + 1);
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
    setBulkInput(terms.join(","));
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
    const allTerms = [
      ...bulkInput
        .split(",")
        .map((term) => term.trim())
        .filter(Boolean),
      ...fields.map((field) => field.value.trim()).filter(Boolean),
    ];

    console.log("All terms:", allTerms);
    console.log("Country code:", countryCode);

    try {
      const postData = {
        queries: allTerms,
        country_code: countryCode,
        location: inputCountry, // Include inputCountry in the payload
      };

      console.log("Post data:", postData);

      const response = await axios.post(`${API_URL}/ai/api/v1/webscrape`, postData);
      setPlaces(
        response.data.data[0].places.map((place: any) => ({
          title: place.title,
          address: place.address,
          phoneNumber: place.phoneNumber,
          rating: place.rating,
          ratingCount: place.ratingCount,
          website: place.website,
          latitude: place.latitude,
          longitude: place.longitude,
        }))
      );
      console.log("address:", response.data.data[0].places[0].address);
      console.log("title:", response.data.data[0].places[0].title);
      console.log("phoneNumber:", response.data.data[0].places[0].phoneNumber);
      console.log("rating:", response.data.data[0].places[0].rating);
      console.log("ratingCount:", response.data.data[0].places[0].ratingCount);
      console.log("website:", response.data.data[0].places[0].website);

      setPlaces(
        response.data.data[0].places.map((place: any) => ({
          title: place.name,
          address: place.formatted_address,
          latitude: place.geometry.location.lat,
          longitude: place.geometry.location.lng,
        }))
      );

      setShowTable(true);
    } catch (error) {
      console.error("Error sending data to API:", error);
    }
  };
  const showTableHandler = () => {
    setShowTable(true);
  };
  const renderRatingStars = (rating: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i} style={{ color: i < rating ? "#FFD700" : "gray", fontSize: "20px" }}>
          ★
        </span>
      );
    }
    return <div>{stars}</div>;
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
              <div className="flex items-center gap-4 relative z-[20]">
                <BulkDialog onBulkAdd={handleBulkAdd} />
                <button className="bg-white h-12 px-8 rounded-xl text-primary-green flex items-center gap-3 font-medium" onClick={addField}>
                  <Plus size={23} />
                  Add field
                </button>
              </div>
            </div>
          </section>
          <div className="mt-6">
            <h2 className="text-lg font-semibold">Location</h2>
            <div className="flex items-center gap-4 mt-2">
              <input
                type="text"
                className="h-12 bg-[#F2F2F2] rounded-xl text-primary-black px-5 w-full"
                placeholder="Enter country name"
                value={inputCountry}
                onChange={handleCountryInputChange}
              />

              <Link href="/app/plan/web-scraping/add-prospect" className="w-full max-w-fit">
                <button className="flex items-center gap-3 hover:bg-primary-green/10 sheen min-w-fit py-3 px-4 rounded-lg transition-all duration-300">
                  <Search className="text-primary-green" />
                  Add prospect manually
                </button>
              </Link>
            </div>
          </div>

          <div className="mt-8 relative z-[10]">
            <MapContainer center={center} zoom={zoom} style={{ width: "100%", height: "600px" }}>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              {places.map((place, index) => (
                <Marker key={index} position={[place.latitude, place.longitude]}>
                  <Popup>{place.title}</Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>

          {showTable && (
            <div className="rounded-lg border overflow-hidden mt-5 bg-white">
              <h2 className="text-3xl font-semibold mb-4 text-center p-4">Scraped Places</h2>
              <Table>
                <TableHeader>
                  <TableRow className="bg-[#0347370D]">
                    <TableHead className="text-xl">Business</TableHead>
                    <TableHead className="text-xl">Rating</TableHead>
                    <TableHead className="text-xl">Contact</TableHead>
                    <TableHead className="text-xl">URL</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {places.map((place, index) => (
                    <TableRow key={index}>
                      <TableCell className="flex flex-col">
                        <div className="text-xl font-semibold">{place?.title || "-"}</div>
                        <div className="text-lg">{place?.address || "-"}</div>
                      </TableCell>
                      <TableCell>
                        <div>{renderRatingStars(place?.rating || 0)}</div>
                        <div className="flex flex-row gap-4 text-md">
                          <h2 className=" font-semibold">{place?.rating || "-"} </h2> {"  "} {"  "} {"  "} {"  "}
                          <h2 className="text-sky-500">{place?.ratingCount || "-"}</h2>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-lg">{place?.phoneNumber || "-"}</div>
                      </TableCell>
                      <TableCell>
                        <div className="text-lg">{place?.website || "-"}</div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default WebScraping;
