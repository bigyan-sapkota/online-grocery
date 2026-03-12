import { MessageCircle, Phone } from "lucide-react";
 
const categories = [
  "Staples",
  "Beverages",
  "Personal Care",
  "Home Care",
  "Baby Care",
  "Vegetables & Fruits",
  "Snacks & Foods",
  "Dairy & Bakery",
];
 
const customerServices = [
  "About Us",
  "Terms & Conditions",
  "FAQ",
  "Privacy Policy",
  "E-waste Policy",
  "Cancellation & Return Policy",
];
 
export default function Footer() {
  return (
    <footer className="bg-primary text-white w-full">
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="flex flex-col gap-6">
            <h1 className="text-3xl font-bold">MegaMart</h1>
 
            <div>
              <h3 className="font-semibold text-lg mb-3">Contact Us</h3>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <MessageCircle size={20} className="shrink-0" />
                  <div>
                    <p className="text-sm font-medium">Whats App</p>
                    <p className="text-sm opacity-90">+1 202-918-2132</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={20} className="shrink-0" />
                  <div>
                    <p className="text-sm font-medium">Call Us</p>
                    <p className="text-sm opacity-90">+1 202-918-2132</p>
                  </div>
                </div>
              </div>
            </div>
 
            <div>
              <h3 className="font-semibold text-lg mb-3">Download App</h3>
              <div className="flex gap-3 flex-wrap">
                <a href="#" className="block">
                  <img
                    src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                    alt="Download on App Store"
                    className="h-10"
                  />
                </a>
                <a href="#" className="block">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                    alt="Get it on Google Play"
                    className="h-10"
                  />
                </a>
              </div>
            </div>
          </div>
 
          <div>
            <h3 className="font-semibold text-lg mb-1">
              Most Popular Categories
            </h3>
            <div className="border-b-2 border-white w-40 mb-4" />
            <ul className="flex flex-col gap-2">
              {categories.map((cat) => (
                <li key={cat} className="flex items-center gap-2 text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-white inline-block shrink-0" />
                  <a href="#" className="hover:underline">
                    {cat}
                  </a>
                </li>
              ))}
            </ul>
          </div>
 
          <div>
            <h3 className="font-semibold text-lg mb-1">Customer Services</h3>
            <div className="border-b-2 border-white w-36 mb-4" />
            <ul className="flex flex-col gap-2">
              {customerServices.map((service) => (
                <li key={service} className="flex items-center gap-2 text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-white inline-block shrink-0" />
                  <a href="#" className="hover:underline">
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
 
      <div className="border-t border-white/20">
        <p className="text-center text-sm py-5 opacity-90">
          © 2022 All rights reserved. Reliance Retail Ltd.
        </p>
      </div>
    </footer>
  );
}
 