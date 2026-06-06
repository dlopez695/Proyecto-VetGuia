import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Heart } from 'lucide-react';
import { AnimatedBackground } from './AnimatedBackground';

interface LoginProps {
  onLogin: () => void;
  onGuestAccess: () => void;
  onCreateAccount: () => void;
}

export function Login({ onLogin, onGuestAccess, onCreateAccount }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 flex flex-col relative">
      <AnimatedBackground />
      {/* Header con imagen */}
      <div className="relative h-48 overflow-hidden z-10">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1733783489145-f3d3ee7a9ccf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ZXRlcmluYXJ5JTIwY2FyZSUyMGRvZyUyMGNhdHxlbnwxfHx8fDE3NjExNjcyOTN8MA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Cuidado veterinario"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-purple-50" />
      </div>

      {/* Contenido */}
      <div className="flex-1 px-6 -mt-16 relative z-10">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-emerald-300 p-4 rounded-full mb-4 shadow-lg">
            <Heart className="size-12 text-emerald-700" fill="currentColor" />
          </div>
          <h1 className="text-slate-800 text-center mb-2">VetGuia</h1>
          <p className="text-slate-600 text-center">
            Primeros auxilios veterinarios siempre a tu alcance
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 mb-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-slate-700">
              Email o Usuario
            </Label>
            <Input
              id="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              className="bg-white border-slate-300 text-slate-800 placeholder:text-slate-400 h-14"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-slate-700">
              Contraseña
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="bg-white border-slate-300 text-slate-800 placeholder:text-slate-400 h-14"
            />
          </div>

          <Button
            type="submit"
            className="w-full h-14 bg-emerald-300 hover:bg-emerald-400 text-emerald-900"
          >
            Iniciar Sesión
          </Button>
        </form>

        {/* Botón de invitado destacado */}
        <Button
          onClick={onGuestAccess}
          variant="outline"
          className="w-full h-14 border-2 border-emerald-300 text-emerald-700 hover:bg-emerald-100 mb-4"
        >
          Continuar como Invitado
        </Button>

        <div className="text-center">
          <button 
            onClick={onCreateAccount}
            className="text-emerald-600 hover:text-emerald-700"
          >
            Crear Cuenta
          </button>
        </div>
      </div>
    </div>
  );
}