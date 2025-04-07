import { useState, useEffect } from 'react';
import { X, Search, Sprout, Flower2, Trees as Tree, Leaf, Plane as Plant2, Flower, Cherry, Apple } from 'lucide-react';
import type { PlantTemplate } from '../types';

interface AddPlantDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAddPlant: (plant: PlantTemplate) => void;
}

const availablePlants: PlantTemplate[] = [
  // Vegetables
  {
    id: 'tomato',
    name: 'Tomato',
    type: 'Vegetable',
    imageUrl: 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&q=80',
    description: 'Easy to grow vegetable, perfect for beginners',
    careLevel: 'easy',
    wateringFrequency: 'Daily',
    sunlight: 'high',
    icon: 'sprout'
  },
  {
    id: 'cherry-tomato',
    name: 'Cherry Tomato',
    type: 'Vegetable',
    imageUrl: 'https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?auto=format&fit=crop&q=80',
    description: 'Small, sweet tomatoes ideal for containers',
    careLevel: 'easy',
    wateringFrequency: 'Daily',
    sunlight: 'high',
    icon: 'cherry'
  },
  {
    id: 'bell-pepper',
    name: 'Bell Pepper',
    type: 'Vegetable',
    imageUrl: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?auto=format&fit=crop&q=80',
    description: 'Colorful peppers rich in vitamins',
    careLevel: 'medium',
    wateringFrequency: 'Every 2-3 days',
    sunlight: 'high',
    icon: 'plant2'
  },
  {
    id: 'cucumber',
    name: 'Cucumber',
    type: 'Vegetable',
    imageUrl: 'https://images.unsplash.com/photo-1604977042946-1eecc30f269e?auto=format&fit=crop&q=80',
    description: 'Climbing vine vegetable',
    careLevel: 'medium',
    wateringFrequency: 'Daily',
    sunlight: 'high',
    icon: 'sprout'
  },
  {
    id: 'lettuce',
    name: 'Lettuce',
    type: 'Vegetable',
    imageUrl: 'https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?auto=format&fit=crop&q=80',
    description: 'Quick-growing leafy green',
    careLevel: 'easy',
    wateringFrequency: 'Every 2 days',
    sunlight: 'medium',
    icon: 'leaf'
  },
  {
    id: 'spinach',
    name: 'Spinach',
    type: 'Vegetable',
    imageUrl: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&q=80',
    description: 'Nutrient-rich leafy green',
    careLevel: 'easy',
    wateringFrequency: 'Every 2 days',
    sunlight: 'medium',
    icon: 'leaf'
  },
  {
    id: 'carrot',
    name: 'Carrot',
    type: 'Vegetable',
    imageUrl: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&q=80',
    description: 'Root vegetable rich in beta-carotene',
    careLevel: 'medium',
    wateringFrequency: 'Every 2-3 days',
    sunlight: 'high',
    icon: 'plant2'
  },
  {
    id: 'radish',
    name: 'Radish',
    type: 'Vegetable',
    imageUrl: 'https://images.unsplash.com/photo-1582284540020-8acbe03f4924?auto=format&fit=crop&q=80',
    description: 'Fast-growing root vegetable',
    careLevel: 'easy',
    wateringFrequency: 'Every 2 days',
    sunlight: 'medium',
    icon: 'sprout'
  },
  {
    id: 'green-beans',
    name: 'Green Beans',
    type: 'Vegetable',
    imageUrl: 'https://images.unsplash.com/photo-1567375698348-5d9d5ae99de0?auto=format&fit=crop&q=80',
    description: 'Climbing or bush variety beans',
    careLevel: 'medium',
    wateringFrequency: 'Every 2-3 days',
    sunlight: 'high',
    icon: 'plant2'
  },
  {
    id: 'peas',
    name: 'Peas',
    type: 'Vegetable',
    imageUrl: 'https://images.unsplash.com/photo-1587334207407-deb137a955ba?auto=format&fit=crop&q=80',
    description: 'Sweet climbing vegetable',
    careLevel: 'easy',
    wateringFrequency: 'Every 2-3 days',
    sunlight: 'medium',
    icon: 'sprout'
  },

  // Herbs
  {
    id: 'basil',
    name: 'Basil',
    type: 'Herb',
    imageUrl: 'https://images.unsplash.com/photo-1618375569909-3c8616cf7733?auto=format&fit=crop&q=80',
    description: 'Aromatic herb for Italian cuisine',
    careLevel: 'easy',
    wateringFrequency: 'Every 2 days',
    sunlight: 'high',
    icon: 'leaf'
  },
  {
    id: 'mint',
    name: 'Mint',
    type: 'Herb',
    imageUrl: 'https://images.unsplash.com/photo-1628556270448-4d4e4148e1b7?auto=format&fit=crop&q=80',
    description: 'Fast-growing aromatic herb',
    careLevel: 'easy',
    wateringFrequency: 'Every 2-3 days',
    sunlight: 'medium',
    icon: 'leaf'
  },
  {
    id: 'parsley',
    name: 'Parsley',
    type: 'Herb',
    imageUrl: 'https://images.unsplash.com/photo-1599682914858-5a025d33eda9?auto=format&fit=crop&q=80',
    description: 'Versatile culinary herb',
    careLevel: 'easy',
    wateringFrequency: 'Every 2 days',
    sunlight: 'medium',
    icon: 'leaf'
  },
  {
    id: 'cilantro',
    name: 'Cilantro',
    type: 'Herb',
    imageUrl: 'https://images.unsplash.com/photo-1611905633923-07c7c8a2f0c2?auto=format&fit=crop&q=80',
    description: 'Essential herb for Mexican cuisine',
    careLevel: 'medium',
    wateringFrequency: 'Every 2 days',
    sunlight: 'medium',
    icon: 'leaf'
  },
  {
    id: 'rosemary',
    name: 'Rosemary',
    type: 'Herb',
    imageUrl: 'https://images.unsplash.com/photo-1515586000433-45406d8e6662?auto=format&fit=crop&q=80',
    description: 'Aromatic Mediterranean herb',
    careLevel: 'medium',
    wateringFrequency: 'Every 3-4 days',
    sunlight: 'high',
    icon: 'tree'
  },
  {
    id: 'thyme',
    name: 'Thyme',
    type: 'Herb',
    imageUrl: 'https://images.unsplash.com/photo-1594547850256-76e6b58b6506?auto=format&fit=crop&q=80',
    description: 'Low-growing aromatic herb',
    careLevel: 'easy',
    wateringFrequency: 'Every 3-4 days',
    sunlight: 'high',
    icon: 'leaf'
  },
  {
    id: 'sage',
    name: 'Sage',
    type: 'Herb',
    imageUrl: 'https://images.unsplash.com/photo-1600831606133-c9bc61f5c456?auto=format&fit=crop&q=80',
    description: 'Medicinal and culinary herb',
    careLevel: 'medium',
    wateringFrequency: 'Every 3-4 days',
    sunlight: 'high',
    icon: 'leaf'
  },
  {
    id: 'oregano',
    name: 'Oregano',
    type: 'Herb',
    imageUrl: 'https://images.unsplash.com/photo-1594547850154-bdc37e6d5c66?auto=format&fit=crop&q=80',
    description: 'Mediterranean culinary herb',
    careLevel: 'easy',
    wateringFrequency: 'Every 3-4 days',
    sunlight: 'high',
    icon: 'leaf'
  },
  {
    id: 'chives',
    name: 'Chives',
    type: 'Herb',
    imageUrl: 'https://images.unsplash.com/photo-1582556825411-843e0b4b9c37?auto=format&fit=crop&q=80',
    description: 'Onion-flavored herb',
    careLevel: 'easy',
    wateringFrequency: 'Every 2-3 days',
    sunlight: 'medium',
    icon: 'sprout'
  },
  {
    id: 'dill',
    name: 'Dill',
    type: 'Herb',
    imageUrl: 'https://images.unsplash.com/photo-1596547865227-f5f9af33ef43?auto=format&fit=crop&q=80',
    description: 'Feathery herb for seasoning',
    careLevel: 'medium',
    wateringFrequency: 'Every 2-3 days',
    sunlight: 'high',
    icon: 'leaf'
  },

  // Fruits
  {
    id: 'strawberry',
    name: 'Strawberry',
    type: 'Fruit',
    imageUrl: 'https://images.unsplash.com/photo-1543528176-61b239494933?auto=format&fit=crop&q=80',
    description: 'Sweet berries for containers',
    careLevel: 'medium',
    wateringFrequency: 'Daily',
    sunlight: 'high',
    icon: 'cherry'
  },
  {
    id: 'blueberry',
    name: 'Blueberry',
    type: 'Fruit',
    imageUrl: 'https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&q=80',
    description: 'Antioxidant-rich berries',
    careLevel: 'hard',
    wateringFrequency: 'Every 2-3 days',
    sunlight: 'high',
    icon: 'cherry'
  },
  {
    id: 'raspberry',
    name: 'Raspberry',
    type: 'Fruit',
    imageUrl: 'https://images.unsplash.com/photo-1577069861033-55d04cec4ef5?auto=format&fit=crop&q=80',
    description: 'Sweet summer berries',
    careLevel: 'medium',
    wateringFrequency: 'Every 2-3 days',
    sunlight: 'high',
    icon: 'cherry'
  },
  {
    id: 'dwarf-lemon',
    name: 'Dwarf Lemon',
    type: 'Fruit',
    imageUrl: 'https://images.unsplash.com/photo-1590868309235-ea34bed7bd7f?auto=format&fit=crop&q=80',
    description: 'Compact citrus tree',
    careLevel: 'hard',
    wateringFrequency: 'Every 3-4 days',
    sunlight: 'high',
    icon: 'tree'
  },
  {
    id: 'dwarf-lime',
    name: 'Dwarf Lime',
    type: 'Fruit',
    imageUrl: 'https://images.unsplash.com/photo-1590868309235-ea34bed7bd7f?auto=format&fit=crop&q=80',
    description: 'Compact citrus tree',
    careLevel: 'hard',
    wateringFrequency: 'Every 3-4 days',
    sunlight: 'high',
    icon: 'tree'
  },
  {
    id: 'fig',
    name: 'Fig',
    type: 'Fruit',
    imageUrl: 'https://images.unsplash.com/photo-1601379760883-1bb497c558c0?auto=format&fit=crop&q=80',
    description: 'Mediterranean fruit tree',
    careLevel: 'medium',
    wateringFrequency: 'Every 3-4 days',
    sunlight: 'high',
    icon: 'tree'
  },
  {
    id: 'dwarf-apple',
    name: 'Dwarf Apple',
    type: 'Fruit',
    imageUrl: 'https://images.unsplash.com/photo-1630563451961-ac2ff27616ab?auto=format&fit=crop&q=80',
    description: 'Compact apple tree',
    careLevel: 'hard',
    wateringFrequency: 'Every 3-4 days',
    sunlight: 'high',
    icon: 'apple'
  },
  {
    id: 'grape',
    name: 'Grape',
    type: 'Fruit',
    imageUrl: 'https://images.unsplash.com/photo-1596363505729-4190a9506133?auto=format&fit=crop&q=80',
    description: 'Climbing vine fruit',
    careLevel: 'hard',
    wateringFrequency: 'Every 2-3 days',
    sunlight: 'high',
    icon: 'cherry'
  },
  {
    id: 'passion-fruit',
    name: 'Passion Fruit',
    type: 'Fruit',
    imageUrl: 'https://images.unsplash.com/photo-1604577052853-4029116c2869?auto=format&fit=crop&q=80',
    description: 'Tropical climbing vine',
    careLevel: 'hard',
    wateringFrequency: 'Every 2-3 days',
    sunlight: 'high',
    icon: 'flower'
  },
  {
    id: 'kiwi',
    name: 'Kiwi',
    type: 'Fruit',
    imageUrl: 'https://images.unsplash.com/photo-1585059895524-72359e06133a?auto=format&fit=crop&q=80',
    description: 'Climbing vine fruit',
    careLevel: 'hard',
    wateringFrequency: 'Every 2-3 days',
    sunlight: 'high',
    icon: 'tree'
  },

  // Flowers
  {
    id: 'marigold',
    name: 'Marigold',
    type: 'Flower',
    imageUrl: 'https://images.unsplash.com/photo-1508881598441-324f3974994b?auto=format&fit=crop&q=80',
    description: 'Bright orange blooms',
    careLevel: 'easy',
    wateringFrequency: 'Every 2-3 days',
    sunlight: 'high',
    icon: 'flower'
  },
  {
    id: 'zinnia',
    name: 'Zinnia',
    type: 'Flower',
    imageUrl: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&q=80',
    description: 'Colorful summer blooms',
    careLevel: 'easy',
    wateringFrequency: 'Every 2-3 days',
    sunlight: 'high',
    icon: 'flower'
  },
  {
    id: 'sunflower',
    name: 'Sunflower',
    type: 'Flower',
    imageUrl: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&q=80',
    description: 'Tall summer blooms',
    careLevel: 'easy',
    wateringFrequency: 'Every 2-3 days',
    sunlight: 'high',
    icon: 'flower2'
  },
  {
    id: 'lavender',
    name: 'Lavender',
    type: 'Flower',
    imageUrl: 'https://images.unsplash.com/photo-1468327768560-75b778cbb551?auto=format&fit=crop&q=80',
    description: 'Fragrant purple blooms',
    careLevel: 'medium',
    wateringFrequency: 'Every 3-4 days',
    sunlight: 'high',
    icon: 'flower'
  },
  {
    id: 'petunia',
    name: 'Petunia',
    type: 'Flower',
    imageUrl: 'https://images.unsplash.com/photo-1589994160839-163cd867cfe8?auto=format&fit=crop&q=80',
    description: 'Colorful trailing flowers',
    careLevel: 'easy',
    wateringFrequency: 'Daily',
    sunlight: 'high',
    icon: 'flower'
  },
  {
    id: 'geranium',
    name: 'Geranium',
    type: 'Flower',
    imageUrl: 'https://images.unsplash.com/photo-1589994160839-163cd867cfe8?auto=format&fit=crop&q=80',
    description: 'Long-blooming flowers',
    careLevel: 'easy',
    wateringFrequency: 'Every 2-3 days',
    sunlight: 'high',
    icon: 'flower2'
  },
  {
    id: 'dahlia',
    name: 'Dahlia',
    type: 'Flower',
    imageUrl: 'https://images.unsplash.com/photo-1595108777674-f12c7f5e2c45?auto=format&fit=crop&q=80',
    description: 'Showy summer blooms',
    careLevel: 'medium',
    wateringFrequency: 'Every 2-3 days',
    sunlight: 'high',
    icon: 'flower2'
  },
  {
    id: 'cosmos',
    name: 'Cosmos',
    type: 'Flower',
    imageUrl: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&q=80',
    description: 'Delicate summer flowers',
    careLevel: 'easy',
    wateringFrequency: 'Every 2-3 days',
    sunlight: 'high',
    icon: 'flower'
  },
  {
    id: 'nasturtium',
    name: 'Nasturtium',
    type: 'Flower',
    imageUrl: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&q=80',
    description: 'Edible flowers',
    careLevel: 'easy',
    wateringFrequency: 'Every 2-3 days',
    sunlight: 'high',
    icon: 'flower'
  },
  {
    id: 'pansy',
    name: 'Pansy',
    type: 'Flower',
    imageUrl: 'https://images.unsplash.com/photo-1589994160839-163cd867cfe8?auto=format&fit=crop&q=80',
    description: 'Cool season flowers',
    careLevel: 'easy',
    wateringFrequency: 'Every 2-3 days',
    sunlight: 'medium',
    icon: 'flower'
  },

  // Succulents
  {
    id: 'aloe-vera',
    name: 'Aloe Vera',
    type: 'Succulent',
    imageUrl: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&q=80',
    description: 'Medicinal succulent',
    careLevel: 'easy',
    wateringFrequency: 'Every 2-3 weeks',
    sunlight: 'medium',
    icon: 'plant2'
  },
  {
    id: 'jade-plant',
    name: 'Jade Plant',
    type: 'Succulent',
    imageUrl: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&q=80',
    description: 'Lucky money plant',
    careLevel: 'easy',
    wateringFrequency: 'Every 2-3 weeks',
    sunlight: 'high',
    icon: 'tree'
  },
  {
    id: 'echeveria',
    name: 'Echeveria',
    type: 'Succulent',
    imageUrl: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&q=80',
    description: 'Rosette-forming succulent',
    careLevel: 'easy',
    wateringFrequency: 'Every 2-3 weeks',
    sunlight: 'high',
    icon: 'flower2'
  },
  {
    id: 'zebra-plant',
    name: 'Zebra Plant',
    type: 'Succulent',
    imageUrl: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&q=80',
    description: 'Striped succulent',
    careLevel: 'easy',
    wateringFrequency: 'Every 2-3 weeks',
    sunlight: 'medium',
    icon: 'plant2'
  },
  {
    id: 'string-of-pearls',
    name: 'String of Pearls',
    type: 'Succulent',
    imageUrl: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&q=80',
    description: 'Trailing succulent',
    careLevel: 'medium',
    wateringFrequency: 'Every 2-3 weeks',
    sunlight: 'medium',
    icon: 'plant2'
  },

  // Indoor Plants
  {
    id: 'snake-plant',
    name: 'Snake Plant',
    type: 'Indoor',
    imageUrl: 'https://images.unsplash.com/photo-1593691509543-c55fb32e8de5?auto=format&fit=crop&q=80',
    description: 'Air-purifying plant',
    careLevel: 'easy',
    wateringFrequency: 'Every 2-3 weeks',
    sunlight: 'low',
    icon: 'plant2'
  },
  {
    id: 'pothos',
    name: 'Pothos',
    type: 'Indoor',
    imageUrl: 'https://images.unsplash.com/photo-1593691509543-c55fb32e8de5?auto=format&fit=crop&q=80',
    description: 'Trailing vine plant',
    careLevel: 'easy',
    wateringFrequency: 'Weekly',
    sunlight: 'low',
    icon: 'leaf'
  },
  {
    id: 'peace-lily',
    name: 'Peace Lily',
    type: 'Indoor',
    imageUrl: 'https://images.unsplash.com/photo-1593691509543-c55fb32e8de5?auto=format&fit=crop&q=80',
    description: 'Air-purifying flower',
    careLevel: 'easy',
    wateringFrequency: 'Weekly',
    sunlight: 'low',
    icon: 'flower'
  },
  {
    id: 'spider-plant',
    name: 'Spider Plant',
    type: 'Indoor',
    imageUrl: 'https://images.unsplash.com/photo-1593691509543-c55fb32e8de5?auto=format&fit=crop&q=80',
    description: 'Air-purifying plant',
    careLevel: 'easy',
    wateringFrequency: 'Weekly',
    sunlight: 'medium',
    icon: 'plant2'
  },
  {
    id: 'zz-plant',
    name: 'ZZ Plant',
    type: 'Indoor',
    imageUrl: 'https://images.unsplash.com/photo-1593691509543-c55fb32e8de5?auto=format&fit=crop&q=80',
    description: 'Low-light tolerant',
    careLevel: 'easy',
    wateringFrequency: 'Every 2-3 weeks',
    sunlight: 'low',
    icon: 'plant2'
  }
];

