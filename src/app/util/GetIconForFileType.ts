const getIconForFileType = (files: File[]) => {
  return files.map((file) => {
    const mainType = file.type.split('/')[0];

    switch (mainType) {
      case 'image':
        return URL.createObjectURL(file);
      case 'application':
        if (file.type === 'application/zip') {
          return '/file_images/zip-file.png';
        } else if (file.type === 'application/pdf') {
          return '/file_images/pdf.png';
        } else if (
          file.type === 'application/msword' ||
          file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ) {
          return '/file_images/doc_file.png';
        }
        // Handle other document types as needed
        return '/file_images/doc_file.png'; // do others like xls
      case 'audio':
        return '/file_images/audio.png';
      case 'video':
        return '/file_images/video.png';
      case 'text':
        return '/file_images/txt_file.png';
      default:
        return '/file_images/no_image.svg';
    }
  })
}
export default getIconForFileType
