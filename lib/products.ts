export interface Product {
  id: number;
  name: string;
  price: number;
  category: "Cosmetics" | "Organic";
  image: string;
  description: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Vitamin C Face Serum",
    price: 8000,
    category: "Cosmetics",
    image:
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&q=80",
    description:
      "Brightens the skin, reduces dark spots and improves skin texture.",
  },
  {
    id: 2,
    name: "Organic Black Soap",
    price: 4500,
    category: "Organic",
    image:
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&q=80",
    description:
      "Traditional African black soap for healthy glowing skin.",
  },
  {
    id: 3,
    name: "Raw Shea Butter",
    price: 3500,
    category: "Organic",
    image:
      "https://images.unsplash.com/photo-1619451334792-150fd785ee74?w=800&q=80",
    description:
      "Pure unrefined shea butter suitable for skin and hair.",
  },
  {
    id: 4,
    name: "Body Lotion",
    price: 7500,
    category: "Cosmetics",
    image:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&q=80",
    description:
      "Moisturizes and nourishes the skin throughout the day.",
  },
  {
    id: 5,
    name: "Tea Tree Face Wash",
    price: 6200,
    category: "Cosmetics",
    image:
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=800&q=80",
    description:
      "Gentle cleanser that helps reduce acne and excess oil.",
  },
  {
    id: 6,
    name: "Coconut Oil",
    price: 3000,
    category: "Organic",
    image:
      "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800&q=80",
    description:
      "100% natural coconut oil for skin and hair care.",
  },
];