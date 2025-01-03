import React, { ReactNode, useState } from "react";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface profileData {
  timestamp: ReactNode;
  connections: ReactNode;
  followers: ReactNode;
  banner_image: string | undefined;
  location: ReactNode;
  input: {
    url: string;
  };
  id: string;
  name: string;
  city: string;
  country_code: string;
  position: string;
  about: string;
  current_company: Company;
  experience: Experience[];
  url: string;
  people_also_viewed: Person[];
  educations_details: string;
  education: Education[];
  recommendations_count: number;
  avatar: string;
  certifications: Certification[];
  recommendations: string[];
}

interface Company {
  link: string;
  name: string;
  company_id: string;
  title: string;
}

interface Experience {
  title: string;
  location: string;
  description_html: string | null;
  duration: string;
  positions: Position[];
  company: string;
  company_id: string;
  url: string;
  company_logo_url: string | null;
}

interface Position {
  subtitle: string;
  meta: string;
  description: string;
  duration: string;
  start_date: string;
  end_date: string;
  duration_short: string;
  title: string;
  description_html: string;
}

interface Person {
  profile_link: string;
  name: string;
  about: string | null;
  location: string;
}

interface Education {
  title: string;
  degree: string;
  field: string;
  url: string;
  start_year: string;
  end_year: string;
  description: string;
  description_html: string;
  institute_logo_url: string;
}

interface Certification {
  meta: string;
  subtitle: string;
  title: string;
}

