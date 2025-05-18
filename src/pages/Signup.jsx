
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, User } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import WelcomeMessage from "@/components/WelcomeMessage";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState('staff');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [showWelcome, setShowWelcome] = useState(false);
  const [discountAmount, setDiscountAmount] = useState(0);
  const navigate = useNavigate();
  
  // Check for returning user on component mount
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    if (userData.name) {
      // Create random discount between 10-20%
      const discount = Math.floor(Math.random() * 11) + 10; // 10-20
      setDiscountAmount(discount);
      setShowWelcome(true);
      
      // Auto dismiss after 10 seconds
      setTimeout(() => {
        setShowWelcome(false);
      }, 10000);
    }
  }, []);

  const validateForm = () => {
    const newErrors = {};
    
    if (!name.trim()) newErrors.name = 'Name is required';
    
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Prepare user data for storage
      const userData = {
        name,
        email,
        userType,
        signupDate: new Date().toISOString(),
      };
      
      // Store in localStorage
      localStorage.setItem('userData', JSON.stringify(userData));
      
      // Log new signup for debugging
      console.log('New signup:', userData);
      
      // Show success toast
      toast({
        title: "Signup successful",
        description: `Welcome to our retail system, ${name}!`,
      });
      
      // Create random discount between 10-20%
      const discount = Math.floor(Math.random() * 11) + 10; // 10-20
      setDiscountAmount(discount);
      setShowWelcome(true);
      
      // Auto dismiss welcome message after 10 seconds
      setTimeout(() => {
        setShowWelcome(false);
        // Redirect to dashboard
        navigate('/');
      }, 10000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-light p-4">
      {showWelcome && (
        <WelcomeMessage 
          name={name || JSON.parse(localStorage.getItem('userData') || '{}').name} 
          discount={discountAmount}
          onClose={() => setShowWelcome(false)}
        />
      )}
      
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-2 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Create an Account</CardTitle>
          <CardDescription>Enter your information to get started</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input 
                  id="name" 
                  type="text" 
                  placeholder="John Doe" 
                  className="pl-10"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                {errors.name && <p className="text-xs text-danger mt-1">{errors.name}</p>}
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="name@example.com" 
                  className="pl-10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && <p className="text-xs text-danger mt-1">{errors.email}</p>}
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input 
                  id="password" 
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••" 
                  className="pl-3"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)} 
                  className="absolute right-3 top-2.5 text-muted-foreground hover:text-foreground"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
                {errors.password && <p className="text-xs text-danger mt-1">{errors.password}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="userType">Select Role</Label>
              <div className="grid grid-cols-3 gap-2">
                <Button
                  type="button"
                  variant={userType === 'owner' ? 'default' : 'outline'}
                  className={`px-3 py-2 h-auto ${userType === 'owner' ? 'bg-primary text-white' : ''}`}
                  onClick={() => setUserType('owner')}
                >
                  Owner
                </Button>
                <Button
                  type="button"
                  variant={userType === 'manager' ? 'default' : 'outline'}
                  className={`px-3 py-2 h-auto ${userType === 'manager' ? 'bg-primary text-white' : ''}`}
                  onClick={() => setUserType('manager')}
                >
                  Manager
                </Button>
                <Button
                  type="button"
                  variant={userType === 'staff' ? 'default' : 'outline'}
                  className={`px-3 py-2 h-auto ${userType === 'staff' ? 'bg-primary text-white' : ''}`}
                  onClick={() => setUserType('staff')}
                >
                  Staff
                </Button>
              </div>
            </div>

            <Button type="submit" className="w-full">Create Account</Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <div className="flex items-center justify-center w-full">
            <span className="text-sm text-muted-foreground">Already have an account?</span>
            <Link 
              to="/login" 
              className="text-sm text-primary hover:text-primary/80 hover:underline ml-2"
            >
              Log in
            </Link>
          </div>
          <p className="text-xs text-muted-foreground text-center">
            © {new Date().getFullYear()} Retail Management System
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Signup;
