// API Configuration - Placeholder endpoints for future backend integration
export const API_CONFIG = {
  BASE_URL: process.env.NODE_ENV === 'production' 
    ? 'https://your-backend-domain.com' 
    : 'http://localhost:3001',
  
  ENDPOINTS: {
    // Authentication
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
    LOGOUT: '/api/auth/logout',
    
    // IoT Sensor Data
    IOT_CURRENT: '/api/iot/current',
    IOT_HISTORY: '/api/iot/history',
    IOT_STATUS: '/api/iot/status',
    
    // Authority Features
    SEND_ADVISORY: '/api/advisories/send',
    GET_ADVISORIES: '/api/advisories',
    SEND_ALERT: '/api/alerts/send',
    GET_FARMERS: '/api/farmers',
    FARMER_STATS: '/api/farmers/stats',
    
    // Communication
    SEND_MESSAGE: '/api/messages/send',
    GET_MESSAGES: '/api/messages',
    GET_CONVERSATIONS: '/api/conversations',
    
    // Notifications
    SEND_SMS: '/api/notifications/sms',
    GET_NOTIFICATIONS: '/api/notifications',
    
    // Reports
    UPLOAD_REPORT: '/api/reports/upload',
    GET_REPORTS: '/api/reports',
  }
};

// Mock data generators for development
export const MOCK_DATA = {
  // IoT sensor mock data
  generateSensorReading: () => ({
    timestamp: new Date().toISOString(),
    temperature: Math.round((20 + Math.random() * 15) * 10) / 10,
    humidity: Math.round((45 + Math.random() * 35) * 10) / 10,
    soilMoisture: Math.round((30 + Math.random() * 25) * 10) / 10,
  }),

  // Generate historical sensor data
  generateSensorHistory: (hours = 24) => {
    const data = [];
    for (let i = hours; i >= 0; i--) {
      const time = new Date(Date.now() - i * 60 * 60 * 1000);
      data.push({
        time: time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        temperature: Math.round((22 + Math.random() * 12 + Math.sin(i * 0.5) * 5) * 10) / 10,
        humidity: Math.round((50 + Math.random() * 30 + Math.cos(i * 0.3) * 10) * 10) / 10,
        soilMoisture: Math.round((35 + Math.random() * 20 + Math.sin(i * 0.7) * 8) * 10) / 10,
      });
    }
    return data;
  },

  // Farmer statistics
  farmerStats: {
    totalFarmers: 1247,
    activeFarmers: 1089,
    newRegistrations: 23,
    alertsSent: 156
  },

  // Sample reports/advisories
  sampleReports: [
    {
      id: 1,
      title: "Weekly Crop Advisory",
      content: "Apply nitrogen fertilizer for better crop yield during this monsoon season.",
      type: "advisory",
      sentTo: 1089,
      date: "2024-01-15",
      status: "delivered",
      readRate: "87%"
    },
    {
      id: 2,
      title: "Weather Alert - Rain Warning",
      content: "Heavy rainfall expected in next 48 hours. Protect your crops and ensure proper drainage.",
      type: "alert",
      sentTo: 1247,
      date: "2024-01-14",
      status: "delivered",
      readRate: "95%"
    }
  ],

  // Sample messages
  sampleMessages: [
    {
      id: 1,
      farmerId: "farmer_001",
      farmerName: "Rajesh Kumar",
      message: "Need guidance on pest control for tomato crops",
      timestamp: "2024-01-15T10:30:00Z",
      status: "unread"
    },
    {
      id: 2,
      farmerId: "farmer_002", 
      farmerName: "Sunita Devi",
      message: "When should I apply the fertilizer mentioned in last advisory?",
      timestamp: "2024-01-14T15:45:00Z",
      status: "replied"
    }
  ]
};

// Utility function to simulate API calls with mock data
export const mockApiCall = async <T>(
  endpoint: string, 
  mockData: T, 
  delay: number = 500
): Promise<T> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, delay));
  
  // Log the API call for debugging
  console.log(`[MOCK API] ${endpoint}`, mockData);
  
  // Simulate occasional network errors (5% chance)
  if (Math.random() < 0.05) {
    throw new Error(`Network error: Failed to fetch ${endpoint}`);
  }
  
  return mockData;
};

// Placeholder API functions that will be replaced with real API calls
export const apiService = {
  // IoT Data
  async getCurrentSensorData() {
    return mockApiCall(
      API_CONFIG.ENDPOINTS.IOT_CURRENT,
      MOCK_DATA.generateSensorReading()
    );
  },

  async getSensorHistory(hours = 24) {
    return mockApiCall(
      `${API_CONFIG.ENDPOINTS.IOT_HISTORY}?hours=${hours}`,
      MOCK_DATA.generateSensorHistory(hours)
    );
  },

  // Authority Functions
  async getFarmerStats() {
    return mockApiCall(
      API_CONFIG.ENDPOINTS.FARMER_STATS,
      MOCK_DATA.farmerStats
    );
  },

  async getReports() {
    return mockApiCall(
      API_CONFIG.ENDPOINTS.GET_REPORTS,
      MOCK_DATA.sampleReports
    );
  },

  async sendAdvisory(advisory: any) {
    return mockApiCall(
      API_CONFIG.ENDPOINTS.SEND_ADVISORY,
      { success: true, id: Date.now(), ...advisory }
    );
  },

  // Communication
  async getMessages() {
    return mockApiCall(
      API_CONFIG.ENDPOINTS.GET_MESSAGES,
      MOCK_DATA.sampleMessages
    );
  },

  async sendMessage(message: any) {
    return mockApiCall(
      API_CONFIG.ENDPOINTS.SEND_MESSAGE,
      { success: true, id: Date.now(), ...message }
    );
  }
};