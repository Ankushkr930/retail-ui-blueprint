
import React from 'react';
import Layout from '@/components/layout/Layout';
import Dashboard from './Dashboard';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem('userData') || '{}');

  return (
    <Layout>
      <div className="mb-4 flex justify-end px-4 gap-2">
        {userData.name ? (
          <div className="flex items-center gap-2">
            <span className="text-sm">Welcome, {userData.name}</span>
            <Button variant="outline" onClick={() => {
              localStorage.removeItem('userData');
              window.location.reload();
            }}>
              Logout
            </Button>
          </div>
        ) : (
          <>
            <Button variant="outline" onClick={() => navigate('/signup')}>
              Sign Up
            </Button>
            <Button onClick={() => navigate('/login')}>
              Login
            </Button>
          </>
        )}
      </div>
      <Dashboard />
    </Layout>
  );
};

export default Index;
