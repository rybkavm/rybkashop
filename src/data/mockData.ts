// GlassShop Mock Data - Categories and Products

export interface Category {
  id: number;
  name: string;
  icon: string;
  description: string;
  productCount: number;
}

export interface Product {
  id: number;
  name: string;
  categoryId: number;
  price: number;
  oldPrice?: number;
  imageUrl: string;
  description: string;
  rating: number;
  reviewCount: number;
}

export interface PromoSlide {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  buttonText: string;
  link: string;
  gradient: string;
}

// 10 Categories with diverse product types
export const categories: Category[] = [
  {
    id: 1,
    name: "Головные уборы",
    icon: "🧢",
    description: "Стильные головные уборы",
    productCount: 10,
  },
  {
    id: 2,
    name: "Бананы",
    icon: "🍌",
    description: "Свежие тропические бананфы",
    productCount: 10,
  },
  {
    id: 3,
    name: "Игры для ПК",
    icon: "🎮",
    description: "Лучшие игры для геймеров",
    productCount: 10,
  },
  {
    id: 4,
    name: "Стулья",
    icon: "🪑",
    description: "Комфортная мебель для дома",
    productCount: 10,
  },
  {
    id: 5,
    name: "Блокноты",
    icon: "📓",
    description: "Для записей и творчества",
    productCount: 10,
  },
  {
    id: 6,
    name: "Смартфоны",
    icon: "📱",
    description: "Современные гаджеты",
    productCount: 10,
  },
  {
    id: 7,
    name: "Книги",
    icon: "📚",
    description: "Мир знаний и приключений",
    productCount: 10,
  },
  {
    id: 8,
    name: "Спорт",
    icon: "⚽",
    description: "Спортивный инвентарь",
    productCount: 10,
  },
  {
    id: 9,
    name: "Косметика",
    icon: "💄",
    description: "Средства по уходу и красоте",
    productCount: 10,
  },
  {
    id: 10,
    name: "Игрушки",
    icon: "🧸",
    description: "Радость для детей и взрослых",
    productCount: 10,
  },
];

