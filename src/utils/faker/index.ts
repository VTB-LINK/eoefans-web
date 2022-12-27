import { faker } from "@faker-js/faker";
import { nanoid } from "nanoid";
import { useMemo, useState } from "react";

const randomListImageUrls = [
  `https://images.pexels.com/photos/14840714/pexels-photo-14840714.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`,
  `https://images.pexels.com/photos/9493793/pexels-photo-9493793.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`,
  `https://images.pexels.com/photos/5702958/pexels-photo-5702958.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`,
  `https://images.pexels.com/photos/6605345/pexels-photo-6605345.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`,
  `https://images.pexels.com/photos/1314509/pexels-photo-1314509.jpeg?auto=compress&cs=tinysrgb&w=600`,
  `https://images.pexels.com/photos/3254555/pexels-photo-3254555.jpeg?auto=compress&cs=tinysrgb&w=600`,
];

function createRandomBlob() {
  return {
    // image: faker.image.imageUrl(640, 480, "cat", true),
    image:
      randomListImageUrls.find(() => Math.random() > 0.7) ||
      randomListImageUrls[0],
    name: faker.name.fullName(),
    id: nanoid(4),
  };
}

export function useFakerImages(size: number = 10) {
  const _list = useMemo(() => {
    return Array.from({ length: size }, () => createRandomBlob());
  }, [size]);
  return _list;
}
