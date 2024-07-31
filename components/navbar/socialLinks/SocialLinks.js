import React from 'react'
import "./SocialLinks.scss";
import Link from 'next/link';
function SocialLinks() {
  return (
    <React.Fragment>
      <div className="social">
        <div className="quote">
          <Link href="/login" className='sheen flex'>Login <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.5 1C12.5 0.447714 12.0523 -7.61451e-07 11.5 -3.39982e-07L2.5 -2.13542e-07C1.94772 -5.50717e-07 1.5 0.447715 1.5 0.999999C1.5 1.55228 1.94772 2 2.5 2L10.5 2L10.5 10C10.5 10.5523 10.9477 11 11.5 11C12.0523 11 12.5 10.5523 12.5 10L12.5 1ZM2.20711 11.7071L12.2071 1.70711L10.7929 0.292893L0.792893 10.2929L2.20711 11.7071Z" fill="white" />
          </svg></Link>
          <Link href="/register" className='sheen'>Free Trial <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.5 1C12.5 0.447714 12.0523 -7.61451e-07 11.5 -3.39982e-07L2.5 -2.13542e-07C1.94772 -5.50717e-07 1.5 0.447715 1.5 0.999999C1.5 1.55228 1.94772 2 2.5 2L10.5 2L10.5 10C10.5 10.5523 10.9477 11 11.5 11C12.0523 11 12.5 10.5523 12.5 10L12.5 1ZM2.20711 11.7071L12.2071 1.70711L10.7929 0.292893L0.792893 10.2929L2.20711 11.7071Z" fill="white" />
          </svg></Link>
        </div>
      </div>
    </React.Fragment>
  )
}

export default SocialLinks
