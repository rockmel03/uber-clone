import assets from "./assets";

export const ROLES = ["user", "captain"];

export const VEHICLE_DATA = [
  {
    title: "UberGo",
    capacity: 4,
    type: "car",
    image: assets.images.carImage,
    time: "2 min",
  },
  {
    title: "Moto",
    capacity: 1,
    type: "motorcycle",
    image: assets.images.motoImage,
    time: "2 min",
  },
  {
    title: "Auto",
    capacity: 3,
    type: "auto",
    image: assets.images.autoImage,
    time: "2 min",
  },
];

export const VEHICLE_IMAGES = {
  car: assets.images.carImage,
  auto: assets.images.autoImage,
  motorcycle: assets.images.motoImage,
};
