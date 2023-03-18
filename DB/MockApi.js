const { faker } = require("@faker-js/faker");

faker.locale = "es";

createItem = () => {
  return {
    title: faker.commerce.productName(),
    price: faker.commerce.price(),
    image: faker.image.business(),
  };
};

const getMockedItems = (qty) => {
  const mockedItems = [];
  for (let i = 1; i <= +qty; i++) {
    const newItem = createItem();
    mockedItems.push(newItem);
  }
  return mockedItems;
};

module.exports = { getMockedItems };
