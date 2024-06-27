import { Fragment, SetStateAction, useState } from "react";
import { Search } from "lucide-react";
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
  const [location, setLocation] = useState("delhi"); // Initial location state

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
        <div id="map_canvas" style={containerStyle}></div>
      </div>
      {/* Google Maps initialization script */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            function initialize() {
              var mapOptions = {
                zoom: 8,
                center: { lat: ${places.length > 0 ? places[0].latitude : 39.0997}, lng: ${places.length > 0 ? places[0].longitude : -94.5786} },
                mapTypeId: google.maps.MapTypeId.ROADMAP
              };
              var map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
              ${
                places.length > 0 &&
                places
                  .map(
                    (place) =>
                      `new google.maps.Marker({
                        position: { lat: ${place.latitude}, lng: ${place.longitude} },
                        map: map,
                        title: "${place.title}"
                      });`
                  )
                  .join("\n")
              }
            }

            function loadScript() {
              var script = document.createElement("script");
              script.type = "text/javascript";
              script.src = "https://maps.google.com/maps/api/js?key=YOUR_API_KEY&callback=initialize";
              document.body.appendChild(script);
            }

            window.onload = loadScript;
          `,
        }}
      />
    </Fragment>
  );
};

export default LocationMap;
