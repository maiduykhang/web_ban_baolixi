import React, { useState, useEffect } from 'react';
import { ShoppingCart, Menu, X, Plus, Minus, Trash2, Search, Star, Home, Gift, Briefcase, Smile, CheckCircle, Heart, Share2 } from 'lucide-react';

// Simulated Database
const initializeDatabase = () => {
  localStorage.clear(); // Bạn có thể bỏ comment dòng này nếu muốn reset lại dữ liệu gốc
  const defaultProducts = [
    {
      id: 1,
      name: 'Bao Lì Xì "Tết Hoa Nhí"',
      price: 19000,
      image: '/images/hoanhi.jpg',
      description: 'Thiết kế lấy cảm hứng từ những họa tiết hoa nhỏ xinh, mềm mại và tinh tế',
      rating: 4.8,
      stock: 50
    },
    {
      id: 2,
      name: 'Bao Lì Xì "Xuân Ánh Nguyệt"',
      price: 22500,
      image: '/images/anhnguyet.jpg',
      category: 'premium',
      description: 'Thiết kế lấy cảm hứng từ ánh trăng mùa xuân, biểu trưng cho sự viên mãn',
      rating: 4.9,
      stock: 30
    },
    {
      id: 3,
      name: 'Bao Lì Xì "Tết Độc Lập"',
      price: 27500,
      image: '/images/tetdoclap.jpg',
      category: 'modern',
      description: 'Thiết kế mang tinh thần tự do, bản lĩnh, khác biệt',
      rating: 4.7,
      stock: 40
    },
    {
      id: 4,
      name: 'Bao Lì Xì Doanh Nghiệp',
      price: 35000,
      image: '/images/doanhnghiep.jpg',
      category: 'corporate',
      description: 'Thiết kế sang trọng, phù hợp cho doanh nghiệp và đối tác',
      rating: 5.0,
      stock: 25
    },
    {
      id: 5,
      name: 'Bao Lì Xì Thiếu Nhi',
      price: 15000,
      image: '/images/thieunhi.jpg',
      category: 'kids',
      description: 'Thiết kế đáng yêu, màu sắc rực rỡ cho các bé',
      rating: 4.6,
      stock: 60
    },
    {
      id: 6,
      name: 'Bao Lì Xì Phúc Lộc Thọ',
      price: 20000,
      image: '/images/phucloctho.jpg',
      category: 'traditional',
      description: 'Bao lì xì truyền thống với thông điệp Phúc - Lộc - Thọ',
      rating: 4.8,
      stock: 45
    }
  ];

  if (!localStorage.getItem('products')) {
    localStorage.setItem('products', JSON.stringify(defaultProducts));
  }
  if (!localStorage.getItem('orders')) {
    localStorage.setItem('orders', JSON.stringify([]));
  }
};

// Database Operations
const DB = {
  getProducts: () => JSON.parse(localStorage.getItem('products') || '[]'),
  saveProducts: (products) => localStorage.setItem('products', JSON.stringify(products)),
  getOrders: () => JSON.parse(localStorage.getItem('orders') || '[]'),
  saveOrder: (order) => {
    const orders = DB.getOrders();
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));
  }
};