// Product image URLs (using placeholder images)
const productImages = {
  hats: [
    "/public/images/hats/01.jpg",
    "/public/images/hats/02.jpg",
    "/public/images/hats/03.jpg",
    "/public/images/hats/04.jpg",
    "/public/images/hats/05.jpg",
    "/public/images/hats/06.jpg",
    "/public/images/hats/07.jpg",
    "/public/images/hats/08.jpg",
    "/public/images/hats/09.jpg",
    "/public/images/hats/10.jpg",
  ],
  fruits: [
    "/public/images/fruits/01.jpg",
    "/public/images/fruits/02.jpg",
    "/public/images/fruits/03.jpg",
    "/public/images/fruits/04.jpg",
    "/public/images/fruits/05.jpg",
    "/public/images/fruits/06.jpg",
    "/public/images/fruits/07.jpg",
    "/public/images/fruits/08.jpg",
    "/public/images/fruits/09.jpg",
    "/public/images/fruits/10.jpg",
  ],
  games: [
    "/public/images/games/01.jpg",
    "/public/images/games/02.jpg",
    "/public/images/games/03.jpg",
    "/public/images/games/04.jpg",
    "/public/images/games/05.jpg",
    "/public/images/games/06.jpg",
    "/public/images/games/07.jpg",
    "/public/images/games/08.jpg",
    "/public/images/games/09.jpg",
    "/public/images/games/10.jpg",
  ],
  chairs: [
    "/public/images/chairs/01.jpg",
    "/public/images/chairs/02.jpg",
    "/public/images/chairs/03.jpg",
    "/public/images/chairs/04.jpg",
    "/public/images/chairs/05.jpg",
    "/public/images/chairs/06.jpg",
    "/public/images/chairs/07.jpg",
    "/public/images/chairs/08.jpg",
    "/public/images/chairs/09.jpg",
    "/public/images/chairs/10.jpg",
  ],
  notebooks: [
    "/public/images/notebooks/01.jpg",
    "/public/images/notebooks/02.jpg",
    "/public/images/notebooks/03.jpg",
    "/public/images/notebooks/04.jpg",
    "/public/images/notebooks/05.jpg",
    "/public/images/notebooks/06.jpg",
    "/public/images/notebooks/07.jpg",
    "/public/images/notebooks/08.jpg",
    "/public/images/notebooks/09.jpg",
    "/public/images/notebooks/10.jpg",
  ],
  phones: [
    "/public/images/phones/01.jpg",
    "/public/images/phones/02.jpg",
    "/public/images/phones/03.jpg",
    "/public/images/phones/04.jpg",
    "/public/images/phones/05.jpg",
    "/public/images/phones/06.jpg",
    "/public/images/phones/07.jpg",
    "/public/images/phones/08.jpg",
    "/public/images/phones/09.jpg",
    "/public/images/phones/10.jpg",
  ],
  books: [
    "/public/images/books/01.jpg",
    "/public/images/books/02.jpg",
    "/public/images/books/03.jpg",
    "/public/images/books/04.jpg",
    "/public/images/books/05.jpg",
    "/public/images/books/06.jpg",
    "/public/images/books/07.jpg",
    "/public/images/books/08.jpg",
    "/public/images/books/09.jpg",
    "/public/images/books/10.jpg",
  ],
  sports: [
    "/public/images/sports/01.jpg",
    "/public/images/sports/02.jpg",
    "/public/images/sports/03.jpg",
    "/public/images/sports/04.jpg",
    "/public/images/sports/05.jpg",
    "/public/images/sports/06.jpg",
    "/public/images/sports/07.jpg",
    "/public/images/sports/08.jpg",
    "/public/images/sports/09.jpg",
    "/public/images/sports/10.jpg",
  ],
  cosmetics: [
    "/public/images/cosmetics/01.jpg",
    "/public/images/cosmetics/02.jpg",
    "/public/images/cosmetics/03.jpg",
    "/public/images/cosmetics/04.jpg",
    "/public/images/cosmetics/05.jpg",
    "/public/images/cosmetics/06.jpg",
    "/public/images/cosmetics/07.jpg",
    "/public/images/cosmetics/08.jpg",
    "/public/images/cosmetics/09.jpg",
    "/public/images/cosmetics/10.jpg",
  ],
  toys: [
    "/public/images/toys/01.jpg",
    "/public/images/toys/02.jpg",
    "/public/images/toys/03.jpg",
    "/public/images/toys/04.jpg",
    "/public/images/toys/05.jpg",
    "/public/images/toys/06.jpg",
    "/public/images/toys/07.jpg",
    "/public/images/toys/08.jpg",
    "/public/images/toys/09.jpg",
    "/public/images/toys/10.jpg",
  ],
};

