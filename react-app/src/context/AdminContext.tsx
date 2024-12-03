/**
 * Admin Context and Provider Component
 * Manages administrative functionality and analytics data
 * Provides methods for fetching user activity, geographic data, and symptom patterns
 */
import { createContext, useState, ReactNode } from "react";
import {
  AdminContextType,
  UserActvity,
  SymptomByLocation,
  Symptom,
} from "../types/admin";

/**
 * Context for administrative operations and data
 * Provides analytics data and fetching methods
 */
const AdminContext = createContext<AdminContextType | null>(null);

/**
 * Admin Provider Component
 * Manages state and operations for administrative functions
 *
 * @param {Object} props - Component props
 * @param {ReactNode} props.children - Child components
 */
export const AdminProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(false);
  const [userActivity, setUserActivity] = useState<UserActvity[]>([]);
  const [symptomsByLocation, setSymptomsByLocation] = useState<
    SymptomByLocation[]
  >([]);
  const [symptomPatterns, setSymptomPatterns] = useState<Symptom[]>([]);

  /**
   * Fetches user activity data for a date range
   * @param {string} startDate - Start of date range
   * @param {string} endDate - End of date range
   */
  const fetchUserActivity = async (startDate: string, endDate: string) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("No token found");
      }

      const params = new URLSearchParams({ startDate, endDate });

      const response = await fetch(`/server/admin/activity?${params}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user activity");
      }

      const data = await response.json();
      setUserActivity(data);
    } catch (error) {
      console.error("Error fetching user activity:", error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Fetches symptom data for specific location
   * @param {string} country - Country name
   * @param {string} city - City name
   * @param {string|null} state - Optional state name
   */
  const fetchSymptomsByLocation = async (
    country: string,
    city: string,
    state: string | null = null
  ) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("No token found");
      }

      const params = new URLSearchParams({ country, city });
      if (state) {
        params.append("state", state);
      }

      const response = await fetch(`/server/admin/geographic?${params}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch symptoms by location");
      }

      const data = await response.json();
      setSymptomsByLocation(data.symptoms);
    } catch (error) {
      console.error("Error fetching symptoms by location:", error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Fetches symptom correlation patterns
   * @param {string} symptom - Base symptom to analyze patterns for
   */
  const fetchSymptomPatterns = async (symptom: string) => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }

      const params = new URLSearchParams({ symptom });

      const response = await fetch(`/server/admin/symptoms?${params}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch symptom patterns");
      }

      const data = await response.json();
      setSymptomPatterns(data);
    } catch (error) {
      console.error("Error fetching symptom patterns:", error);
    } finally {
      setLoading(false);
    }
  };

  // Provide context values and methods to children
  return (
    <AdminContext.Provider
      value={{
        fetchUserActivity,
        fetchSymptomsByLocation,
        fetchSymptomPatterns,
        loading,
        userActivity,
        symptomsByLocation,
        symptomPatterns,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export default AdminContext;
