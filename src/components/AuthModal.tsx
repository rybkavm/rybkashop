import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { HiOutlineX, HiOutlineMail, HiOutlineLockClosed, HiOutlineUser } from "react-icons/hi";
import { useStore } from "@/store/useStore";
import { toast } from "@/hooks/use-toast";

const loginSchema = z.object({
  email: z.string().email("Введите корректный email"),
  password: z.string().min(6, "Пароль должен быть минимум 6 символов"),
});

const registerSchema = z
  .object({
    name: z.string().min(2, "Имя должно быть минимум 2 символа"),
    email: z.string().email("Введите корректный email"),
    password: z.string().min(6, "Пароль должен быть минимум 6 символов"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"],
  });

type LoginFormData = z.infer<typeof loginSchema>;
type RegisterFormData = z.infer<typeof registerSchema>;

// Shared input class with better placeholder contrast
const inputClassName = "glass-input w-full pl-10 pr-4 py-3 text-gray-900 placeholder:text-gray-500";

const AuthModal = () => {
  const { isAuthModalOpen, authModalMode, closeAuthModal, setUser, openAuthModal } =
    useStore();

  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const registerForm = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  // Close on escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeAuthModal();
    };
    if (isAuthModalOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isAuthModalOpen, closeAuthModal]);

  const onLogin = (data: LoginFormData) => {
    // Mock login
    setUser({
      id: "1",
      email: data.email,
      name: data.email.split("@")[0],
    });
    toast({
      title: "Добро пожаловать!",
      description: "Вы успешно вошли в систему",
    });
    closeAuthModal();
    loginForm.reset();
  };

  const onRegister = (data: RegisterFormData) => {
    // Mock registration
    setUser({
      id: "1",
      email: data.email,
      name: data.name,
    });
    toast({
      title: "Регистрация успешна!",
      description: "Добро пожаловать в RybkaShop",
    });
    closeAuthModal();
    registerForm.reset();
  };

  if (!isAuthModalOpen) return null;

  return (
    <div className="modal-overlay" onClick={closeAuthModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Close button */}
        <button
          onClick={closeAuthModal}
          className="absolute top-4 right-4 p-2 rounded-xl hover:bg-white/20 transition-colors"
          aria-label="Закрыть"
        >
          <HiOutlineX className="w-5 h-5" />
        </button>

        {/* Title */}
        <h2 className="text-2xl font-bold text-foreground mb-6">
          {authModalMode === "login" ? "Вход в аккаунт" : "Регистрация"}
        </h2>

        {/* Forms */}
        {authModalMode === "login" ? (
          <form onSubmit={loginForm.handleSubmit(onLogin)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  {...loginForm.register("email")}
                  className={inputClassName}
                  placeholder="email@example.com"
                />
                <HiOutlineMail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              </div>
              {loginForm.formState.errors.email && (
                <p className="text-destructive text-sm mt-1">
                  {loginForm.formState.errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Пароль
              </label>
              <div className="relative">
                <input
                  type="password"
                  {...loginForm.register("password")}
                  className={inputClassName}
                  placeholder="••••••••"
                />
                <HiOutlineLockClosed className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              </div>
              {loginForm.formState.errors.password && (
                <p className="text-destructive text-sm mt-1">
                  {loginForm.formState.errors.password.message}
                </p>
              )}
            </div>

            <button type="submit" className="btn-primary w-full mt-6">
              Войти
            </button>
          </form>
        ) : (
          <form onSubmit={registerForm.handleSubmit(onRegister)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Имя
              </label>
              <div className="relative">
                <input
                  type="text"
                  {...registerForm.register("name")}
                  className={inputClassName}
                  placeholder="Ваше имя"
                />
                <HiOutlineUser className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              </div>
              {registerForm.formState.errors.name && (
                <p className="text-destructive text-sm mt-1">
                  {registerForm.formState.errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  {...registerForm.register("email")}
                  className={inputClassName}
                  placeholder="email@example.com"
                />
                <HiOutlineMail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              </div>
              {registerForm.formState.errors.email && (
                <p className="text-destructive text-sm mt-1">
                  {registerForm.formState.errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Пароль
              </label>
              <div className="relative">
                <input
                  type="password"
                  {...registerForm.register("password")}
                  className={inputClassName}
                  placeholder="••••••••"
                />
                <HiOutlineLockClosed className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              </div>
              {registerForm.formState.errors.password && (
                <p className="text-destructive text-sm mt-1">
                  {registerForm.formState.errors.password.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Подтвердите пароль
              </label>
              <div className="relative">
                <input
                  type="password"
                  {...registerForm.register("confirmPassword")}
                  className={inputClassName}
                  placeholder="••••••••"
                />
                <HiOutlineLockClosed className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              </div>
              {registerForm.formState.errors.confirmPassword && (
                <p className="text-destructive text-sm mt-1">
                  {registerForm.formState.errors.confirmPassword.message}
                </p>
              )}
            </div>

            <button type="submit" className="btn-primary w-full mt-6">
              Зарегистрироваться
            </button>
          </form>
        )}

        {/* Switch mode */}
        <div className="mt-6 text-center">
          <p className="text-gray-700">
            {authModalMode === "login" ? (
              <>
                Нет аккаунта?{" "}
                <button
                  onClick={() => openAuthModal("register")}
                  className="text-primary hover:underline font-semibold"
                >
                  Зарегистрироваться
                </button>
              </>
            ) : (
              <>
                Уже есть аккаунт?{" "}
                <button
                  onClick={() => openAuthModal("login")}
                  className="text-primary hover:underline font-semibold"
                >
                  Войти
                </button>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
