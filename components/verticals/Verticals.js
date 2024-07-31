import React, { useEffect } from 'react'
import AOS from "aos";
import "aos/dist/aos.css";
import './Verticals.scss'
import Link from 'next/link'
function Verticals() {
  useEffect(() => {
    AOS.init();
}, []);
  return (
    <React.Fragment>
      <div className="verticals">
        <div className="container">
          <div className="title" data-aos="fade-up"
                            data-aos-easing="ease-in-sine"
                            data-aos-duration="1000">
            <h3 className="heading">
              <span>We don't merely transcribe words; we </span> craft them too.
            </h3>
            <form>
              <div className="form-group">
                <input type="text" name="Search" id="Search" placeholder="Search" />
                <img src="/images_growstack/verticals/search.svg" alt="img" />
              </div>
            </form>
          </div>
          <div className="verticalBanner" data-aos="fade-up"
                            data-aos-easing="ease-in-sine"
                            data-aos-duration="1000">
            <div className="card">
              <div className="row g-0">
                <div className="col-md-6">
                  <div className="card-body">
                    <span className="user">AI marketing and sales apps</span>
                   <div>
                    <h5 className="heading">
                      <span>What is Sales Planning? How to</span> Create a Sales Plan
                    </h5>
                    <div className="d-flex align-items-center block">
                    <div className="flex-shrink-0">
                      <img src="/images_growstack/verticals/user.svg" alt="user" />
                    </div>
                    <div className="flex-grow-1 ms-3">
                      <h4>Josh Gould</h4>
                      <p>February 13, 2024</p>
                    </div>
                  </div>
                    <p>Sales planning is a fundamental component of sound selling. After all, you can‘t structure an effective sales effort if you don’t have, well, structure.</p>
                   </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <img src="/images_growstack/verticals/banner.svg" className="img-fluid" alt="banner" />
                </div>
              </div>
            </div>
          </div>
          <div className="bar" data-aos="fade-down"
                            data-aos-easing="ease-in-sine"
                            data-aos-duration="1000">
            <span className="user">All Articles</span>
            <span className="user">AI marketing and sales apps</span>
            <span className="user">Text to video and product AI</span>
            <span className="user">Marketing and sales assitants</span>
            <span className="user">AI website landing page and email builder</span>
            <span className="user">AI marketing and sales apps</span>
          </div>
          <div className="allArticles">
            <h2>All articles</h2>
          <Link href="/vertical-details" data-aos="fade-up"
                            data-aos-easing="ease-in-sine"
                            data-aos-duration="1000">
          <div className="card">
              <div className="row g-0">
                <div className="col-md-6">
                  <img src="/images_growstack/verticals/article1.svg" className="img-fluid" alt="banner" />
                </div>
                <div className="col-md-6">
                  <div className="card-body">
                    <span className="user">AI marketing and sales apps</span>
                   <div>
                    <h5 className="heading">
                      <span>What is Sales Planning? How to</span> Create a Sales Plan
                    </h5>
                    <p>Sales planning is a fundamental component of sound selling. After all, you can‘t structure an effective sales effort if you don’t have, well, structure.</p>
                    <div className="d-flex align-items-center block">
                    <div className="flex-shrink-0">
                      <img src="/images_growstack/verticals/user.svg" alt="user" />
                    </div>
                    <div className="flex-grow-1 ms-3">
                      <h4>Josh Gould</h4>
                      <p>February 13, 2024</p>
                    </div>
                  </div>
                   </div>
                  </div>
                </div>
              </div>
          </div>
          </Link>
          <Link href="/vertical-details" data-aos="fade-up"
                            data-aos-easing="ease-in-sine"
                            data-aos-duration="1000">
          <div className="card">
              <div className="row g-0">
                <div className="col-md-6">
                  <img src="/images_growstack/verticals/article2.svg" className="img-fluid" alt="banner" />
                </div>
                <div className="col-md-6">
                  <div className="card-body">
                    <span className="user">Text to video and product AI</span>
                   <div>
                    <h5 className="heading">
                      <span>What is Sales Planning? How to</span> Create a Sales Plan
                    </h5>
                    <p>Sales planning is a fundamental component of sound selling. After all, you can‘t structure an effective sales effort if you don’t have, well, structure.</p>
                    <div className="d-flex align-items-center block">
                    <div className="flex-shrink-0">
                      <img src="/images_growstack/verticals/user.svg" alt="user" />
                    </div>
                    <div className="flex-grow-1 ms-3">
                      <h4>Josh Gould</h4>
                      <p>February 13, 2024</p>
                    </div>
                  </div>
                   </div>
                  </div>
                </div>
              </div>
          </div>
          </Link>
          <Link href="/vertical-details" data-aos="fade-up"
                            data-aos-easing="ease-in-sine"
                            data-aos-duration="1000">
          <div className="card">
              <div className="row g-0">
                <div className="col-md-6">
                  <img src="/images_growstack/verticals/article3.svg" className="img-fluid" alt="banner" />
                </div>
                <div className="col-md-6">
                  <div className="card-body">
                    <span className="user">AI website landing page and email builder</span>
                   <div>
                    <h5 className="heading">
                      <span>What is Sales Planning? How to</span> Create a Sales Plan
                    </h5>
                    <p>Sales planning is a fundamental component of sound selling. After all, you can‘t structure an effective sales effort if you don’t have, well, structure.</p>
                    <div className="d-flex align-items-center block">
                    <div className="flex-shrink-0">
                      <img src="/images_growstack/verticals/user.svg" alt="user" />
                    </div>
                    <div className="flex-grow-1 ms-3">
                      <h4>Josh Gould</h4>
                      <p>February 13, 2024</p>
                    </div>
                  </div>
                   </div>
                  </div>
                </div>
              </div>
          </div>
          </Link>
          <Link href="/vertical-details" data-aos="fade-up"
                            data-aos-easing="ease-in-sine"
                            data-aos-duration="1000">
          <div className="card">
              <div className="row g-0">
                <div className="col-md-6">
                  <img src="/images_growstack/verticals/article4.svg" className="img-fluid" alt="banner" />
                </div>
                <div className="col-md-6">
                  <div className="card-body">
                    <span className="user">Marketing and sales assitants</span>
                   <div>
                    <h5 className="heading">
                      <span>What is Sales Planning? How to</span> Create a Sales Plan
                    </h5>
                    <p>Sales planning is a fundamental component of sound selling. After all, you can‘t structure an effective sales effort if you don’t have, well, structure.</p>
                    <div className="d-flex align-items-center block">
                    <div className="flex-shrink-0">
                      <img src="/images_growstack/verticals/user.svg" alt="user" />
                    </div>
                    <div className="flex-grow-1 ms-3">
                      <h4>Josh Gould</h4>
                      <p>February 13, 2024</p>
                    </div>
                  </div>
                   </div>
                  </div>
                </div>
              </div>
          </div>
          </Link>
          <Link href="/vertical-details" data-aos="fade-up"
                            data-aos-easing="ease-in-sine"
                            data-aos-duration="1000">
          <div className="card">
              <div className="row g-0">
                <div className="col-md-6">
                  <img src="/images_growstack/verticals/article5.svg" className="img-fluid" alt="banner" />
                </div>
                <div className="col-md-6">
                  <div className="card-body">
                    <span className="user">AI website landing page and email builder</span>
                   <div>
                    <h5 className="heading">
                      <span>What is Sales Planning? How to</span> Create a Sales Plan
                    </h5>
                    <p>Sales planning is a fundamental component of sound selling. After all, you can‘t structure an effective sales effort if you don’t have, well, structure.</p>
                    <div className="d-flex align-items-center block">
                    <div className="flex-shrink-0">
                      <img src="/images_growstack/verticals/user.svg" alt="user" />
                    </div>
                    <div className="flex-grow-1 ms-3">
                      <h4>Josh Gould</h4>
                      <p>February 13, 2024</p>
                    </div>
                  </div>
                   </div>
                  </div>
                </div>
              </div>
          </div>
          </Link>
          <Link href="/vertical-details" data-aos="fade-up"
                            data-aos-easing="ease-in-sine"
                            data-aos-duration="1000">
          <div className="card">
              <div className="row g-0">
                <div className="col-md-6">
                  <img src="/images_growstack/verticals/article6.svg" className="img-fluid" alt="banner" />
                </div>
                <div className="col-md-6">
                  <div className="card-body">
                    <span className="user">AI marketing and sales apps</span>
                   <div>
                    <h5 className="heading">
                      <span>What is Sales Planning? How to</span> Create a Sales Plan
                    </h5>
                    <p>Sales planning is a fundamental component of sound selling. After all, you can‘t structure an effective sales effort if you don’t have, well, structure.</p>
                    <div className="d-flex align-items-center block">
                    <div className="flex-shrink-0">
                      <img src="/images_growstack/verticals/user.svg" alt="user" />
                    </div>
                    <div className="flex-grow-1 ms-3">
                      <h4>Josh Gould</h4>
                      <p>February 13, 2024</p>
                    </div>
                  </div>
                   </div>
                  </div>
                </div>
              </div>
          </div>
          </Link>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Verticals
