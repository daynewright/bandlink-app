const categoriesList = [
  "seniors",
  "juniors",
  "sophomores",
  "freshmen",
  "colorguard",
  "baritones",
  "drumline",
];

const getRandomList = (categories = categoriesList, length = 2) => {
  const randomList = [];

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * categories.length);
    const category = categories[randomIndex];
    randomList.push(category);
  }

  return randomList;
};

export default getRandomList;
