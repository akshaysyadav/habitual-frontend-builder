import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LogOut, Target } from 'lucide-react';
import { HabitCard, Habit } from '@/components/HabitCard';
import { AddHabitForm } from '@/components/AddHabitForm';
import { useToast } from '@/hooks/use-toast';

// For demo purposes - replace with your actual API URL
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-api-domain.com/api' 
  : '/api';

const Dashboard = () => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Fetch habits on component mount
  useEffect(() => {
    fetchHabits();
  }, []);

  const fetchHabits = async () => {
    try {
      console.log('Fetching habits from:', `${API_BASE_URL}/habits`);
      const response = await fetch(`${API_BASE_URL}/habits`);
      
      // Check if response is HTML (means API not available)
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('text/html')) {
        console.log('API not available, using mock data');
        // Use mock data for demo purposes
        setHabits([
          { _id: '1', name: 'Drink 8 glasses of water', status: 'done' },
          { _id: '2', name: 'Exercise for 30 minutes', status: 'none' },
          { _id: '3', name: 'Read for 20 minutes', status: 'missed' },
        ]);
        return;
      }
      
      if (!response.ok) throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      const data = await response.json();
      setHabits(data);
    } catch (error) {
      console.error('Error fetching habits:', error);
      
      // For demo purposes, load mock data instead of showing error
      console.log('Loading mock data for demonstration');
      setHabits([
        { _id: '1', name: 'Drink 8 glasses of water', status: 'done' },
        { _id: '2', name: 'Exercise for 30 minutes', status: 'none' },
        { _id: '3', name: 'Read for 20 minutes', status: 'missed' },
      ]);
      
      toast({
        title: "Demo Mode",
        description: "Using mock data. Connect your backend API for full functionality.",
        variant: "default",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddHabit = async (name: string) => {
    try {
      console.log('Adding habit:', name);
      const response = await fetch(`${API_BASE_URL}/habits`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, status: 'none' }),
      });
      
      // Check if response is HTML (means API not available)
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('text/html')) {
        console.log('API not available, adding to mock data');
        // Add to mock data
        const newHabit: Habit = {
          _id: Date.now().toString(),
          name,
          status: 'none'
        };
        setHabits(prev => [...prev, newHabit]);
        toast({
          title: "Success (Demo Mode)",
          description: "Habit added to local demo data!",
        });
        return;
      }
      
      if (!response.ok) throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      
      const newHabit = await response.json();
      setHabits(prev => [...prev, newHabit]);
      
      toast({
        title: "Success",
        description: "Habit added successfully!",
      });
    } catch (error) {
      console.error('Error adding habit:', error);
      
      // Fallback to mock behavior for demo
      const newHabit: Habit = {
        _id: Date.now().toString(),
        name,
        status: 'none'
      };
      setHabits(prev => [...prev, newHabit]);
      toast({
        title: "Added (Demo Mode)",
        description: "Habit added locally. Connect your API for persistence.",
      });
    }
  };

  const handleStatusUpdate = async (id: string, status: Habit['status']) => {
    setIsUpdating(true);
    try {
      console.log('Updating habit status:', id, status);
      const response = await fetch(`${API_BASE_URL}/habits/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });
      
      // Check if response is HTML (means API not available)
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('text/html')) {
        console.log('API not available, updating mock data');
        // Update mock data
        setHabits(prev => 
          prev.map(habit => 
            habit._id === id ? { ...habit, status } : habit
          )
        );
        toast({
          title: "Updated (Demo Mode)",
          description: "Habit status updated locally!",
        });
        return;
      }
      
      if (!response.ok) throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      
      setHabits(prev => 
        prev.map(habit => 
          habit._id === id ? { ...habit, status } : habit
        )
      );
      
      toast({
        title: "Success",
        description: "Habit status updated!",
      });
    } catch (error) {
      console.error('Error updating habit:', error);
      
      // Fallback to mock behavior
      setHabits(prev => 
        prev.map(habit => 
          habit._id === id ? { ...habit, status } : habit
        )
      );
      toast({
        title: "Updated (Demo Mode)",
        description: "Status updated locally. Connect your API for persistence.",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDeleteHabit = async (id: string) => {
    try {
      console.log('Deleting habit:', id);
      const response = await fetch(`${API_BASE_URL}/habits/${id}`, {
        method: 'DELETE',
      });
      
      // Check if response is HTML (means API not available)
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('text/html')) {
        console.log('API not available, deleting from mock data');
        // Delete from mock data
        setHabits(prev => prev.filter(habit => habit._id !== id));
        toast({
          title: "Deleted (Demo Mode)",
          description: "Habit removed from local demo data!",
        });
        return;
      }
      
      if (!response.ok) throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      
      setHabits(prev => prev.filter(habit => habit._id !== id));
      
      toast({
        title: "Success",
        description: "Habit deleted successfully!",
      });
    } catch (error) {
      console.error('Error deleting habit:', error);
      
      // Fallback to mock behavior
      setHabits(prev => prev.filter(habit => habit._id !== id));
      toast({
        title: "Deleted (Demo Mode)",
        description: "Habit removed locally. Connect your API for persistence.",
      });
    }
  };

  const handleLogout = () => {
    toast({
      title: "Goodbye!",
      description: "You have been logged out",
    });
    navigate('/login');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your habits...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Target className="w-8 h-8 text-primary" />
            <h1 className="text-2xl font-bold text-primary">Habitual</h1>
          </div>
          <Button
            variant="outline"
            onClick={handleLogout}
            className="transition-all duration-200 hover:scale-105"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Welcome Section */}
          <div className="text-center mb-8 animate-fade-in">
            <h2 className="text-3xl font-bold text-foreground mb-2">
              Welcome to Your Habit Dashboard
            </h2>
            <p className="text-muted-foreground text-lg">
              Track your daily habits and build a better you, one day at a time.
            </p>
          </div>

          {/* Add Habit Form */}
          <div className="mb-8">
            <AddHabitForm onAddHabit={handleAddHabit} />
          </div>

          {/* Habits Grid */}
          {habits.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {habits.map((habit, index) => (
                <div
                  key={habit._id}
                  className="animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <HabitCard
                    habit={habit}
                    onStatusUpdate={handleStatusUpdate}
                    onDelete={handleDeleteHabit}
                    isUpdating={isUpdating}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 animate-fade-in">
              <Target className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                No habits yet
              </h3>
              <p className="text-muted-foreground">
                Add your first habit above to get started on your journey!
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;