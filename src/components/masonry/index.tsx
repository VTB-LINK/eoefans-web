import { Masonry } from "masonic";
import Image from "@components/image";
import { useFakerImages } from "@utils/faker/index";
export default function App() {
  const lists = useFakerImages(20);

  return (
    <div
      style={{
        marginTop: "30px",
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
          overscanBy={Infinity}
        />
      </div>
    </div>
  );
}

function FakerCard({ data: { id, image, name } }) {
  return (
    <section key={id} className='element-item'>
      {/* <img src={image} alt='' loading='lazy' /> */}
      <Image url={image} />
      <div className='footer'>
        <p>
          <span>{name}</span>
        </p>
      </div>
    </section>
  );
}
