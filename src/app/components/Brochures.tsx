import React, { useState } from 'react';
import { Download, FileText, Search, Upload, Eye, X, Filter, BookOpen } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Alert, AlertDescription } from './ui/alert';
import { AnimatedBackground } from './AnimatedBackground';
import BrochureViewer from './BrochureViewer';

interface Brochure {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  fileSize: string;
  pages: number;
  downloadCount: number;
}

const categories = [
  { id: 'all', name: 'Todos', color: 'bg-gray-100 text-gray-700' },
  { id: 'salud', name: 'Salud General', color: 'bg-green-100 text-green-700' },
  { id: 'nutricion', name: 'Nutrición', color: 'bg-orange-100 text-orange-700' },
  { id: 'prevencion', name: 'Prevención', color: 'bg-blue-100 text-blue-700' },
  { id: 'emergencias', name: 'Emergencias', color: 'bg-red-100 text-red-700' },
  { id: 'cuidado', name: 'Cuidado Diario', color: 'bg-purple-100 text-purple-700' },
];

const brochures: Brochure[] = [
  {
    id: '1',
    title: 'Guía Básica de Salud Veterinaria',
    description: 'Aprende los fundamentos del cuidado de salud para tu mascota',
    category: 'salud',
    image: 'https://images.unsplash.com/photo-1759164955427-14ca448a839d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ZXRlcmluYXJ5JTIwcGV0JTIwaGVhbHRoJTIwY2FyZXxlbnwxfHx8fDE3NjIwMjc4MzZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    fileSize: '2.3 MB',
    pages: 12,
    downloadCount: 1456,
  },
  {
    id: '2',
    title: 'Nutrición Adecuada para Mascotas',
    description: 'Alimentación balanceada según edad y tamaño de tu mascota',
    category: 'nutricion',
    image: 'https://images.unsplash.com/photo-1761764777062-cae8dfd807e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXQlMjBudXRyaXRpb24lMjBmb29kfGVufDF8fHx8MTc2MTk4OTA1MXww&ixlib=rb-4.1.0&q=80&w=1080',
    fileSize: '1.8 MB',
    pages: 8,
    downloadCount: 2103,
  },
  {
    id: '3',
    title: 'Calendario de Vacunación',
    description: 'Programa completo de vacunas para perros y gatos',
    category: 'prevencion',
    image: 'https://images.unsplash.com/photo-1761203429504-56ece2d6eeb6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXQlMjB2YWNjaW5hdGlvbiUyMHZldGVyaW5hcnl8ZW58MXx8fHwxNzYyMDI3ODM3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    fileSize: '1.2 MB',
    pages: 6,
    downloadCount: 1872,
  },
  {
    id: '4',
    title: 'Cuidado Dental en Mascotas',
    description: 'Cómo mantener los dientes de tu mascota saludables',
    category: 'cuidado',
    image: 'https://images.unsplash.com/photo-1694371351705-de61b17774cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb2clMjB0ZWV0aCUyMGRlbnRhbCUyMGNhcmV8ZW58MXx8fHwxNzYyMDI3ODM3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    fileSize: '1.5 MB',
    pages: 7,
    downloadCount: 987,
  },
  {
    id: '5',
    title: 'Prevención de Parásitos',
    description: 'Guía completa sobre pulgas, garrapatas y parásitos internos',
    category: 'prevencion',
    image: 'https://images.unsplash.com/photo-1716275695521-9402bec08236?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXQlMjBwYXJhc2l0ZSUyMHByZXZlbnRpb258ZW58MXx8fHwxNzYyMDI3ODM3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    fileSize: '2.1 MB',
    pages: 10,
    downloadCount: 1543,
  },
  {
    id: '6',
    title: 'Primeros Auxilios de Emergencia',
    description: 'Qué hacer en situaciones críticas antes de llegar al veterinario',
    category: 'emergencias',
    image: 'https://images.unsplash.com/photo-1733376080833-04e3623f8f52?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb2clMjBjYXQlMjBlbWVyZ2VuY3klMjBjYXJlfGVufDF8fHx8MTc2MjAyNzgzOHww&ixlib=rb-4.1.0&q=80&w=1080',
    fileSize: '3.2 MB',
    pages: 16,
    downloadCount: 2845,
  },
];

