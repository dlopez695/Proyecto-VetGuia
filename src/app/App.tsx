import { useState } from 'react';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { Home } from './components/Home';
import { Emergencies } from './components/Emergencies';
import { EmergencyDetail } from './components/EmergencyDetail';
import { Guides } from './components/Guides';
import { GuideDetail } from './components/GuideDetail';
import Brochures from './components/Brochures';
import { RemoteAssistance } from './components/RemoteAssistance';
import { FirstAidKit } from './components/FirstAidKit';
import { Education } from './components/Education';
import { ArticleDetail } from './components/ArticleDetail';
import { Profile } from './components/Profile';
import { BottomNav } from './components/BottomNav';
import { Button } from './components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Toaster } from './components/ui/sonner';

type Screen = 
  | 'login'
  | 'register'
  | 'home' 
  | 'emergencies' 
  | 'emergency-detail' 
  | 'guides' 
  | 'guide-detail'
  | 'brochures'
  | 'assistance' 
  | 'kit' 
  | 'education'
  | 'article-detail'
  | 'profile';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');
  const [selectedEmergency, setSelectedEmergency] = useState<string | null>(null);
  const [selectedGuide, setSelectedGuide] = useState<string | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentScreen('home');
  };

  const handleGuestAccess = () => {
    setCurrentScreen('home');
  };

  const handleCreateAccount = () => {
    setCurrentScreen('register');
  };

  const handleRegister = () => {
    setIsLoggedIn(true);
    setCurrentScreen('home');
  };

  const handleBackToLogin = () => {
    setCurrentScreen('login');
  };

  const handleNavigate = (section: string) => {
    setCurrentScreen(section as Screen);
    setSelectedEmergency(null);
    setSelectedGuide(null);
    setSelectedArticle(null);
  };

  const handleSelectEmergency = (emergencyId: string) => {
    setSelectedEmergency(emergencyId);
    setCurrentScreen('emergency-detail');
  };

  const handleSelectGuide = (guideId: string) => {
    setSelectedGuide(guideId);
    setCurrentScreen('guide-detail');
  };

  const handleSelectArticle = (articleId: string) => {
    setSelectedArticle(articleId);
    setCurrentScreen('article-detail');
  };

  const handleBack = () => {
    if (currentScreen === 'emergency-detail') {
      setCurrentScreen('emergencies');
      setSelectedEmergency(null);
    } else if (currentScreen === 'guide-detail') {
      setCurrentScreen('guides');
      setSelectedGuide(null);
    } else if (currentScreen === 'article-detail') {
      setCurrentScreen('education');
      setSelectedArticle(null);
    } else {
      setCurrentScreen('home');
    }
  };

  const showBottomNav = 
    currentScreen !== 'login' &&
    currentScreen !== 'register' &&
    currentScreen !== 'emergency-detail' &&
    currentScreen !== 'guide-detail' &&
    currentScreen !== 'article-detail';
    
  const showBackButton = currentScreen !== 'login' && currentScreen !== 'register' && currentScreen !== 'home';

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50">
      <Toaster position="top-center" />
      {/* Mobile-first container */}
      <div className="max-w-md mx-auto min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 relative">
        {/* Back Button */}
        {showBackButton && (
          <div className="fixed top-0 left-0 right-0 max-w-md mx-auto bg-white/95 backdrop-blur-sm z-40 border-b border-slate-200 shadow-sm">
            <div className="p-3">
              <Button
                onClick={handleBack}
                variant="ghost"
                className="text-slate-700 hover:bg-slate-100 h-10"
              >
                <ArrowLeft className="size-5 mr-2" />
                Volver
              </Button>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className={showBackButton ? 'pt-14' : ''}>
          {currentScreen === 'login' && (
            <Login 
              onLogin={handleLogin} 
              onGuestAccess={handleGuestAccess}
              onCreateAccount={handleCreateAccount}
            />
          )}

          {currentScreen === 'register' && (
            <Register 
              onRegister={handleRegister}
              onBackToLogin={handleBackToLogin}
            />
          )}
          
          {currentScreen === 'home' && (
            <Home onNavigate={handleNavigate} />
          )}
          
          {currentScreen === 'emergencies' && (
            <Emergencies onSelectEmergency={handleSelectEmergency} />
          )}
          
          {currentScreen === 'emergency-detail' && selectedEmergency && (
            <EmergencyDetail emergencyId={selectedEmergency} />
          )}
          
          {currentScreen === 'guides' && (
            <Guides onSelectGuide={handleSelectGuide} />
          )}
          
          {currentScreen === 'guide-detail' && selectedGuide && (
            <GuideDetail guideId={selectedGuide} />
          )}

          {currentScreen === 'brochures' && <Brochures />}
          
          {currentScreen === 'assistance' && <RemoteAssistance />}
          
          {currentScreen === 'kit' && <FirstAidKit />}
          
          {currentScreen === 'education' && (
            <Education onSelectArticle={handleSelectArticle} />
          )}
          
          {currentScreen === 'article-detail' && selectedArticle && (
            <ArticleDetail articleId={selectedArticle} />
          )}
          
          {currentScreen === 'profile' && <Profile />}
        </div>

        {/* Bottom Navigation */}
        {showBottomNav && (
          <BottomNav
            activeSection={currentScreen}
            onNavigate={handleNavigate}
          />
        )}
      </div>
    </div>
  );
}