
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { LogOut, Key, User, Settings } from "lucide-react";

const AdminDashboard: React.FC = () => {
  const { userEmail, logout } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b py-4">
        <div className="container flex justify-between items-center">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">{userEmail}</span>
            <Button variant="outline" size="sm" onClick={logout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container py-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Stats Card */}
          <Card className="animate-fade-in-up">
            <CardHeader className="pb-2">
              <CardTitle>Welcome, Admin</CardTitle>
              <CardDescription>You have administrative privileges</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-primary">
                <Key className="h-4 w-4" />
                <span className="text-sm font-medium">Role: ADMIN</span>
              </div>
            </CardContent>
          </Card>

          {/* Users Management */}
          <Card className="animate-fade-in-up [animation-delay:100ms]">
            <CardHeader className="pb-2">
              <CardTitle>User Management</CardTitle>
              <CardDescription>Manage system users</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-primary" />
                  <span>Total Users</span>
                </div>
                <span className="font-medium">24</span>
              </div>
              
              <Button className="w-full">Manage Users</Button>
            </CardContent>
          </Card>

          {/* System Settings */}
          <Card className="animate-fade-in-up [animation-delay:200ms]">
            <CardHeader className="pb-2">
              <CardTitle>System Settings</CardTitle>
              <CardDescription>Configure authentication parameters</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <Settings className="h-4 w-4 text-primary" />
                <span className="text-sm">Security configuration</span>
              </div>
              
              <Button className="w-full">Access Settings</Button>
            </CardContent>
          </Card>
        </div>

        {/* Admin Activity Section */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          
          <div className="bg-card rounded-lg border p-4">
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div 
                  key={i} 
                  className="flex items-center justify-between py-2 border-b last:border-0"
                >
                  <div>
                    <p className="font-medium">User Authentication Update</p>
                    <p className="text-sm text-muted-foreground">
                      Security policy updated for OTP verification
                    </p>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {new Date().toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
