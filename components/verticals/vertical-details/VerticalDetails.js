import React, { useEffect } from 'react'
import AOS from "aos";
import "aos/dist/aos.css";
import './VerticalDetails.scss'
import Link from 'next/link'
function VerticalDetails() {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <React.Fragment>
      <div className="verticalDetails">
        <div className="banner">
          <div className="container">
            <div className="title" data-aos="fade-up"
              data-aos-easing="ease-in-sine"
              data-aos-duration="1000">
              <h3 className="heading"><span>Learn from My Mistakes: 7 Digital </span>Course Pitfalls to Skip</h3>
              <p>Lorem ipsum dolor sit amet consectetur. Id arcu arcu commodo vestibulum ut ornare.</p>
            </div>
          </div>
        </div>
        <div className="detail">
          <div className="container">
            <div className="row">
              <div className="col-md-3" data-aos="fade-right"
                data-aos-easing="ease-in-sine"
                data-aos-duration="1000">
                <div className="userData">
                  <img src="/images/verticals/userDetail.svg" alt="user" />
                  <h4>Josh Gould</h4>
                  <span>Blog writer</span>
                  <h3>Contents</h3>
                  <p className="lines">Omnis ipsum ratione optio sed quos aspernatur nam.</p>
                  <p>Omnis ipsum ratione optio sed quos aspernatur nam.</p>
                  <p>Omnis ipsum ratione optio sed</p>
                  <h6>Share this article</h6>
                  <div className="social">
                    <Link href="/register"> <img src="/images/verticals/share1.svg" alt="facebook" /></Link>
                    <Link href="/register"> <img src="/images/verticals/share2.svg" alt="twitter" /></Link>
                    <Link href="/register"> <img src="/images/verticals/share3.svg" alt="linkedin" /></Link>
                    <Link href="/register"> <img src="/images/verticals/share4.svg" alt="linkedin" /></Link>
                  </div>
                </div>
              </div>
              <div className="col-md-9" data-aos="fade-left"
                data-aos-easing="ease-in-sine"
                data-aos-duration="1000">
                <div className="content">
                  <h3>Omnis ipsum ratione optio sed quos aspernatur nam.</h3>
                  <p>Maxime distinctio nulla aliquam. Illo voluptatibus nulla. Ut consequuntur consequatur tempore suscipit minima voluptatem labore laudantium et. Quaerat praesentium consequatur voluptas dolore voluptates adipisci. Delectus delectus consequatur ex rerum. Laudantium quaerat reprehenderit vel animi.</p>
                  <h4>Non commodi et.</h4>
                  <p className="lines">Modi praesentium maxime quos aperiam nulla nihil consequatur soluta enim. Vitae eos eius
                    totam atque. Corrupti voluptatem porro quis aut qui aperiam odit hic. Libero sint ea quia
                    quaerat.</p>
                  <p>Vero placeat delectus cupiditate placeat ab dicta. Neque dolorem sequi culpa quo. Iste ab esse qui quibusdam.Et ullam rerum temporibus. Quaerat sit est corporis sit nihil nisi sapiente. Enim laudantium ut earum beatae eveniet earum.</p>
                  <p>Quia iusto sint qui recusandae maxime ipsum eos vitae. Deserunt quisquam reprehenderit sit et alias
                    doloremque nam necessitatibus sit. Est rerum cupiditate commodi sint enim velit suscipit.</p>
                  <h3>Repellendus architecto atque.</h3>
                  <p>Non deleniti qui. Voluptatibus suscipit id non. Fugit adipisci explicabo eligendi culpa expedita quidem voluptas.</p>
                  <h4>Quia qui et et atque repellat et.</h4>
                  <p className="lines">Est unde sequi cumque iusto sunt nisi nemo. Dolorem et provident tempora dolores suscipit
                    dicta dolores. Laudantium sed cupiditate aut. Rem aut omnis sunt ut.</p>
                  <p>Nihil occaecati impedit sunt omnis sed quis. Repudiandae ut voluptatem sed voluptate rem. Quis et ut et ipsum.</p>
                  <p>Quia velit maiores optio. Illum qui ea autem at vero ut soluta. Non architecto voluptas sit vitae qui laudantium
                    voluptatum tempora. Doloremque et incidunt ipsam qui modi. Dolorem sit iure earum nihil. Harum cumque
                    perferendis.</p>
                  <img src="/images/verticals/detailImg.svg" alt="detailImg" />
                  <h3>Omnis ipsum ratione optio sed quos aspernatur nam.</h3>
                  <p>Maxime distinctio nulla aliquam. Illo voluptatibus nulla. Ut consequuntur consequatur tempore suscipit minima voluptatem labore laudantium et. Quaerat praesentium consequatur voluptas dolore voluptates adipisci. Delectus delectus consequatur ex rerum. Laudantium quaerat reprehenderit vel animi.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="allArticles">
            <h2 data-aos="fade-right"
              data-aos-easing="ease-in-sine"
              data-aos-duration="1000">Related articles</h2>
            <Link href="/vertical-details" data-aos="fade-up"
              data-aos-easing="ease-in-sine"
              data-aos-duration="1000">
              <div className="card">
                <div className="row g-0">
                  <div className="col-md-6">
                    <img src="/images/verticals/article1.svg" className="img-fluid" alt="banner" />
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
                            <img src="/images/verticals/user.svg" alt="user" />
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
                    <img src="/images/verticals/article2.svg" className="img-fluid" alt="banner" />
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
                            <img src="/images/verticals/user.svg" alt="user" />
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
                    <img src="/images/verticals/article3.svg" className="img-fluid" alt="banner" />
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
                            <img src="/images/verticals/user.svg" alt="user" />
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

export default VerticalDetails
