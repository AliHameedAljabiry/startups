import React from 'react';
import Form from 'next/form';
import SearchFormReset from './SearchFormReset';
import {Search} from 'lucide-react';
import { Button } from '@/components/ui/button';


interface SearchFormProps {
  query?: string;
}

const SearchForm: React.FC<SearchFormProps> = ({ query }) => {
  return (
    <Form action="/" scroll={false} className="search-form">
      <input
        type="text"
        defaultValue={query}
        name="query"
        placeholder="Search for ideas, entrepreneurs, or topics..."
        className="search-input"
      />
      <div className="flex gap-2">
        {query && <SearchFormReset />}

        <Button type="submit" className="search-btn text-white" title="Search">
          <Search aria-hidden="true" className='size-5'/>
          <span className="sr-only">Search</span>
        </Button>
      </div>
    </Form>
  );
};

export default SearchForm;