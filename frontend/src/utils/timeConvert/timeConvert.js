export const convertTime = (time) => {
  // Tạo đối tượng Date từ chuỗi ISO
  const dateObject = new Date(time)

  // Lấy thông tin ngày, tháng, năm, giờ, phút và giây
  const year = dateObject.getFullYear()
  const month = dateObject.getMonth() + 1 // Tháng bắt đầu từ 0, cần cộng thêm 1
  const day = dateObject.getDate()
  const hours = dateObject.getHours()
  const minutes = dateObject.getMinutes()
  const seconds = dateObject.getSeconds()

  // Tạo chuỗi ngày tháng năm giờ phút giây
  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`
}