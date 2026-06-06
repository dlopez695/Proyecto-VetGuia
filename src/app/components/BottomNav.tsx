import { AlertCircle, Book, Phone, Package, GraduationCap, User } from 'lucide-react';

interface BottomNavProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

export function BottomNav({ activeSection, onNavigate }: BottomNavProps) {
  const navItems = [
    { id: 'emergencies', icon: AlertCircle, label: 'SOS' },
    { id: 'brochures', icon: Book, label: 'Folletos' },
    { id: 'assistance', icon: Phone, label: 'Ayuda' },
    { id: 'kit', icon: Package, label: 'Botiquín' },
    { id: 'education', icon: GraduationCap, label: 'Aprende' },
    { id: 'profile', icon: User, label: 'Perfil' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 safe-area-bottom z-50 shadow-lg">
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center justify-center min-w-[60px] py-2 px-3 rounded-lg transition-colors ${
                isActive
                  ? 'text-emerald-600 bg-emerald-100'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <Icon
                className={`size-6 mb-1 ${
                  item.id === 'emergencies' && isActive ? 'text-rose-600' : ''
                }`}
              />
              <span className="text-xs">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}