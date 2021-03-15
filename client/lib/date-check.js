export default function getDate(date) {
  const compareObj = {
    0: 'January',
    1: 'February',
    2: 'March',
    3: 'April',
    4: 'May',
    5: 'June',
    6: 'July',
    7: 'August',
    8: 'September',
    9: 'October',
    10: 'November',
    11: 'December'
  };

  const month = new Date(parseInt(date));
  return month;
  // const month = new Date(parseInt(date)).getMonth();
  // const day = new Date(parseInt(date)).getDate();

  // for (const prop in compareObj) {
  //   if (prop === month) {
  //     return compareObj[prop] + ', ' + day.toString();
  //   }
  // }
}
