import React, { useState, useEffect } from 'react';
import { ShoppingCart, Star, Clock, MapPin, Phone, Mail, Menu, X, Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const PizzaWebsite = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [activeSection, setActiveSection] = useState('home');

  const pizzas = [
    {
      id: 1,
      name: "Margherita Classic",
      price: 12.99,
      image: "/assets/Margherita-Classic.jpg",
      description: "Fresh mozzarella, tomato sauce, basil",
      rating: 4.8
    },
    {
      id: 2,
      name: "Pepperoni Supreme",
      price: 15.99,
      image: "/assets/Pepperoni-Supreme.jpg",
      description: "Pepperoni, mozzarella, tomato sauce",
      rating: 4.9
    },
    {
      id: 3,
      name: "Veggie Deluxe",
      price: 14.99,
      image: "/assets/veggie-dulex.jpg",
      description: "Bell peppers, mushrooms, olives, onions",
      rating: 4.7
    },
    {
      id: 4,
      name: "Meat Lovers",
      price: 18.99,
      image: "/assets/meet-pizza.jpg",
      description: "Pepperoni, sausage, ham, bacon",
      rating: 4.9
    },
    {
      id: 5,
      name: "Hawaiian Paradise",
      price: 16.99,
      image: "/assets/Hawaiian-Paradise.jpg",
      description: "Ham, pineapple, mozzarella",
      rating: 4.6
    },
    {
      id: 6,
      name: "BBQ Chicken",
      price: 17.99,
      image: "/assets/BBQ-chicken.jpg",
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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  const pizzaVariants = {
    initial: { scale: 0.9, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        duration: 0.8,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.3 }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50">
      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 w-full bg-white/95 backdrop-blur-md shadow-lg z-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <motion.div 
                whileHover={{ rotate: 180 }}
                className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center"
              >
                <span className="text-white font-bold text-lg">🍕</span>
              </motion.div>
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-2xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent"
              >
                PizzaCraft
              </motion.span>
            </div>
            
            <div className="hidden md:flex space-x-8">
              {['home', 'menu', 'about', 'contact'].map((item) => (
                <motion.a
                  key={item}
                  href={`#${item}`}
                  className={`capitalize font-medium transition-colors duration-200 ${
                    activeSection === item 
                      ? 'text-red-600 border-b-2 border-red-600' 
                      : 'text-gray-700 hover:text-red-600'
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item}
                </motion.a>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              <motion.div 
                className="relative"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ShoppingCart className="w-6 h-6 text-gray-700 cursor-pointer hover:text-red-600 transition-colors" />
                {totalItems > 0 && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </motion.div>
              
              <motion.button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </motion.button>
            </div>
          </div>
          
          {/* Mobile Menu */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="md:hidden bg-white border-t overflow-hidden"
              >
                <div className="px-2 pt-2 pb-3 space-y-1">
                  {['home', 'menu', 'about', 'contact'].map((item) => (
                    <motion.a
                      key={item}
                      href={`#${item}`}
                      className="block px-3 py-2 text-gray-700 hover:text-red-600 capitalize"
                      onClick={() => setIsMenuOpen(false)}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {item}
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section id="home" className="pt-16 min-h-screen flex items-center overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="grid lg:grid-cols-2 gap-12 items-center"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div className="space-y-8" variants={itemVariants}>
              <div className="space-y-4">
                <motion.h1 
                  className="text-5xl lg:text-7xl font-bold leading-tight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <span className="bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
                    Delicious
                  </span>
                  <br />
                  <span className="text-gray-800">Pizza</span>
                  <br />
                  <span className="bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
                    Delivered
                  </span>
                </motion.h1>
                <motion.p 
                  className="text-xl text-gray-600 max-w-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                >
                  Authentic Italian pizzas made with fresh ingredients and delivered hot to your door in 30 minutes or less.
                </motion.p>
              </div>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                <motion.button 
                  className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Order Now
                </motion.button>
                <motion.button 
                  className="border-2 border-red-500 text-red-500 px-8 py-4 rounded-full font-semibold text-lg hover:bg-red-500 hover:text-white transition-all duration-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View Menu
                </motion.button>
              </motion.div>

              <motion.div 
                className="flex items-center space-x-8 pt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              >
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
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="relative w-[400px] h-[400px] mx-auto"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              {/* Background Glow */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-yellow-300/20 to-red-400/20 rounded-full blur-3xl scale-110 -z-10"
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />

              {/* Pizza Board */}
              <motion.img 
                src="/assets/home-board.png"
                alt="Pizza Board"
                className="absolute bottom-[-0.5rem] left-[-0.15rem] w-[600px] z-0 drop-shadow-lg"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.8 }}
              />

              {/* Pizza */}
              <motion.img 
                src="/assets/pizza.png"
                alt="Delicious Pizza"
                className="absolute top-0 left-0 w-[450px] z-10 drop-shadow-xl transition-transform duration-300 hover:scale-105"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.8 }}
                whileHover={{ rotate: [0, 5, -5, 0] }}
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-20 bg-gradient-to-br from-orange-50 to-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-800">
              Our <span className="bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">Special Pizzas</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mt-4">
              Handcrafted with authentic ingredients and baked to perfection in our stone oven
            </p>
          </motion.div>

          {/* Pizza Grid */}
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {pizzas.map((pizza, index) => (
              <motion.div 
                key={pizza.id}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                variants={itemVariants}
                whileHover={{ y: -10 }}
                custom={index}
              >
                <div className="relative h-90 overflow-hidden">
                  <motion.img 
                    src={pizza.image}
                    alt={pizza.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    variants={pizzaVariants}
                  />
                  <motion.div 
                    className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold"
                    whileHover={{ scale: 1.1 }}
                  >
                    ${pizza.price.toFixed(2)}
                  </motion.div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-bold text-gray-800">{pizza.name}</h3>
                    <div className="flex items-center bg-amber-100 px-2 py-1 rounded-full">
                      <Star className="w-4 h-4 text-amber-600 mr-1" />
                      <span className="text-sm font-medium">{pizza.rating}</span>
                    </div>
                  </div>
                  <p className="text-gray-600 mt-2">{pizza.description}</p>
                  <motion.button 
                    className="mt-4 w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white py-2 rounded-lg font-medium hover:from-orange-600 hover:to-amber-600 transition-all"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => addToCart(pizza)}
                  >
                    Add to Cart
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* View All Button */}
          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            viewport={{ once: true }}
          >
            <motion.button 
              className="px-8 py-3 bg-white text-orange-600 font-bold rounded-full border-2 border-orange-500 hover:bg-orange-500 hover:text-white transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Full Menu
            </motion.button>
          </motion.div>
        </div>
      </section>

{/* About Section */}
<section id="about" className="py-20 bg-gradient-to-br from-red-50 to-orange-50">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <motion.div 
      className="grid lg:grid-cols-2 gap-12 items-center"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
    >
      {/* Enhanced Image Gallery - Now on the left */}
      <motion.div 
        className="relative  py-3 h-full "
        variants={itemVariants}
      >
        {/* Main Image */}
        <motion.div 
          className="absolute  w-full h-full"
          whileHover={{ scale: 1.02 }}
        >
          <motion.img 
            src="/assets/contact-img.png"
            alt="Artisan Pizza"
            className="w-full h-full object-fit rounded-2xl"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          />
        </motion.div>
        
        {/* Decorative Element */}
        <motion.div 
          className="absolute -left-4 -top-4 w-24 h-24"
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <img 
            src="/assets/recipe-sauces.png"
            alt="Pizza Cutter"
            className="w-full h-full object-contain rotate-12"
          />
        </motion.div>
        
        {/* Ingredient Badge */}
        <motion.div 
          className="absolute -left-6 bottom-20 bg-white px-4 py-2 rounded-full shadow-md flex items-center"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.1 }}
        >
          <img 
            src="/assets/recipe-tomato.png"
            alt="Fresh Tomatoes"
            className="w-6 h-6 mr-2"
          />
          <span className="text-sm font-medium text-gray-700">Fresh Ingredients</span>
        </motion.div>
      </motion.div>

      {/* Text Content - Now on the right */}
      <motion.div className="space-y-6" variants={itemVariants}>
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
          <motion.div 
            className="text-center p-4 bg-white/50 rounded-2xl backdrop-blur-sm"
            whileHover={{ scale: 1.05 }}
          >
            <Clock className="w-8 h-8 text-red-600 mx-auto mb-2" />
            <div className="font-bold text-gray-800">Fast Delivery</div>
            <div className="text-sm text-gray-600">30 min guarantee</div>
          </motion.div>
          <motion.div 
            className="text-center p-4 bg-white/50 rounded-2xl backdrop-blur-sm"
            whileHover={{ scale: 1.05 }}
          >
            <Star className="w-8 h-8 text-red-600 mx-auto mb-2" />
            <div className="font-bold text-gray-800">Top Quality</div>
            <div className="text-sm text-gray-600">Premium ingredients</div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  </div>
</section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
              Get In <span className="bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">Touch</span>
            </h2>
            <p className="text-xl text-gray-600">
              Ready to order? Contact us or visit our location!
            </p>
          </motion.div>
          
          <motion.div 
            className="grid lg:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {[
              { icon: <MapPin className="w-12 h-12 text-red-600 mx-auto mb-4" />, 
                title: "Location", 
                content: "123 Pizza Street\nNew York, NY 10001" 
              },
              { icon: <Phone className="w-12 h-12 text-red-600 mx-auto mb-4" />, 
                title: "Phone", 
                content: "(555) 123-PIZZA\n(555) 123-7499" 
              },
              { icon: <Mail className="w-12 h-12 text-red-600 mx-auto mb-4" />, 
                title: "Email", 
                content: "info@pizzacraft.com\norders@pizzacraft.com" 
              }
            ].map((item, index) => (
              <motion.div 
                key={index}
                className="text-center p-8 bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl"
                variants={itemVariants}
                whileHover={{ y: -10 }}
              >
                {item.icon}
                <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
                <p className="text-gray-600 whitespace-pre-line">{item.content}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Cart Sidebar */}
      <AnimatePresence>
        {cart.length > 0 && (
          <motion.div 
            className="fixed bottom-4 right-4 bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full mx-4 z-40"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", damping: 25 }}
          >
            <h3 className="text-lg font-bold text-gray-800 mb-4">Your Order</h3>
            <div className="space-y-3 max-h-40 overflow-y-auto">
              {cart.map((item) => (
                <motion.div 
                  key={item.id} 
                  className="flex items-center justify-between"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex-1">
                    <div className="font-medium text-sm">{item.name}</div>
                    <div className="text-red-600 font-bold">${item.price}</div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <motion.button 
                      onClick={() => updateQuantity(item.id, -1)}
                      className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center text-red-600 hover:bg-red-200"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Minus className="w-3 h-3" />
                    </motion.button>
                    <span className="font-medium">{item.quantity}</span>
                    <motion.button 
                      onClick={() => updateQuantity(item.id, 1)}
                      className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center text-red-600 hover:bg-red-200"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Plus className="w-3 h-3" />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="border-t pt-4 mt-4">
              <div className="flex justify-between items-center mb-4">
                <span className="font-bold text-lg">Total: ${totalPrice.toFixed(2)}</span>
              </div>
              <motion.button 
                className="w-full bg-gradient-to-r from-red-500 to-orange-500 text-white py-3 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Checkout
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <motion.footer 
        className="bg-gray-900 text-white py-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div 
              className="flex items-center justify-center space-x-2 mb-4"
              whileHover={{ scale: 1.05 }}
            >
              <motion.div 
                className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <span className="text-white font-bold text-lg">🍕</span>
              </motion.div>
              <span className="text-2xl font-bold">PizzaCraft</span>
            </motion.div>
            <p className="text-gray-400 mb-4">Serving the best pizza since 1985</p>
            <p className="text-gray-500 text-sm">© 2025 PizzaCraft. All rights reserved.</p>
          </div>
        </div>
      </motion.footer>
    </div>
  );
};

export default PizzaWebsite;