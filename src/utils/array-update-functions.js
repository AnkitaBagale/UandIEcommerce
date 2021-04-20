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

export const toggleStatus = (itemsArray, id) => {
  return itemsArray.map((item) => {
    if (item._id === id) {
      return { ...item, status: { exists: !item.active } };
    } else {
      return item;
    }
  });
};
export const removeItemFromCart = (itemsArray, id) => {
  return itemsArray.map((item) => {
    if (item._id === id) {
      return { ...item, cartQty: 1, status: { exists: false } };
    } else {
      return item;
    }
  });
};
export const addItemChangeStatus = (itemsArray, id) => {
  return itemsArray.map((item) => {
    if (item._id === id) {
      return { ...item, status: { exists: true } };
    } else {
      return item;
    }
  });
};
export const updateQty = (itemsArray, id, incOrDec) =>
  itemsArray.map((itemInArray) =>
    itemInArray._id === id
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
  itemsArray.filter((itemInArray) => itemInArray._id !== removeItemId);
