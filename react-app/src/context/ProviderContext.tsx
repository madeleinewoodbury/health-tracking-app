/**
 * Provider Context and Provider Component
 * Manages healthcare provider profile data and CRUD operations
 * Provides functionality to create, read, update and delete provider profiles
 */
import { createContext, useState, ReactNode } from "react";
import { ProviderContextType, ProviderProfile } from "../types/provider";

/**
 * Context for provider profile state and methods
 * Provides profile data and CRUD operations
 */
const ProviderContext = createContext<ProviderContextType | null>(null);

/**
 * Provider Profile Management Component
 * Handles state and operations for healthcare provider profiles
 *
 * @param {Object} props - Component props
 * @param {ReactNode} props.children - Child components
 */
export const ProviderProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(false);
  const [providerProfile, setProviderProfile] =
    useState<ProviderProfile | null>(null);

  /**
   * Fetches provider profile for current user
   * Requires authentication token
   */
  const getProviderProfile = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("User not authenticated");
      }

      const response = await fetch(`/server/api/provider/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      setProviderProfile(data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Creates new provider profile
   * @param {Object} formData - Provider profile data
   * @returns {boolean} Success status
   */
  const createProviderProfile = async (formData) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("User not authenticated");
      }

      const response = await fetch("/server/api/provider", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      setProviderProfile(data.data);

      return true;
    } catch (error) {
      console.error(error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Updates existing provider profile
   * @param {Object} formData - Updated profile data
   * @returns {boolean} Success status
   */
  const updateProviderProfile = async (formData) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("User not authenticated");
      }

      if (!providerProfile) {
        throw new Error("Provider profile not found");
      }

      const response = await fetch(
        `/server/api/provider/${providerProfile.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      setProviderProfile(data.data);

      return true;
    } catch (error) {
      console.error(error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Deletes provider profile
   * Removes profile data and updates state
   */
  const deleteProviderProfile = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("User not authenticated");
      }

      if (!providerProfile) {
        throw new Error("Provider profile not found");
      }

      const response = await fetch(
        `/server/api/provider/${providerProfile.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      setProviderProfile(null);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Provide provider profile state and CRUD methods to children
  return (
    <ProviderContext.Provider
      value={{
        loading,
        providerProfile,
        getProviderProfile,
        createProviderProfile,
        updateProviderProfile,
        deleteProviderProfile,
      }}
    >
      {children}
    </ProviderContext.Provider>
  );
};

export default ProviderContext;
