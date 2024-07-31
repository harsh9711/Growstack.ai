"use client";
import Link from "next/link";
import Image from "next/image";
import Links from "./links/Links";
import SocialLinks from "./socialLinks/SocialLinks";
import styles from "./navbar.module.scss";

function Navbar({ logoUrl = "/images/logo.png", logoAlt = "logo" }) {
  return (
    <div className={`trans ${styles.navbar}`}>
      <div className="container">
        <div className={styles.flex}>
          <div className={styles.flext}>
            <Link href="/" className={styles.logo}>
              <Image src={logoUrl} alt={logoAlt} width={100} height={100} />
            </Link>
          </div>
          <div className={styles.items}>
            <Links />
            <SocialLinks />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
