import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LogOut, Target } from 'lucide-react';
import { HabitCard, Habit } from '@/components/HabitCard';
import { AddHabitForm } from '@/components/AddHabitForm';
import { useToast } from '@/hooks/use-toast';

const API_BASE_URL = '/api'; // Replace with your actual API URL

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
      const response = await fetch(`${API_BASE_URL}/habits`);
      if (!response.ok) throw new Error('Failed to fetch habits');
      const data = await response.json();
      setHabits(data);
    } catch (error) {
      console.error('Error fetching habits:', error);
      toast({
        title: "Error",
        description: "Failed to load habits. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddHabit = async (name: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/habits`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, status: 'none' }),
      });
      
      if (!response.ok) throw new Error('Failed to add habit');
      
      const newHabit = await response.json();
      setHabits(prev => [...prev, newHabit]);
      
      toast({
        title: "Success",
        description: "Habit added successfully!",
      });
    } catch (error) {
      console.error('Error adding habit:', error);
      toast({
        title: "Error",
        description: "Failed to add habit. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleStatusUpdate = async (id: string, status: Habit['status']) => {
    setIsUpdating(true);
    try {
      const response = await fetch(`${API_BASE_URL}/habits/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });
      
      if (!response.ok) throw new Error('Failed to update habit');
      
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
      toast({
        title: "Error",
        description: "Failed to update habit. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDeleteHabit = async (id: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/habits/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) throw new Error('Failed to delete habit');
      
      setHabits(prev => prev.filter(habit => habit._id !== id));
      
      toast({
        title: "Success",
        description: "Habit deleted successfully!",
      });
    } catch (error) {
      console.error('Error deleting habit:', error);
      toast({
        title: "Error",
        description: "Failed to delete habit. Please try again.",
        variant: "destructive",
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