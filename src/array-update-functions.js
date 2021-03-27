export const isAlreadyAdded = (itemsArray, id) => {
  for (let itemInArray of itemsArray) {
    if (itemInArray.id === id) return true;
  }
  return false;
};

export const updateQty = (itemsArray, id, incOrDec) =>
  itemsArray.map((itemInArray) =>
    itemInArray.id === id
      ? {
          ...itemInArray,
          cartQty: incOrDec ? itemInArray.cartQty + 1 : itemInArray.cartQty - 1
        }
      : itemInArray
  );

export const addNewItem = (itemsArray, item) => [
  ...itemsArray,
  { ...item, cartQty: 1 }
];

export const removeItem = (itemsArray, removeItemId) =>
  itemsArray.filter((itemInArray) => itemInArray.id !== removeItemId);
