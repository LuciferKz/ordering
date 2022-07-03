const download = function (res: Blob, filename: string) {
  const blob = new Blob([res], { type: "application/zip" });
  console.log(blob);
  const downloadElement = document.createElement("a");
  const href = window.URL.createObjectURL(blob);
  downloadElement.href = href;
  downloadElement.download = filename;
  document.body.appendChild(downloadElement);
  downloadElement.click();
  document.body.removeChild(downloadElement);
  window.URL.revokeObjectURL(href);
};

export default download;