export default function Brochures() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedBrochure, setSelectedBrochure] = useState<Brochure | null>(null);
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const [downloadAlert, setDownloadAlert] = useState(false);
  const [downloadedBrochure, setDownloadedBrochure] = useState<string>('');
  const [viewingBrochureId, setViewingBrochureId] = useState<string | null>(null);

  const filteredBrochures = brochures.filter((brochure) => {
    const matchesSearch = brochure.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          brochure.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || brochure.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDownload = (brochure: Brochure, format: 'pdf' | 'image') => {
    setDownloadedBrochure(`${brochure.title} (${format.toUpperCase()})`);
    setDownloadAlert(true);
    setTimeout(() => setDownloadAlert(false), 3000);
  };

  const handleView = (brochure: Brochure) => {
    setViewingBrochureId(brochure.id);
  };

  const handleReadBrochure = (brochure: Brochure) => {
    setViewingBrochureId(brochure.id);
  };

  return (
    <div className="min-h-screen pb-20 relative overflow-hidden">
      <AnimatedBackground />
      
      <div className="relative z-10 px-4 pt-6 pb-6">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-gradient-to-br from-[#AEE5C9] to-[#8FD4B3] p-3 rounded-2xl">
              <FileText className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-[#2C5F2D]">Folletos Informativos</h1>
              <p className="text-sm text-gray-600">Aprende sobre el cuidado de tu mascota</p>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-5 bg-white rounded-2xl shadow-sm p-1.5">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Buscar folleto..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 py-6 border-0 bg-[#F6F6F6] rounded-xl"
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Filter className="w-4 h-4 text-gray-600" />
            <span className="text-sm text-gray-600">Categorías</span>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((category) => (
              <Badge
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`cursor-pointer px-4 py-2 whitespace-nowrap transition-all ${
                  selectedCategory === category.id
                    ? 'bg-[#AEE5C9] text-[#2C5F2D] border-[#AEE5C9]'
                    : category.color
                }`}
              >
                {category.name}
              </Badge>
            ))}
          </div>
        </div>

        {/* Download Alert */}
        {downloadAlert && (
          <Alert className="mb-4 bg-[#AEE5C9] border-[#8FD4B3] text-[#2C5F2D]">
            <Download className="h-4 w-4" />
            <AlertDescription>
              ¡Descarga iniciada! {downloadedBrochure}
            </AlertDescription>
          </Alert>
        )}

        {/* Brochures Grid */}
        <div className="grid grid-cols-1 gap-4 mb-6">
          {filteredBrochures.map((brochure) => (
            <Card
              key={brochure.id}
              className="overflow-hidden bg-white rounded-2xl shadow-md border-0 hover:shadow-lg transition-shadow"
            >
              {/* Image */}
              <div className="relative h-40 overflow-hidden bg-gradient-to-br from-[#FFF6E8] to-[#F6F6F6]">
                <img
                  src={brochure.image}
                  alt={brochure.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2">
                  <Badge className="bg-white/90 text-gray-700 backdrop-blur-sm">
                    {brochure.pages} páginas
                  </Badge>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <div className="mb-2">
                  <Badge className={categories.find(c => c.id === brochure.category)?.color}>
                    {categories.find(c => c.id === brochure.category)?.name}
                  </Badge>
                </div>
                
                <h3 className="text-[#2C5F2D] mb-2">{brochure.title}</h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {brochure.description}
                </p>

                {/* Stats */}
                <div className="flex items-center gap-4 mb-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <Download className="w-3 h-3" />
                    {brochure.downloadCount.toLocaleString()} descargas
                  </span>
                  <span>{brochure.fileSize}</span>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button
                    onClick={() => handleReadBrochure(brochure)}
                    className="flex-1 bg-gradient-to-r from-[#AEE5C9] to-[#8FD4B3] text-white hover:opacity-90"
                  >
                    <BookOpen className="w-4 h-4 mr-2" />
                    Leer Guía
                  </Button>
                  <Button
                    onClick={() => handleDownload(brochure, 'pdf')}
                    className="flex-1 bg-white border-2 border-[#AEE5C9] text-[#2C5F2D] hover:bg-[#F6F6F6]"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Descargar
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredBrochures.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-gray-600 mb-2">No se encontraron folletos</h3>
            <p className="text-sm text-gray-500">Intenta con otra búsqueda o categoría</p>
          </div>
        )}

        {/* Upload Button (Admin) */}
        <Button
          onClick={() => setShowUploadDialog(true)}
          className="fixed bottom-24 right-4 z-20 w-14 h-14 rounded-full bg-gradient-to-br from-[#AEE5C9] to-[#8FD4B3] text-white shadow-lg hover:shadow-xl transition-all p-0"
        >
          <Upload className="w-6 h-6" />
        </Button>
      </div>

      {/* Brochure Viewer */}
      {viewingBrochureId && (
        <BrochureViewer
          brochureId={viewingBrochureId}
          onClose={() => setViewingBrochureId(null)}
        />
      )}

      {/* Upload Dialog */}
      <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
        <DialogContent className="max-w-md mx-4 rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-[#2C5F2D]">Subir Nuevo Folleto</DialogTitle>
            <DialogDescription>
              Función disponible solo para administradores
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="border-2 border-dashed border-[#AEE5C9] rounded-xl p-8 text-center bg-[#FFF6E8]">
              <Upload className="w-12 h-12 text-[#AEE5C9] mx-auto mb-3" />
              <p className="text-sm text-gray-600 mb-2">
                Arrastra un archivo o haz clic para seleccionar
              </p>
              <p className="text-xs text-gray-500">PDF, PNG, JPG (máx. 10MB)</p>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-sm text-gray-600 mb-1 block">Título del folleto</label>
                <Input placeholder="Ej: Guía de Primeros Auxilios" className="rounded-lg" />
              </div>
              <div>
                <label className="text-sm text-gray-600 mb-1 block">Descripción</label>
                <Input placeholder="Breve descripción..." className="rounded-lg" />
              </div>
              <div>
                <label className="text-sm text-gray-600 mb-1 block">Categoría</label>
                <select className="w-full p-2 border rounded-lg bg-white text-gray-700">
                  <option>Seleccionar categoría</option>
                  {categories.slice(1).map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <Button
                onClick={() => setShowUploadDialog(false)}
                className="flex-1 bg-white border-2 border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Cancelar
              </Button>
              <Button
                onClick={() => {
                  setShowUploadDialog(false);
                  setDownloadedBrochure('Nuevo folleto subido exitosamente');
                  setDownloadAlert(true);
                  setTimeout(() => setDownloadAlert(false), 3000);
                }}
                className="flex-1 bg-gradient-to-r from-[#AEE5C9] to-[#8FD4B3] text-white hover:opacity-90"
              >
                <Upload className="w-4 h-4 mr-2" />
                Subir Folleto
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