// ... Continue with more plants to reach 100 total

const getIconComponent = (iconName: string) => {
  switch (iconName) {
    case 'sprout':
      return Sprout;
    case 'flower2':
      return Flower2;
    case 'tree':
      return Tree;
    case 'flower':
      return Flower;
    case 'cherry':
      return Cherry;
    case 'apple':
      return Apple;
    case 'plant2':
      return Plant2;
    default:
      return Leaf;
  }
};

export function AddPlantDialog({ isOpen, onClose, onAddPlant }: AddPlantDialogProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPlants, setFilteredPlants] = useState(availablePlants);
  const [selectedType, setSelectedType] = useState<string | null>(null);

  useEffect(() => {
    const filtered = availablePlants.filter(plant => {
      const matchesSearch = plant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          plant.type.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = !selectedType || plant.type === selectedType;
      return matchesSearch && matchesType;
    });
    setFilteredPlants(filtered);
  }, [searchTerm, selectedType]);

  if (!isOpen) return null;

  const types = Array.from(new Set(availablePlants.map(plant => plant.type)));

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[80vh] overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Add New Plant</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-4">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search plants..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
            <button
              onClick={() => setSelectedType(null)}
              className={`px-4 py-1 rounded-full text-sm ${
                !selectedType ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
              }`}
            >
              All
            </button>
            {types.map(type => (
              <button
                key={type}
                onClick={() => setSelectedType(type === selectedType ? null : type)}
                className={`px-4 py-1 rounded-full text-sm ${
                  type === selectedType ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[50vh] overflow-y-auto p-2">
            {filteredPlants.map(plant => {
              const IconComponent = getIconComponent(plant.icon);
              return (
                <div
                  key={plant.id}
                  onClick={() => onAddPlant(plant)}
                  className="border border-gray-200 rounded-lg p-4 hover:border-green-500 cursor-pointer group transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                      <IconComponent className="h-6 w-6 text-green-600 animate-bounce" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{plant.name}</h3>
                      <p className="text-sm text-gray-500">{plant.type}</p>
                      <div className="mt-2 flex items-center gap-2">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          plant.careLevel === 'easy' ? 'bg-green-100 text-green-800' :
                          plant.careLevel === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {plant.careLevel}
                        </span>
                        <span className="text-xs text-gray-500">{plant.wateringFrequency}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}