const ProfileComponent: React.FC<{ profileData: any }> = ({ profileData }) => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleAccordion = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  if (!profileData || profileData.length === 0) {
    return <div>No profile data available.</div>;
  }

  return (
    <div className="max-w-xl mx-auto mt-10 p-4 rounded-md">
      {profileData?.[0]?.banner_image && <img
        src={profileData[0].banner_image}
        className="w-full h-50 rounded-t-lg"
        alt="Banner"
      />}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <Avatar className="w-11 h-11 rounded-xl mb-3">
            <AvatarImage src={profileData[0].avatar} />
            <AvatarFallback>
              {profileData[0].name?.slice(0, 1)}
            </AvatarFallback>
          </Avatar>
          <h1 className="text-2xl font-bold mb-2">{profileData[0].name}</h1>
          <p className="text-gray-600 mb-2">{profileData[0].position}</p>
          <p className="text-gray-500 text-sm">{profileData[0].location}</p>
          <p className="text-gray-500 text-sm">
            <strong>Followers: </strong>{profileData[0].followers}
          </p>
          <p className="text-gray-500 text-sm">
            <strong>Connections: </strong>{profileData[0].connections}+
          </p>
          <p className="text-gray-500 text-sm">
            <strong>Current Company: </strong>{profileData[0].current_company.name}
          </p>
          <a
            href={profileData[0].input.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline text-sm"
          >
            LinkedIn Profile
          </a>
          <p className="text-gray-500 text-sm mt-1">
            Last updated: {profileData[0].timestamp}
          </p>
        </div>

        {/* Accordion Sections */}
        {profileData[0].about && (
          <div className="border-t border-gray-200">
            <button type="button"
              onClick={() => toggleAccordion("summary")}
              className="w-full text-left py-4 px-6 bg-gray-100 hover:bg-gray-200 flex justify-between items-center"
            >
              <span className="font-medium">Summary</span>
              <span>{expandedSection === "summary" ? "−" : "+"}</span>
            </button>
            {expandedSection === "summary" && (
              <div className="px-6 py-4 bg-white">
                <p className="text-gray-600 mb-2">
                  <Markdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw]}
                  >
                    {profileData[0].about}
                  </Markdown>
                </p>
              </div>
            )}
          </div>
        )}


        {/* Experience Section */}
        {profileData[0].experience &&
          <div className="border-t border-gray-200">
            <button type="button"
              onClick={() => toggleAccordion("experience")}
              className="w-full text-left py-4 px-6 bg-gray-100 hover:bg-gray-200 flex justify-between items-center"
            >
              <span className="font-medium">Experience</span>
              <span>{expandedSection === "experience" ? "−" : "+"}</span>
            </button>
            {expandedSection === "experience" && (
              <div className="px-6 py-4 bg-white">
                {profileData[0].experience &&
                  profileData[0].experience.map((exp: { title: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; company: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; location: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; duration: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; positions: any[]; description_html: string | null | undefined; }, index: React.Key | null | undefined) => (
                    <>
                      {exp.title && (
                        <div className="step-circle bg-blue-500 text-white w-3 h-3 flex items-center justify-center rounded-full mr-4 mt-2">
                        </div>
                      )}
                      <div key={index} className="mb-4 experience-stepper relative">
                        {/* Vertical Line */}

                        <div className="absolute left-[6px] top-1 bottom-0 w-[2px] bg-gray-300" />

                        <div className="flex items-start pl-10">

                          <div className="flex flex-col">
                            <h1 className="font-medium text-gray-800">
                              <strong>{exp.title}</strong>
                            </h1>
                            <p className="text-gray-600">{exp.company}</p>
                            <p className="text-gray-500 text-sm">{exp.location}</p>
                            <p className="text-gray-500 text-sm">Duration: {exp.duration}</p>
                          </div>
                        </div>

                        <div className="mt-4 pl-10">
                          {exp.positions &&
                            exp.positions.map((position, idx) => (
                              <div key={idx} className="mt-5">
                                <div className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200">
                                  <p className="font-semibold text-gray-700">
                                    <strong>{position.subtitle}</strong>
                                  </p>
                                  <p className="text-gray-500 text-sm">{position.meta}</p>
                                  <p className="text-gray-500 text-md mt-2">
                                    {typeof position.description === 'string' && (
                                      <Markdown
                                        remarkPlugins={[remarkGfm]}
                                        rehypePlugins={[rehypeRaw]}
                                        components={{
                                          p: ({ children }) => <p className="text-gray-500 text-sm">{children}</p>,
                                        }}
                                      >
                                        {position.description}
                                      </Markdown>
                                    )}
                                  </p>
                                </div>
                              </div>
                            ))}
                        </div>

                        {typeof exp.description_html === 'string' && (
                          <div className="mt-4 pl-10">
                            <Markdown
                              remarkPlugins={[remarkGfm]}
                              rehypePlugins={[rehypeRaw]}
                              components={{
                                p: ({ children }) => <p className="text-gray-500 text-sm">{children}</p>,
                              }}
                            >
                              {exp.description_html}
                            </Markdown>
                          </div>
                        )}
                      </div>
                    </>

                  ))}
              </div>





            )}
          </div>
        }


        {/* Other Sections */}
        {/* Repeat similar blocks for certifications, recommendations, education, etc. */}
        {profileData[0].certifications &&
          <div className="border-t border-gray-200">
            <button type="button"
              onClick={() => toggleAccordion("certifications")}
              className="w-full text-left py-4 px-6 bg-gray-100 hover:bg-gray-200 flex justify-between items-center"
            >
              <span className="font-medium">Certifications</span>
              <span>{expandedSection === "certifications" ? "−" : "+"}</span>
            </button>
            {expandedSection === "certifications" && (
              <div className="px-6 py-4 bg-white">
                {profileData[0].certifications && profileData[0].certifications.map((cert: { meta: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; subtitle: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; title: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; }, index: React.Key | null | undefined) => (
                  <div key={index} className="mb-4">
                    <h3 className="font-medium text-gray-800">{cert.meta}</h3>
                    <p className="text-gray-600">{cert.subtitle}</p>
                    <p className="text-gray-500 text-sm">{cert.title}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        }

        {profileData[0].recommendations &&
          <div className="border-t border-gray-200">
            <button type="button"
              onClick={() => toggleAccordion("recommendations")}
              className="w-full text-left py-4 px-6 bg-gray-100 hover:bg-gray-200 flex justify-between items-center"
            >
              <span className="font-medium">Recommendations</span>
              <span>{expandedSection === "recommendations" ? "−" : "+"}</span>
            </button>
            {expandedSection === "recommendations" && (
              <div className="px-6 py-4 bg-white">
                {profileData[0].recommendations && profileData[0].recommendations.map((rec: string | null | undefined, index: React.Key | null | undefined) => (
                  <div key={index} className="mb-4">
                    <Markdown
                      remarkPlugins={[remarkGfm]}
                      rehypePlugins={[rehypeRaw]}
                    >
                      {rec}
                    </Markdown>
                  </div>
                ))}
              </div>
            )}
          </div>


        }
        {/* Recommendations Section */}

        {/* Education Section */}
        {profileData[0].education && (
          <div className="border-t border-gray-200">
            <button
              type="button"
              onClick={() => toggleAccordion("education")}
              className="w-full text-left py-4 px-6 bg-gray-100 hover:bg-gray-200 flex justify-between items-center"
            >
              <span className="font-medium">Education</span>
              <span>{expandedSection === "education" ? "−" : "+"}</span>
            </button>
            {expandedSection === "education" && (
              <div className="px-6 py-4 bg-white">
                {profileData[0].education.map((edu: { title: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; degree: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; field: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; start_year: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; end_year: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; description_html: string | null | undefined; }, index: number) => (
                  <>
                    {edu.title && (
                      <div className="step-circle bg-blue-500 text-white w-2 h-2 flex items-center justify-center rounded-full mr-4">
                      </div>
                    )}
                    <div key={index} className="mb-4 experience-stepper relative">
                      {/* Vertical Line */}
                      <div className="absolute left-1 top-2 bottom-0 w-[2px] bg-gray-300" />

                      <div className="flex items-start pl-10">

                        <div className="flex flex-col">
                          <h1 className="font-medium text-gray-800">
                            <strong>{edu.title}</strong>
                          </h1>
                          <p className="text-gray-600">{edu.degree}</p>
                          <p className="text-gray-500 text-sm">{edu.field}</p>
                          <p className="text-gray-500 text-sm">
                            {edu.start_year} - {edu.end_year}
                          </p>
                        </div>
                      </div>

                      {/* Education Description */}
                      {edu.description_html && (
                        <div className="mt-4 pl-10">
                          <Markdown
                            remarkPlugins={[remarkGfm]}
                            rehypePlugins={[rehypeRaw]}
                          >
                            {edu.description_html}
                          </Markdown>
                        </div>
                      )}
                    </div>
                  </>

                ))}
              </div>
            )}
          </div>
        )}


      </div>
    </div>
  );
};

export default ProfileComponent;
