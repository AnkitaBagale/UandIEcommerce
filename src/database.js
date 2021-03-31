import faker from "faker";

faker.seed(0);
export const coupons = [
  { coupon: "NEW USER", off: 500, minOrder: 1500 },
  { coupon: "DIWALI OFFER", off: 300, minOrder: 1000 }
];

export const brands = [
  "Brustro",
  "Bianyo",
  "Camel",
  "DOMS",
  "Faber Castell",
  "Staedtler"
];
export const categories = [
  "Blenders",
  "Colours",
  "Colour Palettes",
  "Drawing Boards",
  "Drawing Pencils",
  "Drawing Surfaces",
  "Eraser",
  "Portfolio Storage",
  "Painting Brush",
  "Painting Knives"
];

export const database = [...Array(30)].map((id) => ({
  id: faker.random.uuid(),
  name: faker.commerce.productName(),
  image: faker.random.image(),
  price: faker.commerce.price(),
  category: faker.random.arrayElement([...categories]),
  brand: faker.random.arrayElement([...brands]),
  inStock: faker.random.boolean(),
  fastDelivery: faker.random.boolean(),
  ratings: faker.random.arrayElement([1, 2, 3, 4, 5]),
  offer: faker.random.arrayElement(["20", "50", "70"]),
  level: faker.random.arrayElement([
    "beginner",
    "amateur",
    "intermediate",
    "advanced",
    "professional"
  ]),
  color: faker.commerce.color(),
  rating: {
    starRating: faker.random.arrayElement([1, 2, 3, 4, 5]),
    totalReviews: faker.random.arrayElement([10, 15, 20, 25])
  },
  avalQty: faker.random.arrayElement([10, 11, 12, 13, 14, 15])
}));
