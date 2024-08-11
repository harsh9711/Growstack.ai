import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './Features.scss';

function Features() {
  useEffect(() => {
    AOS.init();
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
            <div className="curveLine">
              <img src="/images_growstack/home/curveLine.svg" className='curveImg' alt="curveLine" /> 
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
            <img src="/images_growstack/home/boxLine.svg" className='boxLineImg' alt="boxLine" />
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
              <img className='trophyImg' src="/images_growstack/home/trophyLine.svg" alt="trophyLine" />

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
