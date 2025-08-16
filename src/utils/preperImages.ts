export function preperImages(img?: string) {
  if (!img) return "./thmb.jpg"; // fallback thumbnail
  const serverBaseURL = "http://localhost:5000/";
  return serverBaseURL + img.replace(/\\/g, "/");
}
