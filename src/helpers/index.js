export const refreshObj = obj => JSON.parse(JSON.stringify(obj));

export const toTitleCase = (str) => {
  return str.replace(
    /\w\S*/g,
    (txt) =>  txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  );
};
