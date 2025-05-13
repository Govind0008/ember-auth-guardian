
import { toast } from "sonner";

export type LoginRequestData = {
  email: string;
};

export type VerifyOtpRequestData = {
  email: string;
  otp: string;
};

export type AuthResponseData = {
  token: string;
  role: string;
};

const API_BASE_URL = "http://localhost:8080/api/v1";

class AuthService {
  // Request OTP for login
  async requestOtp(email: string, role: "admin" | "user"): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/${role}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Failed to request OTP");
      }

      toast.success("OTP sent successfully to your email");
      return true;
    } catch (error) {
      console.error("OTP request failed:", error);
      toast.error(error instanceof Error ? error.message : "Failed to request OTP");
      return false;
    }
  }

  // Verify OTP and get token
  async verifyOtp(
    email: string,
    otp: string,
    role: "admin" | "user"
  ): Promise<AuthResponseData | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/${role}/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "OTP verification failed");
      }

      const data = await response.json();
      // Store the token in localStorage
      localStorage.setItem("auth_token", data.token);
      localStorage.setItem("user_role", data.role);
      localStorage.setItem("user_email", email);
      
      toast.success("Login successful");
      return data;
    } catch (error) {
      console.error("OTP verification failed:", error);
      toast.error(error instanceof Error ? error.message : "OTP verification failed");
      return null;
    }
  }

  // Logout
  logout(): void {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user_role");
    localStorage.removeItem("user_email");
    toast.success("Logged out successfully");
  }

  // Get current auth token
  getAuthToken(): string | null {
    return localStorage.getItem("auth_token");
  }

  // Get user role
  getUserRole(): string | null {
    return localStorage.getItem("user_role");
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!this.getAuthToken();
  }

  // Get authenticated user email
  getUserEmail(): string | null {
    return localStorage.getItem("user_email");
  }
}

export default new AuthService();
