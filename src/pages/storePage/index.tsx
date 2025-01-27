import { useState } from "react";
import { Button } from "../../components/ui/button";
import { SlidersHorizontal } from "lucide-react";
import DesktopTitlebar from "../../components/header";
import coin from "../../../public/images/coin.png";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string; // Added category field for filtering
}

const products: Product[] = [
  {
    id: 1,
    name: "Explorer Tee",
    description: "A versatile t-shirt perfect for adventurers.",
    price: 90,
    image: "/images/bag6.jpg",
    category: "Tshirt",
  },
  {
    id: 2,
    name: "Urban Comfort",
    description: "Stylish and comfy for everyday wear.",
    price: 60,
    image: "/images/shirt.jpg",
    category: "Tshirt",
  },
  {
    id: 3,
    name: "Dynamic Tee",
    description: "Ideal for an active lifestyle.",
    price: 82,
    image: "/images/headphones.jpeg",
    category: "Tshirt",
  },
  {
    id: 4,
    name: "Classic Fit",
    description: "A timeless t-shirt for any occasion.",
    price: 50,
    image: "/images/shirt.jpg",
    category: "Tshirt",
  },
  {
    id: 5,
    name: "Traveler's Choice",
    description: "Comfort meets functionality for travel enthusiasts.",
    price: 90,
    image: "/images/bag2.jpeg",
    category: "Tshirt",
  },
  {
    id: 6,
    name: "Sleek Tee",
    description: "Minimalist design with maximum comfort.",
    price: 64,
    image: "/images/bag3.jpeg",
    category: "Tshirt",
  },
  {
    id: 7,
    name: "Active Wear",
    description: "Perfect for workouts and casual outings.",
    price: 81,
    image: "/images/headphones3.jpeg",
    category: "Tshirt",
  },
  {
    id: 8,
    name: "Chill Mode",
    description: "Relax in style with this casual tee.",
    price: 30,
    image: "/images/shirt.jpg",
    category: "Tshirt",
  },
  {
    id: 9,
    name: "Hoodie Haven",
    description: "Stay cozy with this premium hoodie.",
    price: 90,
    image: "/images/hoodie.png",
    category: "Hoodie",
  },
  {
    id: 10,
    name: "Streetwear Vibes",
    description: "Elevate your look with this trendy tee.",
    price: 64,
    image: "/images/headphones3.jpeg",
    category: "Tshirt",
  },
  {
    id: 11,
    name: "Modern Basics",
    description: "A go-to choice for a simple yet stylish outfit.",
    price: 81,
    image: "/images/shirt.jpg",
    category: "Tshirt",
  },
  {
    id: 12,
    name: "Adventure Ready",
    description: "Lightweight and durable for your next journey.",
    price: 30,
    image: "/images/headphones4.jpeg",
    category: "Tshirt",
  },
  // Add items from other categories as needed
];

const categories = ["All", "Tshirt", "Bags", "Headphones", "Hoodie", "Short"];
const userPoints = 100; // Example points balance for the user

export default function Store() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  return (
    <div>
      <DesktopTitlebar pageTitle={"Store"} />
      <div className="container mx-auto px-4 py-8">
        {/* Category Buttons */}
        <div className="flex justify-center gap-2 mb-8">
          {categories.map((category) => (
            <Button
              key={category}
              variant="outline"
              className={`rounded-full transition-colors ${
                category === selectedCategory
                  ? "bg-[#2E74E5] text-white border-[#2E74E5]"
                  : "bg-transparent text-[#2E74E5] border-[#2E74E5]"
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
          <Button
            variant="outline"
            size="icon"
            className="rounded-full bg-transparent border-[#2E74E5] text-[#2E74E5]"
          >
            <SlidersHorizontal className="h-4 w-4" />
          </Button>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group cursor-pointer"
              onClick={() => handleProductClick(product)}
            >
              <div className="aspect-square overflow-hidden rounded-lg bg-gray-100 mb-4">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="object-cover w-full h-full transition-transform group-hover:scale-105"
                />
              </div>
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-muted-foreground text-sm">{product.description}</p>
              <p className="text-lg font-bold mt-1">${product.price}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Product Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <img
              src={selectedProduct.image || "/placeholder.svg"}
              alt={selectedProduct.name}
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
            <h2 className="text-2xl font-semibold mb-2">{selectedProduct.name}</h2>
            <p className="text-muted-foreground mb-4">{selectedProduct.description}</p>
            <div className="flex w-full flex-row items-center justify-between">
              <p className="text-lg font-bold">Price: ${selectedProduct.price}</p>
              <div className="flex gap-2 items-center h-full">
                <img src={coin} className="w-10 h-10" />
                <p
                  className={`text-lg font-bold ${
                    userPoints >= selectedProduct.price ? "text-black" : "text-red-600"
                  }`}
                >
                  300
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-5">
              <Button variant="outline" onClick={closeModal}>
                Close
              </Button>
              {userPoints >= selectedProduct.price && (
                <Button>Buy Now</Button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
