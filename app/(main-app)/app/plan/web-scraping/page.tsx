"use client";

import Motion from "@/components/Motion";
import Spinner from "@/components/Spinner";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import instance from "@/config/axios.config";
import { API_URL } from "@/lib/api";
import clsx from "clsx";
import { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import { Plus, Search, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { Fragment, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { FaArrowCircleLeft } from "react-icons/fa";
import UseGoogleAutocomplete from "../hooks/UseGoogleAutocomplete";
import AddProspectModal from "./components/AddProspectModal";
import BulkDialog from "./components/BulkDialog";
import MapComponent from "./components/MapComponent";
import SaveProspects from "./components/SaveProspects";
import { renderRatingStars } from "./components/RatingStars";

const WebScraping: React.FC = () => {
  const [fields, setFields] = useState<{ id: number; value: string }[]>([{ id: 1, value: "" }]);
  const [count, setCount] = useState(1);
  const [bulkInput, setBulkInput] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [places, setPlaces] = useState<Place[]>([]);
  const [showTable, setShowTable] = useState(false);
  const [center, setCenter] = useState<LatLngExpression>([39.0997, -94.5786]);
  const [zoom, setZoom] = useState(6); // Default zoom level
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();
  const [currentPageNumber, setCurrentPageNumber] = useState(1); // Initial page number, adjust as per your application logic

  useEffect(() => {
    if (places.length > 0) {
      setCenter([places[0].latitude, places[0].longitude]);
      setZoom(20);
    }
  }, [places]);

  useEffect(() => {
    getGeoInfo();
  }, [(router as any).query]);

  const getGeoInfo = (countryName = "") => {
    let url = "https://ipapi.co/json/";
    if (countryName) {
      url = `https://restcountries.com/v3.1/name/${countryName}`;
    }
    instance
      .get(url)
      .then((response) => {
        let data = response.data;
        if (countryName) {
          data = data[0];
          setCenter([data.latitude, data.longitude]);
          setZoom(100);
        } else {
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

  const [fetchedResults, setFetchedResults] = useState<Array<Place[]>>([]);

  const handleBulkSubmit = async () => {
    const allTerms = [
      ...bulkInput
        .split(",")
        .map((term) => term.trim())
        .filter(Boolean),
      ...fields.map((field) => field.value.trim()).filter(Boolean),
    ];

    setIsPending(true);

    try {
      const postData = {
        queries: allTerms,
        country_code: countryCode,
        location: inputCountry,
        page: currentPageNumber,
      };
      const allResults = [];

      const response = await instance.post(`${API_URL}/ai/api/v1/webscrape`, postData);
      const places = response.data.data[0].places.map((place: Place) => ({
        title: place.title,
        address: place.address,
        phoneNumber: place.phoneNumber,
        rating: place.rating,
        ratingCount: place.ratingCount,
        website: place.website,
        latitude: place.latitude,
        longitude: place.longitude,
      }));
      allResults.push(...places);
      const updatedResults = [...fetchedResults];
      updatedResults[currentPageNumber - 1] = allResults;
      setFetchedResults(updatedResults);
      setPlaces(allResults);
      toast.success("Your data has been scrapped!");
      setShowTable(true);
    } catch (error) {
      console.error("Error sending data to API:", error);
      toast.error("There was an error processing your request!");
    } finally {
      setIsPending(false);
    }
  };

  const [inputCountry, setInputCountry] = useState<string>("");
  const [selectedOption, setSelectedOption] = useState<{
    label: string;
    value: string;
  } | null>(null);
  const { autocompleteInputRef } = UseGoogleAutocomplete({ setInputCountry });

  const handleCountryInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setInputCountry(value);
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if ((event.key === "Backspace" || event.key === "Delete") && inputCountry === "" && selectedOption !== null) {
      event.preventDefault();
      setSelectedOption(null);
    }
  };

  const handleProspectAdded = (newProspect: Place) => {
    setPlaces([...places, newProspect]);
    setShowTable(true);
  };

  const resultsPerPage = 10;
  const startIndex = (currentPageNumber - 1) * resultsPerPage;
  const endIndex = startIndex + resultsPerPage;
  const currentResults = places.slice(startIndex, endIndex);

  const handleNextPage = () => {
    setCurrentPageNumber(currentPageNumber + 1);
    handleBulkSubmit();
  };

  const handlePreviousPage = () => {
    if (currentPageNumber > 1) {
      setCurrentPageNumber(currentPageNumber - 1);

      const previousPageResults = fetchedResults[currentPageNumber - 2];
      if (previousPageResults) {
        setPlaces(previousPageResults);
      } else {
        console.warn(`No results found for page ${currentPageNumber - 1}`);
      }
    } else {
      console.warn("Already on the first page");
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
              <button className=" h-12 px-7 rounded-xl text-primary-green flex items-center gap-3 font-medium"></button>
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
            <div className="flex items-center gap-4 mt-2 bg-[#F2F2F2] p-2 rounded-xl">
              <Search className="text-primary-green/80 ml-4" />
              <input
                ref={autocompleteInputRef}
                type="text"
                className="h-12 bg-transparent text-primary-black w-full"
                placeholder="Enter country name"
                value={selectedOption ? selectedOption.label : inputCountry}
                onChange={handleCountryInputChange}
                onKeyDown={handleInputKeyDown}
              />
              <AddProspectModal onProspectAdded={handleProspectAdded} />
            </div>

            {selectedOption && (
              <div className="mt-4">
                <h3 className="text-lg font-medium">Selected Country</h3>
                <div className="mt-2 bg-[#F2F2F2] p-2 rounded-xl">
                  <p className="text-primary-black">{selectedOption.label}</p>
                </div>
              </div>
            )}
          </div>

          <div className="mt-8 relative min-h-[600px] bg-gray-100">
            <MapComponent places={places} />
          </div>

          <button
            onClick={handleBulkSubmit}
            disabled={isPending}
            className={clsx(
              "mx-auto mt-4 w-[160px] h-14 text-xl flex items-center justify-center bg-primary-green rounded-xl sheen text-white",
              isPending && "bg-opacity-90"
            )}>
            {isPending ? <Spinner /> : "Start"}
            <FaArrowCircleLeft className="rotate-180 text-white ml-4" />
          </button>

          {showTable && (
            <Motion
              transition={{ duration: 0.2 }}
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
              classNames="rounded-3xl border overflow-hidden mt-5 bg-white">
              <h1 className="text-2xl font-semibold my-4 text-center p-4">Scraped Places</h1>
              <Table>
                <TableHeader>
                  <TableRow className="bg-[#0347370D]">
                    <TableHead>Business</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>URL</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {!isPending && currentResults.length < 1 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-lg text-center h-48">
                        <h1>No results found</h1>
                      </TableCell>
                    </TableRow>
                  ) : isPending ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-lg text-center h-48">
                        <h1>Loading...</h1>
                      </TableCell>
                    </TableRow>
                  ) : (
                    currentResults.map((place, index) => (
                      <TableRow key={index}>
                        <TableCell className="flex flex-col min-w-[400px]">
                          <div className="text-base font-semibold">{place?.title || "—"}</div>
                          <div className="mt-1">{place?.address || "—"}</div>
                        </TableCell>
                        <TableCell className="min-w-[220px] max-w-[220px]">
                          {place?.rating && <div>{renderRatingStars(place?.rating || 0)}</div>}
                          <div className="flex flex-row justify-between gap-4 text-md mt-1">
                            <h2 className="font-semibold">{place?.rating || "—"} </h2>
                            <h2 className="text-sky-500 mr-20">{place?.ratingCount ? place.ratingCount.toLocaleString() + " Ratings" : "—"}</h2>
                          </div>
                        </TableCell>
                        <TableCell className="min-w-[200px]">
                          <div className="text-[14px] flex whitespace-nowrap">{place?.phoneNumber || "—"}</div>
                        </TableCell>
                        <TableCell>
                          {place.website ? (
                            <Link href={place?.website} target="_blank" rel="noopener noreferrer" className="underline text-blue-600">
                              {place.website}
                            </Link>
                          ) : (
                            "—"
                          )}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
              <div className="flex justify-between p-5">
                <button
                  onClick={handlePreviousPage}
                  disabled={currentPageNumber === 1}
                  className={clsx(
                    "mt-4 w-[160px] h-14 text-lg flex items-center justify-center bg-primary-green rounded-xl sheen text-white",
                    currentPageNumber === 1 && "cursor-not-allowed opacity-50"
                  )}>
                  <FaArrowCircleLeft className="-rotate-270 text-white text-lg mr-4" /> Previous
                </button>
                <button
                  onClick={handleNextPage}
                  className=" mt-4 w-[160px] h-14 text-lg flex items-center justify-center bg-primary-green rounded-xl sheen text-white">
                  Next <FaArrowCircleLeft className="rotate-180 text-white text-lg ml-4" />
                </button>
              </div>
            </Motion>
          )}
          {showTable && <SaveProspects places={places} />}
        </div>
      </div>
    </Fragment>
  );
};

export default WebScraping;
