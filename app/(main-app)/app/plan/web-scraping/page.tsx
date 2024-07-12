"use client";
import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { Plus, Search, X } from "lucide-react";
import axios from "axios";
import { API_URL } from "@/lib/api";
import "leaflet/dist/leaflet.css";
import { LatLngExpression } from "leaflet"; // Import LatLngExpression instead
import BulkDialog from "./components/BulkDialog";
import Link from "next/link";
import { Table, TableBody, TableCell, TableHeader, TableHead, TableRow } from "@/components/ui/table";
import dynamic from "next/dynamic";
import Motion from "@/components/Motion";
import Spinner from "@/components/Spinner";
import { toast } from "react-hot-toast";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { ArrowRight } from "lucide-react";
import { LoadScript, GoogleMap } from "@react-google-maps/api";
import React from "react";
import { FaArrowCircleLeft } from "react-icons/fa";

const MapContainer = dynamic(() => import("react-leaflet").then((module) => module.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then((module) => module.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then((module) => module.Marker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then((module) => module.Popup), { ssr: false });

interface AddProspectProps {
  isOpen: boolean;
  onClose: () => void;
  onProspectAdded: (newProspect: Place) => void; // Callback to add new prospect to the list

}

const AddProspectModal: React.FC<AddProspectProps> = ({ isOpen, onClose, onProspectAdded }) => {
  const [prospects, setProspects] = useState<Place[]>([]); // State to manage prospect data
const [showTable, setShowTable] = useState(false); // State to control table visibility

  const [formData, setFormData] = useState({
    businessName: '',
    phoneNumber: '',
    address: '',
    city: '',
    state: '',
    country: '',
    zipCode: '',
    website: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });

  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Add any necessary initialization logic here
    }
  }, [isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    const newProspect: Place = {
      latitude: 0, // Replace with actual latitude
      longitude: 0, // Replace with actual longitude
      title: formData.businessName,
      address: formData.address,
      phoneNumber: formData.phoneNumber,
      rating: 0, // Replace with actual rating if available
      ratingCount: 0, // Replace with actual rating count if available
      website: formData.website,
      category: "Custom", // Replace with actual category if available
    };
    onProspectAdded(newProspect);
    setProspects([...prospects, newProspect]);
    setFormData({
      businessName: '',
      phoneNumber: '',
      address: '',
      city: '',
      state: '',
      country: '',
      zipCode: '',
      website: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
    });
    // Update prospects state with new prospect
  
    console.log('Form Data:', newProspect); // Log form data to console

    // Toggle showTable to true to display the table
    setShowTable(true);
  
    onClose(); 

  
  };


  return (
    <>
         {isOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="flex-1 h-full w-full flex justify-center items-center mt-10 mb-20">
            <div className="w-full max-w-3xl bg-white border border-[#EDEFF0] rounded-3xl shadow-box p-10">
              <h1 className="text-xl font-semibold border-b border-[#EDEFF0] pb-4">Add prospect</h1>
              <div className="mt-4 flex flex-col gap-5">
                {/* Form fields */}
                <div className="space-y-2">
                  <label className="font-medium">
                    Business name <span className="text-[#F00]">*</span>
                  </label>
                  <Input
                    type="text"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleChange}
                    placeholder="Type your Business name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-medium">
                    Business phone number <span className="text-[#F00]">*</span>
                  </label>
                  <Input
                    type="text"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="Type your phone number"
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-medium">
                    Address <span className="text-[#F00]">*</span>
                  </label>
                  <Input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Type Business Address"
                  />
                </div>
                <div className="grid grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="font-medium">
                      City <span className="text-[#F00]">*</span>
                    </label>
                    <Input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="Type City"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="font-medium">
                      State <span className="text-[#F00]">*</span>
                    </label>
                    <Input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      placeholder="Type State"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="font-medium">
                      Country <span className="text-[#F00]">*</span>
                    </label>
                    <Select>
                    <SelectTrigger className="w-full border-none">
                        <span className="relative">
                          <SelectValue
                            // value={}
                            // onChange={handleChange}
                            // name="country"
                            placeholder="Country"
                          />
                        </span>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sunday">Sunday</SelectItem>
                        <SelectItem value="monday">Monday</SelectItem>
                        <SelectItem value="wednesday">Wednesday</SelectItem>
                        <SelectItem value="thursday">Thursday</SelectItem>
                        <SelectItem value="friday">Friday</SelectItem>
                        <SelectItem value="saturday">Saturday</SelectItem>
                        <SelectItem value="sunday">Sunday</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="font-medium">
                      Zip code <span className="text-[#F00]">*</span>
                    </label>
                    <Input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                      placeholder="Type Zip code"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="font-medium">
                    Website <span className="text-[#F00]">*</span>
                  </label>
                  <Input
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    placeholder="Type Website URL"
                  />
                </div>

                {/* Point of contact section */}
                <div className="flex items-center gap-3">
                  <Switch checked={isChecked} onCheckedChange={() => setIsChecked((prev) => !prev)} />
                  Do you have a point of contact at this business?
                </div>
                {isChecked && (
                  <div className="grid grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="font-medium">First name</label>
                      <Input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="Type First name"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="font-medium">Last name</label>
                      <Input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Type Last name"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="font-medium">Email</label>
                      <Input
                        type="text"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Type Email"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="font-medium">Phone</label>
                      <Input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Type Phone"
                      />
                    </div>
                  </div>
                )}

                {/* Buttons */}
                <div className="flex justify-end gap-4 w-full">
                <button
                    className="py-3.5 h-14 w-full max-w-[140px] px-6 bg-white border text-primary-green border-primary-green  rounded-xl mt-6"
                    onClick={() => {
                      // Reset form logic if needed
                      setFormData({
                        businessName: '',
                        phoneNumber: '',
                        address: '',
                        city: '',
                        state: '',
                        country: '',
                        zipCode: '',
                        website: '',
                        firstName: '',
                        lastName: '',
                        email: '',
                        phone: '',
                      });
                    }}
                  >
                    Reset
                  </button>
                  <button
                    className="py-3.5 h-14 w-full max-w-[200px] px-6 bg-primary-green sheen rounded-xl text-white mt-6 flex items-center justify-center gap-3 whitespace-nowrap"
                    onClick={handleSubmit}
                  >
                    Save Prospect{' '}
                    <span className="relative p-2 text-primary-green bg-white rounded-full">
                      <ArrowRight size={20} />
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </>
  );
}
interface Place {
  latitude: number;
  longitude: number;
  title: string;
  address: string;
  phoneNumber: string;
  rating: number;
  ratingCount: number;
  website: string;
  category: string;
}

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

  // const handleProspectAdded = (newProspect: Place) => {
  //   // Update places state with the new prospect
  //   setPlaces([...places, newProspect]);
  //   setShowTable(true); // Show the table after adding a prospect
  // };
  useEffect(() => {
    if (places.length > 0) {
      setCenter([places[0].latitude, places[0].longitude]);
      console.log(center);
      setZoom(20); // Adjust zoom level if needed
    }
  }, [places]);

  useEffect(() => {
    getGeoInfo();
    // Access and log query parameters from URL
    console.log("Query params from URL:", (router as any).query);
  }, [ (router as any).query]);

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
          setCenter([data.latitude, data.longitude]); // Update map center based on fetched coordinates
          setZoom(100); // Adjust zoom level if needed
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

  // const handleCountryInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setInputCountry(e.target.value);
  // };

  const handleCountrySearch = (e: { preventDefault: () => void; }) => {
    e.preventDefault(); // Prevents default form submission
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

    setIsPending(true);
    try {
      const postData = {
        queries: allTerms,
        country_code: countryCode,
        location: inputCountry, // Include inputCountry in the payload
      };

      const response = await axios.post(`${API_URL}/ai/api/v1/webscrape`, postData);
      console.log("resposne",response);
      setPlaces(
        response.data.data[0].places.map((place: Place) => ({
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
      toast.success("Your data has been scrapped!");
      setShowTable(true);
    } catch (error) {
      console.error("Error sending data to API:", error);
      toast.error("There was an error processing your request!");
    } finally {
      setIsPending(false);
    }
  };
console.log("places",places);
  const renderRatingStars = (rating: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i} style={{ color: i < rating ? "#FFD700" : "#E0E0E0", fontSize: "25px" }}>
          ★
        </span>
      );
    }
    return <div>{stars}</div>;
  };
  interface OptionType {
    label: string;
    value: string;
}

// const [inputCountry, setInputCountry] = useState<string>(''); // State for input value
// const [filteredCountries, setFilteredCountries] = useState<string[]>([]); // State for filtered countries
const [isModalOpen2, setIsModalOpen2] = useState<boolean>(false); // State for modal open/close
const [selectedCountry, setSelectedCountry] = useState(null); // State to store selected country

  // const [selectedOption, setSelectedOption] = useState<OptionType | null>(null); // Explicitly type selectedOption
  const countries: OptionType[] = [
    { label: 'Argentina', value: 'argentina' },
        { label: 'Australia', value: 'australia' },
        { label: 'Brazil', value: 'brazil' },
        { label: 'Canada', value: 'canada' },
        { label: 'China', value: 'china' },
        { label: 'France', value: 'france' },
        { label: 'Germany', value: 'germany' },
        { label: 'India', value: 'india' },
        { label: 'Japan', value: 'japan' },
        { label: 'Mexico', value: 'mexico' },
        { label: 'Russia', value: 'russia' },
        { label: 'South Africa', value: 'south-africa' },
        { label: 'United Kingdom', value: 'uk' },
        { label: 'United States', value: 'usa' }
    ]; // Array of country options

    const handleSelectChange = (selectedOption: any): void => {
      setSelectedOption(selectedOption); // Update selectedOption state
  };
 const [inputCountry, setInputCountry] = useState<string>(''); // State for input value
    const [filteredCountries, setFilteredCountries] = useState<OptionType[]>([]); // State for filtered countries
    const [selectedOption, setSelectedOption] = useState<OptionType | null>(null); // State for selected country
    // const [places, setPlaces] = useState<any[]>([]); // State for places (dummy data)

    // Function to handle country input change
    const handleCountryInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const { value } = event.target;
        setInputCountry(value);

        // Filter countries based on input value
        const filtered = countries.filter(country =>
            country.label.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredCountries(filtered);
    };

    // Function to handle when a country is selected from the filtered list
    const handleFilteredCountrySelect = (country: OptionType): void => {
        setSelectedOption(country); // Set the selected country object
        setInputCountry(country.label); // Set the input field value to the selected country label
        setFilteredCountries([]); // Clear filtered countries list

        // Example logic to fetch data or perform actions based on selected country
        // Replace with your actual implementation
        const fetchDataForCountry = () => {
            // Here you can fetch data or perform any necessary actions based on selectedOption.value or selectedOption.label
            console.log(`Fetching data for ${country.label}`);
            // Example: fetch(`/api/data/${country.value}`).then(response => response.json()).then(data => console.log(data));
        };

        fetchDataForCountry();
    };

const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if ((event.key === 'Backspace' || event.key === 'Delete') && inputCountry === '' && selectedOption !== null) {
        event.preventDefault(); // Prevent default behavior of Backspace/Delete in input field
        setSelectedOption(null); // Clear selected country if input is empty and user presses backspace/delete
    }
};

  // Function to open modal
  const openModal2 = () => {
      setIsModalOpen2(true);
  };

  // Function to close modal
  const closeModal2 = () => {
      setIsModalOpen2(false);
  };

  // Function to handle adding prospect (dummy function for demo)
  const handleProspectAdded = () => {
      // Implement logic to add prospect here
      console.log('Prospect added');
      closeModal(); // Close modal after adding prospect
  };
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  console.log("places2",places);

  const MyMapComponent = () => {
    const mapRef = useRef<google.maps.Map | null>(null);
    const mapContainerStyle = {
      width: '100%',
      height: '600px',
    };
  
    const center = {
      lat: -33.89,
      lng: 151.274,
    };
  
    const zoom = 10;
  
    const customMarkerIcon = "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";
  
    const onLoad = useCallback((map: google.maps.Map) => {
      mapRef.current = map;
  
      if (!places || places.length === 0) {
        return;
      }
  
      const bounds = new window.google.maps.LatLngBounds();
  
      places.forEach((place) => {
        const { latitude, longitude } = place;
        const position = new window.google.maps.LatLng(latitude, longitude);
        bounds.extend(position);
  
        new window.google.maps.Marker({
          position,
          map: mapRef.current,
          icon: customMarkerIcon,
        });
      });
  
      mapRef.current?.fitBounds(bounds);
  
      const maxZoom = 15;
      mapRef.current?.addListener('zoom_changed', () => {
  const currentZoom = mapRef.current?.getZoom();
  if (currentZoom !== undefined && currentZoom > maxZoom) {
    mapRef.current?.setZoom(maxZoom);
  }
});

  
    }, [places]);
  
    const onUnmount = useCallback(() => {
      mapRef.current = null;
    }, []);
  
    return (
      <LoadScript googleMapsApiKey="AIzaSyB8uvaGZVlIgN8HaF4zU72wBeMIYmCBVwo">
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={zoom}
          onLoad={onLoad}
          onUnmount={onUnmount}
        />
      </LoadScript>
    );
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
            <div className="flex items-center gap-4 mt-2 bg-[#F2F2F2] p-2 rounded-xl">
                <Search className="text-primary-green/80 ml-4" />
                <input
    type="text"
    className="h-12 bg-transparent text-primary-black w-full"
    placeholder="Enter country name"
    value={selectedOption ? selectedOption.label : inputCountry}
    onChange={handleCountryInputChange}
    onKeyDown={handleInputKeyDown}

/>
                <button
                    onClick={openModal2}
                    className="flex items-center gap-3 hover:bg-primary-green/10 sheen min-w-fit py-3 px-4 rounded-lg transition-all duration-300"
                >
                    Add prospect manually
                </button>
            </div>

         {filteredCountries.length > 0 && (
                            <div className="mt-4 border border-gray-200 rounded-md shadow-md p-4">
                                <h3 className="text-lg font-medium mb-2">Filtered Countries</h3>
                                <ul className="list-disc list-inside">
                                    {filteredCountries.map((country, index) => (
                                        <li
                                            key={index}
                                            className="text-primary-black mb-1 cursor-pointer"
                                            onClick={() => handleFilteredCountrySelect(country)}
                                        >
                                            {country.label}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Display selected country */}
                        {selectedOption && (
                            <div className="mt-4">
                                <h3 className="text-lg font-medium">Selected Country</h3>
                                <div className="mt-2 bg-[#F2F2F2] p-2 rounded-xl">
                                    <p className="text-primary-black">{selectedOption.label}</p>
                                </div>
                            </div>
                        )}

            {/* Modal for adding prospect */}
            <AddProspectModal isOpen={isModalOpen2} onClose={closeModal2} onProspectAdded={handleProspectAdded} />
        </div>

          <div className="mt-8 relative z-[10]">
           <MyMapComponent  />
          </div>
          <button
            onClick={handleBulkSubmit}
            disabled={isPending}
            className={clsx(
              "mx-auto mt-4 w-[200px] h-14  text-2xl flex items-center justify-center bg-primary-green rounded-xl sheen text-white",
              isPending && "bg-opacity-90"
            )}>
            {isPending ? <Spinner /> : "Start"}<FaArrowCircleLeft className="rotate-180 text-white text-2xl ml-4" />
          </button>

          {showTable && (
            <Motion
              transition={{ duration: 0.2 }}
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
              classNames="rounded-lg border overflow-hidden mt-5 bg-white">
              <h2 className="text-xl font-semibold mb-4 text-center p-4">Scraped Places</h2>
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
                  {places.map((place, index) => (
                    
                    <TableRow key={index}>
                      <TableCell className="flex flex-col">
                        <div className="text-base font-semibold">{place?.title || "-"}</div>
                        <div className="mt-1">{place?.address || "-"}</div>
                      </TableCell>
                      <TableCell>
                        <div>{renderRatingStars(place?.rating || 0)}</div>
                        <div className="flex flex-row justify-between gap-4 text-md mt-1">
                          <h2 className=" font-semibold">{place?.rating || "-"} </h2>
                          <h2 className="text-sky-500 mr-20">{place?.ratingCount ? place.ratingCount.toLocaleString() + " Ratings" : "-"}</h2>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>{place?.phoneNumber || "-"}</div>
                      </TableCell>
                      <TableCell>
                        {place.website ? (
                          <Link href={place?.website} target="_blank" rel="noopener noreferrer" className="underline text-blue-600">
                            {place?.website}
                          </Link>
                        ) : (
                          "-"
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Motion>
          )}
            {showTable && (
        <button
          className={clsx(
            'mx-auto mt-4 w-[200px] h-14 flex items-center justify-center bg-primary-green rounded-xl sheen text-white',
            isPending && 'bg-opacity-90'
          )}
        >
          Save<FaArrowCircleLeft className="rotate-180 text-white text-2xl ml-4" />

        </button>
      )}
        </div>
      </div>
    </Fragment>
  );
};

export default WebScraping;
