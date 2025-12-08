/**
 * Ürün tipi tanımı
 * ISP (Interface Segregation Principle) - Küçük, odaklanmış interface
 */
export interface Product {
  id: number;
  name: string;
  price: number;
  category: 'Elektronik' | 'Mobilya';
}