// Product names by category
const productNames: Record<number, string[]> = {
  1: [
    "Бейсболка Classic",
    "Шапка Winter Warm",
    "Кепка Sport Pro",
    "Кепка Summer",
    "Шляпа Fedora",
    "Бини Urban Style",
    "Кепка с вышивкой",
    "Шапка меховая",
    "Snapback Original",
    "Кепка дальнобойщика",
  ],
  2: [
    "Бананы Эквадор Premium",
    "Мини-бананы Baby",
    "Бананы органические",
    "Бананы зелёные",
    "Бананы красные",
    "Платано для жарки",
    "Бананы Cavendish",
    "Бананы Gros Michel",
    "Бананы Lady Finger",
    "Бананы переспелые",
  ],
  3: [
    "Cyberpunk 2077",
    "The Witcher 3",
    "Red Dead Redemption 2",
    "GTA V Premium",
    "Elden Ring",
    "Hogwarts Legacy",
    "Starfield",
    "Baldur's Gate 3",
    "FIFA 24",
    "Call of Duty MW3",
  ],
  4: [
    "Офисное кресло Pro",
    "Стул обеденный Classic",
    "Геймерское кресло RGB",
    "Барный стул High",
    "Стул складной Travel",
    "Кресло-качалка Relax",
    "Детский стул Safety",
    "Стул дизайнерский",
    "Табурет кухонный",
    "Кресло директорское",
  ],
  5: [
    "Блокнот Moleskine",
    "Ежедневник Business",
    "Скетчбук Artist",
    "Тетрадь A4 Premium",
    "Планнер Weekly",
    "Блокнот на кольцах",
    "Записная книжка Mini",
    "Блокнот крафтовый",
    "Дневник личный",
    "Блокнот в точку",
  ],
  6: [
    "iPhone 15 Pro Max",
    "Samsung Galaxy S24",
    "Google Pixel 8 Pro",
    "Xiaomi 14 Ultra",
    "OnePlus 12",
    "iPhone 15",
    "Samsung Galaxy A54",
    "Huawei Mate 60",
    "Realme GT 5 Pro",
    "Nothing Phone 2",
  ],
  7: [
    "Мастер и Маргарита",
    "1984 Оруэлл",
    "Гарри Поттер комплект",
    "Война и мир",
    "Преступление и наказание",
    "Маленький принц",
    "Три товарища",
    "Алхимик",
    "Шантарам",
    "Сто лет одиночества",
  ],
  8: [
    "Мяч футбольный Adidas",
    "Гантели разборные 20кг",
    "Скакалка Speed",
    "Коврик для йоги Pro",
    "Теннисная ракетка",
    "Боксёрские перчатки",
    "Эспандер грудной",
    "Фитнес-браслет",
    "Велошлем Safety",
    "Ролики взрослые",
  ],
  9: [
    "Крем для лица Hydra",
    "Помада матовая Red",
    "Тени палетка Nude",
    "Тушь для ресниц Volume",
    "Сыворотка витаминная",
    "Крем для рук Winter",
    "Скраб для тела Coffee",
    "Маска для волос",
    "Духи Chanel №5",
    "Бальзам для губ",
  ],
  10: [
    "Конструктор LEGO City",
    "Кукла Барби Dream",
    "Машинка Hot Wheels",
    "Плюшевый медведь XL",
    "Пазл 1000 деталей",
    "Настольная игра Монополия",
    "Робот-трансформер",
    "Кубик Рубика",
    "Набор Play-Doh",
    "Квадрокоптер",
  ],
};

