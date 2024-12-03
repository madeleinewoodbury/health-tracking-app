/**
 * Country Context and Provider for managing country data
 * Provides functionality to fetch and store country information
 */
import { createContext, useState, ReactNode } from "react";
import { CountryContextType, Country } from "../types/country";

/**
 * Context for country state and methods
 * Provides list of countries and fetch method
 */
const CountryContext = createContext<CountryContextType | null>(null);

/**
 * Country Provider Component
 * Manages country state and provides fetch method to children
 *
 * @param {Object} props - Component props
 * @param {ReactNode} props.children - Child components
 */
export const CountryProvider = ({ children }: { children: ReactNode }) => {
  const [countries, setCountries] = useState<Country[]>([]);

  /**
   * Fetches list of countries from the API
   * Updates countries state with fetched data
   */
  const fetchCountries = async () => {
    try {
      const response = await fetch("/server/api/country");
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      setCountries(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Provide country state and fetch method to children
  return (
    <CountryContext.Provider value={{ countries, fetchCountries }}>
      {children}
    </CountryContext.Provider>
  );
};

export default CountryContext;
