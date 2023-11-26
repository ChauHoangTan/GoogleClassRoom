import './ImagePreview.css'

const ImagePreview = ({ image, name }) => {
  console.log(image)
  return (
    <div className="image-preview-container">
      <img
        src={image ? image : 'https://www.vietnamfineart.com.vn/wp-content/uploads/2023/03/avatar-chill-anime-2.jpg'}
        alt={name}
        className="image-preview"
      />
    </div>
  )
}

export default ImagePreview