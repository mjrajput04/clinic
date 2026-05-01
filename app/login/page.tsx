'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AlertCircle, Mail, Phone, Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { login, loginWithPhone, getOTP, isLoading, isAuthenticated, user } = useAuth();

  const [authMode, setAuthMode] = useState<'email' | 'phone'>('email');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  // Email mode state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Phone mode state
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      router.push(user.role === 'admin' ? '/admin' : '/dashboard');
    }
  }, [isAuthenticated, user, router]);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      const loggedInUser = await login(email, password);
      router.push(loggedInUser.role === 'admin' ? '/admin' : '/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    }
  };

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!phone) {
      setError('Please enter your phone number');
      return;
    }

    try {
      await getOTP(phone);
      setOtpSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send OTP');
    }
  };

  const handlePhoneLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!phone || !otp) {
      setError('Please fill in all fields');
      return;
    }

    try {
      const loggedInUser = await loginWithPhone(phone, otp);
      router.push(loggedInUser.role === 'admin' ? '/admin' : '/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 border-border/50 bg-card/50 backdrop-blur-sm">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-secondary mb-4">
            <span className="text-white font-bold text-lg">C</span>
          </div>
          <h1 className="text-2xl font-bold mb-2">ClinixAI</h1>
          <p className="text-muted-foreground text-sm">Healthcare Intelligence Platform</p>
        </div>

        {/* Auth Mode Tabs */}
        <div className="flex gap-2 mb-6 bg-muted/30 p-1 rounded-lg">
          <button
            onClick={() => {
              setAuthMode('email');
              setError('');
              setOtpSent(false);
            }}
            className={`flex-1 py-2 px-4 rounded-md transition-all text-sm font-medium flex items-center justify-center gap-2 ${
              authMode === 'email'
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Mail className="h-4 w-4" />
            Email
          </button>
          <button
            onClick={() => {
              setAuthMode('phone');
              setError('');
              setOtpSent(false);
            }}
            className={`flex-1 py-2 px-4 rounded-md transition-all text-sm font-medium flex items-center justify-center gap-2 ${
              authMode === 'phone'
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Phone className="h-4 w-4" />
            Phone
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-destructive/10 border border-destructive/30 rounded-lg flex gap-2">
            <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
            <p className="text-sm text-destructive">{error}</p>
          </div>
        )}

        {/* Email Login Form */}
        {authMode === 'email' && (
          <form onSubmit={handleEmailLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Email Address</label>
              <Input
                type="email"
                placeholder="doctor@clinic.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  className="w-full pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>
        )}

        {/* Phone Login Form */}
        {authMode === 'phone' && (
          <form onSubmit={otpSent ? handlePhoneLogin : handleSendOTP} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Phone Number</label>
              <Input
                type="tel"
                placeholder="+1-555-0101"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                disabled={isLoading || otpSent}
                className="w-full"
              />
            </div>

            {otpSent && (
              <div>
                <label className="block text-sm font-medium mb-2">OTP Code</label>
                <Input
                  type="text"
                  placeholder="123456"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  disabled={isLoading}
                  className="w-full"
                  maxLength={6}
                />
                <p className="text-xs text-muted-foreground mt-2">
                  Demo OTP: 123456
                </p>
              </div>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90"
            >
              {isLoading
                ? 'Processing...'
                : otpSent
                  ? 'Verify OTP'
                  : 'Send OTP'}
            </Button>

            {otpSent && (
              <button
                type="button"
                onClick={() => setOtpSent(false)}
                className="w-full text-sm text-muted-foreground hover:text-foreground py-2"
              >
                Back
              </button>
            )}
          </form>
        )}

        {/* Demo Credentials */}
        <div className="mt-8 pt-6 border-t border-border/30">
          <p className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
            Demo Credentials
          </p>
          <div className="space-y-2 text-xs">
            <div className="bg-muted/20 p-2 rounded">
              <p className="font-medium">Doctor:</p>
              <p className="text-muted-foreground">doctor@clinic.com / demo123</p>
            </div>
            <div className="bg-muted/20 p-2 rounded">
              <p className="font-medium">Admin:</p>
              <p className="text-muted-foreground">admin@clinic.com / demo123</p>
            </div>
            <div className="bg-muted/20 p-2 rounded">
              <p className="font-medium">Phone:</p>
              <p className="text-muted-foreground">+1-555-0101 / OTP: 123456</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
