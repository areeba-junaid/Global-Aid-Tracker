import React from "react";
import Carousel from "react-elastic-carousel";
import image1 from "../../assets/images/Aid.jpg";
import image2 from "../../assets/images/Aid2.jpg";
import image3 from "../../assets/images/Aid3.jpg";
import image4 from "../../assets/images/Aid4.jpg";

function Slides() {
  const images = [image1, image2, image3, image4];

  return (
    <div
      className="relative bg-green-50  "
      style={{ width: "100%", height: "500px" }}
    >
      {/* Adjust the width and height above to match your div */}
      <Carousel
        className="w-full h-full relative top-0 z-0 border border-solid "
        itemsToShow={1}
        isInfinite={true}
        enableAutoPlay={true}
        autoPlaySpeed={5000} // Adjust the auto-play speed (e.g., 5000ms = 5 seconds)
      >
        {images.map((image, index) => (
          <div key={index} className="carousel-item">
            <img src={image} alt={`Image ${index + 1}`} />
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default Slides;
