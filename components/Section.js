import styles from "../styles/Section.module.css";
import PropTypes from "prop-types";
import Image from "next/image";

const Section = ({ id, title, intro, imageSrc, footer, children }) => {
  return (
    <section className={styles.section} id={id}>
      <div className="holder">
        <div className="container-fluid">
          {(title || intro) && (
            <div className={styles.header}>
              {title && <h2 className={styles.title}>{title}</h2>}
              {intro && <div className={styles.intro}>{intro}</div>}
            </div>
          )}
          <div className={styles.content}>
            {imageSrc && (
              <div className={styles.image}>
                <Image
                  layout="responsive"
                  src={imageSrc}
                  width={1803}
                  height={840}
                  quality={100}
                />
              </div>
            )}
            {footer && (
              <div
                className={styles.footer}
                dangerouslySetInnerHTML={{ __html: footer }}
              ></div>
            )}
            <div>{children}</div>
          </div>
        </div>
      </div>
    </section>
  );
};

Section.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string,
  intro: PropTypes.string,
  imageSrc: PropTypes.string,
};

export default Section;
