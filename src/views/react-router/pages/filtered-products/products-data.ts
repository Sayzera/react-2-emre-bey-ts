import type { Product } from './types';

/**
 * Filtrelenmiş ürünler için veri seti
 * SRP (Single Responsibility Principle) - Sadece veri içerir
 * OCP (Open/Closed Principle) - Yeni ürünler eklenebilir, mevcut yapı değiştirilmez
 */
export const filteredProducts: Product[] = [
  // Elektronik Ürünler
  {
    id: 1,
    name: 'MacBook Pro 16"',
    price: 45000,
    category: 'Elektronik',
  },
  {
    id: 2,
    name: 'iPhone 15 Pro Max',
    price: 55000,
    category: 'Elektronik',
  },
  {
    id: 3,
    name: 'Samsung Galaxy S24 Ultra',
    price: 42000,
    category: 'Elektronik',
  },
  {
    id: 4,
    name: 'iPad Air',
    price: 25000,
    category: 'Elektronik',
  },
  {
    id: 5,
    name: 'AirPods Pro',
    price: 8500,
    category: 'Elektronik',
  },
  {
    id: 6,
    name: 'Sony WH-1000XM5 Kulaklık',
    price: 12000,
    category: 'Elektronik',
  },
  {
    id: 7,
    name: 'Logitech MX Master 3S',
    price: 3500,
    category: 'Elektronik',
  },
  {
    id: 8,
    name: 'LG UltraWide Monitör',
    price: 18000,
    category: 'Elektronik',
  },
  {
    id: 9,
    name: 'Samsung 4K TV 55"',
    price: 35000,
    category: 'Elektronik',
  },
  {
    id: 10,
    name: 'PlayStation 5',
    price: 25000,
    category: 'Elektronik',
  },
  {
    id: 11,
    name: 'Xbox Series X',
    price: 22000,
    category: 'Elektronik',
  },
  {
    id: 12,
    name: 'Apple Watch Series 9',
    price: 15000,
    category: 'Elektronik',
  },
  // Mobilya Ürünleri
  {
    id: 13,
    name: 'Ergonomik Ofis Koltuğu',
    price: 8500,
    category: 'Mobilya',
  },
  {
    id: 14,
    name: 'Modern Çalışma Masası',
    price: 12000,
    category: 'Mobilya',
  },
  {
    id: 15,
    name: 'Rahat Koltuk Takımı',
    price: 28000,
    category: 'Mobilya',
  },
  {
    id: 16,
    name: 'Yatak Odası Dolabı',
    price: 15000,
    category: 'Mobilya',
  },
  {
    id: 17,
    name: 'Yemek Masası Seti',
    price: 18000,
    category: 'Mobilya',
  },
  {
    id: 18,
    name: 'TV Ünitesi',
    price: 9500,
    category: 'Mobilya',
  },
  {
    id: 19,
    name: 'Kitaplık',
    price: 6500,
    category: 'Mobilya',
  },
  {
    id: 20,
    name: 'Kanepe',
    price: 32000,
    category: 'Mobilya',
  },
];

