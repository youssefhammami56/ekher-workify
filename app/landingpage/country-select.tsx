"use client";
import useCountries from "@/hooks/useCountries";
import dynamic from "next/dynamic";
import React, { useMemo } from "react";
import Select from "react-select";

export type CountrySelectValue = {
  id?: string;
  userId?: string;
  flag: string;
  label: string;
  value: string;
  region: string;
  lalng: number[];
};
interface CountrySelectProps {
  value?: CountrySelectValue;
  onChange: (value: CountrySelectValue) => void;
}
export const CountrySelect = ({ value, onChange }: CountrySelectProps) => {
  const Map = useMemo(
    () =>
      dynamic(() => import("./Map"), {
        loading: () => <p>loading...</p>,
        ssr: false,
      }),
    [value]
  );

  const { getAll } = useCountries();
  return (
    <div>
      <div className=" mb-32">
        <Select
          options={getAll()}
          value={value}
          placeholder="Select your country"
          onChange={(value) => onChange(value as CountrySelectValue)}
          formatOptionLabel={(option) => (
            <div className="flex flex-row items-center gap-3">
              <div>{option.flag}</div>
              <div>
                {option.label},
                <span className="text-gray-400">{option.region}</span>
              </div>
            </div>
          )}
        />
      </div>
      <div>
        <Map center={value?.lalng} />
      </div>
    </div>
  );
};
