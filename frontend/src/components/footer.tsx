import React from "react";
import { Sparkles, Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="border-t border-gray-200 bg-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          
         
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-black text-white">
                <Sparkles className="h-4 w-4" />
              </div>
              <span className="text-xl font-bold tracking-tight text-gray-900">
                The Insight Page
              </span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rerum unde
              quaerat eveniet cumque accusamus atque qui error quo enim fugiat?
            </p>
          </div>

          <div className="col-span-1 md:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-8">
            
            
            <div>
              <h3 className="font-bold text-gray-900 mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link href="/" className="hover:text-black transition-colors">Home</Link></li>
                <li><Link href="#" className="hover:text-black transition-colors">Best Sellers</Link></li>
                <li><Link href="#" className="hover:text-black transition-colors">Offers & Deals</Link></li>
                <li><Link href="#" className="hover:text-black transition-colors">Contact Us</Link></li>
                <li><Link href="#" className="hover:text-black transition-colors">FAQs</Link></li>
              </ul>
            </div>

           
            <div>
              <h3 className="font-bold text-gray-900 mb-4">Need Help?</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link href="#" className="hover:text-black transition-colors">Delivery Information</Link></li>
                <li><Link href="#" className="hover:text-black transition-colors">Return & Refund Policy</Link></li>
                <li><Link href="#" className="hover:text-black transition-colors">Payment Methods</Link></li>
                <li><Link href="#" className="hover:text-black transition-colors">Track your Order</Link></li>
              </ul>
            </div>

           
            <div>
              <h3 className="font-bold text-gray-900 mb-4">Follow Us</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                    <Link href="#" className="flex items-center gap-2 hover:text-black transition-colors">
                        <Instagram size={16}/> Instagram
                    </Link>
                </li>
                <li>
                    <Link href="#" className="flex items-center gap-2 hover:text-black transition-colors">
                        <Twitter size={16}/> Twitter
                    </Link>
                </li>
                <li>
                    <Link href="#" className="flex items-center gap-2 hover:text-black transition-colors">
                        <Facebook size={16}/> Facebook
                    </Link>
                </li>
                <li>
                    <Link href="#" className="flex items-center gap-2 hover:text-black transition-colors">
                         <Youtube size={16}/> YouTube
                    </Link>
                </li>
              </ul>
            </div>

          </div>
        </div>

        
        <div className="border-t border-gray-200 pt-8 text-center">
          <p className="text-gray-500 text-sm">
            Copyright 2025 © The Insight Page - All Right Reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;