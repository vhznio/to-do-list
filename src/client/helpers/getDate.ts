function getDate(date: Date) {
  const taskDate = new Date(date);
  return `${taskDate.getUTCDate()}/${taskDate.getMonth()}/${taskDate.getFullYear()}`;
}
export default getDate;
