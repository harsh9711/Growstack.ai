import React, { useEffect, useRef, useLayoutEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './Features.scss';

function Features() {
  const fillPathRef = useRef(null);
  const curveLineRef = useRef(null);

  useLayoutEffect(() => {
    AOS.init();

    const fillPath = fillPathRef.current;
    const curveLine = curveLineRef.current;

    if (fillPath && curveLine) {
      const fillPathLength = fillPath.getTotalLength();

      // Set up the starting conditions for fillPath
      fillPath.style.strokeDasharray = fillPathLength;
      fillPath.style.strokeDashoffset = fillPathLength;

      const handleScroll = () => {
        const curveLineRect = curveLine.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Calculate how much of the path is in view
        const scrollTop = window.scrollY;
        const startScroll = scrollTop + windowHeight;
        const endScroll = scrollTop + curveLineRect.height;

        // Calculate the percentage of the path to fill
        const percentDone = Math.max(0, Math.min(1, (startScroll - curveLineRect.top) / (curveLineRect.height + windowHeight)));

        // Update the strokeDashoffset to reflect the fill
        const offset = fillPathLength - (percentDone * fillPathLength);
        fillPath.style.strokeDashoffset = offset;
      };

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <React.Fragment>
      <div className="features">
        <div className="container">
          <div className="title" data-aos="fade-up" data-aos-easing="ease-in-sine" data-aos-duration="1000">
            <span className="user">Core Features</span>
            <h2 className="heading">
              <span>Discover our powerful</span> AI features
            </h2>
            <p className="m-0">
              From AI Templates, Assistants to Social Media Analytics, explore how GrowStack's suite of tools can elevate your business to new heights.
            </p>
          </div>
          
          <div className="feature-blocks">
            <div className="curveLine" ref={curveLineRef}>
            <div className="svg-container curveImg">
           <svg width="851" height="4324" viewBox="0 0 851 4324" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Dashed Stroke Paths */}
                  <path d="M117.001 0.5C79.3757 57.1442 77.0012 176 340.501 104.5C604.001 33 680.002 138.5 680.002 138.5C680.002 138.5 766.502 254.5 766.502 576.5C766.502 576.5 881.002 716 677.502 758.5C474.002 801 299.001 661.939 131.001 758.5C35.8521 813.189 10.6838 1033.94 6.27595 1082.16C5.69788 1088.49 5.48368 1094.59 5.81609 1100.93C8.16292 1145.71 27.9342 1335.37 194.5 1353C383.499 1373 434.5 1349.5 424 1450" 
                  stroke="#034737" strokeDasharray="15 15" />
                  <path d="M427.5 2490C427.5 2623.5 383.497 2911 695.999 2927C855.997 2941.5 856.999 2927 847 3205.5V3437C830.333 3489.5 818.999 3715 377.499 3599.5C256.284 3567.79 170.117 3572.01 115.419 3607C77.8313 3631.04 67.0598 3678.58 63.3216 3723.04L49.9992 3881.5C49.9992 3881.5 -100.395 4195.96 124.308 4294.57C129.607 4296.89 135.482 4298.58 141.167 4299.67C331.847 4336.09 360.355 4322.43 417.501 4311" 
                  stroke="#034737" strokeDasharray="15 15" />
                  <path d="M424 1451L425 2417" stroke="#034737" strokeDasharray="15 15"/>
                  <line x1="309" y1="1590.5" x2="424" y2="1590.5" stroke="#034737" strokeDasharray="15 15"/>
                  <line x1="424" y1="1783.5" x2="539" y2="1783.5" stroke="#034737" strokeDasharray="15 15"/>

                  {/* Fill Stroke Paths */}
                  <path ref={fillPathRef} d="M117.001 0.5C79.3757 57.1442 77.0012 176 340.501 104.5C604.001 33 680.002 138.5 680.002 138.5C680.002 138.5 766.502 254.5 766.502 576.5C766.502 576.5 881.002 716 677.502 758.5C474.002 801 299.001 661.939 131.001 758.5C35.8521 813.189 10.6838 1033.94 6.27595 1082.16C5.69788 1088.49 5.48368 1094.59 5.81609 1100.93C8.16292 1145.71 27.9342 1335.37 194.5 1353C383.499 1373 434.5 1349.5 424 1450" 
                  stroke="#034737" />
                  <path d="M427.5 2490C427.5 2623.5 383.497 2911 695.999 2927C855.997 2941.5 856.999 2927 847 3205.5V3437C830.333 3489.5 818.999 3715 377.499 3599.5C256.284 3567.79 170.117 3572.01 115.419 3607C77.8313 3631.04 67.0598 3678.58 63.3216 3723.04L49.9992 3881.5C49.9992 3881.5 -100.395 4195.96 124.308 4294.57C129.607 4296.89 135.482 4298.58 141.167 4299.67C331.847 4336.09 360.355 4322.43 417.501 4311" 
                  stroke="#034737" />
                  <path d="M424 1451L425 2417" stroke="#034737"/>
                  <line x1="309" y1="1590.5" x2="424" y2="1590.5" stroke="#034737"/>
                  <line x1="424" y1="1783.5" x2="539" y2="1783.5" stroke="#034737"/>
                </svg>
              </div>

                      <div className="feature-block" data-aos="fade-up" data-aos-easing="ease-in-sine" data-aos-duration="1000">
              <div className="row align-items-center">
              <div className="col-md-6">
              <img src="/images_growstack/home/fBlock1.svg" alt="Overcome creative block" className="feature-image"/>
              </div>
              <div className="col-md-6">
              <h3>Overcome creative block</h3>
              <p>Turn ideas into reality with AI Chat, AI Playground, and Custom GPT—your toolkit for breaking creative blocks. Get frictionless, dynamic content, and custom AI solutions to spark your next breakthrough.</p>
              <ul>
                <li>Instant Ideation</li>
                <li>Creative Collaboration</li>
                <li>Tailored AI Solutions</li>
              </ul>
              </div>
              </div>
            </div>
          
            <div className="feature-block" data-aos="fade-up" data-aos-easing="ease-in-sine" data-aos-duration="1000">
              <div className="row align-items-center">
              <div className="col-md-6">
              <h3>Transform ideas into content</h3>
              <p>Turn your sparks of creativity into content effortlessly. With AI Templates, Text to Video, and Product AI, you have the power to bring your ideas to life.</p>
              <ul>
                <li>Instant content generation</li>
                <li>Visual storytelling</li>
                <li>Seamless product integration</li>
              </ul>
              </div>
              <div className="col-md-6">
              <img src="/images_growstack/home/fBlock2.svg" alt="Transform ideas into content" className="feature-image textEnd"/>
              </div>
              </div>
            </div>

            <div className="feature-block" data-aos="fade-up" data-aos-easing="ease-in-sine" data-aos-duration="1000">
              <div className="row align-items-center">
              <div className="col-md-6">
              <img src="/images_growstack/home/fBlock3.svg" alt="Strategize with AI assistants" className="feature-image"/>
              </div>
              <div className="col-md-6">
              <h3>Strategize with AI assistants</h3>
              <p>Transform raw ideas into strategic masterpieces. Our AI Assistants cover every aspect of content strategy, from trend tracking and social engagement to lead qualification and sales optimization.</p>
              <ul>
                <li>Campaign crafting</li>
                <li>Customer insights</li>
                <li>Behavior analysis</li>
                <li>Sales optimization</li>
              </ul>
              </div>
              </div>
            </div>
            </div>

            <div className="feature-block-flex" >
 {/* <div className="boxLineImg" ref={boxLineImgRef}>
               <svg width="230" height="966" viewBox="0 0 230 966" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M115 0L116 966" stroke="#034737" strokeDasharray="15 15" strokeWidth="2"/>
  <line y1="139.5" x2="115" y2="139.5" stroke="#034737" strokeDasharray="15 15" strokeWidth="3"/>
  <line x1="115" y1="332.5" x2="230" y2="332.5" stroke="#034737" strokeDasharray="15 15" strokeWidth="2"/>
  <path d="M115 0L116 966" stroke="#034737" strokeWidth="3" strokeDasharray="1000" strokeDashoffset="1000" />
</svg>
              </div> */}
            <div className="feature-block" data-aos="fade-up" data-aos-easing="ease-in-sine" data-aos-duration="1000" >
              <img src="/images_growstack/home/fBlock4.svg" alt="Elevate your ideas into presentable content" className="feature-image"/>
              <h3>Elevate your ideas into presentable content</h3>
              <p>Streamline your strategy with our content builders: the AI Article Builder for engaging articles, the AI Email Builder for impactful messages, and the AI Website Builder for stunning sites. Present your ideas boldly and effectively.</p>
              <ul>
                <li>Storytelling</li>
                <li>Brand building</li>
                <li>Strategic messaging</li>
              </ul>
            </div>

            <div className="feature-block" data-aos="fade-up" data-aos-easing="ease-in-sine" data-aos-duration="1000" >
              <img src="/images_growstack/home/fBlock5.svg" alt="Gather insights from your audience" className="feature-image"/>
              <h3>Gather insights from your audience</h3>
              <p>Collect and analyze ideas from various sources to enhance your outreach. With tools for Google Maps scraping, social media conversations, and more, you gain invaluable insights into your audience.</p>
              <ul>
                <li>Lead tracking</li>
                <li>Audience engagement</li>
                <li>Data-driven strategies</li>
              </ul>
            </div>
            </div>

            <div className="trophyLine">
              {/* <img className='trophyImg' src="/images_growstack/home/trophyLine.svg" alt="trophyLine" /> */}

            <div className="feature-block" data-aos="fade-up" data-aos-easing="ease-in-sine" data-aos-duration="1000">
              <div className="row align-items-center">
              <div className="col-md-5">
              <h3>Streamline your processes with AI workflow builder</h3>
              <p>Optimize your processes effortlessly with our AI Workflow Builder. Automate tasks across various verticals to boost productivity and efficiency.</p>
              </div>
              <div className="col-md-3">
              <img src="/images_growstack/home/fBlock6.svg" alt="Streamline your processes with AI workflow builder" className="feature-image"/>
              </div>
              <div className="col-md-4">
              <ul>
                <li>CRM integration</li>
                <li>Content creation automation</li>
                <li>Social media posting</li>
                <li>Task management</li>
                <li>Lead tracking</li>
                <li>Customer interaction</li>
              </ul>
              </div>
              </div>
            </div>

            <div className="feature-block" data-aos="fade-up" data-aos-easing="ease-in-sine" data-aos-duration="1000">
              <div className="row align-items-center">
              <div className="col-md-6">
              <h3>Effortless publishing with scheduler</h3>
              <p>Seamlessly share your articles, blogs, and content across all social media platforms. With automated scheduling and optimized posting times, you can maximize your reach and engagement without the hassle.</p>
              <ul>
                <li>Automated Scheduling</li>
                <li>Cross-Platform Sharing</li>
                <li>Engagement Optimization</li>
              </ul>
              </div>
              <div className="col-md-6">
              <img src="/images_growstack/home/fBlock7.svg" alt="Effortless publishing with scheduler" className="feature-image"/>
              </div>
              </div>
            </div>

            <div className="feature-block" data-aos="fade-up" data-aos-easing="ease-in-sine" data-aos-duration="1000">
              <div className="row align-items-center">
              <div className="col-md-6">
              <img src="/images_growstack/home/fBlock8.svg" alt="Analyze your impact" className="feature-image"/>
              </div>
              <div className="col-md-6">
              <h3>Analyze your impact</h3>
              <p>Unlock insights with our analytics tools. Track social media performance, manage your online reputation, and refine your strategies. Measure engagement and analyze sentiment for maximum impact.</p>
              <ul>
                <li>Performance tracking</li>
                <li>Reputation insights</li>
                <li>Engagement analysis</li>
              </ul>
              </div>
              </div>
            </div>
            </div>
            </div>

        </div>
      </div>
    </React.Fragment>
  );
}

export default Features;
