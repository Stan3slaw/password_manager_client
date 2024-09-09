import { debounce } from 'lodash';
import { Search } from 'lucide-react';
import React, { useCallback, useState } from 'react';

import { DEBOUNCE_DURATION } from '@/cdk/constants/general.constants';
import { Input } from '@/components/ui/input';

interface SearchInputProps {
  onChange: (query: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ onChange }) => {
  const [searchText, setSearchText] = useState('');

  const debouncedSearch = useCallback(
    debounce((searchText: string) => {
      onChange(searchText);
    }, DEBOUNCE_DURATION),
    []
  );

  function handleInputChange(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void {
    setSearchText(e.target.value);
    debouncedSearch(e.target.value);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>): void {
    if (e.key === 'Enter') {
      debouncedSearch.cancel();
      onChange(searchText);
    }
  }

  return (
    <div className='w-full mr-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='relative'>
        <Search className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
        <Input placeholder='Search' className='pl-8' onChange={handleInputChange} onKeyDown={handleKeyDown} />
      </div>
    </div>
  );
};

export default SearchInput;
