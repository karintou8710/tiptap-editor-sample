export async function generateDataURLFromFile(file: File) {
  const reader = new FileReader();
  reader.readAsDataURL(file);

  await new Promise((resolve) => {
    reader.onload = resolve;
  });

  return reader.result as string;
}
