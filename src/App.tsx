import React, { useEffect, useRef } from "react";
import { Masonry } from "masonic";
import { useFakerImages } from "./utils/faker/index";
export default function App() {
  const lists = useFakerImages(100);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div className='feedContainer'>
        <Masonry
          items={lists}
          columnWidth={180}
          rowGutter={10}
          columnGutter={10}
          maxColumnCount={5}
          render={FakerCard}
        />
      </div>
    </div>
  );
}

function FakerCard({ data: { id, image, name } }) {
  return (
    <section key={id} className='element-item'>
      <img src={image} alt='' />
      <div className='footer'>
        <p>
          <span>{name}</span>
        </p>
      </div>
    </section>
  );
}
