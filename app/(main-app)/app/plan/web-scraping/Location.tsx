import { Fragment, SetStateAction, useState, useEffect } from "react";
import { Search } from "lucide-react";
import Link from "next/link";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

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

  useEffect(() => {
    if (places.length > 0) {
      setLocation(`${places[0].title}, ${places[0].address}`); // Set initial location based on first place
      setCenter({ lat: places[0].latitude, lng: places[0].longitude }); // Set initial map center based on first place
    }
  }, [places]);

  const handleLocationChange = (e: { target: { value: SetStateAction<string> } }) => {
    setLocation(e.target.value); // Update location state on input change
  };

  return (
    <Fragment>
      <section className="mt-8 space-y-2">
        <p className="font-medium">Location</p>
        <div className="bg-[#F2F2F2] border border-[#E4E4E4] py-2 pl-5 pr-2 flex items-center gap-4 rounded-xl focus-within:border-gray-300">
          <Search className="text-primary-green" />
          <input
            className="h-10 bg-transparent w-full"
            placeholder="Enter location"
            value={location}
            onChange={handleLocationChange}
          />
          <Link
            href={`https://www.google.com/maps?q=${encodeURIComponent(location)}`}
            className="w-full max-w-fit"
            target="_blank"
            rel="noopener noreferrer"
          >
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
      <div className="mt-8">
        <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
          >
            {/* Render markers for each place */}
            {places.map((place, index) => (
              <Marker
                key={index}
                position={{ lat: place.latitude, lng: place.longitude }}
                title={place.title}
              />
            ))}
          </GoogleMap>
        </LoadScript>
      </div>
    </Fragment>
  );
};

export default LocationMap;
