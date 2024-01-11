import { useState, useEffect } from 'react';

export const DynamicSearch = ({ items }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchOptions, setSearchOptions] = useState([]);

  const getOptions = (word, transmittedItems) => {
    const regex = new RegExp(word, 'gi');
    
    return transmittedItems.filter((transmittedItem) => transmittedItem.name.match(regex));
  };

  const getDisplayItems = (transmittedItems) => {
    const options = getOptions(searchTerm, transmittedItems);

    const displayItems = options
      .map((displayItem) => {
        const regex = new RegExp(searchTerm, 'gi');
        const itemName = displayItem.name.replace(
          regex,
          `<span style="color: red;">${searchTerm}</span>`
        );

        return <li key={displayItem.id}><span dangerouslySetInnerHTML={{ __html: itemName }} /></li>; 
      })

    setSearchOptions(searchTerm ? displayItems : []);
  };

  useEffect(() => {
    displayItems(items);
  }, [searchTerm]);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        className="search"
        onChange={handleInputChange}
      />
      <ul className="options">{searchOptions}</ul>
    </div>
  );
};
