import React, { useState, useEffect } from "react";
import { Detail, List } from "@raycast/api";

import data from "./data.json";

// Debounce hook
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

type Currency = {
  name: string;
  code: string;
}

type Country = {
  name: string;
  iso2: string;
  iso3: string;
  flag: string;
  currencies: Currency[];
}

const ListItemWithDetails = ({ country }: { country: Country }) => (
  <List.Item
    icon={country.flag}
    title={country.name}
    detail={<List.Item.Detail metadata={
      <Detail.Metadata>
        <Detail.Metadata.Label title="Country" text={country.name} />
        <Detail.Metadata.Label title="ISO-2" text={country.iso2} />
        <Detail.Metadata.Label title="ISO-3" text={country.iso3} />
        <List.Item.Detail.Metadata.Separator />
        {country.currencies.map(currency => (
          <Detail.Metadata.Label
            key={`${country.name}-currency-${currency.code}`}
            title="Currency"
            text={`${currency.name} (${currency.code})`}
          />
        ))}
      </Detail.Metadata>
    } />}
  />
)

export default function Command() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 300); // 300ms debounce
  const [filteredListByIso2, setFilteredListByIso2] = useState<Country[]>([]);
  const [filteredListByIso3, setFilteredListByIso3] = useState<Country[]>([]);
  const [filteredListByName, setFilteredListByName] = useState<Country[]>(data);
  const [filteredListByCurrencyCode, setFilteredListByCurrencyCode] = useState<Country[]>(data);

  useEffect(() => {
    setFilteredListByIso2([]);
    setFilteredListByIso3([]);
    setFilteredListByCurrencyCode([]);
    setFilteredListByName(data);

    if (debouncedQuery.length === 2) {
      // If the query is exactly 2 characters, filter by ISO-2, ISO-3 and currency codes
      const iso2results = data.filter((item) => item.iso2.toLowerCase() === debouncedQuery);
      setFilteredListByIso2(iso2results);
      const iso3results = data.filter((item) => item.iso3.toLowerCase().includes(debouncedQuery));
      setFilteredListByIso3(iso3results);
      const currencyCodeResults = data.filter((item) => item.currencies.some(c => c.code.toLowerCase().includes(debouncedQuery)));
      setFilteredListByCurrencyCode(currencyCodeResults);
    }

    if (debouncedQuery.length === 3) {
      setFilteredListByIso2([]);
      // If the query is exactly 3 characters, filter by ISO-3 code
      const iso3results = data.filter((item) => item.iso3.toLowerCase() === debouncedQuery);
      setFilteredListByIso3(iso3results);
      const currencyCodeResults = data.filter((item) => item.currencies.some(c => c.code.toLowerCase() === debouncedQuery));
      setFilteredListByCurrencyCode(currencyCodeResults);
    }

    setFilteredListByName(data.filter((item) => item.name.toLowerCase().includes(debouncedQuery)));
  }, [debouncedQuery]);

  return (
    <List isShowingDetail onSearchTextChange={setQuery} searchBarPlaceholder="Search by country name, ISO-2, or ISO-3 code">
      {filteredListByIso2.length > 0 && (
        <List.Section title="ISO-2 Results">
          {filteredListByIso2.map((country) => (
            <ListItemWithDetails
              key={`iso2-result-${country.name}`}
              country={country}
            />
          ))}
        </List.Section>
      )}
      {filteredListByIso3.length > 0 && (
        <List.Section title="ISO-3 Results">
          {filteredListByIso3.map((country) => (
            <ListItemWithDetails
              key={`iso3-result-${country.name}`}
              country={country}
            />
          ))}
        </List.Section>
      )}
      {filteredListByCurrencyCode.length > 0 && (
        <List.Section title="Currency Code Results">
          {filteredListByCurrencyCode.map((country) => (
            <ListItemWithDetails
              key={`currency-code-result-${country.name}`}
              country={country}
            />
          ))}
        </List.Section>
      )}
      <List.Section title="Name Results">
        {filteredListByName.map((country) => (
            <ListItemWithDetails
              key={`country-name-${country.name}`}
              country={country}
            />
          ))}
      </List.Section>
    </List>
  );
}
