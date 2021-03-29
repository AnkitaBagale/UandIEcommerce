import faker from "faker";

faker.seed(0);

export const database = [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  21,
  22,
  23,
  24
].map((id) => ({
  id,
  name: faker.commerce.productName(),
  image: faker.random.image(),
  price: faker.commerce.price(),
  category: faker.random.arrayElement([
    "Colors",
    "Pencils",
    "Brushes",
    "Accessories",
    "Books"
  ]),
  brand: faker.random.arrayElement([
    "Natraj",
    "Faber castell",
    "Staedtler Mars",
    "Angel Bear",
    "Brustro"
  ]),
  inStock: faker.random.boolean(),
  fastDelivery: faker.random.boolean(),
  ratings: faker.random.arrayElement([1, 2, 3, 4, 5]),
  offer: faker.random.arrayElement([
    "Save 50",
    "70% bonanza",
    "Republic Day Sale"
  ]),
  level: faker.random.arrayElement([
    "beginner",
    "amateur",
    "intermediate",
    "advanced",
    "professional"
  ]),
  color: faker.commerce.color(),
  avalQty: faker.random.arrayElement([10, 11, 12, 13, 14, 15])
}));