// Product descriptions by category
const productDescriptions: Record<number, string[]> = {
  1: [
    "Классическая бейсболка из хлопка премиум качества. Регулируемый размер.",
    "Тёплая зимняя шапка с флисовой подкладкой. Идеальна для холодной погоды.",
    "Спортивная кепка с дышащей сеткой. Отводит влагу во время тренировок.",
    "Летняя панама защитит от солнца. Лёгкая и стильная.",
    "Элегантная фетровая шляпа для особых случаев.",
    "Стильная бини для городского образа. Мягкий акрил.",
    "Кепка с оригинальной вышивкой. Уникальный дизайн.",
    "Меховая шапка для суровых морозов. Натуральный мех.",
    "Оригинальный снэпбек с плоским козырьком.",
    "Классическая кепка дальнобойщика с сеткой.",
  ],
  2: [
    "Отборные бананы из Эквадора. Идеальная спелость.",
    "Маленькие сладкие бананы. Богаты калием.",
    "Выращены без пестицидов. Органический сертификат.",
    "Идеальны для выпечки и смузи.",
    "Редкий сорт красных бананов. Уникальный вкус.",
    "Бананы для жарки и тушения. Карибская кухня.",
    "Классический сорт бананов Cavendish.",
    "Легендарный сорт с богатым ароматом.",
    "Миниатюрные сладкие бананы Lady Finger.",
    "Переспелые бананы идеальны для банананового хлеба.",
  ],
  3: [
    "Культовая игра в открытом мире будущего. RTX поддержка.",
    "Эпическая RPG от CD Projekt Red. Все DLC включены.",
    "Лучший вестерн в истории видеоигр. 4K Ultra.",
    "Криминальный мир Лос-Сантоса. Premium издание.",
    "Хардкорная action-RPG от FromSoftware.",
    "Магия Хогвартса ждёт. Полное погружение.",
    "Космическое приключение от Bethesda.",
    "Лучшая RPG 2023 года. 100+ часов геймплея.",
    "Новый сезон футбола. Ultimate Team режим.",
    "Шутер нового поколения. Мультиплеер.",
  ],
  4: [
    "Эргономичное офисное кресло с поддержкой поясницы.",
    "Классический обеденный стул из массива дуба.",
    "Геймерское кресло с RGB подсветкой и массажем.",
    "Высокий барный стул с регулировкой высоты.",
    "Компактный складной стул для путешествий.",
    "Расслабляющее кресло-качалка из ротанга.",
    "Безопасный детский стул с ремнями.",
    "Дизайнерский стул в скандинавском стиле.",
    "Практичный кухонный табурет с хранением.",
    "Статусное директорское кресло натуральная кожа.",
  ],
  5: [
    "Легендарный блокнот Moleskine. Сшитый переплёт.",
    "Деловой ежедневник с датами на 2024 год.",
    "Профессиональный скетчбук 200г бумага.",
    "Тетрадь формата A4, 96 листов, клетка.",
    "Еженедельный планировщик задач.",
    "Удобный блокнот на разъёмных кольцах.",
    "Карманная записная книжка для идей.",
    "Экологичный блокнот из крафт-бумаги.",
    "Личный дневник с замочком.",
    "Bullet journal блокнот в точку.",
  ],
  6: [
    "Флагман Apple с титановым корпусом. A17 Pro чип.",
    "Топовый Android смартфон. AI камеры.",
    "Чистый Android и лучшие камеры от Google.",
    "Камерофон с Leica оптикой. Snapdragon 8 Gen 3.",
    "Быстрая зарядка 100W. Hasselblad камеры.",
    "Оптимальный выбор в линейке Apple.",
    "Лучший по соотношению цена/качество.",
    "Флагман Huawei с 5G нового поколения.",
    "Игровой смартфон с охлаждением.",
    "Уникальный дизайн с подсветкой Glyph.",
  ],
  7: [
    "Культовый роман Булгакова. Подарочное издание.",
    "Антиутопия Джорджа Оруэлла. Классика жанра.",
    "Полное собрание о мальчике, который выжил.",
    "Эпопея Льва Толстого. Новое издание.",
    "Психологический роман Достоевского.",
    "Философская сказка Экзюпери. Иллюстрации автора.",
    "Трогательный роман Ремарка о дружбе.",
    "Бестселлер Пауло Коэльо о судьбе.",
    "Захватывающий роман Грегори Робертса.",
    "Шедевр магического реализма Маркеса.",
  ],
  8: [
    "Официальный мяч UEFA. Термосклейка панелей.",
    "Набор разборных гантелей 2х10кг. Хромированные.",
    "Скоростная скакалка с подшипниками.",
    "Нескользящий коврик для йоги 6мм.",
    "Профессиональная теннисная ракетка.",
    "Боксёрские перчатки 12oz. Натуральная кожа.",
    "Многофункциональный эспандер 5 уровней.",
    "Умный браслет с пульсометром и GPS.",
    "Сертифицированный велошлем размер M-L.",
    "Роликовые коньки с ABEC-7 подшипниками.",
  ],
  9: [
    "Интенсивное увлажнение 24 часа. Гиалуроновая кислота.",
    "Стойкая матовая помада классического красного оттенка.",
    "Палетка теней 12 оттенков нюдовой гаммы.",
    "Объёмная тушь с эффектом накладных ресниц.",
    "Витаминная сыворотка С для сияния кожи.",
    "Защитный крем для рук в холодное время.",
    "Кофейный скраб для гладкой кожи тела.",
    "Восстанавливающая маска для волос.",
    "Легендарный аромат Chanel. 50мл.",
    "Увлажняющий бальзам для губ с витамином Е.",
  ],
  10: [
    "Конструктор 500+ деталей. Городская станция.",
    "Коллекционная кукла в вечернем платье.",
    "Металлическая машинка масштаб 1:64.",
    "Гигантский плюшевый медведь 120см.",
    "Качественный пазл с красивым пейзажем.",
    "Классическая настольная экономическая игра.",
    "Робот-трансформер 2в1. Боевой режим.",
    "Оригинальный кубик Рубика 3x3.",
    "Набор пластилина 24 цвета с формочками.",
    "Квадрокоптер с камерой HD.",
  ],
};

