export function loadImage(imageFile) {
  return new Promise(resolve => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.src = `assets/images/${imageFile}`;
  });
}
