import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./Register.scss";
import Link from "next/link";
function Register() {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <React.Fragment>
      <div className="register">
        <div className="block" data-aos="fade-right" data-aos-easing="ease-in-sine" data-aos-duration="1000">
          <img className="back" src="/images_growstack/login/loginside.svg" alt="login" />
        </div>
        <div className="loginForm" data-aos="fade-left" data-aos-easing="ease-in-sine" data-aos-duration="1000">
          <div className="formBlock">
            <div className="title">
              <Link href="/auth/register">
                <img src="/images_growstack/login/logo.svg" alt="logo" />
              </Link>
              <h3>Get started</h3>
              <p>Create your account now.</p>
            </div>
            <form>
              <div className="form-group">
                <input type="email" name="email" id="email" placeholder="Enter your Email..." />
                <img src="/images_growstack/login/f1.svg" alt="img" />
              </div>
              <div className="form-group">
                <input type="password" name="password" id="password" placeholder="Enter your Password..." />
                <img src="/images_growstack/login/f2.svg" alt="img" />
              </div>
              <div className="form-group">
                <input type="password" name="password" id="password" placeholder="Confirm your Password..." />
                <img src="/images_growstack/login/f2.svg" alt="img" />
              </div>
              <div className="rememberForget">
                <div className="remember">
                  <input type="checkbox" name="remember" id="remember" />
                  <label htmlFor="remember">
                    I agree to the <Link href="/auth/register">Term & Conditions</Link> and <Link href="/auth/register">Privacy Policy</Link>
                  </label>
                </div>
              </div>
              <button className="loginBtn" type="submit">
                Register
              </button>
              <div className="or">
                <p>
                  <span>or, login with</span>
                </p>
              </div>
              <div className="buttons">
                <button>
                  <img src="/images_growstack/login/wf.svg" alt="linkedin" />
                  Continue with Facebook
                </button>
                <button>
                  <img src="/images_growstack/login/wg.svg" alt="google" />
                  Continue With Google
                </button>
              </div>
              <div className="account">
                <p>
                  Already have an account? <Link href="/login">Login now</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Register;
