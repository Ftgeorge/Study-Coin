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
    name: "Badacore Tshirt",
    description: "Classic t-shirt for daily use",
    price: 90,
    image: "/images/shirt.jpg",
    category: "Tshirt",
  },
  {
    id: 2,
    name: "MR Pucy",
    description: "Simple t-shirt for daily use",
    price: 60,
    image: "/images/shirt.jpg",
    category: "Tshirt",
  },
  {
    id: 3,
    name: "PY Tshirt",
    description: "Classic t-shirt for daily use",
    price: 82,
    image: "/images/shirt.jpg",
    category: "Tshirt",
  },
  {
    id: 4,
    name: "Dadung Tshirt",
    description: "Classic t-shirt for daily use",
    price: 50,
    image: "/images/shirt.jpg",
    category: "Tshirt",
  },
  // Add items from other categories as needed
];

const categories = ["All", "Tshirt", "Jacket", "Pants", "Hoodie", "Short"];
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
              variant={category === selectedCategory ? "default" : "outline"}
              className="rounded-full"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
          <Button variant="outline" size="icon" className="rounded-full">
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
                  className={`text-lg font-bold ${userPoints >= selectedProduct.price ? "text-black" : "text-red-600"
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
