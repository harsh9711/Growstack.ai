"use client";
import Link from "next/link"
import Links from "./links/Links"
import styles from "./navbar.module.scss"
import Image from "next/image"
import SocialLinks from "./socialLinks/SocialLinks"

function Navbar() {
  return (
    <div className={`trans ${styles.navbar}`}>
      <div className="container">
      <div className={styles.flex}>
        <div className={styles.flext}>
        <Link href="/" className={styles.logo}>
          <Image src="/images_growstack/header/logo.svg" alt="logo" width={100} height={100} />
        </Link>
        </div>
        <div className={styles.items}>
        <Links />
        <SocialLinks/>
        </div>
      </div>
      </div>
    </div>
  )
}

export default Navbar
