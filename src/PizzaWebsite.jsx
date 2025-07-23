import React, { useState, useEffect } from 'react';
import { ShoppingCart, Star, Clock, MapPin, Phone, Mail, Menu, X, Plus, Minus } from 'lucide-react';
import pizza from './assets/pizza.png'
import pizzaBoard from './assets/home-board.png'
import homeMushroom from './assets/home-mushroom.png';
import homeLeaf1 from './assets/home-leaf-1.png';
import homeLeaf2 from './assets/home-leaf-2.png';
import hometamato from './assets/home-tomato.png';
import homeolive from './assets/home-olive.png';
import homepepperoni from './assets/home-pepperoni.png';




const PizzaWebsite = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [activeSection, setActiveSection] = useState('home');

  const pizzas = [
    {
      id: 1,
      name: "Margherita Classic",
      price: 12.99,
      image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=400&h=300&fit=crop",
      description: "Fresh mozzarella, tomato sauce, basil",
      rating: 4.8
    },
    {
      id: 2,
      name: "Pepperoni Supreme",
      price: 15.99,
      image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&h=300&fit=crop",
      description: "Pepperoni, mozzarella, tomato sauce",
      rating: 4.9
    },
    {
      id: 3,
      name: "Veggie Deluxe",
      price: 14.99,
      image: "https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=400&h=300&fit=crop",
      description: "Bell peppers, mushrooms, olives, onions",
      rating: 4.7
    },
    {
      id: 4,
      name: "Meat Lovers",
      price: 18.99,
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop",
      description: "Pepperoni, sausage, ham, bacon",
      rating: 4.9
    },
    {
      id: 5,
      name: "Hawaiian Paradise",
      price: 16.99,
      image: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=400&h=300&fit=crop",
      description: "Ham, pineapple, mozzarella",
      rating: 4.6
    },
    {
      id: 6,
      name: "BBQ Chicken",
      price: 17.99,
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop",
      description: "BBQ chicken, red onions, cilantro",
      rating: 4.8
    }
  ];

  const addToCart = (pizza) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === pizza.id);
      if (existing) {
        return prev.map(item => 
          item.id === pizza.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...pizza, quantity: 1 }];
    });
  };

  const updateQuantity = (id, change) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQuantity = item.quantity + change;
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : null;
      }
      return item;
    }).filter(Boolean));
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'menu', 'about', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-md shadow-lg z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">🍕</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                PizzaCraft
              </span>
            </div>
            
            <div className="hidden md:flex space-x-8">
              {['home', 'menu', 'about', 'contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item}`}
                  className={`capitalize font-medium transition-colors duration-200 ${
                    activeSection === item 
                      ? 'text-red-600 border-b-2 border-red-600' 
                      : 'text-gray-700 hover:text-red-600'
                  }`}
                >
                  {item}
                </a>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <ShoppingCart className="w-6 h-6 text-gray-700 cursor-pointer hover:text-red-600 transition-colors" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                    {totalItems}
                  </span>
                )}
              </div>
              
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
          
          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden bg-white border-t">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {['home', 'menu', 'about', 'contact'].map((item) => (
                  <a
                    key={item}
                    href={`#${item}`}
                    className="block px-3 py-2 text-gray-700 hover:text-red-600 capitalize"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

{/* Hero Section */}
<section id="home" className="pt-16 min-h-screen flex items-center overflow-hidden">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="grid lg:grid-cols-2 gap-12 items-center">
      <div className="space-y-8">
        <div className="space-y-4">
          <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
            <span className="bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
              Delicious
            </span>
            <br />
            <span className="text-gray-800">Pizza</span>
            <br />
            <span className="bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
              Delivered
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-lg">
            Authentic Italian pizzas made with fresh ingredients and delivered hot to your door in 30 minutes or less.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <button className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
            Order Now
          </button>
          <button className="border-2 border-red-500 text-red-500 px-8 py-4 rounded-full font-semibold text-lg hover:bg-red-500 hover:text-white transition-all duration-200">
            View Menu
          </button>
        </div>

        <div className="flex items-center space-x-8 pt-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-red-600">30min</div>
            <div className="text-gray-600">Delivery</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-red-600">4.9★</div>
            <div className="text-gray-600">Rating</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-red-600">1000+</div>
            <div className="text-gray-600">Orders</div>
          </div>
        </div>
      </div>
      
      <div className="relative w-[400px] h-[400px] mx-auto">
        {/* Background Glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-300/20 to-red-400/20 rounded-full blur-3xl scale-110 -z-10"></div>

        {/* Pizza Board */}
        <img 
          src={pizzaBoard}
          alt="Pizza Board"
          className="absolute bottom-[-0.5rem] left-[-0.15rem] w-[400px] z-0 drop-shadow-lg"
        />

        {/* Pizza */}
        <img 
          src={pizza}
          alt="Delicious Pizza"
          className="absolute top-0 left-0 w-[400px] z-10 drop-shadow-xl transition-transform duration-300 hover:scale-105"
        />

        {/* Floating Ingredients - Larger and with enhanced animations */}
        <img 
          src={hometamato}
          alt="Tomato Slice"
          className="absolute w-16 h-16 top-[-30px] left-[45%] rotate-[20deg] z-20 animate-float1"
        />
        <img 
          src={homeLeaf1}
          alt="Leaf 1"
          className="absolute w-14 h-14 top-[20px] right-[10%] rotate-[-15deg] z-20 animate-float2"
        />
        <img 
          src={homeLeaf2}
          alt="Leaf 2"
          className="absolute w-14 h-14 bottom-[40px] left-[20%] rotate-[25deg] z-20 animate-float3"
        />
        <img 
          src={homeolive}
          alt="Olive"
          className="absolute w-12 h-12 bottom-[-30px] left-[5%] rotate-[35deg] z-20 animate-float4"
        />
        <img 
          src={homeMushroom}
          alt="Mushroom"
          className="absolute w-16 h-16 bottom-[40px] right-[8%] rotate-[10deg] z-20 animate-float5"
        />
        <img 
          src={homepepperoni}
          alt="Pepperoni"
          className="absolute w-16 h-16 top-[55%] left-[-30px] rotate-[-25deg] z-20 animate-float6"
        />
        {/* <img 
          src={homecheese}
          alt="Cheese"
          className="absolute w-14 h-14 top-[20%] right-[-20px] rotate-[15deg] z-20 animate-float1"
        /> */}
      </div>
    </div>
  </div>
