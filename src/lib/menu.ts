import noodlesVeg from "@/assets/menu-noodles-veg.jpg";
import noodlesChicken from "@/assets/menu-noodles-chicken.jpg";
import friedRice from "@/assets/menu-friedrice.jpg";
import chicken65 from "@/assets/menu-chicken65.jpg";
import lollipop from "@/assets/menu-lollipop.jpg";
import wings from "@/assets/menu-wings.jpg";
import pakora from "@/assets/menu-pakora.jpg";
import roll from "@/assets/menu-roll.jpg";
import chillyChicken from "@/assets/menu-chilly-chicken.jpg";
import combo from "@/assets/menu-combo.jpg";
import fries from "@/assets/menu-fries.jpg";

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: "Noodles" | "Chinese Side Dish" | "Fried Rice" | "Combo";
  veg: boolean;
};

export const DELIVERY_CHARGE = 40;
export const DELIVERY_RADIUS_KM = 10;
export const FREE_DELIVERY_OVER = 299;
export const CURRENCY = "₹";

// Dine-in geofence — physical cafe location (Champapukur Rd, Atghara, Basirhat).
// Adjust these to your exact storefront GPS reading for tighter accuracy.
export const CAFE_LAT = 22.6571;
export const CAFE_LNG = 88.8942;
// Allowed radius (metres) around the cafe for dine-in ordering.
// 120 m comfortably covers the building + parking; tune as needed.
export const DINEIN_RADIUS_M = 120;
export const TABLE_COUNT = 30;

// Cafe contact details
export const PHONE_PRIMARY = "+917001983447";
export const PHONE_SECONDARY = "+918250202652";
// WhatsApp number (country code + number, no '+')
export const WHATSAPP_NUMBER = "917001983447";
export const ADDRESS_LINE_1 = "Champapukur Road, Atghara";
export const ADDRESS_LINE_2 = "Basirhat, West Bengal 743291";
export const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=" +
  encodeURIComponent("Arun's Cafe, Champapukur Rd, Atghara, Basirhat, West Bengal 743291");

