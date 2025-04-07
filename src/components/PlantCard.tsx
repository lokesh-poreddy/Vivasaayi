import React from 'react';
import { useState } from 'react';
import { Droplet, Thermometer, Sun, Wind, Trash2, Power } from 'lucide-react';
import type { PlantData } from '../types';

interface PlantCardProps {
  plant: PlantData;
  onClick: (plant: PlantData) => void;
  onDelete: (id: string) => void;
  onDispense: (id: string, amount: number) => void;
  onPumpToggle: (id: string, status: 'on' | 'off') => void;
}

export function PlantCard({ plant, onClick, onDelete, onDispense, onPumpToggle }: PlantCardProps) {
  const [isDispensing, setIsDispensing] = useState(false);
  const [waterAmount, setWaterAmount] = useState(100); // Default 100ml
  const [showDispenseControls, setShowDispenseControls] = useState(false);
  const [isTogglingPump, setIsTogglingPump] = useState(false);

  const getHealthStatusColor = (status: string) => {
    switch (status) {
      case 'good':
        return 'bg-green-100 text-green-800';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800';
      case 'critical':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(plant.id);
  };

  const handleDispense = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDispensing(true);
    try {
      await onDispense(plant.id, waterAmount);
      setShowDispenseControls(false);
    } catch (error) {
      console.error('Failed to dispense water:', error);
    } finally {
      setIsDispensing(false);
    }
  };

  const handleCardClick = (e: React.MouseEvent) => {
    setShowDispenseControls(true);
    onClick(plant);
  };

  const handlePumpToggle = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsTogglingPump(true);
    try {
      const newStatus = plant.pumpStatus === 'on' ? 'off' : 'on';
      await onPumpToggle(plant.id, newStatus);
    } catch (error) {
      console.error('Failed to toggle pump:', error);
    } finally {
      setIsTogglingPump(false);
    }
  };

  return (
    <div 
      onClick={handleCardClick}
      className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer overflow-hidden relative group"
    >
      <button
        onClick={handleDelete}
        className="absolute top-2 right-2 p-2 bg-red-100 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-200"
      >
        <Trash2 className="h-4 w-4 text-red-600" />
      </button>
      <div className="h-48 overflow-hidden">
        <img 
          src={plant.imageUrl} 
          alt={plant.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{plant.name}</h3>
            <p className="text-sm text-gray-500">{plant.type}</p>
          </div>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getHealthStatusColor(plant.healthStatus)}`}>
            {plant.healthStatus}
          </span>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center space-x-2">
            <Droplet className="h-4 w-4 text-blue-500" />
            <span className="text-sm text-gray-600">{plant.waterLevel}%</span>
          </div>
          <div className="flex items-center space-x-2">
            <Wind className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-600">{plant.humidity}%</span>
          </div>
          <div className="flex items-center space-x-2">
            <Thermometer className="h-4 w-4 text-red-500" />
            <span className="text-sm text-gray-600">{plant.temperature}°C</span>
          </div>
          <div className="flex items-center space-x-2">
            <Sun className="h-4 w-4 text-yellow-500" />
            <span className="text-sm text-gray-600">{plant.uvExposure}%</span>
          </div>
        </div>
        <div className="mt-4 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Pump Status</span>
            <button
              onClick={handlePumpToggle}
              disabled={isTogglingPump}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors duration-200 ${
                plant.pumpStatus === 'on'
                  ? 'bg-green-500 text-white hover:bg-green-600'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              } ${isTogglingPump ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <Power className="h-4 w-4" />
              {isTogglingPump ? 'Switching...' : plant.pumpStatus === 'on' ? 'On' : 'Off'}
            </button>
          </div>
        </div>
        {showDispenseControls && (
          <div className="mt-4 space-y-3" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <label className="text-sm text-gray-600">Water Amount (ml):</label>
              <input
                type="number"
                min="50"
                max="500"
                step="50"
                value={waterAmount}
                onChange={(e) => setWaterAmount(Number(e.target.value))}
                className="w-24 px-2 py-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <button
              onClick={handleDispense}
              disabled={isDispensing}
              className={`w-full py-2 px-4 rounded-lg transition-colors duration-200 ${
                isDispensing 
                  ? 'bg-blue-100 text-blue-400 cursor-not-allowed'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              {isDispensing ? 'Dispensing...' : 'Dispense Water'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}