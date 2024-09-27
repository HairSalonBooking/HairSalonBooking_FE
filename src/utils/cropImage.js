// utils/cropImage.js
export default function getCroppedImg(imageSrc, crop) {
    const image = new Image();
    const canvas = document.createElement('canvas');
    image.src = imageSrc;
  
    return new Promise((resolve, reject) => {
      image.onload = () => {
        const ctx = canvas.getContext('2d');
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
  
        canvas.width = crop.width;
        canvas.height = crop.height;
        ctx.drawImage(
          image,
          crop.x * scaleX,
          crop.y * scaleY,
          crop.width * scaleX,
          crop.height * scaleY,
          0,
          0,
          crop.width,
          crop.height
        );
  
        canvas.toBlob((blob) => {
          const fileUrl = URL.createObjectURL(blob);
          resolve(fileUrl);
        }, 'image/jpeg');
      };
      image.onerror = (error) => reject(error);
    });
  }
  