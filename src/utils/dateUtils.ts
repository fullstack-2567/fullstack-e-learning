export const formatDate = (date: Date, withTime = true) => {
  const day = date.getDate();
  const thaiMonths = [
    "มกราคม",
    "กุมภาพันธ์",
    "มีนาคม",
    "เมษายน",
    "พฤษภาคม",
    "มิถุนายน",
    "กรกฎาคม",
    "สิงหาคม",
    "กันยายน",
    "ตุลาคม",
    "พฤศจิกายน",
    "ธันวาคม",
  ];
  const month = thaiMonths[date.getMonth()];
  const year = date.getFullYear() + 543;

  const hour = date.getHours();
  const minute = date.getMinutes();

  return withTime
    ? `${day} ${month} ${year} ${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`
    : `${day} ${month} ${year}`;
};
