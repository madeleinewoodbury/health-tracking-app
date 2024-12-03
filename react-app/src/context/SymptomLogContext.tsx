/**
 * Symptom Log Context and Provider Component
 * Manages symptom logging functionality and state
 * Provides CRUD operations for symptom logs and related data
 */
import { createContext, useState, ReactNode } from "react";
import {
  SymptomLogContextType,
  SymptomLog,
  UserSymptomLog,
} from "../types/symptomLog";

/**
 * Context for symptom log state and operations
 * Provides symptom logs data and CRUD methods
 */
const SymptomLogContext = createContext<SymptomLogContextType | null>(null);

/**
 * Symptom Log Provider Component
 * Manages state and operations for symptom logging
 *
 * @param {Object} props - Component props
 * @param {ReactNode} props.children - Child components
 */
export const SymptomLogProvider = ({ children }: { children: ReactNode }) => {
  const [symptomLogs, setSymptomLogs] = useState<SymptomLog[]>([]);
  const [symptomLog, setSymptomLog] = useState<SymptomLog | null>(null);
  const [symptoms, setSymptoms] = useState([]);
  const [userSymptomLogs, setUserSymptomLogs] = useState<UserSymptomLog[]>([]);
  const [loading, setLoading] = useState(false);

  /**
   * Fetches all symptom logs for current user
   * Transforms API response into internal format
   */
  const fetchSymptomLogs = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("User not authenticated");
      }

      const response = await fetch("/server/api/user-symptom-log", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      // Transform API response into internal format
      const logs = data.data.map((log: any) => ({
        id: log.id,
        recordedAt: new Date(log.recordedAt),
        location: {
          city: log.location.city,
          state: log.location.state || null,
          country: log.location.country.name,
        },
        symptoms: log.userSymptomEntries.map((entry: any) => ({
          id: entry.symptom.id,
          name: entry.symptom.name,
          severity: entry.severity || null,
          description: entry.description || null,
          symptomStart: entry.symptomStart
            ? new Date(entry.symptomStart)
            : null,
          symptomEnd: entry.symptomEnd ? new Date(entry.symptomEnd) : null,
        })),
      }));

      setSymptomLogs(logs);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Fetches single symptom log by ID
   * @param {string} logId - ID of log to fetch
   */
  const fetchSymptomLog = async (logId: string) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("User not authenticated");
      }

      const response = await fetch(`/server/api/user-symptom-log/${logId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      const log = data.data;

      // Transform API response into internal format and set state
      setSymptomLog({
        id: log.id,
        recordedAt: new Date(log.recordedAt),
        updatedAt: new Date(log.updatedAt),
        location: {
          city: log.location.city,
          state: log.location.state || null,
          country: log.location.country.name,
        },
        symptoms: log.userSymptomEntries.map((entry: any) => ({
          id: entry.symptom.id,
          name: entry.symptom.name,
          severity: entry.severity || null,
          description: entry.description || null,
          symptomStart: entry.symptomStart
            ? new Date(entry.symptomStart)
            : null,
          symptomEnd: entry.symptomEnd ? new Date(entry.symptomEnd) : null,
        })),
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Creates new symptom log
   * @param {Object} formData - Log data to create
   * @returns {boolean} Success status
   */
  const createSymptomLog = async (formData) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("User not authenticated");
      }
      // Prepare request body
      const body = {
        location: {
          city: formData.city,
          ...(formData.state && { state: formData.state }),
          countryCode: formData.country,
        },
        symptoms: formData.symptoms.map((symptom) => ({
          id: symptom.id,
          ...(symptom.severity && { severity: symptom.severity }),
          ...(symptom.symptomStart && { symptomStart: symptom.symptomStart }),
          ...(symptom.symptomEnd && { symptomEnd: symptom.symptomEnd }),
          ...(symptom.description && { description: symptom.description }),
        })),
      };

      const response = await fetch("/server/api/user-symptom-log", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!response.ok) {
        // TODO: Display error message
        throw new Error("Failed to create symptom log");
      }

      // Update the symptom logs
      fetchSymptomLogs();

      return true;
    } catch (error) {
      console.error(error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Deletes current symptom log
   * Requires symptomLog state to be set
   */
  const deleteSymptomLog = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("User not authenticated");
      }

      const logId = symptomLog?.id;

      const response = await fetch(`/server/api/user-symptom-log/${logId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      setSymptomLog(null);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Fetches available symptoms list
   */
  const fetchSymptoms = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");
      const response = await fetch("/server/api/symptom", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      setSymptoms(data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Updates existing symptom log
   * @param {string} logId - ID of log to update
   * @param {Object} formData - Updated log data
   * @returns {boolean} Success status
   */
  const updateSymptomLog = async (logId: string, formData) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("User not authenticated");
      }

      // Prepare request body
      const body = {
        location: {
          city: formData.city,
          ...(formData.state && { state: formData.state }),
          countryCode: formData.country,
        },
        symptoms: formData.symptoms.map((symptom) => ({
          id: symptom.id,
          ...(symptom.severity && { severity: symptom.severity }),
          ...(symptom.symptomStart && { symptomStart: symptom.symptomStart }),
          ...(symptom.symptomEnd && { symptomEnd: symptom.symptomEnd }),
          ...(symptom.description && { description: symptom.description }),
        })),
      };

      const response = await fetch(`/server/api/user-symptom-log/${logId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      return true;
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Fetches symptom logs with user data
   * Used for reporting and analysis
   */
  const fetchUserSymptomLogs = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("User not authenticated");
      }

      const response = await fetch("/server/api/report/user-symptom-log", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      // Transform API response into internal format
      const logs = data.data.map((log: any) => ({
        id: log.id,
        recordedAt: new Date(log.recordedAt),
        location: {
          city: log.location.city,
          state: log.location.state || null,
          country: log.location.country.name,
        },
        user: {
          id: log.user.id,
          age: log.user.age,
          gender: log.user.gender,
          country: {
            name: log.user.country.name,
          },
        },
        symptoms: log.userSymptomEntries.map((entry: any) => ({
          id: entry.symptom.id,
          name: entry.symptom.name,
          severity: entry.severity || null,
          description: entry.description || null,
          symptomStart: entry.symptomStart
            ? new Date(entry.symptomStart)
            : null,
          symptomEnd: entry.symptomEnd ? new Date(entry.symptomEnd) : null,
        })),
      }));

      setUserSymptomLogs(logs);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Resets all state variables to initial values
   */
  const resetState = () => {
    setSymptomLogs([]);
    setSymptomLog(null);
    setSymptoms([]);
    setLoading(false);
    setUserSymptomLogs([]);
  };

  // Provide symptom log state and methods to children
  return (
    <SymptomLogContext.Provider
      value={{
        fetchUserSymptomLogs,
        fetchSymptomLogs,
        fetchSymptomLog,
        deleteSymptomLog,
        fetchSymptoms,
        createSymptomLog,
        updateSymptomLog,
        resetState,
        userSymptomLogs,
        symptomLogs,
        symptomLog,
        symptoms,
        loading,
      }}
    >
      {children}
    </SymptomLogContext.Provider>
  );
};

export default SymptomLogContext;
