import carImage from "./assets/car.webp";
import autoImage from "./assets/auto.webp";
import motoImage from "./assets/moto.webp";

export const ROLES = ["user", "captain"];

export const VEHICLE_DATA = [
  {
    title: "UberGo",
    capacity: 4,
    type: "car",
    image: carImage,
    time: "2 min",
  },
  {
    title: "Moto",
    capacity: 1,
    type: "motorcycle",
    image: motoImage,
    time: "2 min",
  },
  {
    title: "Auto",
    capacity: 3,
    type: "auto",
    image: autoImage,
    time: "2 min",
  },
];

export const VEHICLE_IMAGES = {
  car: carImage,
  auto: autoImage,
  motorcycle: motoImage,
};
