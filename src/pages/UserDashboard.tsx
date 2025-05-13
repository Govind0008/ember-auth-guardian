
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { LogOut, User, Settings, Mail } from "lucide-react";

const UserDashboard: React.FC = () => {
  const { userEmail, logout } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b py-4">
        <div className="container flex justify-between items-center">
          <h1 className="text-2xl font-bold">User Dashboard</h1>
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
          {/* Welcome Card */}
          <Card className="animate-fade-in-up">
            <CardHeader className="pb-2">
              <CardTitle>Welcome, User</CardTitle>
              <CardDescription>Your secure account dashboard</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-primary">
                <User className="h-4 w-4" />
                <span className="text-sm font-medium">Role: USER</span>
              </div>
            </CardContent>
          </Card>

          {/* Account Settings */}
          <Card className="animate-fade-in-up [animation-delay:100ms]">
            <CardHeader className="pb-2">
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>Manage your account preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <Settings className="h-4 w-4 text-primary" />
                <span className="text-sm">Profile configuration</span>
              </div>
              
              <Button className="w-full">Update Profile</Button>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card className="animate-fade-in-up [animation-delay:200ms]">
            <CardHeader className="pb-2">
              <CardTitle>Notifications</CardTitle>
              <CardDescription>Your recent alerts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <span className="text-sm">0 unread notifications</span>
              </div>
              
              <Button className="w-full">View All</Button>
            </CardContent>
          </Card>
        </div>

        {/* User Activity Section */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Your Activity</h2>
          
          <div className="bg-card rounded-lg border p-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between py-2 border-b">
                <div>
                  <p className="font-medium">Account Created</p>
                  <p className="text-sm text-muted-foreground">
                    Your account was successfully created
                  </p>
                </div>
                <span className="text-sm text-muted-foreground">
                  {new Date().toLocaleDateString()}
                </span>
              </div>
              
              <div className="flex items-center justify-between py-2 border-b">
                <div>
                  <p className="font-medium">Email Verified</p>
                  <p className="text-sm text-muted-foreground">
                    Your email has been successfully verified
                  </p>
                </div>
                <span className="text-sm text-muted-foreground">
                  {new Date().toLocaleDateString()}
                </span>
              </div>
              
              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="font-medium">Login</p>
                  <p className="text-sm text-muted-foreground">
                    You logged in to your account
                  </p>
                </div>
                <span className="text-sm text-muted-foreground">
                  {new Date().toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;
