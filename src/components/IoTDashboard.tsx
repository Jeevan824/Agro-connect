import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Thermometer, Droplets, Gauge, TrendingUp, TrendingDown, Wifi, WifiOff } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { apiService, MOCK_DATA } from "@/lib/api";

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

// Helper function to determine sensor status
const getSensorStatus = (value: number, type: 'temperature' | 'humidity' | 'soilMoisture') => {
  switch (type) {
    case 'temperature':
      return value < 18 ? 'low' : value > 35 ? 'critical' : value > 25 ? 'optimal' : 'good';
    case 'humidity':
      return value < 40 ? 'low' : value > 80 ? 'critical' : value > 60 ? 'optimal' : 'good';
    case 'soilMoisture':
      return value < 30 ? 'critical' : value < 40 ? 'low' : value > 60 ? 'optimal' : 'good';
    default:
      return 'good';
  }
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
        // Fetch sensor history and current readings using placeholder API
        const [sensorHistory, currentReading] = await Promise.all([
          apiService.getSensorHistory(6), // Last 6 hours
          apiService.getCurrentSensorData()
        ]);
        
        setSensorData(sensorHistory);
        
        // Transform current reading into expected format
        const transformedReadings: CurrentReadings = {
          temperature: {
            value: currentReading.temperature,
            unit: '°C',
            status: getSensorStatus(currentReading.temperature, 'temperature'),
            trend: Math.random() > 0.5 ? 'up' : 'down'
          },
          humidity: {
            value: currentReading.humidity,
            unit: '%',
            status: getSensorStatus(currentReading.humidity, 'humidity'),
            trend: Math.random() > 0.5 ? 'up' : 'down'
          },
          soilMoisture: {
            value: currentReading.soilMoisture,
            unit: '%',
            status: getSensorStatus(currentReading.soilMoisture, 'soilMoisture'),
            trend: Math.random() > 0.5 ? 'up' : 'down'
          }
        };
        
        setCurrentReadings(transformedReadings);
        setLastUpdate(new Date());
        setIsConnected(true);
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
        // Update with fresh data from placeholder API
        const [sensorHistory, currentReading] = await Promise.all([
          apiService.getSensorHistory(6), // Last 6 hours
          apiService.getCurrentSensorData()
        ]);
        
        setSensorData(sensorHistory);
        
        // Transform current reading into expected format
        const transformedReadings: CurrentReadings = {
          temperature: {
            value: currentReading.temperature,
            unit: '°C',
            status: getSensorStatus(currentReading.temperature, 'temperature'),
            trend: Math.random() > 0.5 ? 'up' : 'down'
          },
          humidity: {
            value: currentReading.humidity,
            unit: '%',
            status: getSensorStatus(currentReading.humidity, 'humidity'),
            trend: Math.random() > 0.5 ? 'up' : 'down'
          },
          soilMoisture: {
            value: currentReading.soilMoisture,
            unit: '%',
            status: getSensorStatus(currentReading.soilMoisture, 'soilMoisture'),
            trend: Math.random() > 0.5 ? 'up' : 'down'
          }
        };
        
        setCurrentReadings(transformedReadings);
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