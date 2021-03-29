export const isAlreadyAdded = (itemsArray, id) => {
  for (let itemInArray of itemsArray) {
    if (itemInArray.id === id) return true;
  }
  return false;
};

export const checkStatus = (itemsArray, id) => {
  for (let itemInArray of itemsArray) {
    if (itemInArray.id === id && itemInArray.status.exists) return true;
  }
  return false;
};

export const toggleStatus = (itemsArray, id) => {
  return itemsArray.map((item) => {
    if (item.id === id) {
      return { ...item, status: { exists: !item.status.exists } };
    } else {
      return item;
    }
  });
};
export const removeItemChangeStatus = (itemsArray, id) => {
  return itemsArray.map((item) => {
    if (item.id === id) {
      return { ...item, status: { exists: false } };
    } else {
      return item;
    }
  });
};
export const addItemChangeStatus = (itemsArray, id) => {
  return itemsArray.map((item) => {
    if (item.id === id) {
      return { ...item, status: { exists: true } };
    } else {
      return item;
    }
  });
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
