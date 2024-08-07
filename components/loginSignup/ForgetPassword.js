import React, { useEffect } from 'react'
import AOS from "aos";
import "aos/dist/aos.css";
import './ForgetPassword.scss'
import Link from 'next/link'
function ForgetPassword() {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <React.Fragment>
      <div className="forgetPassword">
        <div className="loginForm">
          <div className="formBlock" data-aos="fade-up"
            data-aos-easing="ease-in-sine"
            data-aos-duration="1000">
            <div className="title">
              <Link href="/register"><img className='logo' src="/images_growstack/login/logo.svg" alt="logo" /></Link>
              <img className='forgetImg' src="/images_growstack/login/forget.svg" alt="forget" />
              <h3>Forgot password?</h3>
              <p>Create your account now.</p>
            </div>
            <form>
              <div className="form-group">
                <input type="email" name="email" id="email" placeholder="Enter your Email..." />
                <img src="/images_growstack/login/f1.svg" alt="img" />
              </div>
              <button className='loginBtn' type="submit">Reset password</button>
              <div className="back">
                <Link href="/login"><img src="/images_growstack/login/back.svg" alt="img" /> Back to login</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default ForgetPassword
