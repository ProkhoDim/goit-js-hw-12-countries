function finder(query, item) {
  const array = query.toLowerCase().split('');
  const normalizedItem = item.toLowerCase();
  let resultArr = [];

  for (const itm of array) {
    if (normalizedItem.includes(itm)) {
      resultArr.push(1);
    }
  }

  if (resultArr.length === array.length) {
    return true;
  }

  return false;
}

export default function fetchCountries(searchQuery) {
  return fetch(
    `https://restcountries.eu/rest/v2/name/${searchQuery}?fields=name;capital;population;languages;flag`,
  )
    .then(res => res.json())
    .then(data => data.filter(item => finder(searchQuery, item.name)));
}
