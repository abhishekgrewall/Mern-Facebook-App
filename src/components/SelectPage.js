
import React from 'react';
import Select from 'react-select';

const SelectPage = ({ pages, onSelect }) => {
  const options = pages.map((page) => ({ value: page.id, label: page.name }));

  const handleChange = (selectedOption) => {
    onSelect(selectedOption.value);
  };

  return (
    <Select
      options={options}
      onChange={handleChange}
      placeholder="Select a Page"
    />
  );
};

export default SelectPage;
