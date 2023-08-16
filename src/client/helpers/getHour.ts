function getHour(date: Date) {
  const taskDate = new Date(date);
  return `${taskDate.getHours()}:${taskDate.getMinutes()}`;
}
export default getHour;
