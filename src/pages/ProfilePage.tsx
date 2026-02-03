import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiOutlineUser, HiOutlineMail, HiOutlineLocationMarker, HiOutlineLogout, HiOutlineLockClosed, HiOutlineGift, HiOutlineCheck } from "react-icons/hi";
import { useStore } from "@/store/useStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const cities = [
  "Москва", "Санкт-Петербург", "Краснодар", "Новосибирск", 
  "Екатеринбург", "Казань", "Нижний Новгород", "Челябинск",
  "Самара", "Ростов-на-Дону", "Уфа", "Красноярск"
];

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user, setUser, openAuthModal, promoCodeUsed, applyPromoCode } = useStore();
  
  const [name, setName] = useState(user?.name || "");
  const [city, setCity] = useState(user?.city || "");
  const [promoCode, setPromoCode] = useState("");
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [passwords, setPasswords] = useState({ current: "", new: "", confirm: "" });

  // Redirect to login if not authenticated
  if (!user) {
    return (
      <div className="pt-24 pb-12 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto glass-card rounded-3xl p-8 text-center">
            <HiOutlineUser className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-xl font-bold mb-2">Войдите в аккаунт</h2>
            <p className="text-muted-foreground mb-6">
              Для доступа к личному кабинету необходимо авторизоваться
            </p>
            <Button 
              onClick={() => openAuthModal("login")}
              className="btn-primary w-full"
            >
              Войти
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const handleSaveProfile = () => {
    setUser({ ...user, name, city });
    toast.success("Профиль сохранён");
  };

  const handleActivatePromo = () => {
    if (!promoCode.trim()) {
      toast.error("Введите промокод");
      return;
    }
    const success = applyPromoCode(promoCode);
    if (success) {
      toast.success("Промокод успешно активирован! Скидка будет применена в корзине.");
      setPromoCode("");
    } else {
      toast.error("Промокод недействителен или уже был использован");
    }
  };

  const handleChangePassword = () => {
    if (passwords.new !== passwords.confirm) {
      toast.error("Пароли не совпадают");
      return;
    }
    if (passwords.new.length < 6) {
      toast.error("Пароль должен быть не менее 6 символов");
      return;
    }
    toast.success("Пароль успешно изменён");
    setShowPasswordForm(false);
    setPasswords({ current: "", new: "", confirm: "" });
  };

  const handleLogout = () => {
    setUser(null);
    toast.success("Вы вышли из аккаунта");
    navigate("/");
  };

  return (
    <div className="pt-24 pb-12 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Welcome Header */}
          <div className="glass-card rounded-3xl p-6 md:p-8">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-2xl md:text-3xl font-bold text-primary">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-bold">
                  Добро пожаловать, {user.name}!
                </h1>
                <p className="text-muted-foreground text-sm md:text-base">{user.email}</p>
              </div>
            </div>
          </div>

          {/* Profile Settings */}
          <div className="glass-card rounded-3xl p-6 md:p-8">
            <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <HiOutlineUser className="w-5 h-5" />
              Настройки профиля
            </h2>
            
            <div className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium mb-2">Имя</label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ваше имя"
                  className="glass-input"
                />
              </div>

              {/* City */}
              <div className="relative">
                <label className="block text-sm font-medium mb-2">
                  <HiOutlineLocationMarker className="inline w-4 h-4 mr-1" />
                  Город
                </label>
                <Input
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  onFocus={() => setShowCityDropdown(true)}
                  onBlur={() => setTimeout(() => setShowCityDropdown(false), 200)}
                  placeholder="Выберите город"
                  className="glass-input"
                />
                {showCityDropdown && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white/95 backdrop-blur-lg rounded-xl shadow-lg border border-gray-200 max-h-48 overflow-y-auto z-20">
                    {cities
                      .filter(c => c.toLowerCase().includes(city.toLowerCase()))
                      .map((c) => (
                        <button
                          key={c}
                          onMouseDown={() => {
                            setCity(c);
                            setShowCityDropdown(false);
                          }}
                          className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-800 text-sm"
                        >
                          {c}
                        </button>
                      ))}
                  </div>
                )}
              </div>

              {/* Promo Code */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  <HiOutlineGift className="inline w-4 h-4 mr-1" />
                  Промокод
                </label>
                {promoCodeUsed ? (
                  <div className="px-4 py-3 bg-success/10 rounded-xl border border-success/30 text-success">
                    ✓ Промокод уже активирован
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <Input
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                      placeholder="Введите промокод"
                      className="glass-input flex-1"
                    />
                    <Button 
                      onClick={handleActivatePromo}
                      className="btn-primary shrink-0"
                    >
                      <HiOutlineCheck className="w-4 h-4 mr-1" />
                      Активировать
                    </Button>
                  </div>
                )}
              </div>

              <Button 
                onClick={handleSaveProfile}
                className="btn-primary w-full mt-4"
              >
                Сохранить изменения
              </Button>
            </div>
          </div>

          {/* Security */}
          <div className="glass-card rounded-3xl p-6 md:p-8">
            <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <HiOutlineLockClosed className="w-5 h-5" />
              Безопасность
            </h2>

            {!showPasswordForm ? (
              <Button 
                onClick={() => setShowPasswordForm(true)}
                variant="outline"
                className="w-full glass-button"
              >
                Сменить пароль
              </Button>
            ) : (
              <div className="space-y-4">
                <Input
                  type="password"
                  value={passwords.current}
                  onChange={(e) => setPasswords(p => ({ ...p, current: e.target.value }))}
                  placeholder="Текущий пароль"
                  className="glass-input"
                />
                <Input
                  type="password"
                  value={passwords.new}
                  onChange={(e) => setPasswords(p => ({ ...p, new: e.target.value }))}
                  placeholder="Новый пароль"
                  className="glass-input"
                />
                <Input
                  type="password"
                  value={passwords.confirm}
                  onChange={(e) => setPasswords(p => ({ ...p, confirm: e.target.value }))}
                  placeholder="Подтвердите пароль"
                  className="glass-input"
                />
                <div className="flex gap-2">
                  <Button 
                    onClick={() => setShowPasswordForm(false)}
                    variant="outline"
                    className="flex-1 glass-button"
                  >
                    Отмена
                  </Button>
                  <Button 
                    onClick={handleChangePassword}
                    className="btn-primary flex-1"
                  >
                    Сохранить
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Logout */}
          <Button 
            onClick={handleLogout}
            variant="destructive"
            className="w-full py-6 text-lg rounded-2xl"
          >
            <HiOutlineLogout className="w-5 h-5 mr-2" />
            Выйти из аккаунта
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
