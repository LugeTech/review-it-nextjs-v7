// "use client";
export function resizeImage(
  base64Str: string,
  maxWidth = 800,
  maxHeight = 800
) {

  return new Promise((resolve) => {
    console.log(base64Str);
    let img = new Image();
    img.src = base64Str;
    img.onload = () => {
      let canvas = document.createElement("canvas");
      const MAX_WIDTH = maxWidth;
      const MAX_HEIGHT = maxHeight;
      let width = img.width;
      let height = img.height;
      let shouldResize = true;

      if (width > height) {
        if (width > MAX_WIDTH) {
          height *= MAX_WIDTH / width;
          width = MAX_WIDTH;
          shouldResize = true;
        }
      } else {
        if (height > MAX_HEIGHT) {
          width *= MAX_HEIGHT / height;
          height = MAX_HEIGHT;
          shouldResize = true;
        }
      }
      if (shouldResize) {
        canvas.width = width;
        canvas.height = height;
        let ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", 0.5));
      } else {
        resolve(base64Str);
      }
    };
  });
}
