function selectItem (items) {
  const itemId = Math.floor(Math.random() * items.length);
  return items[itemId];
}

module.exports = selectItem;
