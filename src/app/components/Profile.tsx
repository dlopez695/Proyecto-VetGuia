import { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { AnimatedBackground } from './AnimatedBackground';
import { User, PawPrint, Plus, Edit2, Trash2, Save, X, Camera } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';

interface Pet {
  id: string;
  name: string;
  species: string;
  breed: string;
  age: string;
  weight: string;
  allergies: string;
  medications: string;
  vetName: string;
  vetPhone: string;
  notes: string;
  photo?: string;
}

interface UserData {
  name: string;
  email: string;
  phone: string;
  address: string;
}

export function Profile() {
  const [userData, setUserData] = useState<UserData>({
    name: '',
    email: '',
    phone: '',
    address: '',
  });
  const [pets, setPets] = useState<Pet[]>([]);
  const [isEditingUser, setIsEditingUser] = useState(false);
  const [editingPetId, setEditingPetId] = useState<string | null>(null);
  const [isAddingPet, setIsAddingPet] = useState(false);
  const [newPet, setNewPet] = useState<Omit<Pet, 'id'>>({
    name: '',
    species: '',
    breed: '',
    age: '',
    weight: '',
    allergies: '',
    medications: '',
    vetName: '',
    vetPhone: '',
    notes: '',
    photo: '',
  });

  // Cargar datos del localStorage
  useEffect(() => {
    const savedUserData = localStorage.getItem('userData');
    if (savedUserData) {
      setUserData(JSON.parse(savedUserData));
    }

    const savedPets = localStorage.getItem('pets');
    if (savedPets) {
      setPets(JSON.parse(savedPets));
    }
  }, []);

  // Guardar datos del usuario
  const saveUserData = () => {
    localStorage.setItem('userData', JSON.stringify(userData));
    setIsEditingUser(false);
  };

  // Agregar mascota
  const addPet = () => {
    if (newPet.name && newPet.species) {
      const pet: Pet = {
        ...newPet,
        id: Date.now().toString(),
      };
      const updatedPets = [...pets, pet];
      setPets(updatedPets);
      localStorage.setItem('pets', JSON.stringify(updatedPets));
      setNewPet({
        name: '',
        species: '',
        breed: '',
        age: '',
        weight: '',
        allergies: '',
        medications: '',
        vetName: '',
        vetPhone: '',
        notes: '',
        photo: '',
      });
      setIsAddingPet(false);
    }
  };

  // Eliminar mascota
  const deletePet = (id: string) => {
    const updatedPets = pets.filter((pet) => pet.id !== id);
    setPets(updatedPets);
    localStorage.setItem('pets', JSON.stringify(updatedPets));
  };

  // Actualizar mascota
  const updatePet = (id: string, updatedData: Partial<Pet>) => {
    const updatedPets = pets.map((pet) =>
      pet.id === id ? { ...pet, ...updatedData } : pet
    );
    setPets(updatedPets);
    localStorage.setItem('pets', JSON.stringify(updatedPets));
    setEditingPetId(null);
  };

  const getSpeciesEmoji = (species: string) => {
    switch (species.toLowerCase()) {
      case 'perro':
        return '🐕';
      case 'gato':
        return '🐈';
      case 'conejo':
        return '🐰';
      case 'ave':
        return '🦜';
      case 'reptil':
        return '🦎';
      default:
        return '🐾';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-teal-50 pb-24 relative">
      <AnimatedBackground />
      
      {/* Header */}
      <div className="bg-gradient-to-br from-emerald-300 to-teal-300 p-6 relative z-10">
        <div className="flex items-center gap-3 mb-2">
          <User className="size-8 text-emerald-900" />
          <h1 className="text-emerald-900">Mi Perfil</h1>
        </div>
        <p className="text-emerald-800">
          Información personal y datos de tus mascotas
        </p>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* Información del Usuario */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-slate-800">Información Personal</h2>
            {!isEditingUser && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditingUser(true)}
                className="border-emerald-300 text-emerald-700 hover:bg-emerald-50"
              >
                <Edit2 className="size-4 mr-2" />
                Editar
              </Button>
            )}
          </div>

          <Card className="bg-white border-slate-200 shadow-sm">
            <div className="p-5 space-y-4">
              {isEditingUser ? (
                <>
                  <div>
                    <Label htmlFor="name">Nombre Completo</Label>
                    <Input
                      id="name"
                      value={userData.name}
                      onChange={(e) =>
                        setUserData({ ...userData, name: e.target.value })
                      }
                      placeholder="Tu nombre"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Correo Electrónico</Label>
                    <Input
                      id="email"
                      type="email"
                      value={userData.email}
                      onChange={(e) =>
                        setUserData({ ...userData, email: e.target.value })
                      }
                      placeholder="tu@email.com"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Teléfono</Label>
                    <Input
                      id="phone"
                      value={userData.phone}
                      onChange={(e) =>
                        setUserData({ ...userData, phone: e.target.value })
                      }
                      placeholder="Número de teléfono"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="address">Dirección</Label>
                    <Input
                      id="address"
                      value={userData.address}
                      onChange={(e) =>
                        setUserData({ ...userData, address: e.target.value })
                      }
                      placeholder="Tu dirección"
                      className="mt-1"
                    />
                  </div>
                  <div className="flex gap-2 pt-2">
                    <Button
                      onClick={saveUserData}
                      className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white"
                    >
                      <Save className="size-4 mr-2" />
                      Guardar
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setIsEditingUser(false)}
                      className="flex-1"
                    >
                      <X className="size-4 mr-2" />
                      Cancelar
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  {userData.name && (
                    <div>
                      <p className="text-slate-600">Nombre</p>
                      <p className="text-slate-800">{userData.name}</p>
                    </div>
                  )}
                  {userData.email && (
                    <div>
                      <p className="text-slate-600">Email</p>
                      <p className="text-slate-800">{userData.email}</p>
                    </div>
                  )}
                  {userData.phone && (
                    <div>
                      <p className="text-slate-600">Teléfono</p>
                      <p className="text-slate-800">{userData.phone}</p>
                    </div>
                  )}
                  {userData.address && (
                    <div>
                      <p className="text-slate-600">Dirección</p>
                      <p className="text-slate-800">{userData.address}</p>
                    </div>
                  )}
                  {!userData.name && !userData.email && !userData.phone && !userData.address && (
                    <p className="text-slate-500 text-center py-4">
                      No has agregado información personal. Haz clic en "Editar" para comenzar.
                    </p>
                  )}
                </>
              )}
            </div>
          </Card>
        </div>

        {/* Mascotas */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-slate-800">Mis Mascotas</h2>
            <Dialog open={isAddingPet} onOpenChange={setIsAddingPet}>
              <DialogTrigger asChild>
                <Button
                  size="sm"
                  className="bg-teal-500 hover:bg-teal-600 text-white"
                >
                  <Plus className="size-4 mr-2" />
                  Agregar Mascota
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Agregar Nueva Mascota</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div>
                    <Label htmlFor="petName">Nombre *</Label>
                    <Input
                      id="petName"
                      value={newPet.name}
                      onChange={(e) =>
                        setNewPet({ ...newPet, name: e.target.value })
                      }
                      placeholder="Nombre de tu mascota"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="species">Especie *</Label>
                    <Select
                      value={newPet.species}
                      onValueChange={(value) =>
                        setNewPet({ ...newPet, species: value })
                      }
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Selecciona especie" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="perro">Perro</SelectItem>
                        <SelectItem value="gato">Gato</SelectItem>
                        <SelectItem value="conejo">Conejo</SelectItem>
                        <SelectItem value="ave">Ave</SelectItem>
                        <SelectItem value="reptil">Reptil</SelectItem>
                        <SelectItem value="otro">Otro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="breed">Raza</Label>
                    <Input
                      id="breed"
                      value={newPet.breed}
                      onChange={(e) =>
                        setNewPet({ ...newPet, breed: e.target.value })
                      }
                      placeholder="Raza o tipo"
                      className="mt-1"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="age">Edad</Label>
                      <Input
                        id="age"
                        value={newPet.age}
                        onChange={(e) =>
                          setNewPet({ ...newPet, age: e.target.value })
                        }
                        placeholder="Ej: 3 años"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="weight">Peso</Label>
                      <Input
                        id="weight"
                        value={newPet.weight}
                        onChange={(e) =>
                          setNewPet({ ...newPet, weight: e.target.value })
                        }
                        placeholder="Ej: 15 kg"
                        className="mt-1"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="allergies">Alergias</Label>
                    <Input
                      id="allergies"
                      value={newPet.allergies}
                      onChange={(e) =>
                        setNewPet({ ...newPet, allergies: e.target.value })
                      }
                      placeholder="Alergias conocidas"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="medications">Medicamentos</Label>
                    <Input
                      id="medications"
                      value={newPet.medications}
                      onChange={(e) =>
                        setNewPet({ ...newPet, medications: e.target.value })
                      }
                      placeholder="Medicamentos actuales"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="vetName">Veterinario</Label>
                    <Input
                      id="vetName"
                      value={newPet.vetName}
                      onChange={(e) =>
                        setNewPet({ ...newPet, vetName: e.target.value })
                      }
                      placeholder="Nombre del veterinario"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="vetPhone">Teléfono del Veterinario</Label>
                    <Input
                      id="vetPhone"
                      value={newPet.vetPhone}
                      onChange={(e) =>
                        setNewPet({ ...newPet, vetPhone: e.target.value })
                      }
                      placeholder="Número de emergencia"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="notes">Notas Adicionales</Label>
                    <Textarea
                      id="notes"
                      value={newPet.notes}
                      onChange={(e) =>
                        setNewPet({ ...newPet, notes: e.target.value })
                      }
                      placeholder="Información adicional importante"
                      className="mt-1"
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="photo">Foto de la Mascota</Label>
                    <Input
                      id="photo"
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            setNewPet({ ...newPet, photo: reader.result as string });
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                      className="mt-1"
                    />
                  </div>
                  <Button
                    onClick={addPet}
                    disabled={!newPet.name || !newPet.species}
                    className="w-full bg-teal-500 hover:bg-teal-600 text-white"
                  >
                    <Save className="size-4 mr-2" />
                    Guardar Mascota
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {pets.length === 0 ? (
            <Card className="bg-white border-slate-200 shadow-sm">
              <div className="p-8 text-center">
                <PawPrint className="size-12 text-slate-300 mx-auto mb-3" />
                <p className="text-slate-500 mb-4">
                  No has agregado ninguna mascota todavía
                </p>
                <Button
                  onClick={() => setIsAddingPet(true)}
                  className="bg-teal-500 hover:bg-teal-600 text-white"
                >
                  <Plus className="size-4 mr-2" />
                  Agregar Mi Primera Mascota
                </Button>
              </div>
            </Card>
          ) : (
            <div className="space-y-4">
              {pets.map((pet) => (
                <Card key={pet.id} className="bg-white border-slate-200 shadow-sm">
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        {pet.photo ? (
                          <img
                            src={pet.photo}
                            alt={`Foto de ${pet.name}`}
                            className="size-16 rounded-full object-cover border-2 border-teal-300"
                          />
                        ) : (
                          <div className="text-4xl">{getSpeciesEmoji(pet.species)}</div>
                        )}
                        <div>
                          <h3 className="text-slate-800">{pet.name}</h3>
                          <div className="flex gap-2 mt-1">
                            <Badge
                              variant="outline"
                              className="bg-teal-100 text-teal-700 border-teal-300"
                            >
                              {pet.species}
                            </Badge>
                            {pet.breed && (
                              <Badge variant="outline" className="text-slate-600">
                                {pet.breed}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-slate-300"
                            >
                              <Edit2 className="size-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle>Editar {pet.name}</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                              <div>
                                <Label>Nombre</Label>
                                <Input
                                  defaultValue={pet.name}
                                  onChange={(e) =>
                                    updatePet(pet.id, { name: e.target.value })
                                  }
                                  className="mt-1"
                                />
                              </div>
                              <div>
                                <Label>Raza</Label>
                                <Input
                                  defaultValue={pet.breed}
                                  onChange={(e) =>
                                    updatePet(pet.id, { breed: e.target.value })
                                  }
                                  className="mt-1"
                                />
                              </div>
                              <div className="grid grid-cols-2 gap-3">
                                <div>
                                  <Label>Edad</Label>
                                  <Input
                                    defaultValue={pet.age}
                                    onChange={(e) =>
                                      updatePet(pet.id, { age: e.target.value })
                                    }
                                    className="mt-1"
                                  />
                                </div>
                                <div>
                                  <Label>Peso</Label>
                                  <Input
                                    defaultValue={pet.weight}
                                    onChange={(e) =>
                                      updatePet(pet.id, { weight: e.target.value })
                                    }
                                    className="mt-1"
                                  />
                                </div>
                              </div>
                              <div>
                                <Label>Alergias</Label>
                                <Input
                                  defaultValue={pet.allergies}
                                  onChange={(e) =>
                                    updatePet(pet.id, { allergies: e.target.value })
                                  }
                                  className="mt-1"
                                />
                              </div>
                              <div>
                                <Label>Medicamentos</Label>
                                <Input
                                  defaultValue={pet.medications}
                                  onChange={(e) =>
                                    updatePet(pet.id, { medications: e.target.value })
                                  }
                                  className="mt-1"
                                />
                              </div>
                              <div>
                                <Label>Veterinario</Label>
                                <Input
                                  defaultValue={pet.vetName}
                                  onChange={(e) =>
                                    updatePet(pet.id, { vetName: e.target.value })
                                  }
                                  className="mt-1"
                                />
                              </div>
                              <div>
                                <Label>Teléfono del Veterinario</Label>
                                <Input
                                  defaultValue={pet.vetPhone}
                                  onChange={(e) =>
                                    updatePet(pet.id, { vetPhone: e.target.value })
                                  }
                                  className="mt-1"
                                />
                              </div>
                              <div>
                                <Label>Notas</Label>
                                <Textarea
                                  defaultValue={pet.notes}
                                  onChange={(e) =>
                                    updatePet(pet.id, { notes: e.target.value })
                                  }
                                  className="mt-1"
                                  rows={3}
                                />
                              </div>
                              <div>
                                <Label>Foto de la Mascota</Label>
                                <Input
                                  type="file"
                                  accept="image/*"
                                  onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                      const reader = new FileReader();
                                      reader.onloadend = () => {
                                        updatePet(pet.id, { photo: reader.result as string });
                                      };
                                      reader.readAsDataURL(file);
                                    }
                                  }}
                                  className="mt-1"
                                />
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => deletePet(pet.id)}
                          className="border-red-300 text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      {pet.age && (
                        <div>
                          <p className="text-slate-600">Edad</p>
                          <p className="text-slate-800">{pet.age}</p>
                        </div>
                      )}
                      {pet.weight && (
                        <div>
                          <p className="text-slate-600">Peso</p>
                          <p className="text-slate-800">{pet.weight}</p>
                        </div>
                      )}
                      {pet.allergies && (
                        <div className="col-span-2">
                          <p className="text-slate-600">Alergias</p>
                          <p className="text-slate-800">{pet.allergies}</p>
                        </div>
                      )}
                      {pet.medications && (
                        <div className="col-span-2">
                          <p className="text-slate-600">Medicamentos</p>
                          <p className="text-slate-800">{pet.medications}</p>
                        </div>
                      )}
                      {pet.vetName && (
                        <div className="col-span-2">
                          <p className="text-slate-600">Veterinario</p>
                          <p className="text-slate-800">{pet.vetName}</p>
                          {pet.vetPhone && (
                            <p className="text-teal-600">{pet.vetPhone}</p>
                          )}
                        </div>
                      )}
                      {pet.notes && (
                        <div className="col-span-2">
                          <p className="text-slate-600">Notas</p>
                          <p className="text-slate-800">{pet.notes}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Información adicional */}
        <Card className="bg-amber-100 border-amber-300">
          <div className="p-4">
            <p className="text-amber-800">
              <strong>💡 Consejo:</strong> Mantén actualizada la información de tus mascotas, 
              especialmente los datos del veterinario y medicamentos. Esta información será 
              muy útil en caso de emergencia.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}