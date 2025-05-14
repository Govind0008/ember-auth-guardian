
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Settings, User, Bell, Shield, Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const UserSettingsPage: React.FC = () => {
  const { userEmail } = useAuth();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);
  
  const [saving, setSaving] = useState(false);

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    // Create a save animation
    setTimeout(() => {
      setSaving(false);
      toast.success("Profile information saved successfully!");
    }, 1500);
  };

  const handleNotificationSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    setTimeout(() => {
      setSaving(false);
      toast.success("Notification preferences updated!");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header with glassmorphism */}
      <header className="bg-card/40 backdrop-blur-md border-b py-4 shadow-md sticky top-0 z-50">
        <div className="container flex items-center">
          <Link to="/user/dashboard" className="mr-4">
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 flex items-center justify-center">
              <Settings className="h-6 w-6 text-white animate-spin-slow" />
            </div>
            <h1 className="text-2xl font-bold">Account Settings</h1>
          </div>
        </div>
      </header>

      <main className="container py-8">
        <Tabs defaultValue="profile" className="space-y-8">
          <TabsList className="grid grid-cols-3 max-w-md mx-auto bg-white/20 backdrop-blur-sm">
            <TabsTrigger value="profile" className="data-[state=active]:bg-white/60 data-[state=active]:shadow-sm transition-all">
              <User className="h-4 w-4 mr-2" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="notifications" className="data-[state=active]:bg-white/60 data-[state=active]:shadow-sm transition-all">
              <Bell className="h-4 w-4 mr-2" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="security" className="data-[state=active]:bg-white/60 data-[state=active]:shadow-sm transition-all">
              <Shield className="h-4 w-4 mr-2" />
              Security
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card className="backdrop-blur-sm bg-white/50 border-white/20 animate-fade-in-up">
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your personal details</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleProfileSave} className="space-y-6">
                  <div className="space-y-4">
                    <div className="relative overflow-hidden rounded-lg h-32 bg-gradient-to-r from-amber-200/50 to-orange-300/50 flex justify-center items-center mb-8">
                      <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center border-4 border-white shadow-lg animate-pulse-subtle">
                        <span className="text-3xl font-bold text-white">
                          {(firstName || lastName) ? 
                            `${firstName.charAt(0)}${lastName.charAt(0)}` : 
                            userEmail?.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      
                      {/* Animated dots */}
                      <div className="absolute top-1/2 left-1/4 transform -translate-y-1/2 w-2 h-2 bg-amber-400 rounded-full animate-float-3d"></div>
                      <div className="absolute top-3/4 right-1/4 transform -translate-y-1/2 w-3 h-3 bg-orange-400 rounded-full animate-float-3d-reverse"></div>
                    </div>
                    
                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="space-y-2 transition-all transform hover:translate-y-[-2px]">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input 
                          id="firstName" 
                          value={firstName} 
                          onChange={(e) => setFirstName(e.target.value)} 
                          className="bg-white/50 backdrop-blur-sm border-2 hover:border-primary focus:border-primary transition-all"
                        />
                      </div>
                      <div className="space-y-2 transition-all transform hover:translate-y-[-2px]">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input 
                          id="lastName" 
                          value={lastName} 
                          onChange={(e) => setLastName(e.target.value)} 
                          className="bg-white/50 backdrop-blur-sm border-2 hover:border-primary focus:border-primary transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-2 transition-all transform hover:translate-y-[-2px]">
                      <Label htmlFor="email">Email Address</Label>
                      <Input 
                        id="email" 
                        value={userEmail || ''} 
                        disabled 
                        className="bg-white/30 backdrop-blur-sm"
                      />
                      <p className="text-xs text-muted-foreground">Your email cannot be changed</p>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button
                      type="submit"
                      disabled={saving}
                      className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 transition-all relative overflow-hidden"
                    >
                      {saving ? (
                        <div className="flex items-center">
                          <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                          <span>Saving...</span>
                        </div>
                      ) : (
                        <span>Save Changes</span>
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications">
            <Card className="backdrop-blur-sm bg-white/50 border-white/20 animate-fade-in-up">
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Manage how you receive notifications</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleNotificationSave} className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-lg bg-white/40 transition-all hover:bg-white/60">
                      <div className="space-y-0.5">
                        <Label className="text-base">Enable Notifications</Label>
                        <p className="text-sm text-muted-foreground">
                          Master control for all notifications
                        </p>
                      </div>
                      <Switch
                        checked={notificationsEnabled}
                        onCheckedChange={setNotificationsEnabled}
                        className="data-[state=checked]:bg-gradient-to-r from-amber-500 to-orange-600"
                      />
                    </div>

                    <div className={`space-y-4 ${notificationsEnabled ? 'opacity-100' : 'opacity-50 pointer-events-none'} transition-opacity duration-300`}>
                      <div className="flex items-center justify-between p-4 rounded-lg bg-white/40 transition-all hover:bg-white/60">
                        <div className="space-y-0.5">
                          <Label className="text-base">Email Alerts</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive important alerts via email
                          </p>
                        </div>
                        <Switch
                          checked={emailAlerts}
                          onCheckedChange={setEmailAlerts}
                          disabled={!notificationsEnabled}
                          className="data-[state=checked]:bg-gradient-to-r from-amber-500 to-orange-600"
                        />
                      </div>

                      <div className="flex items-center justify-between p-4 rounded-lg bg-white/40 transition-all hover:bg-white/60">
                        <div className="space-y-0.5">
                          <Label className="text-base">Newsletter</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive monthly newsletter and updates
                          </p>
                        </div>
                        <Switch
                          checked={newsletterSubscribed}
                          onCheckedChange={setNewsletterSubscribed}
                          disabled={!notificationsEnabled}
                          className="data-[state=checked]:bg-gradient-to-r from-amber-500 to-orange-600"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button
                      type="submit"
                      disabled={saving}
                      className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 transition-all"
                    >
                      {saving ? (
                        <div className="flex items-center">
                          <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                          <span>Saving...</span>
                        </div>
                      ) : (
                        <span>Update Preferences</span>
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security">
            <Card className="backdrop-blur-sm bg-white/50 border-white/20 animate-fade-in-up">
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Manage your account security</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="p-4 rounded-lg border border-green-200 bg-green-50/50">
                    <div className="flex items-center gap-2 text-green-700 mb-2">
                      <Shield className="h-5 w-5" />
                      <h3 className="font-semibold">Passwordless Authentication Active</h3>
                    </div>
                    <p className="text-sm text-green-600">
                      Your account is secured with email-based one-time passcodes.
                      No password is stored, providing enhanced security.
                    </p>
                  </div>

                  <div className="p-4 rounded-lg bg-white/40 transition-all hover:bg-white/60">
                    <div className="flex items-center gap-2 mb-2">
                      <Eye className="h-5 w-5 text-amber-600" />
                      <h3 className="font-semibold">Recent Login Activity</h3>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <div>
                          <p className="font-medium">Current Session</p>
                          <p className="text-xs text-muted-foreground">Chrome on Windows</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs font-medium text-green-600">Active Now</p>
                          <p className="text-xs text-muted-foreground">127.0.0.1</p>
                        </div>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <div>
                          <p className="font-medium">Previous Login</p>
                          <p className="text-xs text-muted-foreground">Safari on iPhone</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-muted-foreground">Yesterday at 14:30</p>
                          <p className="text-xs text-muted-foreground">192.168.1.5</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button
                    variant="outline"
                    className="bg-white/50 hover:bg-red-50 border-red-200 text-red-600 hover:text-red-700 hover:border-red-300 transition-all"
                  >
                    <EyeOff className="mr-2 h-4 w-4" />
                    Sign Out All Devices
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default UserSettingsPage;
