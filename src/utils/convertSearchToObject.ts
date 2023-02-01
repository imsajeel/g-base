const convertSearchToObject = (text: string) => {
  const search = text.substring(1);
  const searchedObj = JSON.parse(
    '{"' +
      decodeURI(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"') +
      '"}'
  );
  if (searchedObj) {
    return searchedObj;
  } else {
    return;
  }
};

export default convertSearchToObject;