// Get image URLs for each category
const getImagesForCategory = (categoryId: number): string[] => {
  const imageMap: Record<number, string[]> = {
    1: productImages.hats,
    2: productImages.fruits,
    3: productImages.games,
    4: productImages.chairs,
    5: productImages.notebooks,
    6: productImages.phones,
    7: productImages.books,
    8: productImages.sports,
    9: productImages.cosmetics,
    10: productImages.toys,
  };
  return imageMap[categoryId] || productImages.hats;
};

// Generate products for all categories
export const generateProducts = (): Product[] => {
  const products: Product[] = [];
  let productId = 1;

  for (let categoryId = 1; categoryId <= 10; categoryId++) {
    const names = productNames[categoryId];
    const descriptions = productDescriptions[categoryId];
    const images = getImagesForCategory(categoryId);

    for (let i = 0; i < 10; i++) {
      const basePrice = Math.floor(Math.random() * 9000) + 500;
      const hasDiscount = Math.random() < 0.2; // 20% chance of discount
      const discountPercent = hasDiscount ? Math.floor(Math.random() * 30) + 10 : 0;
      const price = hasDiscount
        ? Math.floor(basePrice * (1 - discountPercent / 100))
        : basePrice;

      products.push({
        id: productId++,
        name: names[i],
        categoryId,
        price,
        oldPrice: hasDiscount ? basePrice : undefined,
        imageUrl: images[i % images.length],
        description: descriptions[i],
        rating: Math.floor(Math.random() * 20 + 30) / 10, // 3.0 - 5.0
        reviewCount: Math.floor(Math.random() * 500) + 10,
      });
    }
  }

  return products;
};

export const products: Product[] = generateProducts();

// Promo slides for hero section
export const promoSlides: PromoSlide[] = [
  {
    id: 1,
    title: "Новые смартфоны",
    description: "iPhone 15 и Samsung Galaxy S24 уже в продаже",
    imageUrl: "/public/images/promoslides/01.jpg",
    buttonText: "Подробнее",
    link: "/category/6",
    gradient: "from-rose-500/80 to-orange-500/80",
  },
  {
    id: 2,
    title: "Геймерский рай",
    description: "Лучшие игры 2024 года по специальным ценам",
    imageUrl: "/public/images/promoslides/02.jpg",
    buttonText: "Играть",
    link: "/category/3",
    gradient: "from-green-500/80 to-teal-600/80",
  },
  {
    id: 3,
    title: "Для книголюбов",
    description: "Бестселлеры мировой литературы",
    imageUrl: "/public/images/promoslides/03.jpg",
    buttonText: "Читать",
    link: "/category/7",
    gradient: "from-amber-500/80 to-red-600/80",
  },
];

// Helper function to get category by ID
export const getCategoryById = (id: number): Category | undefined => {
  return categories.find((cat) => cat.id === id);
};

// Helper function to get products by category
export const getProductsByCategory = (categoryId: number): Product[] => {
  return products.filter((product) => product.categoryId === categoryId);
};

// Helper function to get product by ID
export const getProductById = (id: number): Product | undefined => {
  return products.find((product) => product.id === id);
};

// Get popular products (top rated)
export const getPopularProducts = (limit: number = 8): Product[] => {
  return [...products].sort((a, b) => b.rating - a.rating).slice(0, limit);
};

// Get products on sale
export const getSaleProducts = (limit: number = 8): Product[] => {
  return products.filter((p) => p.oldPrice).slice(0, limit);
};

// Get similar products (same category, excluding current)
export const getSimilarProducts = (
  productId: number,
  limit: number = 4
): Product[] => {
  const product = getProductById(productId);
  if (!product) return [];

  return products
    .filter((p) => p.categoryId === product.categoryId && p.id !== productId)
    .slice(0, limit);
};