export const MENU: MenuItem[] = [
  // Noodles
  { id: "veg-noodles", name: "Veg Noodles", description: "Wok-tossed noodles with fresh vegetables.", price: 60, image: noodlesVeg, category: "Noodles", veg: true },
  { id: "egg-noodles", name: "Egg Noodles", description: "Classic noodles tossed with scrambled egg & spring onion.", price: 70, image: noodlesVeg, category: "Noodles", veg: false },
  { id: "chicken-noodles", name: "Chicken Noodles", description: "Stir-fried noodles loaded with juicy chicken pieces.", price: 80, image: noodlesChicken, category: "Noodles", veg: false },
  { id: "veg-chilly-garlic-noodles", name: "Veg Chilly Garlic Noodles", description: "Spicy garlic-tossed noodles with crunchy vegetables.", price: 90, image: noodlesVeg, category: "Noodles", veg: true },
  { id: "chicken-chilly-garlic-noodles", name: "Chicken Chilly Garlic Noodles", description: "Fiery garlic noodles with tender chicken.", price: 110, image: noodlesChicken, category: "Noodles", veg: false },
  { id: "sezwan-noodles", name: "Sezwan Noodles", description: "Bold schezwan sauce coated noodles, signature spice.", price: 110, image: noodlesChicken, category: "Noodles", veg: false },
  { id: "singapore-noodles", name: "Singapore Noodles", description: "Curry-flavoured noodles with veggies and egg.", price: 110, image: noodlesVeg, category: "Noodles", veg: false },

  // Chinese Side Dish
  { id: "chicken-pokora", name: "Chicken Pokora", description: "Crispy fried chicken fritters with green chutney.", price: 70, image: pakora, category: "Chinese Side Dish", veg: false },
  { id: "chicken-65", name: "Chicken 65", description: "South-Indian style spicy fried chicken, curry leaves & chilli.", price: 110, image: chicken65, category: "Chinese Side Dish", veg: false },
  { id: "dry-chilly-chicken", name: "Dry Chilly Chicken", description: "Indo-Chinese dry chicken tossed with peppers & onions.", price: 110, image: chillyChicken, category: "Chinese Side Dish", veg: false },
  { id: "chilly-chicken-gravy", name: "Chilly Chicken Gravy", description: "Tender chicken in a rich spicy red gravy.", price: 130, image: chillyChicken, category: "Chinese Side Dish", veg: false },
  { id: "crispy-chicken", name: "Crispy Chicken", description: "Golden, crunchy fried chicken pieces — house favourite.", price: 110, image: chicken65, category: "Chinese Side Dish", veg: false },
  { id: "chicken-lolipop-fry", name: "Chicken Lolipop Fry", description: "Frenched chicken wings, dry fried with masala.", price: 140, image: lollipop, category: "Chinese Side Dish", veg: false },
  { id: "chicken-lolipop-gravy", name: "Chicken Lolipop Gravy", description: "Chicken lollipops simmered in a spicy red gravy.", price: 170, image: lollipop, category: "Chinese Side Dish", veg: false },
  { id: "barbieque-chicken", name: "Barbieque Chicken", description: "Smoky char-grilled BBQ chicken pieces.", price: 120, image: wings, category: "Chinese Side Dish", veg: false },
  { id: "barbieque-wings", name: "Barbieque Wings", description: "Sticky, glazed BBQ chicken wings with sesame.", price: 180, image: wings, category: "Chinese Side Dish", veg: false },
  { id: "teriyaki-chicken", name: "Teriyaki Chicken", description: "Glazed teriyaki chicken with a sweet-savoury kick.", price: 130, image: wings, category: "Chinese Side Dish", veg: false },
  { id: "chicken-crispy-roll", name: "Chicken Crispy Roll", description: "Crispy fried chicken rolls served with chilli sauce.", price: 120, image: roll, category: "Chinese Side Dish", veg: false },

  // Fried Rice
  { id: "veg-fried-rice", name: "Veg Fried Rice", description: "Wok-tossed rice with mixed vegetables.", price: 80, image: friedRice, category: "Fried Rice", veg: true },
  { id: "egg-fried-rice", name: "Egg Fried Rice", description: "Classic fried rice with scrambled egg & spring onion.", price: 90, image: friedRice, category: "Fried Rice", veg: false },
  { id: "chicken-fried-rice", name: "Chicken Fried Rice", description: "Fragrant fried rice loaded with chicken.", price: 100, image: friedRice, category: "Fried Rice", veg: false },
  { id: "sezwan-fried-rice", name: "Sezwan Fried Rice", description: "Spicy schezwan-style rice with a fiery kick.", price: 110, image: friedRice, category: "Fried Rice", veg: false },
  { id: "singapore-fried-rice", name: "Singapore Fried Rice", description: "Curry-flavoured rice with veggies & egg.", price: 110, image: friedRice, category: "Fried Rice", veg: false },

  // Combos
  { id: "combo-fries-pokora", name: "Combo: Fries + Chicken Pokora + Jeera Masala Soda", description: "French Fries + Chicken Pokora (5 pcs) + Jeera Masala Soda.", price: 99, image: fries, category: "Combo", veg: false },
  { id: "combo-paneer-veg", name: "Combo: Rice/Noodles + Paneer / Veg / Gobi Manchurian", description: "Fried Rice or Noodles with Paneer Manchurian, Veg or Gobi Manchurian.", price: 105, image: combo, category: "Combo", veg: true },
  { id: "combo-chicken", name: "Combo: Rice/Noodles + Chicken Manchurian / Chilly Chicken", description: "Fried Rice or Noodles with Chicken Manchurian or Chilly Chicken.", price: 120, image: combo, category: "Combo", veg: false },
];

export const CATEGORIES: MenuItem["category"][] = [
  "Noodles",
  "Chinese Side Dish",
  "Fried Rice",
  "Combo",
];
