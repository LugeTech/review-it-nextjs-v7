
import SearchComponent from '@/app/components/SearchComponent';
import ProductListLoader from '@/app/components/ProductListLoader'; // Import the loader component
import { iProduct } from '@/app/util/Interfaces';

const Search: React.FC = () => {

  return (
    <div className="flex flex-col pt-8 bg-myTheme-light dark:bg-myTheme-dark h-full w-full items-center justify-start">
      <ProductListLoader />
      <SearchComponent />
    </div>
  );
};

export default Search;
