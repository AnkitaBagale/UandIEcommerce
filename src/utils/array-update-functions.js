export const isAlreadyAdded = (itemsArray, id) => {
  for (let itemInArray of itemsArray) {
    if (itemInArray._id === id) return true;
  }
  return false;
};

export const checkStatus = (itemsArray, id) => {
  for (let itemInArray of itemsArray) {
    if (itemInArray.productId._id === id && itemInArray.active) return true;
  }
  return false;
};

export const addNewItem = (itemsArray, item) => [
  ...itemsArray,
  { ...item, cartQty: 1 }
];
