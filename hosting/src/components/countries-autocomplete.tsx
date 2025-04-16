import { Autocomplete, Error, Icon } from '@shopify/polaris';
import { SearchIcon } from '@shopify/polaris-icons';
import { useState, useCallback, useMemo } from 'react';
import countryCode from '../../../functions/src/countryCode.json';

type Section = {
  title: string;
  options: {
    value: string;
    label: string;
  }[];
};

export default function CountriesAutocomplete({ label, error, onSelect }: { label?: string, error?: Error | boolean, onSelect?: (selected: string[]) => void }) {
  const deselectedOptions = useMemo((): Section[] => countryCode, []);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState(deselectedOptions);

  const updateText = useCallback(
    (value: string) => {
      setInputValue(value);

      if (value === '') {
        setOptions(deselectedOptions);
        return;
      }

      const filterRegex = new RegExp(value, 'i');
      const resultOptions: Section[] = [];

      deselectedOptions.forEach((opt) => {
        const options = opt.options.filter((option) =>
          option.label.match(filterRegex),
        );

        resultOptions.push({
          title: opt.title,
          options,
        });
      });

      setOptions(resultOptions);
    },
    [deselectedOptions],
  );

  const updateSelection = useCallback(
    (selected: string[]) => {
      let selectedValue: string | undefined;

      options.forEach(({ options }) => {
        if (selectedValue) {
          return;
        }

        const matchedOption = options.find((option) =>
          option.value.match(selected[0]),
        );

        if (matchedOption) {
          selectedValue = matchedOption.label;
        }
      });

      setSelectedOptions(selected);
      onSelect?.(selected);
      setInputValue(selectedValue ? selectedValue : '');
    },
    [options, onSelect],
  );

  const textField = (
    <Autocomplete.TextField
      onChange={updateText}
      label={label}
      value={inputValue}
      prefix={<Icon source={SearchIcon} tone="base" />}
      placeholder="Search"
      autoComplete="off"
      error={error}
    />
  );

  return (
    <Autocomplete
      textField={textField}
      selected={selectedOptions}
      options={options}
      onSelect={updateSelection}
    />
  );
}