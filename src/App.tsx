import { useState } from 'react';
import { Header } from './components/Header';
import { PlantCard } from './components/PlantCard';
import { AddPlantDialog } from './components/AddPlantDialog';
import { Login } from './components/Login';
import { SignUp } from './components/SignUp';
import { ChatBox } from './components/ChatBox';
import type { PlantData, PlantTemplate } from './types';
import { Power } from 'lucide-react';
import { Weather } from './components/Weather';

// Mock data - Replace with actual API calls later
const mockPlants: PlantData[] = [
  {
    id: '1',
    name: 'Tomato',
    type: 'fruit',
    waterLevel: 75,
    humidity: 65,
    soilMoisture: 80,
    uvExposure: 90,
    temperature: 25,
    healthStatus: 'good',
    lastWatered: new Date(),
    imageUrl: 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&q=80',
    pumpStatus: 'off' as const,
  },
  {
    id: '2',
    name: 'Mint',
    type: 'Herb',
    waterLevel: 45,
    humidity: 70,
    soilMoisture: 60,
    uvExposure: 85,
    temperature: 23,
    healthStatus: 'warning',
    lastWatered: new Date(),
    imageUrl: 'https://images.unsplash.com/photo-1628556270448-4d4e4148e1b7?auto=format&fit=crop&q=80'
  },
  {
    id: '3',
    name: 'Basil',
    type: 'Herb',
    waterLevel: 85,
    humidity: 75,
    soilMoisture: 70,
    uvExposure: 80,
    temperature: 22,
    healthStatus: 'good',
    lastWatered: new Date(),
    imageUrl: 'https://images.unsplash.com/photo-1618375569909-3c8616cf7733?auto=format&fit=crop&q=80'
  },
  {
    id: '4',
    name: 'Strawberry',
    type: 'Fruit',
    waterLevel: 55,
    humidity: 65,
    soilMoisture: 70,
    uvExposure: 88,
    temperature: 21,
    healthStatus: 'warning',
    lastWatered: new Date(),
    imageUrl: 'https://images.unsplash.com/photo-1543528176-61b239494933?auto=format&fit=crop&q=80'
  }
];



function App() {
  const [plants, setPlants] = useState<PlantData[]>(mockPlants);
  const [selectedPlant, setSelectedPlant] = useState<PlantData | null>(null);
  const [isAddPlantOpen, setIsAddPlantOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [username, setUsername] = useState<string>('');
  const [isGlobalPumpOn, setIsGlobalPumpOn] = useState(false);

  const handlePlantClick = (plant: PlantData) => {
    setSelectedPlant(plant);
  };

  const handleAddPlant = (template: PlantTemplate) => {
    const newPlant: PlantData = {
      id: Date.now().toString(),
      name: template.name,
      type: template.type,
      waterLevel: 100,
      humidity: 70,
      soilMoisture: 80,
      uvExposure: 85,
      temperature: 24,
      healthStatus: 'good',
      lastWatered: new Date(),
      imageUrl: template.imageUrl
    };

    setPlants(prev => [...prev, newPlant]);
    setIsAddPlantOpen(false);
  };

  const handleLogin = async (email: string, password: string) => {
    try {
      // Mock login - accept any credentials for now
      setUsername(email.split('@')[0]);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const handleSignUp = async (email: string, password: string, name: string) => {
    try {
      // Mock signup - accept any credentials for now
      setUsername(name);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setShowLogin(true);
    setUsername('');
  };

  const handleDeletePlant = (id: string) => {
    setPlants(prev => prev.filter(plant => plant.id !== id));
  };

  const handleDispense = async (id: string, amount: number) => {
    try {
      // Here you would typically call your API to trigger the water dispenser
      // For now, we'll just update the plant's water level
      setPlants(prev => prev.map(plant => {
        if (plant.id === id) {
          return {
            ...plant,
            waterLevel: Math.min(100, plant.waterLevel + (amount / 5)), // Rough calculation
            lastWatered: new Date()
          };
        }
        return plant;
      }));
    } catch (error) {
      console.error('Failed to dispense water:', error);
      throw error;
    }
  };

  const handlePumpToggle = async (id: string, status: 'on' | 'off') => {
    try {
      // Here you would typically call your API to control the actual pump
      setPlants(prev => prev.map(plant => {
        if (plant.id === id) {
          return {
            ...plant,
            pumpStatus: status
          };
        }
        return plant;
      }));
    } catch (error) {
      console.error('Failed to toggle pump:', error);
      throw error;
    }
  };

  const handleGlobalPumpToggle = async () => {
    try {
      const newStatus = !isGlobalPumpOn;
      // Here you would typically call your API to control the master pump
      setIsGlobalPumpOn(newStatus);
      // Update all plants' pump status
      setPlants(prev => prev.map(plant => ({
        ...plant,
        pumpStatus: newStatus ? 'on' : 'off'
      })));
    } catch (error) {
      console.error('Failed to toggle global pump:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {isAuthenticated ? (
        <>
          <Header username={username} onLogout={handleLogout} />
          <div className="fixed top-20 left-4 z-50">
            <Weather />
          </div>
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">My Plants</h2>
              <div className="flex items-center gap-4">
                <button
                  onClick={handleGlobalPumpToggle}
                  className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors duration-200 ${
                    isGlobalPumpOn
                      ? 'bg-green-500 text-white hover:bg-green-600'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  <Power className="h-5 w-5" />
                  {isGlobalPumpOn ? 'Pump On' : 'Pump Off'}
                </button>
                <button
                  onClick={() => setIsAddPlantOpen(true)}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Add New Plant
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {plants.map((plant) => (
                <PlantCard
                  key={plant.id}
                  plant={plant}
                  onClick={handlePlantClick}
                  onDelete={handleDeletePlant}
                  onDispense={handleDispense}
                  onPumpToggle={handlePumpToggle}
                />
              ))}
            </div>
          </main>
          <ChatBox />
          <AddPlantDialog
            isOpen={isAddPlantOpen}
            onClose={() => setIsAddPlantOpen(false)}
            onAddPlant={handleAddPlant}
          />
        </>
      ) : (
        <div className="min-h-screen bg-gray-50">
          {showLogin ? (
            <Login onLogin={handleLogin} onSwitchToSignUp={() => setShowLogin(false)} />
          ) : (
            <SignUp onSignUp={handleSignUp} onSwitchToLogin={() => setShowLogin(true)} />
          )}
        </div>
      )}
    </div>
  );
}

export default App;