// --- MỚI: COMPONENT CHI TIẾT SẢN PHẨM ---
const ProductDetailModal = ({ product, onClose, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(product.image);
  
  // Giả lập album ảnh (Nhân bản ảnh chính lên để demo giao diện gallery)
  const galleryImages = [product.image, product.image, product.image, product.image];

  return (
    <div className="fixed inset-0 z-[60] bg-black bg-opacity-60 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl relative flex flex-col md:flex-row">
        
        {/* Nút đóng */}
        <button onClick={onClose} className="absolute top-4 right-4 z-10 p-2 bg-gray-100 rounded-full hover:bg-gray-200">
          <X size={24} />
        </button>

        {/* Cột trái: Hình ảnh */}
        <div className="w-full md:w-1/2 p-6 bg-gray-50">
          <div className="w-full h-80 mb-4 border border-gray-200 rounded-lg overflow-hidden flex items-center justify-center">
            <img src={activeImage} alt={product.name} className="max-h-full max-w-full object-contain" />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {galleryImages.map((img, index) => (
              <button 
                key={index} 
                onClick={() => setActiveImage(img)}
                className={`w-20 h-20 flex-shrink-0 border-2 rounded-md overflow-hidden ${activeImage === img ? 'border-red-500' : 'border-transparent'}`}
              >
                <img src={img} alt="thumb" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Cột phải: Thông tin */}
        <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">{product.name}</h2>
          
          <div className="flex items-center gap-4 mb-4 text-sm">
            <div className="flex items-center text-yellow-500">
              <span className="underline mr-1 font-bold text-black">{product.rating}</span>
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} fill="currentColor" className={i < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-300"} />
              ))}
            </div>
            <div className="text-gray-500">| Đã bán 1.2k</div>
            <div className="flex gap-3 ml-auto text-gray-400">
                <Heart className="hover:text-red-500 cursor-pointer transition" size={20}/>
                <Share2 className="hover:text-blue-500 cursor-pointer transition" size={20}/>
            </div>
          </div>

          <div className="bg-red-50 p-4 rounded-lg mb-6">
            <span className="text-3xl font-bold text-red-600">{product.price.toLocaleString('vi-VN')}đ</span>
            <span className="ml-3 text-gray-400 line-through text-sm">{(product.price * 1.2).toLocaleString('vi-VN')}đ</span>
            <span className="ml-2 text-red-600 text-xs font-bold bg-red-100 px-2 py-1 rounded">-20%</span>
          </div>

          <div className="mb-6 flex-1">
            <h3 className="font-semibold text-gray-700 mb-2">Mô tả sản phẩm:</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{product.description}</p>
          </div>

          <div className="flex items-center gap-6 mb-8">
            <span className="text-gray-600 font-medium">Số lượng:</span>
            <div className="flex items-center border border-gray-300 rounded">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-2 hover:bg-gray-100"><Minus size={16}/></button>
              <input type="text" value={quantity} readOnly className="w-12 text-center font-semibold outline-none" />
              <button onClick={() => setQuantity(quantity + 1)} className="p-2 hover:bg-gray-100"><Plus size={16}/></button>
            </div>
            <span className="text-gray-500 text-sm">{product.stock} sản phẩm có sẵn</span>
          </div>

          <div className="flex gap-3 mt-auto">
            <button 
              onClick={() => {
                onAddToCart({ ...product, quantityToAdd: quantity }); // Truyền số lượng cần thêm
                onClose();
              }}
              className="flex-1 bg-red-100 text-red-600 border border-red-600 py-3 rounded-lg font-bold hover:bg-red-50 transition flex items-center justify-center gap-2"
            >
              <ShoppingCart size={20} /> Thêm Vào Giỏ
            </button>
            <button 
              onClick={() => {
                onAddToCart({ ...product, quantityToAdd: quantity });
                onClose();
              }}
              className="flex-1 bg-red-600 text-white py-3 rounded-lg font-bold hover:bg-red-700 transition"
            >
              Mua Ngay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const CheckoutForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    note: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.phone && formData.email && formData.address) {
      onSubmit(formData);
    }
  };

  return (
    <div>
      <input name="name" value={formData.name} onChange={handleChange} placeholder="Họ và tên" required className="w-full mb-3 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none" />
      <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Số điện thoại" required className="w-full mb-3 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none" />
      <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Email" required className="w-full mb-3 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none" />
      <textarea name="address" value={formData.address} onChange={handleChange} placeholder="Địa chỉ giao hàng" required className="w-full mb-3 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none" rows={3} />
      <textarea name="note" value={formData.note} onChange={handleChange} placeholder="Ghi chú (tùy chọn)" className="w-full mb-4 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none" rows={2} />
      <div className="flex gap-3">
        <button onClick={onCancel} className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-400 transition">Hủy</button>
        <button onClick={handleSubmit} className="flex-1 bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700 transition">Xác Nhận</button>
      </div>
    </div>
  );
};

