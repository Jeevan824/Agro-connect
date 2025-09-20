import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Thermometer, Droplets, Gauge, TrendingUp, TrendingDown } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

// Mock IoT sensor data
const sensorData = [
  { time: '00:00', temperature: 22, humidity: 65, soilMoisture: 45 },
  { time: '04:00', temperature: 19, humidity: 72, soilMoisture: 48 },
  { time: '08:00', temperature: 25, humidity: 60, soilMoisture: 42 },
  { time: '12:00', temperature: 32, humidity: 45, soilMoisture: 38 },
  { time: '16:00', temperature: 29, humidity: 55, soilMoisture: 40 },
  { time: '20:00', temperature: 24, humidity: 68, soilMoisture: 44 },
];

const currentReadings = {
  temperature: { value: 26, unit: '°C', status: 'optimal', trend: 'up' },
  humidity: { value: 62, unit: '%', status: 'good', trend: 'down' },
  soilMoisture: { value: 41, unit: '%', status: 'low', trend: 'down' }
};

export function IoTDashboard() {
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

  return (
    <div className="space-y-6">
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