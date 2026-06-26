import sandwich from "@/assets/menu-sandwich.jpg";
import burger from "@/assets/menu-burger.jpg";
import pizza from "@/assets/menu-pizza.jpg";
import chai from "@/assets/menu-chai.jpg";
import coldcoffee from "@/assets/menu-coldcoffee.jpg";
import fries from "@/assets/menu-fries.jpg";
import brownie from "@/assets/menu-brownie.jpg";
import shake from "@/assets/menu-shake.jpg";

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number; // INR
  image: string;
  category: "Starters" | "Mains" | "Beverages" | "Desserts";
  veg: boolean;
};

export const DELIVERY_CHARGE = 40; // flat ₹40 within 10 km
export const DELIVERY_RADIUS_KM = 10;
export const FREE_DELIVERY_OVER = 499;
export const CURRENCY = "₹";
export const WHATSAPP_NUMBER = "919999999999"; // TODO: replace with cafe owner's number

export const MENU: MenuItem[] = [
  {
    id: "grilled-sandwich",
    name: "Cheese Grilled Sandwich",
    description: "Crispy buttered bread, gooey cheese, fresh veggies — house favourite.",
    price: 120,
    image: sandwich,
    category: "Starters",
    veg: true,
  },
  {
    id: "loaded-fries",
    name: "Loaded Peri-Peri Fries",
    description: "Golden crispy fries tossed in peri-peri spice, served with two dips.",
    price: 140,
    image: fries,
    category: "Starters",
    veg: true,
  },
  {
    id: "cheese-burger",
    name: "Arun's Special Cheese Burger",
    description: "Juicy patty, melted cheddar, lettuce & tomato — comes with fries.",
    price: 199,
    image: burger,
    category: "Mains",
    veg: true,
  },
  {
    id: "tandoori-pizza",
    name: "Tandoori Paneer Pizza",
    description: "Wood-fired thin crust, tandoori paneer, peppers & olives.",
    price: 279,
    image: pizza,
    category: "Mains",
    veg: true,
  },
  {
    id: "masala-chai",
    name: "Masala Chai",
    description: "Slow-brewed Assam tea with ginger, cardamom & a hint of clove.",
    price: 40,
    image: chai,
    category: "Beverages",
    veg: true,
  },
  {
    id: "cold-coffee",
    name: "Cold Coffee with Ice Cream",
    description: "Thick cold coffee blended with vanilla ice cream & chocolate drizzle.",
    price: 130,
    image: coldcoffee,
    category: "Beverages",
    veg: true,
  },
  {
    id: "strawberry-shake",
    name: "Strawberry Milkshake",
    description: "Fresh strawberries, milk and whipped cream in a chilled jar.",
    price: 150,
    image: shake,
    category: "Beverages",
    veg: true,
  },
  {
    id: "choco-brownie",
    name: "Choco Lava Brownie",
    description: "Warm chocolate brownie topped with vanilla ice cream & hot fudge.",
    price: 160,
    image: brownie,
    category: "Desserts",
    veg: true,
  },
];

export const CATEGORIES: MenuItem["category"][] = [
  "Starters",
  "Mains",
  "Beverages",
  "Desserts",
];
