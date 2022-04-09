import styles from "../styles/ImageSwicher.module.css";

import PropTypes from "prop-types";
import Image from "next/image";
import useCounter from "../hooks/useCounter";

const ImageSwicher = ({ imagesSrc }) => {
  const total = imagesSrc.length - 1;
  const { count, increase } = useCounter(0, total, true);

  const changeImage = () => total > 0 && increase();
  const getImageClass = (current, count) => {
    let className = styles.image;

    if (current === count) {
      className += ` ${styles.visible}`;
    }

    return className;
  };

  return (
    <div className={styles.imageSwicher} onClick={changeImage}>
      <div className={styles.wrapper}>
        {imagesSrc.map((src, index) => (
          <div className={getImageClass(index, count)} key={index}>
            <Image priority src={src} layout="fill" objectFit="cover" />
          </div>
        ))}
      </div>
      {total > 0 && <div className={styles.clickText}>Click on the image</div>}
    </div>
  );
};

ImageSwicher.propTypes = {
  imagesSrc: PropTypes.arrayOf(PropTypes.string).isRequired,
};

ImageSwicher.defaultProps = {
  imagesSrc: [],
};

export default ImageSwicher;