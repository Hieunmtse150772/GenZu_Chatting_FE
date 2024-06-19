import { CiSearch } from "react-icons/ci";

const SearchInput = () => {
  return (
    <form className="flex items-center gap-2">
      <label
        htmlFor="default-search"
        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300"
      >
        Search
      </label>
      <div className="relative">
        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
          <CiSearch className="text-gray-500 dark:text-gray-400 w-6 h-6 outline-none" />
        </div>
        <input
          type="search"
          id="default-search"
          className="block py-2 px-6 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search chats..."
        />
      </div>
    </form>
  );
};

export default SearchInput;