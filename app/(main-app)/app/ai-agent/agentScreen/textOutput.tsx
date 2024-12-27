
import React, { useEffect, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { API_URL } from "@/lib/api";
import DotsLoader from "@/components/DotLoader";
import Swal from "sweetalert2";
import rehypeRaw from "rehype-raw";
import instance from "@/config/axios.config";
import LinkedInUI from "./LinkedInUI";

interface DataItem {
  variableExtras: (variableValue: string, variableExtras: any) => React.ReactNode;
  _id: string;
  variableName: string;
  variableType: string;
  variableValue: string;
  needToSelect: boolean;
}

const KeywordInsights = ({ runnerAgentId }: { runnerAgentId: string }) => {
  const [data, setData] = useState<{ result: DataItem[] } | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null); // State to track expanded accordion
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const profileData = [
    {
      "input": {
        "url": "https://www.linkedin.com/in/prithvidamera/"
      },
      "id": "prithvidamera",
      "name": "Prithvi Damera",
      "city": "Raleigh, North Carolina, United States",
      "country_code": "US",
      "position": "I leverage AI and automation to optimize marketing strategies and revenue operations, enhancing ROI across business functions",
      "about": "As a data-driven strategist at Red Hat with over 9 years of experience, I thrive on maximizing ROI and spearheading innovative solutions across sales and marketing integration. Leading with empathy, I prefer to be a friend first, fostering team growth and collaboration. <br><br>My journey has been marked by a passion for simplifying complex projects into actionable strategies, always with an eye on the bottom line. I firmly believe in progress over perfection, valuing forward movement and learning in every step we take. <br><br>From driving significant budget guidance projects to implementing cutting-edge marketing tools, my approach blends analytical precision with a genuine belief in collective success. I practice thought leadership by blending external trends with our internal data, guiding our strategies with precision and ensuring our interpretations are spot-on.<br><br>Skilled in a vast array of technologies and methodologies, I am dedicated to not just achieving, but exceeding our goals, ensuring that both my team and our investments in Sales & Marketing flourish. In every project, from automating customer insights to refining ABM strategies, my focus remains on creating synergy, enhancing efficiency, and building lasting relationships.<br><br>I love connecting with people and learning about what's happening in your organization. If you're reading this, feel free to connect with me by sending a message.",
      "current_company": {
        "link": "https://www.linkedin.com/company/red-hat?trk=public_profile_topcard-current-company",
        "name": "Red Hat",
        "company_id": "red-hat",
        "title": "I leverage AI and automation to optimize marketing strategies and revenue operations, enhancing ROI across business functions"
      },
      "experience": [
        {
          "title": "Red Hat",
          "location": "Raleigh, North Carolina, United States",
          "description_html": null,
          "duration": "10 years 1 month",
          "positions": [
            {
              "subtitle": "Red Hat",
              "meta": "Nov 2023 - Present 1 year 2 months",
              "description": "Currently engaged in these projects (wip)✓  Integration of Customer Insights automation using the EPM Tool, unifying Sales, Marketing, Partners, and Finance for streamlined leadership updates and decision-making✓ In the process of creating a persona-based CRMA tool, aimed at automating sales dashboards for uniformity across teams and ensuring a unified view of data across systems✓ Implementing an advanced system logic for the automated identification of upside opportunities by analyzing Marketing engagements, sales activities, and intent data, providing Next Best Actions (NBA) for strategic advantage✓ Collaborating with ABM team, focusing on stakeholder mapping and opportunity contact roles for deeper engagement and targeted communication, aligning sales plays with marketing motions for maximum impact.✓ Driving the adoption of low-code platforms to streamline and automate analytics and GTM activities, focusing on improving marketing efficiency and operational agility.",
              "duration": "Nov 2023 - Present 1 year 2 months",
              "start_date": "Nov 2023",
              "end_date": "Present",
              "duration_short": "1 year 2 months",
              "title": "Manager - Global GTM Ops (Marketing & Sales Integration and Automation)",
              "description_html": "Currently engaged in these projects (wip)<br><br>✓ Integration of Customer Insights automation using the EPM Tool, unifying Sales, Marketing, Partners, and Finance for streamlined leadership updates and decision-making<br>✓ In the process of creating a persona-based CRMA tool, aimed at automating sales dashboards for uniformity across teams and ensuring a unified view of data across systems<br>✓ Implementing an advanced system logic for the automated identification of upside opportunities by analyzing Marketing engagements, sales activities, and intent data, providing Next Best Actions (NBA) for strategic advantage<br>✓ Collaborating with ABM team, focusing on stakeholder mapping and opportunity contact roles for deeper engagement and targeted communication, aligning sales plays with marketing motions for maximum impact.<br>✓ Driving the adoption of low-code platforms to streamline and automate analytics and GTM activities, focusing on improving marketing efficiency and operational agility."
            },
            {
              "subtitle": "Red Hat",
              "meta": "Jun 2022 - Oct 2023 1 year 5 months",
              "description": "✓ Worked with the Product GTM strategy team to cut down our offers to just 20% and creating specific campaign kit for every stage of the customer journey, from discover to expand✓ Developed a strategic process for identifying untapped markets and high-potential new businesses, leveraging intent data and rigorous data validation, culminating in generating $3M in opportunities within 3 months.✓ Created a new approach to customer ABX segmentation using data-driven insights for improved targeting and pipeline optimization✓ Directed all Non-in-person event Red Hat's marketing budget guidance strategy, securing optimal ROI through collaboration with Global, Product, Regional Marketing leadership and considering the performance insights✓ Strategically conveyed insights and improvement tactics on performance to Marketing Leadership Team weekly meeting, alongside product performance updates to the OpenShift team.✓ Managed my most diverse team to date, encompassing roles from data analysis and science to marketing automation, campaign segmentation, process management, and data governance.",
              "duration": "Jun 2022 Oct 2023 1 year 5 months",
              "start_date": "Jun 2022",
              "end_date": "Oct 2023",
              "duration_short": "1 year 5 months",
              "title": "Manager - Campaign Operations & Analytics",
              "description_html": "✓ Worked with the Product GTM strategy team to cut down our offers to just 20% and creating specific campaign kit for every stage of the customer journey, from discover to expand<br>✓ Developed a strategic process for identifying untapped markets and high-potential new businesses, leveraging intent data and rigorous data validation, culminating in generating $3M in opportunities within 3 months.<br>✓ Created a new approach to customer ABX segmentation using data-driven insights for improved targeting and pipeline optimization<br>✓ Directed all Non-in-person event Red Hat's marketing budget guidance strategy, securing optimal ROI through collaboration with Global, Product, Regional Marketing leadership and considering the performance insights<br>✓ Strategically conveyed insights and improvement tactics on performance to Marketing Leadership Team weekly meeting, alongside product performance updates to the OpenShift team.<br>✓ Managed my most diverse team to date, encompassing roles from data analysis and science to marketing automation, campaign segmentation, process management, and data governance."
            }
          ],
          "company": "Red Hat",
          "company_id": "red-hat",
          "url": "https://www.linkedin.com/company/red-hat?trk=public_profile_experience-group-header",
          "company_logo_url": null
        },
        {
          "title": "Software Engineer & POC for FY14 Cards Java Training batch",
          "location": "Hyderabad Area, India",
          "description": "✓ Developed User interface for Discover bank and handling the maintenance for the same project.✓ Perform maintenance for existing websites.✓ Manipulates text and graphics to produce consistent presentation across all browsing platforms.✓ Understands graphic design and digital layout basics.✓ My colleague and I led a team of 26 people to finish the Capgemini Learning program and developed a Capgemini social platform for our capstone project.",
          "description_html": "✓ Developed User interface for Discover bank and handling the maintenance for the same project.<br>✓ Perform maintenance for existing websites.<br>✓ Manipulates text and graphics to produce consistent presentation across all browsing platforms.<br>✓ Understands graphic design and digital layout basics.<br>✓ My colleague and I led a team of 26 people to finish the Capgemini Learning program and developed a Capgemini social platform for our capstone project. <!---->",
          "duration": "Dec 2013 Dec 2014 1 year 1 month",
          "start_date": "Dec 2013",
          "end_date": "Dec 2014",
          "duration_short": "1 year 1 month",
          "company": "Capgemini",
          "company_id": "capgemini",
          "url": "https://fr.linkedin.com/company/capgemini",
          "company_logo_url": "https://media.licdn.com/dms/image/v2/D4D0BAQH-ZV832H4sdA/company-logo_100_100/company-logo_100_100/0/1705572256355/capgemini_logo?e=2147483647&v=beta&t=d-PXEp2Vwiw5S5fa57mSsQRE_sFQEPsNsTVnXs9IEWs"
        },
        {
          "title": "Intern Reporting Analyst",
          "location": "Hyderabad Area, India",
          "description": "I helped this startup in my free time while doing my M-Tech. I really enjoyed learning new things and taking on different challenges. Here are the main tasks I worked on:✓ Perform data analysis and validation to ensure accuracy | quality | troubleshooting. ✓ Monitoring the data flow to ensure no loss of information at system level.✓ Managed periodic newsletters for internal purpose to communicate the accomplished and upcoming business requirements.",
          "description_html": "I helped this startup in my free time while doing my M-Tech. I really enjoyed learning new things and taking on different challenges. Here are the main tasks I worked on:<br>✓ Perform data analysis and validation to ensure accuracy | quality | troubleshooting. <br>✓ Monitoring the data flow to ensure no loss of information at system level.<br>✓ Managed periodic newsletters for internal purpose to communicate the accomplished and upcoming business requirements. <!---->",
          "duration": "Aug 2011 Aug 2013 2 years 1 month",
          "start_date": "Aug 2011",
          "end_date": "Aug 2013",
          "duration_short": "2 years 1 month",
          "company": "Aapti Techno Soft Pvt. Ltd.",
          "company_logo_url": "https://static.licdn.com/aero-v1/sc/h/cs8pjfgyw96g44ln9r7tct85f"
        }
      ],
      "url": "https://www.linkedin.com/in/prithvidamera/",
      "people_also_viewed": [
        {
          "profile_link": "https://uk.linkedin.com/in/puneetnagp?trk=public_profile_browsemap-profile",
          "name": "Puneet Nagpal",
          "about": null,
          "location": "London"
        },
        {
          "profile_link": "https://ca.linkedin.com/in/subhradeep-ganguli-57888611a?trk=public_profile_browsemap-profile",
          "name": "Subhradeep Ganguli",
          "about": "Banking Consultant || Ex- Deloitte, PwC, Cognizant || CSPO®, CSM®, CCBA®, CAPM® PMI ACP®",
          "location": "Toronto, ON"
        }
      ],
      "educations_details": "Institute of Management Technology, Ghaziabad",
      "education": [
        {
          "title": "Institute of Management Technology, Ghaziabad",
          "degree": "PG Program in Management",
          "field": "Business Administration and Management, General",
          "url": "https://in.linkedin.com/school/institute-of-management-technology-ghaziabad/?trk=public_profile_school_profile-section-card_image-click",
          "start_year": "2022",
          "end_year": "2023",
          "description": "\"PG Program in Management\" with IMT Ghaziabad",
          "description_html": "\"PG Program in Management\" with IMT Ghaziabad <!---->",
          "institute_logo_url": "https://media.licdn.com/dms/image/v2/C560BAQEzvyPjf92ddw/company-logo_100_100/company-logo_100_100/0/1631382322117?e=2147483647&v=beta&t=mYjHpMx1O9zId7bRHtIYFZhUelnusHlNYFrz3aAKH7A"
        }
      ],
      "recommendations_count": 7,
      "avatar": "https://static.licdn.com/aero-v1/sc/h/9c8pery4andzj6ohjkjp54ma2",
      "certifications": [
        {
          "meta": "Issued Aug 2020See credential",
          "subtitle": "ZoomInfo",
          "title": "DiscoverOrg Certification for Marketing"
        },
        {
          "meta": "Issued Jun 2020See credential",
          "subtitle": "Tableau Software",
          "title": "Tableau Author"
        }
      ],
      "recommendations": [
        "Randeep Grewal “I am writing this letter of recommendation for Prithvi, who worked with me for four years as a Marketing Analyst and Marketing Technology Lead. During his time with us, Prithvi proved to be an invaluable asset to our team, consistently demonstrating exceptional skills in marketing technology, data analysis, and reporting. As our Marketing Technology Lead, Prithvi was responsible for managing our SalesForce platform and ensuring that all marketing technology systems were running smoothly. He was extremely proficient in this role, consistently delivering exceptional results and contributing to the success of our marketing campaigns. Prithvi is a highly skilled marketing analyst with a talent for identifying trends and patterns in marketing data. He was adept at analyzing data from various sources and presenting it in a format that was easy to understand. His expertise in this area was essential in helping us to make informed decisions about our marketing campaigns and strategies. In addition to his technical skills, Prithvi also possesses an outstanding work ethic. He is self-driven and takes pride in delivering high-quality work on time and within budget. Prithvi's ability to multitask and prioritize his workload made him an essential member of our team, and we could always rely on him to deliver results. One of Prithvi's greatest strengths is his self-driven attitude towards learning. He is always looking for ways to improve himself and provide value for his stakeholders. He is never satisfied with the status quo and is always looking for ways to improve processes, systems, and results. In conclusion, I am confident that Prithvi will be an excellent addition to any marketing team. He has a unique combination of technical skills, analytical ability, and a strong work ethic, which makes him a valuable asset to any organization. I wholeheartedly recommend Prithvi for any marketing role and wish him all the best in his future endeavors.”",
        "Arka Mitra “Prithvi is a learning and execution focused individual which is extremely important in today’s dynamic work environment. He is a pleasant person to be around and I had the privilege of working with him for a year while at Capgemini. Prithvi is always eager to take up new challenges and is not hesitant in getting into uncharted territory. One might say the tougher the situation the brighter he shines. No wonder he quickly became one of the most sought after resources for handling complex projects from our clients at Capgemini. Prithvi’s technical knowledge, superb execution and effective handling of clients, all taken together make him a well-rounded professional and I am sure he will be a tremendous asset to any organization.”"
      ],
      "followers": 2423,
      "connections": 500,
      "current_company_company_id": "red-hat",
      "current_company_name": "Red Hat",
      "location": "Raleigh",
      "input_url": "https://www.linkedin.com/in/prithvidamera/",
      "linkedin_id": "prithvidamera",
      "activity": [
        {
          "interaction": "Shared by Prithvi Damera",
          "link": "https://www.linkedin.com/posts/prithvidamera_rhel-openshift-aiinnovation-activity-7277492859434414081-nOXM",
          "title": "Merry Christmas, everyone! This time of year always feels like a relaxation pause for me. Everything slows down, and you get a moment to look…",
          "img": "https://media.licdn.com/dms/image/v2/D4E22AQF_bPoiYcjbrA/feedshare-shrink_800/B4EZP7ZMAzGYAg-/0/1735089505422?e=2147483647&v=beta&t=K0s1AYGhdT4yahNK0A64iA3mBnICz9fqk0MjztWKLas",
          "id": "7277492859434414081"
        },
        {
          "interaction": "Liked by Prithvi Damera",
          "link": "https://www.linkedin.com/posts/irfanshafi18_economy-future-management-activity-7277232428518191104-FJUp",
          "title": "👉 Follow me for more insightful and beneficial posts! 💡🚀 🌍 The Richest Countries in the world 💰 Ever wondered which nations are truly the…",
          "img": "https://media.licdn.com/dms/image/v2/D4E05AQFYJfXJQ1myBw/videocover-high/B4EZP3r_IVHEB0-/0/1735027364949?e=2147483647&v=beta&t=C-tnNnzak0FEk_hX1CAMfsM_J2n22G4C5aOUpunwlUc",
          "id": "7277232428518191104"
        }
      ],
      "linkedin_num_id": "52536678",
      "banner_image": "https://media.licdn.com/dms/image/v2/C5116AQFZG6tECauvCQ/profile-displaybackgroundimage-shrink_200_800/profile-displaybackgroundimage-shrink_200_800/0/1578198950528?e=2147483647&v=beta&t=mzlBdIF6MczGirR0O8ubynlaVTcIj4NeA3zTuOmNnEg",
      "honors_and_awards": null,
      "similar_profiles": [
        {
          "url": "https://uk.linkedin.com/in/puneetnagp",
          "name": "Puneet Nagpal",
          "title": null
        },
        {
          "url": "https://ca.linkedin.com/in/subhradeep-ganguli-57888611a",
          "name": "Subhradeep Ganguli",
          "title": "Banking Consultant || Ex- Deloitte, PwC, Cognizant || CSPO®, CSM®, CCBA®, CAPM® PMI ACP®"
        }
      ],
      "timestamp": "2024-12-26T06:23:56.970Z"
    }
  ]
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await instance.get(
          `${API_URL}/agents/api/v1/run/status/${runnerAgentId}`
        );

        const fetchedData = response.data.data;

        // Only update the state with new data
        if (fetchedData?.result) {
          setData((prevData) => {
            const newItems = fetchedData.result.filter(
              (item: { _id: string; }) => !prevData?.result?.some((prevItem) => prevItem._id === item._id)
            );
            return {
              ...fetchedData,
              result: [...(prevData?.result || []), ...newItems],
            };
          });

        }

        // Stop polling if the status is "COMPLETED"
        if (fetchedData.status === "COMPLETED") {
          clearInterval(intervalId);
          setLoading(false);

        }
        else if (fetchedData.status === "FAILED") {
          await Swal.fire({
            title: "Workflow",
            text: "The workflow has failed. Please check the fields and try again.",
            icon: "warning",
            showCancelButton: false,
            confirmButtonText: "Ok",
            cancelButtonText: "No",
          });

          clearInterval(intervalId);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load data.");
      } finally {
      }
    };

    fetchData(); // Initial fetch

    const intervalId = setInterval(fetchData, 5000);

    return () => clearInterval(intervalId);
  }, [runnerAgentId]);

  const handleSubmit = async () => {
    const cleanedRows = selectedRows.map(({ rowIndex, ...rest }) => rest)
    const cleanedRowsdata = cleanedRows.map((row, index) => {
      const job = row.selectedValues[index] || {}; // Handle case where selectedValues might be empty
      return {
        "title": job.title || "No Title Provided", // Fallback if title is missing
        "company_name": job.company_name || "Unknown Company", // Fallback if company_name is missing
        "description": job.description || "No Description Available" // Fallback if description is missing
      };
    });
    const payload = {
      "selectedJobsData": cleanedRowsdata
    }
    const response = await instance.post(
      `${API_URL}/agents/api/v1/run/resume/${runnerAgentId}`, payload
    );
  };
  const renderCSVTable = (csvData: string, extraItems: any) => {
    const rows = csvData.split("\n");
    const headers = rows[0].split(",").map((header) => header.trim());
    const bodyRows = rows.slice(1);
    const handleCheckboxChange = (rowIndex: number, cells: string[]) => {
      // Get the selected fields based on `fieldToSelect`
      const selectedValues = extraItems.fieldToSelect.map((field: string) => {
        const fieldIndex = headers.indexOf(field);
        return { [field]: cells[fieldIndex] };
      });

      // Toggle selection
      setSelectedRows((prevSelected) => {
        if (prevSelected.some((item) => item.rowIndex === rowIndex)) {
          return prevSelected.filter((item) => item.rowIndex !== rowIndex); // Deselect
        } else {
          return [...prevSelected, { rowIndex, selectedValues }]; // Select
        }
      });
    };
    const isLink = (text: string) => {
      const urlRegex = /^(https?:\/\/[^\s]+)/i;
      return urlRegex.test(text);
    };


    return (
      <div className="h-[400px] overflow-visible">
        <div className="max-h-[500px] snap-both overflow-visible">
          <table className=" w-full border-collapse border border-gray-300 mt-4">
            <thead className="sticky top-0 bg-gray-100 ">
              <tr>
                {extraItems?.needToSelect && (
                  <th className="border border-gray-300 p-3"></th>
                )} {/* Add checkbox header */}
                {headers.map((header, index) => (
                  <th
                    key={index}
                    className="border border-gray-300 p-3 text-left font-semibold text-gray-700"
                  >
                    <Markdown
                      remarkPlugins={[remarkGfm]}
                      rehypePlugins={[rehypeRaw]}
                    >
                      {header.replace(/["']/g, "").trim()}

                    </Markdown>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {bodyRows.map((row, rowIndex) => {
                const cells = parseCSVRow(row);
                return (
                  <tr
                    key={rowIndex}
                    className={rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    {extraItems?.needToSelect && (
                      <td className="border border-gray-300 p-3 text-gray-600">
                        <input
                          type="checkbox"
                          onChange={() => handleCheckboxChange(rowIndex, cells)}
                        />
                      </td>
                    )}
                    {cells.map((cell: string, cellIndex: number) => (
                      <td
                        key={cellIndex}
                        className="border border-gray-300 p-3 text-gray-600"
                      >
                        {isLink(cell) ? (
                          <a
                            href={cell}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            {cell}
                          </a>
                        ) : (
                          <Markdown
                            remarkPlugins={[remarkGfm]}
                            rehypePlugins={[rehypeRaw]}
                          >
                            {cell}
                          </Markdown>
                        )}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>

          </table>
        </div>


      </div>
    );
  };

  const parseCSVRow = (row: string) => {
    const regex = /(".*?"|[^",\n]+)(?=\s*,|\s*$)/g;
    return row.match(regex)?.map(cell => cell.replace(/"/g, '').trim()) || [];
  };

  const toggleAccordion = (id: string) => {
    setExpanded(expanded === id ? null : id);
  };

  // if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <div className="flex justify-between items-center border-b pb-4">
        <h1 className="text-xl font-semibold">Output:</h1>
      </div>
      <div className="mt-4">
        {data?.result?.map((item: any) => (
          <div key={item._id} className="mb-6">
            <h1 className="font-medium text-gray-900">
              <b>{item.variableName}</b>
            </h1>
            <div>
              <button
                type="button"
                onClick={() => toggleAccordion(item._id)}
                className="w-full text-left bg-gray-100 p-2 mt-2 border-b flex justify-between items-center mb-2"
              >
                <span>{expanded === item._id ? "Hide" : "Show"} Details</span>
                {expanded === item._id ? <FaChevronUp /> : <FaChevronDown />}
              </button>
              {expanded === item._id && (
                <>
                  <div className="p-4  overflow-y-auto mt-1 transition-all duration-300 ease-in-out bg-white border border-gray-300 rounded-lg shadow-md">
                    {item.variableType === "CSV" && item.variableValue && renderCSVTable(item.variableValue, item.variableExtras)}

                    {(item.variableType === "STRING" || item.variableType === "LONG_TEXT") && item.variableValue && (
                      <Markdown
                        remarkPlugins={[remarkGfm]}
                        rehypePlugins={[rehypeRaw]}
                      >
                        {item.variableValue}
                      </Markdown>
                    )}
                    {item.variableType === "LINKEDIN_DATA" && item.variableValue && (
                      <LinkedInUI profileData={item.variableValue} />
                    )}
                  </div>
                  {item?.variableExtras?.needToSelect && (
                    <div className="mt-4">
                      <button type="button"
                        onClick={handleSubmit}
                        className="bg-blue-500 text-white py-2 px-4 rounded"
                      >
                        Submit
                      </button>
                    </div>
                  )}
                </>

              )}
            </div>
          </div>
        ))}
        {/* <LinkedInUI profileData={profileData} /> */}
        {loading && <>{'Loading Remaning items '}<DotsLoader /></>}
      </div>
    </div>
  );
};

export default KeywordInsights;
