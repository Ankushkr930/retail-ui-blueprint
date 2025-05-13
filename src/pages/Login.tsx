
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";

const Login = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [role, setRole] = React.useState<'owner' | 'manager' | 'staff'>('staff');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Would handle authentication here
    console.log('Login attempt');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-light p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-2 text-center">
          <div className="flex justify-center mb-4">
            {/* Simple placeholder logo */}
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Login to Retail System</CardTitle>
          <CardDescription>Enter your credentials to access your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="name@example.com" 
                  className="pl-10"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input 
                  id="password" 
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••" 
                  className="pl-10"
                  required
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)} 
                  className="absolute right-3 top-2.5 text-muted-foreground hover:text-foreground"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Select Role</Label>
              <div className="grid grid-cols-3 gap-2">
                <Button
                  type="button"
                  variant={role === 'owner' ? 'default' : 'outline'}
                  className={`px-3 py-2 h-auto ${role === 'owner' ? 'bg-primary text-white' : ''}`}
                  onClick={() => setRole('owner')}
                >
                  Owner
                </Button>
                <Button
                  type="button"
                  variant={role === 'manager' ? 'default' : 'outline'}
                  className={`px-3 py-2 h-auto ${role === 'manager' ? 'bg-primary text-white' : ''}`}
                  onClick={() => setRole('manager')}
                >
                  Manager
                </Button>
                <Button
                  type="button"
                  variant={role === 'staff' ? 'default' : 'outline'}
                  className={`px-3 py-2 h-auto ${role === 'staff' ? 'bg-primary text-white' : ''}`}
                  onClick={() => setRole('staff')}
                >
                  Staff
                </Button>
              </div>
            </div>

            <Button type="submit" className="w-full">Login</Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-center space-y-2">
          <Link 
            to="/forgot-password" 
            className="text-sm text-primary hover:text-primary/80 hover:underline"
          >
            Forgot your password?
          </Link>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Retail Management System
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
