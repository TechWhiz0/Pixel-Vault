"use client"
import React, { useEffect, useState } from 'react';
import { BarChart, LineChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Bar, Line } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle, ArrowDown, ArrowUp, DollarSign, Package, ShoppingCart, Users } from 'lucide-react';
import { Alert, AlertDescription } from "@/components/ui/alert";

const Analytics = () => {
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [metrics, setMetrics] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    averageOrderValue: 0,
    totalCustomers: 0
  });

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const response = await fetch('/api/analytics');
      if (!response.ok) throw new Error('Failed to fetch analytics data');
      const data = await response.json();
      
      processData(data.data);
      setOrderData(data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const processData = (data) => {
    const totalRevenue = data.reduce((sum, order) => sum + order.products.price, 0);
    
    setMetrics({
      totalOrders: data.length,
      totalRevenue,
      averageOrderValue: totalRevenue / data.length,
      totalCustomers: new Set(data.map(order => order.users.email)).size
    });
  };

  const StatCard = ({ title, value, icon: Icon, trend }) => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {typeof value === 'number' ? 
            value.toLocaleString('en-US', {
              style: value.toString().includes('.') ? 'currency' : 'decimal',
              currency: 'USD',
              minimumFractionDigits: 0,
              maximumFractionDigits: 2
            }) : value}
        </div>
        {trend && (
          <p className="text-xs text-muted-foreground">
            {trend > 0 ? (
              <span className="text-green-600 flex items-center gap-1">
                <ArrowUp className="h-4 w-4" />
                {trend}% from last month
              </span>
            ) : (
              <span className="text-red-600 flex items-center gap-1">
                <ArrowDown className="h-4 w-4" />
                {Math.abs(trend)}% from last month
              </span>
            )}
          </p>
        )}
      </CardContent>
    </Card>
  );

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Error loading analytics: {error}
        </AlertDescription>
      </Alert>
    );
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-[200px]" />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-[120px]" />
          ))}
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {[...Array(2)].map((_, i) => (
            <Skeleton key={i} className="h-[300px]" />
          ))}
        </div>
      </div>
    );
  }

  const categoryData = Object.entries(
    orderData.reduce((acc, order) => {
      const category = order.products.category;
      acc[category] = (acc[category] || 0) + 1;
      return acc;
    }, {})
  ).map(([category, count]) => ({ category, count }));

  const timeSeriesData = orderData.reduce((acc, order) => {
    const date = new Date(order.order.created_at).toLocaleDateString();
    const existing = acc.find(item => item.date === date);
    if (existing) {
      existing.orders += 1;
      existing.revenue += order.products.price;
    } else {
      acc.push({ date, orders: 1, revenue: order.products.price });
    }
    return acc;
  }, []).sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h1>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Orders"
          value={metrics.totalOrders}
          icon={ShoppingCart}
          trend={12}
        />
        <StatCard
          title="Total Revenue"
          value={metrics.totalRevenue}
          icon={DollarSign}
          trend={8}
        />
        <StatCard
          title="Average Order Value"
          value={metrics.averageOrderValue}
          icon={Package}
          trend={-5}
        />
        <StatCard
          title="Total Customers"
          value={metrics.totalCustomers}
          icon={Users}
          trend={15}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Orders Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={timeSeriesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="orders" stroke="#8884d8" />
                <Line type="monotone" dataKey="revenue" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Orders by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {orderData.slice(0, 6).map((order, index) => (
              <div key={index} className="space-y-3">
                <div className="flex items-center gap-3">
                  <img
                    src={order.users.image}
                    alt={order.users.name}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium">{order.users.name}</p>
                    <p className="text-sm text-muted-foreground">{order.users.email}</p>
                  </div>
                </div>
                <div>
                  <p className="font-medium">{order.products.title}</p>
                  <p className="text-sm text-muted-foreground">{order.products.category}</p>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-bold">
                  ₹{order.products.price.toFixed(2)}
                  </span>
                  <a
                    href={order.products.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-700 text-sm"
                  >
                    View File
                  </a>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;