const App = () => {
  // Khai báo các biến trạng thái (State)
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Biến điều khiển Form thanh toán
  const [showCheckout, setShowCheckout] = useState(false);
  
  // Biến điều khiển Popup Chúc mừng
  const [showSuccess, setShowSuccess] = useState(false);

  // MỚI: State để lưu sản phẩm đang xem chi tiết
  const [viewingProduct, setViewingProduct] = useState(null);

  useEffect(() => {
    initializeDatabase();
    setProducts(DB.getProducts());
  }, []);

  const categories = [
    { id: 'all', name: 'Tất Cả' },
    { id: 'traditional', name: 'Truyền Thống' },
    { id: 'modern', name: 'Hiện Đại' },
    { id: 'premium', name: 'Cao Cấp' },
    { id: 'corporate', name: 'Doanh Nghiệp' },
    { id: 'kids', name: 'Thiếu Nhi' }
  ];

  const filteredProducts = products.filter(p => {
    const matchCategory = selectedCategory === 'all' || p.category === selectedCategory;
    const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  // MỚI: Cập nhật hàm addToCart để nhận số lượng từ Modal
  const addToCart = (product) => {
    const qtyToAdd = product.quantityToAdd || 1; // Mặc định là 1 nếu không truyền
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + qtyToAdd } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: qtyToAdd }]);
    }
    // Tự động mở giỏ hàng để người dùng biết đã thêm
    setShowCart(true);
  };

  const updateQuantity = (id, delta) => {
    setCart(cart.map(item =>
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    ));
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckout = (formData) => {
    const order = {
      id: Date.now(),
      ...formData,
      items: cart,
      total: totalAmount,
      date: new Date().toISOString(),
      status: 'pending'
    };
    DB.saveOrder(order);
    setCart([]);
    setShowCheckout(false);
    setShowSuccess(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-yellow-50 font-sans">
      {/* Header */}
      <header className="bg-red-600 text-white sticky top-0 z-50 shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button onClick={() => setShowMenu(!showMenu)} className="lg:hidden">
                {showMenu ? <X size={24} /> : <Menu size={24} />}
              </button>
              <h1 className="text-2xl font-bold">🧧 Bao Lì Xì Tết 2026</h1>
            </div>
            <button
              onClick={() => setShowCart(!showCart)}
              className="relative bg-yellow-400 text-red-600 px-4 py-2 rounded-full font-semibold hover:bg-yellow-300 transition flex items-center shadow-sm"
            >
              <ShoppingCart className="inline mr-2" size={20} />
              <span className="hidden md:inline">Giỏ Hàng</span>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs border-2 border-white animate-bounce">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-red-500 to-yellow-500 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 uppercase">
            Khởi Đầu May Mắn, Cả Năm Tài Lộc
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Bao lì xì truyền thống - Gửi gắm lời chúc an khang, thịnh vượng
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search & Filter */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-full shadow-sm focus:border-red-500 outline-none transition"
              />
            </div>
          </div>

          <div className="flex gap-3 overflow-x-auto pb-4 justify-center">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-6 py-2.5 rounded-full font-semibold whitespace-nowrap transition border ${
                  selectedCategory === cat.id
                    ? 'bg-red-600 text-white border-red-600 shadow-md transform scale-105'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-red-300 hover:text-red-500'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid - MỚI: Thêm sự kiện onClick để mở Modal */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredProducts.map(product => (
            <div 
              key={product.id} 
              // Khi bấm vào thẻ sản phẩm -> Mở Modal chi tiết
              onClick={() => setViewingProduct(product)}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition duration-300 cursor-pointer group"
            >
              <div className="relative overflow-hidden">
                <img src={product.image} alt={product.name} className="w-full h-64 object-cover transform group-hover:scale-110 transition duration-500" />
                {/* Overlay nút xem chi tiết */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all flex items-center justify-center">
                   <span className="bg-white text-red-600 px-4 py-2 rounded-full font-bold opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition shadow-lg">Xem Chi Tiết</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-gray-800 line-clamp-1">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2 h-10">{product.description}</p>
                <div className="flex items-center mb-3">
                  <Star className="text-yellow-400 fill-current" size={16} />
                  <span className="ml-1 text-sm text-gray-600 font-bold">{product.rating}</span>
                  <span className="ml-auto text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">Còn {product.stock} bộ</span>
                </div>
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-50">
                  <span className="text-2xl font-extrabold text-red-600">
                    {product.price.toLocaleString('vi-VN')}đ
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Ngăn mở modal khi bấm nút giỏ hàng
                      addToCart(product);
                    }}
                    className="bg-red-100 text-red-600 p-2.5 rounded-xl hover:bg-red-600 hover:text-white transition shadow-sm"
                  >
                    <ShoppingCart size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center hover:border-red-200 transition">
            <div className="text-4xl mb-4">🎨</div>
            <h3 className="font-bold text-lg mb-2 text-gray-800">Thiết Kế Đa Dạng</h3>
            <p className="text-gray-600 text-sm">Từ truyền thống đến hiện đại, phù hợp mọi lứa tuổi</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center hover:border-yellow-200 transition">
            <div className="text-4xl mb-4">✨</div>
            <h3 className="font-bold text-lg mb-2 text-gray-800">Chất Lượng Cao Cấp</h3>
            <p className="text-gray-600 text-sm">Giấy mỹ thuật, in ấn sắc nét, ép kim sang trọng</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center hover:border-red-200 transition">
            <div className="text-4xl mb-4">🎁</div>
            <h3 className="font-bold text-lg mb-2 text-gray-800">Giao Hàng Nhanh</h3>
            <p className="text-gray-600 text-sm">Giao hàng toàn quốc, đảm bảo kịp Tết</p>
          </div>
        </div>
      </div>

      {/* MỚI: Modal Chi tiết sản phẩm */}
      {viewingProduct && (
        <ProductDetailModal 
          product={viewingProduct} 
          onClose={() => setViewingProduct(null)} 
          onAddToCart={addToCart} 
        />
      )}

      {/* Cart Sidebar */}
      {showCart && (
        <div className="fixed inset-0 z-[55]">
          <div className="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-sm" onClick={() => setShowCart(false)}></div>
          <div className="absolute right-0 top-0 h-full w-full md:w-[450px] bg-white shadow-2xl flex flex-col animate-slide-in-right">
            <div className="p-6 bg-red-600 text-white flex justify-between items-center shadow-md">
              <h2 className="text-xl font-bold flex items-center"><ShoppingCart className="mr-2"/> Giỏ Hàng</h2>
              <button onClick={() => setShowCart(false)} className="hover:bg-red-700 p-2 rounded-full transition">
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
              {cart.length === 0 ? (
                <div className="text-center py-20 flex flex-col items-center opacity-60">
                   <div className="text-6xl mb-4 grayscale">🛒</div>
                   <p className="text-gray-500 text-lg mb-4">Giỏ hàng trống trơn à!</p>
                   <button onClick={() => setShowCart(false)} className="text-red-600 font-bold hover:underline">
                      Tiếp tục mua sắm
                   </button>
                </div>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="flex gap-4 mb-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                    <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg border border-gray-200" />
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-800 text-sm line-clamp-1">{item.name}</h3>
                      <p className="text-red-600 font-bold mt-1">{item.price.toLocaleString('vi-VN')}đ</p>
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex items-center border border-gray-300 rounded-lg bg-white">
                          <button onClick={() => updateQuantity(item.id, -1)} className="p-1 px-2 hover:bg-gray-100 rounded-l-lg"><Minus size={14} /></button>
                          <span className="font-semibold w-8 text-center text-sm">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, 1)} className="p-1 px-2 hover:bg-gray-100 rounded-r-lg"><Plus size={14} /></button>
                        </div>
                        <button onClick={() => removeFromCart(item.id)} className="ml-auto text-gray-400 hover:text-red-500 p-2 hover:bg-red-50 rounded-full transition">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-6 border-t bg-white shadow-[0_-5px_15px_rgba(0,0,0,0.05)]">
                <div className="flex justify-between mb-4">
                  <span className="font-bold text-xl text-gray-800">Tổng cộng:</span>
                  <span className="font-extrabold text-2xl text-red-600">
                    {totalAmount.toLocaleString('vi-VN')}đ
                  </span>
                </div>
                <button
                  onClick={() => {
                    setShowCart(false);
                    setShowCheckout(true);
                  }}
                  className="w-full bg-red-600 text-white py-4 rounded-xl font-bold hover:bg-red-700 transition shadow-lg shadow-red-200 text-lg"
                >
                  Đặt Hàng Ngay
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Checkout Modal */}
      {showCheckout && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-[60] flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-fade-in-up">
            <h2 className="text-2xl font-bold mb-6 text-red-800 text-center border-b pb-4">Thông Tin Nhận Hàng</h2>
            <CheckoutForm 
              onSubmit={handleCheckout} 
              onCancel={() => setShowCheckout(false)} 
            />
          </div>
        </div>
      )}

      {/* Popup Thành Công */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-[70] flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl animate-bounce-in">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
               <CheckCircle className="text-green-600 w-10 h-10" />
            </div>
            <h2 className="text-2xl font-extrabold mb-3 text-gray-800">Đặt Hàng Thành Công!</h2>
            <p className="text-gray-500 mb-8 leading-relaxed">
              Cảm ơn bạn đã ủng hộ. Nhân viên sẽ gọi điện xác nhận đơn hàng trong ít phút nữa nhé! ❤️
            </p>
            <button
              onClick={() => setShowSuccess(false)}
              className="w-full bg-green-600 text-white py-3.5 rounded-xl font-bold hover:bg-green-700 transition shadow-lg shadow-green-200"
            >
              Tuyệt Vời
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-red-900 text-white py-10 mt-12 border-t-8 border-yellow-500">
        <div className="container mx-auto px-4 text-center">
          <p className="text-2xl font-bold mb-3 flex items-center justify-center gap-2">
            🧧 Bao Lì Xì Tết 2026 - Khởi Đầu May Mắn 🧧
          </p>
          <p className="text-sm opacity-80 mb-6 font-light tracking-wide">
            An Khang - Thịnh Vượng - Vạn Sự Như Ý
          </p>
          <div className="text-xs opacity-50 pt-6 border-t border-red-800">
             © 2026. Designed with ❤️ for Tet Holiday.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;