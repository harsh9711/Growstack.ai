"use client"
import Image from 'next/image'
import Link from 'next/link'
import React, { useRef, RefObject, useState } from 'react'

const Page = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const buildRef = useRef<HTMLDivElement>(null);
  const runRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);

  const [activeSection, setActiveSection] = useState<string>('run');

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
              <h2 className='text-xl font-semibold'>New WorkFlow {" "}/ {" "}Write blog post (3)</h2>
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
        className="flex flex-row overflow-x-scroll snap-x snap-mandatory scroll-smooth h-screen"
      >
        <div ref={buildRef} className="flex-shrink-0 w-full h-full  bg-white p-10 rounded-xl justify-center">
        <div className='flex flex-col gap-2 items-center justify-center bg-[#0347371A] rounded w-40'>
            <h1 className="text-xl font-bold text-center text-[#14171B]">Test workflow</h1>
        </div>
          <div className='border-gray-300 border rounded-xl flex flex-col gap-6 p-10 w-80 '>
            <div className='flex flex-row items-center gap-4'>
                <Image src="/edit.png" alt="go" width={50} height={50}/>
                <h2 className='font-semibold text-lg'>Input</h2>
            </div>
          
              
            
          </div>
    
       
        </div>
        <div ref={runRef} className="flex-shrink-0 w-full h-full min-w-[1000px] bg-white p-10 snap-center gap-10 flex flex-col">
          <div className='flex flex-col gap-2 items-start'>
            <h1 className="text-2xl font-bold text-left">Run workflow</h1>
          <p className='text-[#14171B]/80'>Fill in the input to kick off your workflow.</p></div>
          <div className='border-gray-300 border rounded-xl flex flex-col gap-6 p-10 '>
            <div className='flex flex-row items-center gap-4'>
                <Image src="/edit.png" alt="go" width={50} height={50}/>
                <h2 className='font-semibold text-lg'>Input</h2>
            </div>
            <div><h2 className='font-bold text-lg'>Content brief</h2>
                </div>
                <div className='flex flex-col gap-2'>
                    <h2 className='font-medium'>Content brief</h2>
                    <input
          type="text"
          placeholder="Enter content brief here"
          className="w-full p-2 border border-gray-100 bg-[#F9F9F9] rounded-lg focus:outline-none focus:ring-2 "
        />
                </div>
                <div className='bg-[#03473729] flex flex-row items-center justify-center rounded-xl p-4 gap-3'>
                <Image src="/run.png" alt="go" width={10} height={10}/>
               <h2 className="text-[#14171B] font"> Run Workflow</h2>
                </div>
          </div>
    
          <div ref={runRef} className="flex-shrink-0 w-full h-full min-w-[1000px] bg-white gap-10 flex flex-col">
          <div className='flex flex-col gap-2 items-start'><h1 className="text-2xl font-bold text-left">Results</h1>
          <p className='text-[#14171B]/80'>Your output will appear below.</p></div>
          <div className='border-gray-300 border rounded-xl flex flex-col gap-4 p-6 '>
            <div className='flex flex-row items-center gap-6'>
                <Image src="/leaf.png" alt="go" width={50} height={50}/>
                <h2 className='font-semibold text-lg'>1. Generate blog post</h2>
            </div>

          </div>
          <div className='border-gray-300 border rounded-xl flex flex-col gap-6 p-6 '>
            <div className='flex flex-row items-center gap-6'>
                <Image src="/leaf.png" alt="go" width={50} height={50}/>
                <h2 className='font-semibold text-lg'>2. Brainstorm title</h2>
            </div>

          </div>
          <div className='border-gray-300 border rounded-xl flex flex-col gap-6 p-4 '>
            <div className='flex flex-row items-center gap-6'>
                <Image src="/leaf.png" alt="go" width={50} height={50}/>
                <h2 className='font-semibold text-lg'>3.Brainstorm meta description</h2>
            </div>
 
          </div>
          <div className='border-gray-300 border rounded-xl flex flex-col gap-6 p-6 '>
            <div className='flex flex-row items-center gap-6'>
                <Image src="/leaf.png" alt="go" width={50} height={50}/>
                <h2 className='font-semibold text-lg'>4.Search Keyword</h2>
            </div>
          </div>  <div className='border-gray-300 border rounded-xl flex flex-col gap-6 p-6 '>
            <div className='flex flex-row items-center gap-6'>
                <Image src="/leaf.png" alt="go" width={50} height={50}/>
                <h2 className='font-semibold text-lg'>5.Extract Top 3 URLs</h2>
            </div>
   
          </div>  <div className='border-gray-300 border rounded-xl flex flex-col gap-6 p-6 '>
            <div className='flex flex-row items-center gap-6'>
                <Image src="/leaf.png" alt="go" width={50} height={50}/>
                <h2 className='font-semibold text-lg'>6.Scan First URL</h2>
            </div>

          </div>  <div className='border-gray-300 border rounded-xl flex flex-col gap-6 p-6 '>
            <div className='flex flex-row items-center gap-6'>
                <Image src="/leaf.png" alt="go" width={50} height={50}/>
                <h2 className='font-semibold text-lg'>7. Extract H2s from first URL</h2>
            </div>
          </div>  <div className='border-gray-300 border rounded-xl flex flex-col gap-6 p-6 '>
            <div className='flex flex-row items-center gap-6'>
                <Image src="/leaf.png" alt="go" width={50} height={50}/>
                <h2 className='font-semibold text-lg'>8. Scan Second URL</h2>
            </div>

          </div>  <div className='border-gray-300 border rounded-xl flex flex-col gap-6 p-6 '>
            <div className='flex flex-row items-center gap-6'>
                <Image src="/leaf.png" alt="go" width={50} height={50}/>
                <h2 className='font-semibold text-lg'>9. Extract H2s from second URL</h2>
            </div>
 
          </div>  <div className='border-gray-300 border rounded-xl flex flex-col gap-6 p-6 '>
            <div className='flex flex-row items-center gap-6'>
                <Image src="/leaf.png" alt="go" width={50} height={50}/>
                <h2 className='font-semibold text-lg'>10. Scan Third URL</h2>
            </div>
 
          </div>  
          <div className='border-gray-300 border rounded-xl flex flex-col gap-6 p-6 '>
            <div className='flex flex-row items-center gap-6'>
                <Image src="/leaf.png" alt="go" width={50} height={50}/>
                <h2 className='font-semibold text-lg'>10. Extract H2s from third URL</h2>
            </div>
            
            
          
         
             
          </div>
          <div className='border-gray-300 border rounded-xl flex flex-col gap-6 p-6 '>
            <div className='flex flex-row items-center gap-6'>
                <Image src="/leaf.png" alt="go" width={50} height={50}/>
                <h2 className='font-semibold text-lg'>11.Recommend Page Type</h2>
            </div>
 
          </div>  <div className='border-gray-300 border rounded-xl flex flex-col gap-6 p-6 '>
            <div className='flex flex-row items-center gap-6'>
                <Image src="/leaf.png" alt="go" width={50} height={50}/>
                <h2 className='font-semibold text-lg'>12.  Brainstorm Questions</h2>
            </div>
 
          </div>  <div className='border-gray-300 border rounded-xl flex flex-col gap-6 p-6 '>
            <div className='flex flex-row items-center gap-6'>
                <Image src="/leaf.png" alt="go" width={50} height={50}/>
                <h2 className='font-semibold text-lg'>13. Brainstorm Blog Titles</h2>
            </div>

          </div>
          <div className='border-gray-300 border rounded-xl flex flex-col gap-6 p-6 '>
            <div className='flex flex-row items-center gap-6'>
                <Image src="/leaf.png" alt="go" width={50} height={50}/>
                <h2 className='font-semibold text-lg'>14. Generate URL Slug</h2>
            </div>
            
            
          
         
             
          </div> <div className='border-gray-300 border rounded-xl flex flex-col gap-6 p-6 '>
            <div className='flex flex-row items-center gap-6'>
                <Image src="/leaf.png" alt="go" width={50} height={50}/>
                <h2 className='font-semibold text-lg'>15. Generate Outline</h2>
            </div>
          </div>
     
        </div>
        </div>
      <div ref={tableRef} className="flex-shrink-0 w-full h-full min-w-[1000px] bg-white p-10 snap-center gap-10 flex flex-col">
       
       
        </div>
      </div>
    </div>
  )
}

export default Page
