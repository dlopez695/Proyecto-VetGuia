import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Heart, Check, AlertCircle } from 'lucide-react';
import { AnimatedBackground } from './AnimatedBackground';
import { Alert, AlertDescription } from './ui/alert';

interface RegisterProps {
  onRegister: () => void;
  onBackToLogin: () => void;
}

export function Register({ onRegister, onBackToLogin }: RegisterProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showSuccess, setShowSuccess] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es obligatorio';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El email es obligatorio';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!formData.password) {
      newErrors.password = 'La contraseña es obligatoria';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Mínimo 6 caracteres';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }

    if (formData.phone && !/^\d{8,}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Teléfono inválido (mínimo 8 dígitos)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setShowSuccess(true);
      setTimeout(() => {
        onRegister();
      }, 2000);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Limpiar error del campo cuando el usuario escribe
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 flex flex-col relative">
      <AnimatedBackground />
      
      {/* Header con imagen */}
      <div className="relative h-40 overflow-hidden z-10">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1733783489145-f3d3ee7a9ccf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ZXRlcmluYXJ5JTIwY2FyZSUyMGRvZyUyMGNhdHxlbnwxfHx8fDE3NjExNjcyOTN8MA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Cuidado veterinario"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-purple-50" />
      </div>

      {/* Contenido */}
      <div className="flex-1 px-6 -mt-12 relative z-10 pb-8">
        <div className="flex flex-col items-center mb-6">
          <div className="bg-emerald-300 p-3 rounded-full mb-3 shadow-lg">
            <Heart className="size-10 text-emerald-700" fill="currentColor" />
          </div>
          <h1 className="text-slate-800 text-center mb-1">Crear Cuenta</h1>
          <p className="text-slate-600 text-center text-sm">
            Únete a la comunidad VetGuia
          </p>
        </div>

        {/* Success Alert */}
        {showSuccess && (
          <Alert className="mb-4 bg-emerald-100 border-emerald-300 text-emerald-800">
            <Check className="h-4 w-4" />
            <AlertDescription>
              ¡Cuenta creada exitosamente! Redirigiendo...
            </AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 mb-4">
          {/* Nombre completo */}
          <div className="space-y-1.5">
            <Label htmlFor="name" className="text-slate-700">
              Nombre completo *
            </Label>
            <Input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="Juan Pérez"
              className={`bg-white border-slate-300 text-slate-800 placeholder:text-slate-400 h-12 ${
                errors.name ? 'border-red-500' : ''
              }`}
            />
            {errors.name && (
              <p className="text-xs text-red-600 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.name}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <Label htmlFor="email" className="text-slate-700">
              Email *
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="tu@email.com"
              className={`bg-white border-slate-300 text-slate-800 placeholder:text-slate-400 h-12 ${
                errors.email ? 'border-red-500' : ''
              }`}
            />
            {errors.email && (
              <p className="text-xs text-red-600 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.email}
              </p>
            )}
          </div>

          {/* Teléfono (opcional) */}
          <div className="space-y-1.5">
            <Label htmlFor="phone" className="text-slate-700">
              Teléfono (opcional)
            </Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              placeholder="320 123 45670 123 4567"
              className={`bg-white border-slate-300 text-slate-800 placeholder:text-slate-400 h-12 ${
                errors.phone ? 'border-red-500' : ''
              }`}
            />
            {errors.phone && (
              <p className="text-xs text-red-600 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.phone}
              </p>
            )}
          </div>

          {/* Contraseña */}
          <div className="space-y-1.5">
            <Label htmlFor="password" className="text-slate-700">
              Contraseña *
            </Label>
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              placeholder="••••••••"
              className={`bg-white border-slate-300 text-slate-800 placeholder:text-slate-400 h-12 ${
                errors.password ? 'border-red-500' : ''
              }`}
            />
            {errors.password && (
              <p className="text-xs text-red-600 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.password}
              </p>
            )}
          </div>

          {/* Confirmar contraseña */}
          <div className="space-y-1.5">
            <Label htmlFor="confirmPassword" className="text-slate-700">
              Confirmar contraseña *
            </Label>
            <Input
              id="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
              placeholder="••••••••"
              className={`bg-white border-slate-300 text-slate-800 placeholder:text-slate-400 h-12 ${
                errors.confirmPassword ? 'border-red-500' : ''
              }`}
            />
            {errors.confirmPassword && (
              <p className="text-xs text-red-600 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.confirmPassword}
              </p>
            )}
          </div>

          {/* Términos y condiciones */}
          <div className="bg-blue-50 p-3 rounded-lg">
            <p className="text-xs text-slate-600 text-center">
              Al crear una cuenta, aceptas nuestros Términos de Servicio y Política de Privacidad
            </p>
          </div>

          <Button
            type="submit"
            className="w-full h-12 bg-emerald-300 hover:bg-emerald-400 text-emerald-900"
            disabled={showSuccess}
          >
            {showSuccess ? 'Creando cuenta...' : 'Crear Cuenta'}
          </Button>
        </form>

        {/* Volver al login */}
        <div className="text-center">
          <button 
            onClick={onBackToLogin}
            className="text-emerald-600 hover:text-emerald-700"
          >
            ¿Ya tienes cuenta? Inicia sesión
          </button>
        </div>
      </div>
    </div>
  );
}