</section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gradient-to-br from-red-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-800">
                About <span className="bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">PizzaCraft</span>
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
               The secret to success is the best ingredients 
                to make a better pizza. Today we strive for 
                perfection, just as we have been doing for 15 years 
                when we first opened the pizzeria in Lima - Peru.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Every pizza is handcrafted with love using our secret family recipe for the dough, premium San Marzano tomatoes, 
                and the finest mozzarella cheese imported directly from Italy.
              </p>
              
              <div className="grid grid-cols-2 gap-6 pt-6">
                <div className="text-center p-4 bg-white/50 rounded-2xl">
                  <Clock className="w-8 h-8 text-red-600 mx-auto mb-2" />
                  <div className="font-bold text-gray-800">Fast Delivery</div>
                  <div className="text-sm text-gray-600">30 min guarantee</div>
                </div>
                <div className="text-center p-4 bg-white/50 rounded-2xl">
                  <Star className="w-8 h-8 text-red-600 mx-auto mb-2" />
                  <div className="font-bold text-gray-800">Top Quality</div>
                  <div className="text-sm text-gray-600">Premium ingredients</div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=600&h=400&fit=crop"
                alt="Pizza Kitchen"
                className="w-full rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl">
                <div className="text-3xl font-bold text-red-600">35+</div>
                <div className="text-gray-600 font-medium">Years of Excellence</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
              Get In <span className="bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">Touch</span>
            </h2>
            <p className="text-xl text-gray-600">
              Ready to order? Contact us or visit our location!
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl">
              <MapPin className="w-12 h-12 text-red-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-2">Location</h3>
              <p className="text-gray-600">123 Pizza Street<br />New York, NY 10001</p>
            </div>
            
            <div className="text-center p-8 bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl">
              <Phone className="w-12 h-12 text-red-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-2">Phone</h3>
              <p className="text-gray-600">(555) 123-PIZZA<br />(555) 123-7499</p>
            </div>
            
            <div className="text-center p-8 bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl">
              <Mail className="w-12 h-12 text-red-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-2">Email</h3>
              <p className="text-gray-600">info@pizzacraft.com<br />orders@pizzacraft.com</p>
            </div>
          </div>
        </div>
      </section>

      {/* Cart Sidebar */}
      {cart.length > 0 && (
        <div className="fixed bottom-4 right-4 bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full mx-4 z-40">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Your Order</h3>
          <div className="space-y-3 max-h-40 overflow-y-auto">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="font-medium text-sm">{item.name}</div>
                  <div className="text-red-600 font-bold">${item.price}</div>
                </div>
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => updateQuantity(item.id, -1)}
                    className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center text-red-600 hover:bg-red-200"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="font-medium">{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.id, 1)}
                    className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center text-red-600 hover:bg-red-200"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="border-t pt-4 mt-4">
            <div className="flex justify-between items-center mb-4">
              <span className="font-bold text-lg">Total: ${totalPrice.toFixed(2)}</span>
            </div>
            <button className="w-full bg-gradient-to-r from-red-500 to-orange-500 text-white py-3 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200">
              Checkout
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">🍕</span>
              </div>
              <span className="text-2xl font-bold">PizzaCraft</span>
            </div>
            <p className="text-gray-400 mb-4">Serving the best pizza since 1985</p>
            <p className="text-gray-500 text-sm">© 2025 PizzaCraft. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PizzaWebsite;