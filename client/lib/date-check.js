export default function getDate(date) {

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const month = new Date(parseInt(date)).getMonth();
  const day = new Date(parseInt(date)).getDate();

  return monthNames[month] + ', ' + day.toString();
}
