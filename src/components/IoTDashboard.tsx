import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Thermometer, Droplets, Gauge, TrendingUp, TrendingDown, Wifi, WifiOff } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

// Types for sensor data
interface SensorReading {
  time: string;
  temperature: number;
  humidity: number;
  soilMoisture: number;
}

interface CurrentReading {
  value: number;
  unit: string;
  status: 'optimal' | 'good' | 'low' | 'critical';
  trend: 'up' | 'down';
}

interface CurrentReadings {
  temperature: CurrentReading;
  humidity: CurrentReading;
  soilMoisture: CurrentReading;
}

// API endpoints (placeholder)
const API_BASE_URL = 'https://api.farm-iot.example.com';

// Simulated API fetch function
const fetchSensorData = async (): Promise<SensorReading[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Generate realistic sensor data with some randomness
  const now = new Date();
  const data: SensorReading[] = [];
  
  for (let i = 5; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 4 * 60 * 60 * 1000);
    data.push({
      time: time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      temperature: Math.round((22 + Math.random() * 12 + Math.sin(i * 0.5) * 5) * 10) / 10,
      humidity: Math.round((50 + Math.random() * 30 + Math.cos(i * 0.3) * 10) * 10) / 10,
      soilMoisture: Math.round((35 + Math.random() * 20 + Math.sin(i * 0.7) * 8) * 10) / 10,
    });
  }
  
  return data;
};

const fetchCurrentReadings = async (): Promise<CurrentReadings> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 200));
  
  const temp = Math.round((20 + Math.random() * 15) * 10) / 10;
  const humid = Math.round((45 + Math.random() * 35) * 10) / 10;
  const soil = Math.round((30 + Math.random() * 25) * 10) / 10;
  
  return {
    temperature: { 
      value: temp, 
      unit: '°C', 
      status: temp < 18 ? 'low' : temp > 35 ? 'critical' : temp > 25 ? 'optimal' : 'good',
      trend: Math.random() > 0.5 ? 'up' : 'down'
    },
    humidity: { 
      value: humid, 
      unit: '%', 
      status: humid < 40 ? 'low' : humid > 80 ? 'critical' : humid > 60 ? 'optimal' : 'good',
      trend: Math.random() > 0.5 ? 'up' : 'down'
    },
    soilMoisture: { 
      value: soil, 
      unit: '%', 
      status: soil < 30 ? 'critical' : soil < 40 ? 'low' : soil > 60 ? 'optimal' : 'good',
      trend: Math.random() > 0.5 ? 'up' : 'down'
    }
  };
};

export function IoTDashboard() {
  const [sensorData, setSensorData] = useState<SensorReading[]>([]);
  const [currentReadings, setCurrentReadings] = useState<CurrentReadings | null>(null);
  const [isConnected, setIsConnected] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  // Fetch initial data
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const [sensorResponse, currentResponse] = await Promise.all([
          fetchSensorData(),
          fetchCurrentReadings()
        ]);
        setSensorData(sensorResponse);
        setCurrentReadings(currentResponse);
        setLastUpdate(new Date());
      } catch (error) {
        console.error('Failed to fetch initial IoT data:', error);
        setIsConnected(false);
      }
    };

    loadInitialData();
  }, []);

  // Set up live updates every 30 seconds
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const [sensorResponse, currentResponse] = await Promise.all([
          fetchSensorData(),
          fetchCurrentReadings()
        ]);
        setSensorData(sensorResponse);
        setCurrentReadings(currentResponse);
        setLastUpdate(new Date());
        setIsConnected(true);
      } catch (error) {
        console.error('Failed to update IoT data:', error);
        setIsConnected(false);
      }
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'optimal': return 'bg-success text-success-foreground';
      case 'good': return 'bg-primary text-primary-foreground';
      case 'low': return 'bg-warning text-warning-foreground';
      case 'critical': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const TrendIcon = ({ trend }: { trend: string }) => {
    return trend === 'up' ? 
      <TrendingUp className="h-4 w-4 text-success" /> : 
      <TrendingDown className="h-4 w-4 text-destructive" />;
  };

  // Show loading state if data hasn't loaded yet
  if (!currentReadings) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading IoT sensor data...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Connection Status */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {isConnected ? (
            <Wifi className="h-5 w-5 text-success" />
          ) : (
            <WifiOff className="h-5 w-5 text-destructive" />
          )}
          <span className="text-sm text-muted-foreground">
            {isConnected ? 'Connected to IoT sensors' : 'Connection lost'}
          </span>
        </div>
        <span className="text-xs text-muted-foreground">
          Last update: {lastUpdate.toLocaleTimeString()}
        </span>
      </div>

      {/* Current Readings */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-border/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-sensor-temperature/10 rounded-lg flex items-center justify-center">
                  <Thermometer className="h-6 w-6 text-sensor-temperature" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Temperature</p>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-foreground">
                      {currentReadings.temperature.value}{currentReadings.temperature.unit}
                    </span>
                    <TrendIcon trend={currentReadings.temperature.trend} />
                  </div>
                </div>
              </div>
              <Badge className={getStatusColor(currentReadings.temperature.status)}>
                {currentReadings.temperature.status}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-sensor-humidity/10 rounded-lg flex items-center justify-center">
                  <Droplets className="h-6 w-6 text-sensor-humidity" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Humidity</p>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-foreground">
                      {currentReadings.humidity.value}{currentReadings.humidity.unit}
                    </span>
                    <TrendIcon trend={currentReadings.humidity.trend} />
                  </div>
                </div>
              </div>
              <Badge className={getStatusColor(currentReadings.humidity.status)}>
                {currentReadings.humidity.status}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-sensor-soil/10 rounded-lg flex items-center justify-center">
                  <Gauge className="h-6 w-6 text-sensor-soil" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Soil Moisture</p>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-foreground">
                      {currentReadings.soilMoisture.value}{currentReadings.soilMoisture.unit}
                    </span>
                    <TrendIcon trend={currentReadings.soilMoisture.trend} />
                  </div>
                </div>
              </div>
              <Badge className={getStatusColor(currentReadings.soilMoisture.status)}>
                {currentReadings.soilMoisture.status}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="text-foreground">24-Hour Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={sensorData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="time" className="text-muted-foreground" />
                <YAxis className="text-muted-foreground" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="temperature" 
                  stroke="hsl(var(--sensor-temperature))" 
                  strokeWidth={2}
                  name="Temperature (°C)"
                />
                <Line 
                  type="monotone" 
                  dataKey="humidity" 
                  stroke="hsl(var(--sensor-humidity))" 
                  strokeWidth={2}
                  name="Humidity (%)"
                />
                <Line 
                  type="monotone" 
                  dataKey="soilMoisture" 
                  stroke="hsl(var(--sensor-soil))" 
                  strokeWidth={2}
                  name="Soil Moisture (%)"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="text-foreground">Current Levels</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={[
                { name: 'Temperature', value: currentReadings.temperature.value, fill: 'hsl(var(--sensor-temperature))' },
                { name: 'Humidity', value: currentReadings.humidity.value, fill: 'hsl(var(--sensor-humidity))' },
                { name: 'Soil Moisture', value: currentReadings.soilMoisture.value, fill: 'hsl(var(--sensor-soil))' }
              ]}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="name" className="text-muted-foreground" />
                <YAxis className="text-muted-foreground" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }} 
                />
                <Bar dataKey="value" fill="fill" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}