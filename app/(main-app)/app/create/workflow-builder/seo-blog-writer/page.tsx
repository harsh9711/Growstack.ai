"use client"
import { TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table'
import { flexRender } from '@tanstack/react-table'
import { table } from 'console'
import { Table } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useRef, RefObject, useState,useEffect } from 'react'
import { columns } from '../../../components/DataTable'
import { CSVLink } from 'react-csv';
import { useSearchParams } from 'next/navigation'
import axios from 'axios'
import { API_URL } from '@/lib/api'
import { InputIcon2 } from '@/components/svgs'
import clsx from 'clsx'
import ReactMarkdown from "react-markdown";
import { MdDeleteOutline } from "react-icons/md";
import { HiOutlineDuplicate } from "react-icons/hi";
import { CiCirclePlus } from "react-icons/ci";
import toast from 'react-hot-toast'
import DotsLoader from "@/components/DotLoader";

type WorkFlowData = {
  actions: any[];
  input_configs: any[];
  output_configs: any[];
}

type WorkFlowResults = {
  outputs: any[];
  status: boolean;
  failed_step: number;
}

const Page = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const buildRef = useRef<HTMLDivElement>(null);
  const runRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);
  const [tableData, setTableData] = useState<any[]>([]); // Placeholder for table data
  const [workflowId, setWorkflowId] = useState("");
  const [keyWords, setKeyWords] = useState<string>("")
   const [hovered, setHovered] = useState(false);
   const [hovered2, setHovered2] = useState(false);
  const deleteButtonTimeoutRef = useRef<number | null>(null);
    const deleteButtonTimeoutRef2 = useRef<number | null>(null);


  const handleHover = () => {
    setHovered(true);
if (deleteButtonTimeoutRef.current !== null) {
      clearTimeout(deleteButtonTimeoutRef.current);
    }
  };
 const handleMouseLeave = () => {
    if (deleteButtonTimeoutRef.current !== null) {
      clearTimeout(deleteButtonTimeoutRef.current);
    }
    deleteButtonTimeoutRef.current = window.setTimeout(() => {
      setHovered(false);
    }, 500); 
  };

    const handleHover2 = () => {
    setHovered2(true);
if (deleteButtonTimeoutRef2.current !== null) {
      clearTimeout(deleteButtonTimeoutRef2.current);
    }
  };
 const handleMouseLeave2 = () => {
    if (deleteButtonTimeoutRef2.current !== null) {
      clearTimeout(deleteButtonTimeoutRef2.current);
    }
    deleteButtonTimeoutRef2.current = window.setTimeout(() => {
      setHovered2(false);
    }, 500); 
  };



  const [workFlowResults, setWorkFlowResults] = useState<WorkFlowResults>({ outputs: [], status: true, failed_step: -1});

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(Math.ceil(tableData.length / 10)); // Placeholder for total pages
  const searchParams = useSearchParams();
  const [isWorkFlowFetched, setIsWorkFlowFetched] = useState<boolean>(true);
  
  const [workFlowData, setWorkFlowData] = useState<WorkFlowData>({ actions: [], input_configs: [], output_configs : []});
  const fetchWorkflowData = async (id: string) => {
    try {
      const response = await axios.get(`${API_URL}/workflow/api/v1/${id}`);
      setWorkFlowData(response.data.data);
    } catch (error) {
      console.log('Error fetching workflow data:', error);
    }
  }

  const handleRunWorkFlow = async () => {
    try {
      setIsWorkFlowFetched(false);
      const payload = {
        actions_with_runs: workFlowData.actions.map((action) => ({ action: action._id })),
        inputs: workFlowData.input_configs.map((input) => ({
          variable_name: input.variable_name, variable_value: keyWords
        })),
        outputs: workFlowData.output_configs.map((output) => ({ variable_name: output.display_name, variable_value: output.value }))
      }
      const response = await axios.post(`${API_URL}/workflow/api/v1/${workflowId}/runner`, payload)
     
      setWorkFlowResults({ ...response.data.data, outputs: response.data.data.outputs.map((output: any) => ({ ...output, variable_value: output.variable_type === 'object' ? JSON.parse(output.variable_value) : output.variable_value })) });
      setIsWorkFlowFetched(true)
    } catch (error) {
      console.log('Error running workflow:', error);
      toast.error('Error running workflow');
      setIsWorkFlowFetched(true)
    }
  }
  useEffect(() => {
    const id = searchParams.get("workflow_id");
    if (id) {
      setWorkflowId(id);
      fetchWorkflowData(id);
    }
  }, [searchParams]);

  const [activeSection, setActiveSection] = useState<string>('build');
  const exportData = () => {
    // Logic to export tableData as CSV
  };
  
  const importData = (file: File) => {
    // Logic to import data from CSV file
  };
  
  const runAll = () => {
    // Logic to run all tasks
  };
  
  const addNewRow = () => {
    // Placeholder logic to add a new row to the table
    const newRow = {}; // Define your new row object structure here
    setTableData([...tableData, newRow]);
  };
  const scrollToSection = (ref: RefObject<HTMLDivElement>, section: string) => {
    if (ref.current) {
      const sectionElement = ref.current;
      const container = containerRef.current;
      if (container) {
        container.scrollTo({
          left: sectionElement.offsetLeft,
          behavior: 'smooth'
        });
      }
      setActiveSection(section);
    }
  }

  const goToPage = (page: number) => {
    setCurrentPage(page);
    // Logic to fetch data for the selected page if using pagination with API
  };

  const previousPage = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1);
    }
  };


  console.log(workFlowResults)
  return (
    <div>
      <div className='flex flex-row items-center gap-80 py-10'>
        <div>
          <Link href="/app/create/workflow-builder">
            <button className="text-[#212833] hover:bg-primary-green/10 sheen flex gap-2 px-3.5 py-2 rounded-full font-medium items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                <path
                  d="M11.8687 15.6313C12.2104 15.973 12.2104 16.527 11.8687 16.8687C11.527 17.2104 10.973 17.2104 10.6313 16.8687L11.8687 15.6313ZM6.25 11.25L5.63128 11.8687C5.46719 11.7046 5.375 11.4821 5.375 11.25C5.375 11.0179 5.46719 10.7954 5.63128 10.6313L6.25 11.25ZM10.6313 5.63128C10.973 5.28957 11.527 5.28957 11.8687 5.63128C12.2104 5.97299 12.2104 6.52701 11.8687 6.86872L10.6313 5.63128ZM6.25 12.125C5.76675 12.125 5.375 11.7332 5.375 11.25C5.375 10.7667 5.76675 10.375 6.25 10.375L6.25 12.125ZM18.75 22.125C18.2667 22.125 17.875 21.7332 17.875 21.25C17.875 20.7667 18.2667 20.375 18.75 20.375L18.75 22.125ZM10.6313 16.8687L5.63128 11.8687L6.86872 10.6313L11.8687 15.6313L10.6313 16.8687ZM5.63128 10.6313L10.6313 5.63128L11.8687 6.86872L6.86872 11.8687L5.63128 10.6313ZM6.25 10.375L20 10.375L20 12.125L6.25 12.125L6.25 10.375ZM20 10.375C23.2447 10.375 25.875 13.0053 25.875 16.25L24.125 16.25C24.125 13.9718 22.2782 12.125 20 12.125L20 10.375ZM25.875 16.25C25.875 19.4947 23.2447 22.125 20 22.125L20 20.375C22.2782 20.375 24.125 18.5282 24.125 16.25L25.875 16.25ZM20 22.125L18.75 22.125L18.75 20.375L20 20.375L20 22.125Z"
                  fill="#212833"
                />
              </svg>
              <h2 className='text-sm font-medium'>New WorkFlow {" "}/ {" "}Write blog post (3)</h2>
            </button>
          </Link>
        </div>
        <div className='flex flex-row gap-10 text-md font-medium justify-between'>
          <h2
            onClick={() => scrollToSection(buildRef, 'build')}
            className={`cursor-pointer ${activeSection === 'build' ? 'border-b-4 border-green-800' : ''}`}
          >
            Build
          </h2>
          <h2
            onClick={() => scrollToSection(runRef, 'run')}
            className={`cursor-pointer ${activeSection === 'run' ? 'border-b-4 border-green-800' : ''}`}
          >
            Run
          </h2>
          <h2
            onClick={() => scrollToSection(tableRef, 'table')}
            className={`cursor-pointer ${activeSection === 'table' ? 'border-b-4 border-green-800' : ''}`}
          >
            Table
          </h2>
        </div>
      </div>
      <div
        ref={containerRef}
        className="flex flex-row overflow-x-scroll snap-x snap-mandatory scroll-smooth "
        style={{ overflowX: "hidden" }} // Hide horizontal scrollbar
      >
     <div ref={buildRef} className="flex-shrink-0 w-full h-full justify-center bg-white flex flex-col gap-6 pb-24">
 
 <div className=' px-[550px]  p-10 snap-center gap-10 flex flex-col items-center pt-20'>
  <div className='flex flex-col gap-2 p-2 items-center justify-center bg-[#0347371A] rounded-2xl w-40'>
    <h1 className="text-md font-medium text-center text-[#14171B] *">Test workflow</h1>
  </div>

      <button
      className={clsx(
        'relative w-full z-[20] max-w-[340px] p-3 border rounded-xl flex items-center gap-4 cursor-pointer !border-primary-green',
       
      )}
      onMouseEnter={handleHover}
      onMouseLeave={handleMouseLeave}
    >
      <div className="bg-primary-green p-4 rounded-lg">
        <Image src="/edit.png" alt="edit icon" width={30} height={30} />
      </div>
      <div className="space-y-1 flex flex-col items-start">
        <h3 className="text-[17px] font-medium">Input</h3>
      </div>
      <div
        className={clsx(
          'absolute right-0  z-[10] top-0 h-full flex items-center pr-3 transition-transform duration-300',
          {
             'transform translate-x-40 opacity-100': hovered,
            'transform translate-x-0 opacity-0': !hovered,
             'pointer-events-auto': hovered,
            'pointer-events-none': !hovered,
            
          }
        )}
      >
        <div className="bg-red-500 p-3 rounded-md">
          <MdDeleteOutline size={24} color="white" />
        </div>
      </div>
    </button>
  <div className="relative border-t-2 border-dotted border-gray-400 w-20 rotate-90">
      <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center opacity-0 hover:opacity-100">
        <CiCirclePlus  size={34} color="red" />
      </div>
    </div>   <button
      className={clsx(
        'relative w-full z-[20] max-w-[340px] p-3 border rounded-xl flex items-center gap-4 cursor-pointer !border-primary-green',
       
      )}
      onMouseEnter={handleHover2}
      onMouseLeave={handleMouseLeave2}
    >
      <div className="bg-primary-green p-4 rounded-lg">
        <Image src="/edit.png" alt="edit icon" width={30} height={30} />
      </div>
      <div className="space-y-1 flex flex-col items-start">
        <h3 className="text-[17px] font-medium">Search Keyword</h3>
      </div>
      <div
        className={clsx(
          'absolute right-0  z-[10] top-0 h-full flex items-center pr-3 transition-transform duration-300',
          {
            'transform translate-x-40 opacity-100': hovered2,
            'transform translate-x-0 opacity-0': !hovered2,
             'pointer-events-auto': hovered2,
            'pointer-events-none': !hovered2,
            
          }
        )}
      >
        <div className=" rounded-md flex gap-6 flex-row">
          <HiOutlineDuplicate size={34} color="blue"  />

          <MdDeleteOutline size={34} color="red" />
        </div>
      </div>
    </button>
          <div className=" border-t-2 border-dotted border-gray-400 w-20 rotate-90"></div>
  <button
          className={clsx(
            "w-full max-w-[340px] transition-all duration-300 p-3 border  rounded-xl flex items-center gap-4 cursor-pointer !border-primary-green"
          )}>
          <div className="bg-primary-green p-4 rounded-lg">
          <Image src="/1.png" alt="go" width={30} height={30}/>
          </div>
          <div className="space-y-1 flex flex-col items-start">
            <h3 className="text-[17px]  font-medium">Extract Top 3 URLs</h3>
          </div>
        </button>
          <div className=" border-t-2 border-dotted border-gray-400 w-20 rotate-90"></div>
  <button
          className={clsx(
            "w-full max-w-[340px] transition-all duration-300 p-3 border  rounded-xl flex items-center gap-4 cursor-pointer !border-primary-green"
          )}>
          <div className="bg-primary-green p-4 rounded-lg">
          <Image src="/1.png" alt="go" width={30} height={30}/>
          </div>
          <div className="space-y-1 flex flex-col items-start">
            <h3 className="text-[17px]  font-medium">Scan First URL</h3>
          </div>
        </button>
           <div className=" border-t-2 border-dotted border-gray-400 w-20 rotate-90"></div>
  <button
          className={clsx(
            "w-full max-w-[340px] transition-all duration-300 p-3 border  rounded-xl flex items-center gap-4 cursor-pointer !border-primary-green"
          )}>
          <div className="bg-primary-green p-4 rounded-lg">
          <Image src="/1.png" alt="go" width={30} height={30}/>
          </div>
          <div className="space-y-1 flex flex-col items-start">
            <h3 className="text-[17px]  font-medium">Extract H 2 S From First URL</h3>
          </div>
        </button>
          <div className=" border-t-2 border-dotted border-gray-400 w-20 rotate-90"></div>
  <button
          className={clsx(
            "w-full max-w-[340px] transition-all duration-300 p-3 border  rounded-xl flex items-center gap-4 cursor-pointer !border-primary-green"
          )}>
          <div className="bg-primary-green p-4 rounded-lg">
          <Image src="/1.png" alt="go" width={30} height={30}/>
          </div>
          <div className="space-y-1 flex flex-col items-start">
            <h3 className="text-[17px]  font-medium">Scan Third URL</h3>
          </div>
        </button>
          <div className=" border-t-2 border-dotted border-gray-400 w-20 rotate-90"></div>
  <button
          className={clsx(
            "w-full max-w-[340px] transition-all duration-300 p-3 border  rounded-xl flex items-center gap-4 cursor-pointer !border-primary-green"
          )}>
          <div className="bg-primary-green p-4 rounded-lg">
          <Image src="/1.png" alt="go" width={30} height={30}/>
          </div>
          <div className="space-y-1 flex flex-col items-start">
            <h3 className="text-[17px]  font-medium">Extract H 2 S From Third URL</h3>
          </div>
        </button>
           <div className=" border-t-2 border-dotted border-gray-400 w-20 rotate-90"></div>
  <button
          className={clsx(
            "w-full max-w-[340px] transition-all duration-300 p-3 border  rounded-xl flex items-center gap-4 cursor-pointer !border-primary-green"
          )}>
          <div className="bg-primary-green p-4 rounded-lg">
          <Image src="/1.png" alt="go" width={30} height={30}/>
          </div>
          <div className="space-y-1 flex flex-col items-start">
            <h3 className="text-[17px]  font-medium">Recommend Page Type</h3>
          </div>
        </button>
           <div className=" border-t-2 border-dotted border-gray-400 w-20 rotate-90"></div>
  <button
          className={clsx(
            "w-full max-w-[340px] transition-all duration-300 p-3 border  rounded-xl flex items-center gap-4 cursor-pointer !border-primary-green"
          )}>
          <div className="bg-primary-green p-4 rounded-lg">
          <Image src="/1.png" alt="go" width={30} height={30}/>
          </div>
          <div className="space-y-1 flex flex-col items-start">
            <h3 className="text-[17px]  font-medium">BrainStorm Questions</h3>
          </div>
        </button>
         <div className=" border-t-2 border-dotted border-gray-400 w-20 rotate-90"></div>
  <button
          className={clsx(
            "w-full max-w-[340px] transition-all duration-300 p-3 border  rounded-xl flex items-center gap-4 cursor-pointer !border-primary-green"
          )}>
          <div className="bg-primary-green p-4 rounded-lg">
          <Image src="/1.png" alt="go" width={30} height={30}/>
          </div>
          <div className="space-y-1 flex flex-col items-start">
            <h3 className="text-[17px]  font-medium">BrainStorm Blog Titles</h3>
          </div>
        </button>
         <div className=" border-t-2 border-dotted border-gray-400 w-20 rotate-90"></div>
  <button
          className={clsx(
            "w-full max-w-[340px] transition-all duration-300 p-3 border  rounded-xl flex items-center gap-4 cursor-pointer !border-primary-green"
          )}>
          <div className="bg-primary-green p-4 rounded-lg">
          <Image src="/1.png" alt="go" width={30} height={30}/>
          </div>
          <div className="space-y-1 flex flex-col items-start">
            <h3 className="text-[17px]  font-medium">Generate URL Slug</h3>
          </div>
        </button>
          <div className=" border-t-2 border-dotted border-gray-400 w-20 rotate-90"></div>
  <button
          className={clsx(
            "w-full max-w-[340px] transition-all duration-300 p-3 border  rounded-xl flex items-center gap-4 cursor-pointer !border-primary-green"
          )}>
          <div className="bg-primary-green p-4 rounded-lg">
          <Image src="/1.png" alt="go" width={30} height={30}/>
          </div>
          <div className="space-y-1 flex flex-col items-start">
            <h3 className="text-[17px]  font-medium">Generate Outline</h3>
          </div>
        </button>
    <div className=" border-t-2 border-dotted border-gray-400 w-20 rotate-90"></div>
  <button
          className={clsx(
            "w-full max-w-[340px] transition-all duration-300 p-3 border  rounded-xl flex items-center gap-4 cursor-pointer !border-primary-green"
          )}>
          <div className="bg-primary-green p-4 rounded-lg">
          <Image src="/1.png" alt="go" width={30} height={30}/>
          </div>
          <div className="space-y-1 flex flex-col items-start">
            <h3 className="text-[17px]  font-medium">Generate blog post</h3>
          </div>
        </button>
         <div className=" border-t-2 border-dotted border-gray-400 w-20 rotate-90"></div>
  <button
          className={clsx(
            "w-full max-w-[340px] transition-all duration-300 p-3 border  rounded-xl flex items-center gap-4 cursor-pointer !border-primary-green"
          )}>
          <div className="bg-primary-green p-4 rounded-lg">
          <Image src="/1.png" alt="go" width={30} height={30}/>
          </div>
          <div className="space-y-1 flex flex-col items-start">
            <h3 className="text-[17px]  font-medium">Generate Meta Description</h3>
          </div>
        </button>
          <div className=" border-t-2 border-dotted border-gray-400 w-20 rotate-90"></div>
  <button
          className={clsx(
            "w-full max-w-[340px] transition-all duration-300 p-3 border  rounded-xl flex items-center gap-4 cursor-pointer !border-primary-green"
          )}>
          <div className="bg-primary-green p-4 rounded-lg">
          <Image src="/1.png" alt="go" width={30} height={30}/>
          </div>
          <div className="space-y-1 flex flex-col items-start">
            <h3 className="text-[17px]  font-medium">Find Content Brief</h3>
          </div>
        </button>
  <div className=" border-t border-dotted border-gray-400 w-20 rotate-90"></div>

  <button
          className={clsx(
            "w-full max-w-[340px] transition-all duration-300 p-3 border  rounded-xl flex items-center gap-4 cursor-pointer !border-primary-green"
          )}>
          <div className="bg-primary-green p-4 rounded-lg">
          <Image src="/2.png" alt="go" width={30} height={30}/>
          </div>
          <div className="space-y-1 flex flex-col items-start">
            <h3 className="text-[17px]  font-medium">Brainstorm title</h3>
          </div>
        </button>
  <div className=" border-t border-dotted border-gray-400 w-20 rotate-90"></div>

  <button
          className={clsx(
            "w-full max-w-[340px] transition-all duration-300 p-3 border  rounded-xl flex items-center gap-4 cursor-pointer !border-primary-green"
          )}>
          <div className="bg-primary-green p-4 rounded-lg">
          <Image src="/3.png" alt="go" width={30} height={30}/>
          </div>
          <div className="space-y-1 flex flex-col items-start">
            <h3 className="text-[16px] font-medium">Brainstorm meta description</h3>
          </div>
        </button>
        <div className=" border-t border-dotted border-gray-400 w-20 rotate-90"></div>

  <button
          className={clsx(
            "w-full max-w-[340px] transition-all duration-300 p-3 border  rounded-xl flex items-center gap-4 cursor-pointer !border-primary-green"
          )}>
          <div className="bg-primary-green p-4 rounded-lg">
          <Image src="/3.png" alt="go" width={30} height={30}/>
          </div>
          <div className="space-y-1 flex flex-col items-start">
            <h3 className="text-[16px] font-medium">Brainstorm meta description</h3>
          </div>
        </button>
  </div>
  
  
  <div className='flex flex-col gap-2 px-60'>
      <div className='border shadow-md rounded-xl'><input
        type="text"
        placeholder="Describe your workflow or add a command here"
        className="w-full p-2 border border-gray-100 bg-[#F9F9F9] rounded-lg focus:outline-none focus:ring-2"
      />
      <div className='flex flex-row p-4  justify-between'>
    <div className='flex flex-row gap-4'> <Image src="/history.png" alt="go" width={30} height={10}/> <h2 className='text-lg'>Build history</h2></div>
   
     <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.40359 6.32015L15.8936 3.49015C19.7036 2.22015 21.7736 4.30015 20.5136 8.11015L17.6836 16.6002C15.7836 22.3102 12.6636 22.3102 10.7636 16.6002L9.92359 14.0802L7.40359 13.2402C1.69359 11.3402 1.69359 8.23016 7.40359 6.32015Z" stroke="#034737" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10.1094 13.6525L13.6894 10.0625" stroke="#034737" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg> </div>

      </div>
    </div>
</div>

        <div ref={runRef} className="flex-shrink-0 w-full min-w-[1000px] bg-white p-10 snap-center gap-10 rounded-xl flex flex-col">
  <div className='flex flex-col gap-2 items-start'>
    <h1 className="text-2xl font-medium text-left">Run workflow</h1>
    <p className='text-[#14171B]/80'>Fill in the input to kick off your workflow.</p>
  </div>
  <div className='border-gray-300 border rounded-xl flex flex-col gap-6 p-10 '>
    <div className='flex flex-row items-center gap-4'>
      <Image src="/edit.png" alt="go" width={50} height={50}/>
      <h2 className='font-medium text-lg'>Input</h2>
    </div>
    <div>
      <h2 className='font-medium text-lg'>
        Keywords
      </h2>
              <input
                type="text"
                placeholder="Enter keywords by comma separated"
                className="w-full p-2 border border-gray-100 bg-[#F9F9F9] rounded-lg focus:outline-none focus:ring-2"
                value={keyWords}
                onChange={(e) => setKeyWords(e.target.value)}
              />
    </div>
    {/* <div className='flex flex-col gap-2'>
      <h2 className='font-medium'>Content brief</h2>
      <input
        type="text"
        placeholder="Enter content brief here"
        className="w-full p-2 border border-gray-100 bg-[#F9F9F9] rounded-lg focus:outline-none focus:ring-2"
      />
    </div> */}
    {
      !isWorkFlowFetched ? <DotsLoader />:
    
    <div className='bg-[#03473729] flex flex-row items-center justify-center rounded-xl p-4 gap-3 cursor-pointer' onClick={()=>handleRunWorkFlow()}>
      <Image src="/run.png" alt="go" width={10} height={10}/>
      <h2 className="text-[#14171B] font"> Run Workflow</h2>
    </div>
}
  </div>

  {/* Results Section */}
  <div className="flex flex-col gap-10">
    <div className='flex flex-col gap-2 items-start'>
      <h1 className="text-2xl font-medium text-left">Results</h1>
      <p className='text-[#14171B]/80'>Your output will appear below.</p>
    </div>
    {
      workFlowResults.outputs.map((output,idx) => (
        <>
          {workFlowResults.status && workFlowResults.failed_step <= idx+1 &&
            (output.variable_name !== "Gpt Response" ? 
            <div key={idx} className='border-gray-300 border rounded-xl flex flex-col gap-4 p-6 bg-white'>
              <div className='flex flex-row items-center gap-6'>
                <Image src="/leaf.png" alt="go" width={50} height={50} />
                <h2 className='font-medium text-lg'>{idx + 1} {output.variable_name} </h2>
                <button
                  className="bg-primary-green ml-auto text-white px-4 py-2 rounded"
                  onClick={() => navigator.clipboard.writeText(output.variable_value)}
                >
                  Copy
                </button>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg break-words whitespace-pre-line">
                {output.variable_type === 'object' ?
                  Array.isArray(output.variable_value) &&
                  output.variable_value.map((item: any) => (
                    <ReactMarkdown>{item}</ReactMarkdown>
                  ))
                  : <ReactMarkdown>{output.variable_value}</ReactMarkdown>}
              </div>
            </div> :
            Object.entries(output.variable_value).map(([key, value] : any, index) => (
              <div key={index} className='border-gray-300 border rounded-xl flex flex-col gap-4 p-6 bg-white'>
                <div className='flex flex-row items-center gap-6'>
                  <Image src="/leaf.png" alt="go" width={50} height={50} />
                  <h2 className='font-medium text-lg'>{index + idx + 1} {key}</h2>
                  <button
                    className="bg-primary-green ml-auto text-white px-4 py-2 rounded"
                    onClick={() => navigator.clipboard.writeText(value)}
                  >
                    Copy
                  </button>
                </div>
                <div className="bg-gray-100 p-4 rounded-lg break-words whitespace-pre-line">
                  <ReactMarkdown>
                    {value}
                  </ReactMarkdown>
                </div>
              </div>
            )))
            }
        </>
      ))
    }
          

    {/* <div className='border-gray-300 border rounded-xl flex flex-col gap-4 p-6 bg-white'>
      <div className='flex flex-row items-center gap-6'>
        <Image src="/leaf.png" alt="go" width={50} height={50}/>
        <h2 className='font-medium text-lg'>2. Brainstorm title</h2>
      </div>
    </div>
    <div className='border-gray-300 border rounded-xl flex flex-col gap-4 p-6 bg-white'>
      <div className='flex flex-row items-center gap-6'>
        <Image src="/leaf.png" alt="go" width={50} height={50}/>
        <h2 className='font-medium text-lg'>3. Brainstorm meta description</h2>
      </div>
    </div>
    <div className='border-gray-300 border rounded-xl flex flex-col gap-4 p-6 bg-white'>
      <div className='flex flex-row items-center gap-6'>
        <Image src="/leaf.png" alt="go" width={50} height={50}/>
        <h2 className='font-medium text-lg'>4. Search Keyword</h2>
      </div>
    </div> */}
           {/* <div className='border-gray-300 border rounded-xl flex flex-col gap-6 p-6 '>
            <div className='flex flex-row items-center gap-6'>
                <Image src="/leaf.png" alt="go" width={50} height={50}/>
                <h2 className='font-medium text-lg'>5.Extract Top 3 URLs</h2>
            </div>
   
          </div>  <div className='border-gray-300 border rounded-xl flex flex-col gap-6 p-6 '>
            <div className='flex flex-row items-center gap-6'>
                <Image src="/leaf.png" alt="go" width={50} height={50}/>
                <h2 className='font-medium text-lg'>6.Scan First URL</h2>
            </div>

          </div>  <div className='border-gray-300 border rounded-xl flex flex-col gap-6 p-6 '>
            <div className='flex flex-row items-center gap-6'>
                <Image src="/leaf.png" alt="go" width={50} height={50}/>
                <h2 className='font-medium text-lg'>7. Extract H2s from first URL</h2>
            </div>
          </div>  <div className='border-gray-300 border rounded-xl flex flex-col gap-6 p-6 '>
            <div className='flex flex-row items-center gap-6'>
                <Image src="/leaf.png" alt="go" width={50} height={50}/>
                <h2 className='font-medium text-lg'>8. Scan Second URL</h2>
            </div>

          </div>  <div className='border-gray-300 border rounded-xl flex flex-col gap-6 p-6 '>
            <div className='flex flex-row items-center gap-6'>
                <Image src="/leaf.png" alt="go" width={50} height={50}/>
                <h2 className='font-medium text-lg'>9. Extract H2s from second URL</h2>
            </div>
 
          </div>  <div className='border-gray-300 border rounded-xl flex flex-col gap-6 p-6 '>
            <div className='flex flex-row items-center gap-6'>
                <Image src="/leaf.png" alt="go" width={50} height={50}/>
                <h2 className='font-medium text-lg'>10. Scan Third URL</h2>
            </div>
 
          </div>  
          <div className='border-gray-300 border rounded-xl flex flex-col gap-6 p-6 '>
            <div className='flex flex-row items-center gap-6'>
                <Image src="/leaf.png" alt="go" width={50} height={50}/>
                <h2 className='font-medium text-lg'>10. Extract H2s from third URL</h2>
            </div>
            
            
          
         
             
          </div>
          <div className='border-gray-300 border rounded-xl flex flex-col gap-6 p-6 '>
            <div className='flex flex-row items-center gap-6'>
                <Image src="/leaf.png" alt="go" width={50} height={50}/>
                <h2 className='font-medium text-lg'>11.Recommend Page Type</h2>
            </div>
 
          </div>  <div className='border-gray-300 border rounded-xl flex flex-col gap-6 p-6 '>
            <div className='flex flex-row items-center gap-6'>
                <Image src="/leaf.png" alt="go" width={50} height={50}/>
                <h2 className='font-medium text-lg'>12.  Brainstorm Questions</h2>
            </div>
 
          </div>  <div className='border-gray-300 border rounded-xl flex flex-col gap-6 p-6 '>
            <div className='flex flex-row items-center gap-6'>
                <Image src="/leaf.png" alt="go" width={50} height={50}/>
                <h2 className='font-medium text-lg'>13. Brainstorm Blog Titles</h2>
            </div>

          </div>
          <div className='border-gray-300 border rounded-xl flex flex-col gap-6 p-6 '>
            <div className='flex flex-row items-center gap-6'>
                <Image src="/leaf.png" alt="go" width={50} height={50}/>
                <h2 className='font-medium text-lg'>14. Generate URL Slug</h2>
            </div>
            
            
          
         
             
          </div> <div className='border-gray-300 border rounded-xl flex flex-col gap-6 p-6 '>
            <div className='flex flex-row items-center gap-6'>
                <Image src="/leaf.png" alt="go" width={50} height={50}/>
                <h2 className='font-medium text-lg'>15. Generate Outline</h2>
            </div>
          </div> */}
          </div>
          </div>
      <div ref={tableRef} className="flex-shrink-0 w-full h-full min-w-[1000px] bg-white p-10 snap-center gap-10 flex flex-col">
      <div className="flex justify-between items-center mb-4">
              <div className="flex flex-row gap-4 items-center">
                
                <input
                  type="file"
                  onChange={(e) => importData(e.target.files![0])}
                  className="hidden"
                  id="import-csv"
                />
                <label htmlFor="import-csv" className="border bg-primary-blue hover:bg-primary-blue-dark text-white py-2 px-4 rounded-lg text-sm cursor-pointer transition duration-300 ease-in-out flex items-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4 17V19C4 20.1046 4.89543 21 6 21H18C19.1046 21 20 20.1046 20 19V17" stroke="#4B465C" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M4 17V19C4 20.1046 4.89543 21 6 21H18C19.1046 21 20 20.1046 20 19V17" stroke="white" stroke-opacity="0.2" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M7 11L12 16L17 11" stroke="#4B465C" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M7 11L12 16L17 11" stroke="white" stroke-opacity="0.2" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12 4V16" stroke="#4B465C" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12 4V16" stroke="white" stroke-opacity="0.2" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
</svg>


                 <h2 className='text-black ml-4 '>Import CSV</h2> 
                </label>
                <CSVLink
                  data={tableData}
                  filename={"workflow_data.csv"}
                  className="border bg-white hover:bg-primary-green-dark text-white py-2 px-4 rounded-lg text-sm transition duration-300 ease-in-out flex items-center"
                  onClick={exportData}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4 17V19C4 20.1046 4.89543 21 6 21H18C19.1046 21 20 20.1046 20 19V17" stroke="#4B465C" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M4 17V19C4 20.1046 4.89543 21 6 21H18C19.1046 21 20 20.1046 20 19V17" stroke="white" stroke-opacity="0.2" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M7 9L12 4L17 9" stroke="#4B465C" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M7 9L12 4L17 9" stroke="white" stroke-opacity="0.2" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12 4V16" stroke="#4B465C" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12 4V16" stroke="white" stroke-opacity="0.2" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

                 <h2 className='text-black ml-4 '>Export CSV</h2> 
                </CSVLink>
              </div>
              <div className="flex flex-row  rounded-xl  gap-4 items-center">
                <button
                  onClick={runAll}
                  className="border p-2 hover:bg-primary-green-dark text-white py-2 px-4 rounded-lg text-sm transition duration-300 ease-in-out flex items-center"
                >
               <svg width="11" height="14" viewBox="0 0 11 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.5 6.13397C11.1667 6.51888 11.1667 7.48112 10.5 7.86602L1.5 13.0622C0.833332 13.4471 3.43203e-07 12.966 3.76852e-07 12.1962L8.31114e-07 1.80385C8.64763e-07 1.03405 0.833334 0.552922 1.5 0.937822L10.5 6.13397Z" fill="#14171B"/>
</svg>
   <h2 className='text-black ml-4'>Run All</h2>
                </button>
                <button
                  onClick={addNewRow}
                  className="bg-primary-green p-4 hover:bg-primary-blue-dark text-white py-2 px-4 rounded-lg text-sm transition duration-300 ease-in-out flex items-center"
                ><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 1V15" stroke="white" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M1 8H15" stroke="white" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <h2 className='text-white ml-4'>New Row</h2>

               
                </button>
              </div>
            </div>  <table className="min-w-full bg-white border border-gray-200 divide-y divide-gray-200">
    <thead className="bg-[#0347370D]">
      <tr className=" text-left text-xs font-medium text-[#14171B]">
        <th className="p-2">Run</th>
        <th className="p-2"> Status</th>
        <th className="p-2">Content brief</th>
        <th className="p-2">Generate blog post</th>
        <th className="p-2">Brainstorm title</th>
        <th className="p-2">Brainstorm meta description</th>
      </tr>
    </thead>
    <tbody className="divide-y divide-gray-200">
      <tr className="hover:bg-white">
        <td className="p-2"></td>
        <td className="p-2"></td>
        <td className="p-2"></td>
        <td className="p-2"></td>
      </tr>
      <tr className="bg-white">
        <td className="p-2"></td>
        <td className="p-2"></td>
        <td className="p-2"></td>
        <td className="p-2"></td>
        <td className="p-2"></td>
      </tr>
      <tr className="hover:bg-white">
        <td className="p-2"></td>
        <td className="p-2"></td>
        <td className="p-2"></td>
        <td className="p-2"></td>
      </tr>
    </tbody>
  </table>
  <div className="flex justify-between items-center mt-4">
              <p className="text-sm text-gray-500">
                Showing {(currentPage - 1) * 10 + 1} - {Math.min(currentPage * 10, tableData.length)} of {tableData.length} results
              </p>
              <div className="flex gap-2 items-center">
                <button
                  onClick={previousPage}
                  disabled={currentPage === 1}
                  className={`bg-gray-200 hover:bg-gray-300 text-gray-600 py-1 px-3 rounded-md text-sm ${
                    currentPage === 1 ? 'cursor-not-allowed' : 'cursor-pointer'
                  }`}
                >
                  Previous
                </button>
                <button
                  onClick={nextPage}
                  disabled={currentPage === totalPages}
                  className={`bg-gray-200 hover:bg-gray-300 text-gray-600 py-1 px-3 rounded-md text-sm ${
                    currentPage === totalPages ? 'cursor-not-allowed' : 'cursor-pointer'
                  }`}
                >
                  Next
                </button>
              </div>
            </div>
        </div>
    
      </div>
    </div>
  )
}

export default Page
