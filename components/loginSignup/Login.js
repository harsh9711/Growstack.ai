import React, { useEffect } from 'react'
import AOS from "aos";
import "aos/dist/aos.css";
import './Login.scss'
import Link from 'next/link'
function Login() {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <React.Fragment>
      <div className="login">
        <div className="loginForm">
          <div className="formBlock" data-aos="fade-right"
            data-aos-easing="ease-in-sine"
            data-aos-duration="1000">
            <div className="title">
              <Link href="/register"><img src="/images/login/logo.svg" alt="logo" /></Link>
              <h3>Sign in to your account</h3>
              <p>Welcome back! Nice too see you again</p>
            </div>
            <form>
              <div className="form-group">
                <input type="email" name="email" id="email" placeholder="Enter your Email..." />
                <img src="/images/login/f1.svg" alt="img" />
              </div>
              <div className="form-group">
                <input type="password" name="password" id="password" placeholder="Enter your Password..." />
                <img src="/images/login/f2.svg" alt="img" />
              </div>
              <div className="rememberForget">
                <div className="remember">
                  <input type="checkbox" name="remember" id="remember" />
                  <label htmlFor="remember">Remember Me</label>
                </div>
                <div className="forget">
                  <Link href="/forget-password">Forget Password?</Link>
                </div>
              </div>
              <button className='loginBtn' type="submit">Login</button>
              <div className="or">
                <p><span>or, login with</span></p>
              </div>
              <div className="buttons">
                <button><img src="/images/login/wf.svg" alt="linkedin" />Continue with Facebook</button>
                <button><img src="/images/login/wg.svg" alt="google" />Continue With Google</button>
              </div>
              <div className="account">
                <p>Don't have an account? <Link href="/register">Register Now</Link></p>
              </div>
            </form>
          </div>
        </div>
        <div className="block" data-aos="fade-left"
          data-aos-easing="ease-in-sine"
          data-aos-duration="1000">
          <img className='back' src="/images/login/loginside.svg" alt="login" />
        </div>
      </div>
    </React.Fragment>
  )
}

export default Login
