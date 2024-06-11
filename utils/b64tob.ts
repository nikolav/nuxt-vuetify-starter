// convert base64 to Blob
export const b64tob = (dBase64: string, mimetype = "", sliceSize = 512) => {
  const byteCharacters = atob(dBase64);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);
    const byteNumbers = new Array(slice.length);

    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  return new Blob(byteArrays, { type: mimetype });
};
// @@usage
// // Convert base64 string to a Blob
// const pdfBlob = b64tob(base64PDF, "application/pdf");
// // Create a URL for the Blob
// const pdfUrl = URL.createObjectURL(pdfBlob);
