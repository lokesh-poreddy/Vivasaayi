export interface PlantData {
  id: string;
  name: string;
  type: string;
  waterLevel: number;
  humidity: number;
  soilMoisture: number;
  uvExposure: number;
  temperature: number;
  healthStatus: 'good' | 'warning' | 'critical';
  lastWatered: Date;
  imageUrl: string;
  pumpStatus: 'on' | 'off';
}

export interface SensorReading {
  timestamp: Date;
  value: number;
}

export interface PlantMetrics {
  waterLevel: SensorReading[];
  humidity: SensorReading[];
  soilMoisture: SensorReading[];
  uvExposure: SensorReading[];
  temperature: SensorReading[];
}

export interface PlantTemplate {
  id: string;
  name: string;
  type: string;
  imageUrl: string;
  description: string;
  careLevel: 'easy' | 'medium' | 'hard';
  wateringFrequency: string;
  sunlight: 'low' | 'medium' | 'high';
  icon: string;
}