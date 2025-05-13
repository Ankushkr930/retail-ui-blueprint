
import React from 'react';
import Layout from '@/components/layout/Layout';
import Dashboard from './Dashboard';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="mb-4 flex justify-end px-4">
        <Button onClick={() => navigate('/login')}>
          Login
        </Button>
      </div>
      <Dashboard />
    </Layout>
  );
};

export default Index;
