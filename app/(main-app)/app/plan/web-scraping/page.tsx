// web scraping done
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
    // phoneNumber: 2334,
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
      // phoneNumber: formData.phoneNumber,
      rating: 0, // Replace with actual rating if available
      ratingCount: 0, // Replace with actual rating count if available
      website: formData.website,
      category: "Custom", // Replace with actual category if available
    };
    onProspectAdded(newProspect);
    setProspects([...prospects, newProspect]);
    setFormData({
      businessName: '',
      // phoneNumber: 2344,
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
                {/* <div className="space-y-2">
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
                </div> */}
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
                        <SelectItem value="monday">Afghanistan</SelectItem>
                        <SelectItem value="wednesday">Albania</SelectItem>
                        <SelectItem value="thursday">Algeria</SelectItem>
                        <SelectItem value="friday">Andorra</SelectItem>
                        <SelectItem value="saturday">Angola</SelectItem>
                        <SelectItem value="sunday">Anguilla</SelectItem>
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
                        // phoneNumber: 2344,
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
  // phoneNumber: number;
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
  }, [(router as any).query]);

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
      console.log("resposne", response);
      setPlaces(
        response.data.data[0].places.map((place: Place) => ({
          title: place.title,
          address: place.address,
          // phoneNumber: place.phoneNumber,
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
  // console.log("placesCollected", places);
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
    { label: 'Afghanistan', value: 'afghanistan' },
    { label: 'Albania', value: 'albania' },
    { label: 'Algeria', value: 'algeria' },
    { label: 'Andorra', value: 'andorra' },
    { label: 'Angola', value: 'angola' },
    { label: 'Antigua and Barbuda', value: 'antigua-and-barbuda' },
    { label: 'Argentina', value: 'argentina' },
    { label: 'Armenia', value: 'armenia' },
    { label: 'Australia', value: 'australia' },
    { label: 'Austria', value: 'austria' },
    { label: 'Azerbaijan', value: 'azerbaijan' },
    { label: 'Bahamas', value: 'bahamas' },
    { label: 'Bahrain', value: 'bahrain' },
    { label: 'Bangladesh', value: 'bangladesh' },
    { label: 'Barbados', value: 'barbados' },
    { label: 'Belarus', value: 'belarus' },
    { label: 'Belgium', value: 'belgium' },
    { label: 'Belize', value: 'belize' },
    { label: 'Benin', value: 'benin' },
    { label: 'Bhutan', value: 'bhutan' },
    { label: 'Bolivia', value: 'bolivia' },
    { label: 'Bosnia and Herzegovina', value: 'bosnia-and-herzegovina' },
    { label: 'Botswana', value: 'botswana' },
    { label: 'Brazil', value: 'brazil' },
    { label: 'Brunei', value: 'brunei' },
    { label: 'Bulgaria', value: 'bulgaria' },
    { label: 'Burkina Faso', value: 'burkina-faso' },
    { label: 'Burundi', value: 'burundi' },
    { label: 'Cabo Verde', value: 'cabo-verde' },
    { label: 'Cambodia', value: 'cambodia' },
    { label: 'Cameroon', value: 'cameroon' },
    { label: 'Canada', value: 'canada' },
    { label: 'Central African Republic', value: 'central-african-republic' },
    { label: 'Chad', value: 'chad' },
    { label: 'Chile', value: 'chile' },
    { label: 'China', value: 'china' },
    { label: 'Colombia', value: 'colombia' },
    { label: 'Comoros', value: 'comoros' },
    { label: 'Congo', value: 'congo' },
    { label: 'Costa Rica', value: 'costa-rica' },
    { label: 'Croatia', value: 'croatia' },
    { label: 'Cuba', value: 'cuba' },
    { label: 'Cyprus', value: 'cyprus' },
    { label: 'Czech Republic', value: 'czech-republic' },
    { label: 'Denmark', value: 'denmark' },
    { label: 'Djibouti', value: 'djibouti' },
    { label: 'Dominica', value: 'dominica' },
    { label: 'Dominican Republic', value: 'dominican-republic' },
    { label: 'Ecuador', value: 'ecuador' },
    { label: 'Egypt', value: 'egypt' },
    { label: 'El Salvador', value: 'el-salvador' },
    { label: 'Equatorial Guinea', value: 'equatorial-guinea' },
    { label: 'Eritrea', value: 'eritrea' },
    { label: 'Estonia', value: 'estonia' },
    { label: 'Eswatini', value: 'eswatini' },
    { label: 'Ethiopia', value: 'ethiopia' },
    { label: 'Fiji', value: 'fiji' },
    { label: 'Finland', value: 'finland' },
    { label: 'France', value: 'france' },
    { label: 'Gabon', value: 'gabon' },
    { label: 'Gambia', value: 'gambia' },
    { label: 'Georgia', value: 'georgia' },
    { label: 'Germany', value: 'germany' },
    { label: 'Ghana', value: 'ghana' },
    { label: 'Greece', value: 'greece' },
    { label: 'Grenada', value: 'grenada' },
    { label: 'Guatemala', value: 'guatemala' },
    { label: 'Guinea', value: 'guinea' },
    { label: 'Guinea-Bissau', value: 'guinea-bissau' },
    { label: 'Guyana', value: 'guyana' },
    { label: 'Haiti', value: 'haiti' },
    { label: 'Honduras', value: 'honduras' },
    { label: 'Hungary', value: 'hungary' },
    { label: 'Iceland', value: 'iceland' },
    { label: 'India', value: 'india' },
    { label: 'Indonesia', value: 'indonesia' },
    { label: 'Iran', value: 'iran' },
    { label: 'Iraq', value: 'iraq' },
    { label: 'Ireland', value: 'ireland' },
    { label: 'Israel', value: 'israel' },
    { label: 'Italy', value: 'italy' },
    { label: 'Jamaica', value: 'jamaica' },
    { label: 'Japan', value: 'japan' },
    { label: 'Jordan', value: 'jordan' },
    { label: 'Kazakhstan', value: 'kazakhstan' },
    { label: 'Kenya', value: 'kenya' },
    { label: 'Kiribati', value: 'kiribati' },
    { label: 'Kuwait', value: 'kuwait' },
    { label: 'Kyrgyzstan', value: 'kyrgyzstan' },
    { label: 'Laos', value: 'laos' },
    { label: 'Latvia', value: 'latvia' },
    { label: 'Lebanon', value: 'lebanon' },
    { label: 'Lesotho', value: 'lesotho' },
    { label: 'Liberia', value: 'liberia' },
    { label: 'Libya', value: 'libya' },
    { label: 'Liechtenstein', value: 'liechtenstein' },
    { label: 'Lithuania', value: 'lithuania' },
    { label: 'Luxembourg', value: 'luxembourg' },
    { label: 'Madagascar', value: 'madagascar' },
    { label: 'Malawi', value: 'malawi' },
    { label: 'Malaysia', value: 'malaysia' },
    { label: 'Maldives', value: 'maldives' },
    { label: 'Mali', value: 'mali' },
    { label: 'Malta', value: 'malta' },
    { label: 'Marshall Islands', value: 'marshall-islands' },
    { label: 'Mauritania', value: 'mauritania' },
    { label: 'Mauritius', value: 'mauritius' },
    { label: 'Mexico', value: 'mexico' },
    { label: 'Micronesia', value: 'micronesia' },
    { label: 'Moldova', value: 'moldova' },
    { label: 'Monaco', value: 'monaco' },
    { label: 'Mongolia', value: 'mongolia' },
    { label: 'Montenegro', value: 'montenegro' },
    { label: 'Morocco', value: 'morocco' },
    { label: 'Mozambique', value: 'mozambique' },
    { label: 'Myanmar', value: 'myanmar' },
    { label: 'Namibia', value: 'namibia' },
    { label: 'Nauru', value: 'nauru' },
    { label: 'Nepal', value: 'nepal' },
    { label: 'Netherlands', value: 'netherlands' },
    { label: 'New Zealand', value: 'new-zealand' },
    { label: 'Nicaragua', value: 'nicaragua' },
    { label: 'Niger', value: 'niger' },
    { label: 'Nigeria', value: 'nigeria' },
    { label: 'North Korea', value: 'north-korea' },
    { label: 'North Macedonia', value: 'north-macedonia' },
    { label: 'Norway', value: 'norway' },
    { label: 'Oman', value: 'oman' },
    { label: 'Pakistan', value: 'pakistan' },
    { label: 'Palau', value: 'palau' },
    { label: 'Palestine', value: 'palestine' },
    { label: 'Panama', value: 'panama' },
    { label: 'Papua New Guinea', value: 'papua-new-guinea' },
    { label: 'Paraguay', value: 'paraguay' },
    { label: 'Peru', value: 'peru' },
    { label: 'Philippines', value: 'philippines' },
    { label: 'Poland', value: 'poland' },
    { label: 'Portugal', value: 'portugal' },
    { label: 'Qatar', value: 'qatar' },
    { label: 'Romania', value: 'romania' },
    { label: 'Russia', value: 'russia' },
    { label: 'Rwanda', value: 'rwanda' },
    { label: 'Saint Kitts and Nevis', value: 'saint-kitts-and-nevis' },
    { label: 'Saint Lucia', value: 'saint-lucia' },
    { label: 'Saint Vincent and the Grenadines', value: 'saint-vincent-and-the-grenadines' },
    { label: 'Samoa', value: 'samoa' },
    { label: 'San Marino', value: 'san-marino' },
    { label: 'Sao Tome and Principe', value: 'sao-tome-and-principe' },
    { label: 'Saudi Arabia', value: 'saudi-arabia' },
    { label: 'Senegal', value: 'senegal' },
    { label: 'Serbia', value: 'serbia' },
    { label: 'Seychelles', value: 'seychelles' },
    { label: 'Sierra Leone', value: 'sierra-leone' },
    { label: 'Singapore', value: 'singapore' },
    { label: 'Slovakia', value: 'slovakia' },
    { label: 'Slovenia', value: 'slovenia' },
    { label: 'Solomon Islands', value: 'solomon-islands' },
    { label: 'Somalia', value: 'somalia' },
    { label: 'South Africa', value: 'south-africa' },
    { label: 'South Korea', value: 'south-korea' },
    { label: 'South Sudan', value: 'south-sudan' },
    { label: 'Spain', value: 'spain' },
    { label: 'Sri Lanka', value: 'sri-lanka' },
    { label: 'Sudan', value: 'sudan' },
    { label: 'Suriname', value: 'suriname' },
    { label: 'Sweden', value: 'sweden' },
    { label: 'Switzerland', value: 'switzerland' },
    { label: 'Syria', value: 'syria' },
    { label: 'Taiwan', value: 'taiwan' },
    { label: 'Tajikistan', value: 'tajikistan' },
    { label: 'Tanzania', value: 'tanzania' },
    { label: 'Thailand', value: 'thailand' },
    { label: 'Timor-Leste', value: 'timor-leste' },
    { label: 'Togo', value: 'togo' },
    { label: 'Tonga', value: 'tonga' },
    { label: 'Trinidad and Tobago', value: 'trinidad-and-tobago' },
    { label: 'Tunisia', value: 'tunisia' },
    { label: 'Turkey', value: 'turkey' },
    { label: 'Turkmenistan', value: 'turkmenistan' },
    { label: 'Tuvalu', value: 'tuvalu' },
    { label: 'Uganda', value: 'uganda' },
    { label: 'Ukraine', value: 'ukraine' },
    { label: 'United Arab Emirates', value: 'united-arab-emirates' },
    { label: 'United Kingdom', value: 'united-kingdom' },
    { label: 'United States', value: 'united-states' },
    { label: 'Uruguay', value: 'uruguay' },
    { label: 'Uzbekistan', value: 'uzbekistan' },
    { label: 'Vanuatu', value: 'vanuatu' },
    { label: 'Vatican City', value: 'vatican-city' },
    { label: 'Venezuela', value: 'venezuela' },
    { label: 'Vietnam', value: 'vietnam' },
    { label: 'Yemen', value: 'yemen' },
    { label: 'Zambia', value: 'zambia' },
    { label: 'Zimbabwe', value: 'zimbabwe' }
  ]; // Array of country options

  const handleSelectChange = (selectedOption: any): void => {
    setSelectedOption(selectedOption); // Update selectedOption state
  };
  const [inputCountry, setInputCountry] = useState<string>(''); // State for input value
  const [filteredCountries, setFilteredCountries] = useState<OptionType[]>([]); // State for filtered countries
  const [selectedOption, setSelectedOption] = useState<OptionType | null>(null); // State for selected country
  // const [places, setPlaces] = useState<any[]>([]); // State for places (dummy data)

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


    const fetchDataForCountry = () => {

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
  const handleProspectAdded = (newProspect: Place) => {
    // Update places state with the new prospect
    setPlaces([...places, newProspect]);
    setShowTable(true); // Show the table after adding a prospect
  };
  const SaveButton = () => {
    const [isPending, setIsPending] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [fileTitle, setFileTitle] = useState('');
  // console.log("placesCollected", places);
 const handleSave = async () => {
    setIsPending(true);

    try {
      const businesses = places.map(place => ({
        business_name: place.title,
        // business_phone_number: place.phoneNumber,
        address: place.address,
        rating: place.rating,
        rating_count: place.ratingCount,
        country: "India", // Replace with actual country data if available
        state: "haryana",   // Replace with actual state data if available
        city: "Gurgaon",    // Replace with actual city data if available
        zip_code: "12117", // Replace with actual zip code if available
        website: place.website || "",
        business_contact: {
          first_name: "Swapnil",   // Replace with actual contact data if available
          last_name: "Amin",    // Replace with actual contact data if available
          email: "swapnil@webbuddy.agency",        // Replace with actual contact data if available
          phone: "478174892415" // Replace with actual contact data if available
        }
      }));

      const data = {
        title: fileTitle,
        businesses: businesses
      };

      console.log('Sending data:', data);

      const response = await axios.post(`${API_URL}/users/api/v1/contacts/prospects/save`, data);
      console.log('Response:', response.data);
      toast.success('Data saved successfully!');
    } catch (error) {
      console.error('Error:', error);
      // Handle error (e.g., show an error message)
      toast.error('Failed to save data. Please try again.');
    } finally {
      setIsPending(false);
      setIsModalOpen(false);  // Close the modal after saving
    }
  };


    const openModal = () => {
      setIsModalOpen(true);
    };

    const handleTitleChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
      setFileTitle(e.target.value);
    };

    const handleModalSubmit = () => {
      if (fileTitle.trim() === '') {
        alert('Title is required.');
        return;
      }
      handleSave();
    };

    return (
      <div>
        <button
          className={clsx(
            'mx-auto mt-4 w-[200px] h-14 flex items-center justify-center bg-primary-green rounded-xl sheen text-white',
            isPending && 'bg-opacity-90'
          )}
          onClick={openModal}
          disabled={isPending}
        >
          Save 
          <FaArrowCircleLeft className="rotate-180 text-white text-2xl ml-4" />
        </button>

        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded-md">
              <h2 className="mb-4 text-lg font-semibold">Enter Title</h2>
              <input
                type="text"
                value={fileTitle}
                onChange={handleTitleChange}
                className="w-full p-2 mb-4 border rounded-md"
                placeholder="Enter file title"
              />
              <div className="flex justify-end z-[40] relative">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 mr-2 text-sm text-white bg-gray-500 rounded-md"
                >
                  Cancel
                </button>
                <button
                  onClick={handleModalSubmit}
                  className="px-4 py-2 text-sm text-white bg-primary-green rounded-md"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  console.log("places2", places);

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
    const svgMarker = {
      path: "M-1.547 12l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM0 0q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z",
      fillColor: "red",
      fillOpacity: 0.6,
      strokeWeight: 0,
      rotation: 0,
      scale: 2,
    };
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
          icon: svgMarker,
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
            <MyMapComponent />
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
                      {/* <TableCell>
                        <div>{place?.phoneNumber || "9876543212"}</div>
                      </TableCell> */}
                      <TableCell>
                        {place.website ? (
                          <Link href={place?.website} target="_blank" rel="noopener noreferrer" className="underline text-blue-600">
                            {place?.website}
                          </Link>
                        ) : (
                          "https://picsum.photos/200/300"
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Motion>
          )}
          {showTable && <SaveButton />}

        </div>
      </div>
    </Fragment>
  );
};

export default WebScraping;


