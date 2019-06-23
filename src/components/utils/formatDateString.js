export default pdate => {
  const month = pdate.getMonth() + 1;
  const date = pdate.getDate();
  const year = pdate.getFullYear();

  return `${year}-${month}-${date}`;
};
