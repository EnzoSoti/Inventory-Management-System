// Fetch products from an external API (replace with your real endpoint)
export async function fetchExternalProducts() {
  // Example: Using a public fake store API
  const response = await fetch('https://fakestoreapi.com/products');
  if (!response.ok) throw new Error('Failed to fetch external products');
  return await response.json();
} 