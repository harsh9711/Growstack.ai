"use client";
import Link from "next/link";
import Image from "next/image";
import Links from "./links/Links";
import SocialLinks from "./socialLinks/SocialLinks";
import styles from "./navbar.module.scss";

function Navbar({
  logoUrl = "/logo/growstack1.png",
  logoAlt = "logo",
  backgroundColor = "",
}) {
  return (
    <div
      className={`relative z-90 ${styles.navbar}`}
      style={{ "--navbar-bg-color": backgroundColor }}
    >
      <div className="container relative z-90">
        <div className={styles.flex}>
          <div className={styles.flext}>
            <Link href="/" className={styles.logo}>
              <Image src={logoUrl} alt={logoAlt} width={100} height={50} />
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
