import styles from "../styles/Nav.module.css";

import { useRouter } from "next/router";

import Link from "next/link";
import Image from "next/image";

import useHover from "./../hooks/useHover";

const NavLink = ({ path, text }) => {
  const router = useRouter();

  const active = router.asPath === path ? ` ${styles.active}` : ``;
  const [el] = useHover();

  return (
    <Link href={path}>
      <a className={`${styles.link}${active}`} ref={el}>
        {text}
      </a>
    </Link>
  );
};

const Nav = ({ mobileVisible, onToggleClick }) => {
  const handleClick = () => onToggleClick();

  return (
    <nav
      className={`${styles.nav}${
        mobileVisible ? ` ${styles.mobileVisible}` : ""
      }`}
    >
      <div className="holder">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-2 col-md-4">
              <div
                className={`${styles.leftLinks} d-none d-md-flex justify-content-start`}
              >
                <NavLink path="/be-our-guest" text="Be our guest" />
                <NavLink path="/happenings" text="Happenings" />
                <NavLink path="/residencies" text="Residencies" />
              </div>
              <div className="d-flex d-md-none">
                <NavLink path="#" text="ESP" />
              </div>
            </div>
            <div className="col-8 col-md-4">
              <Link href="/">
                <a className={styles.logo}>
                  <Image
                    layout="responsive"
                    height={20}
                    width={205}
                    src="/images/logo.svg"
                    priority
                  />
                </a>
              </Link>
            </div>
            <div className="col-2 col-md-4">
              <div
                className={`${styles.rightLinks} d-none d-md-flex justify-content-end`}
              >
                <NavLink path="/about" text="About" />
                <NavLink path="/contact" text="Contact" />
                <NavLink path="#" text="Shop" />
              </div>
              <div className="d-flex d-md-none">
                <button
                  className={`${styles.toggleBtn}${
                    mobileVisible ? ` ${styles.active}` : ""
                  }`}
                  onClick={handleClick}
                ></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
