import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/20/solid";

interface SearchInputProps {
  searchTerm?:string,
  setSearchTerm:(value:string) => void,
  placeHolder?:string
}


export default function SearchInput({
  searchTerm,
  setSearchTerm,
  placeHolder= 'Buscar ...'
}:SearchInputProps) {
  
  return (
    <div className=" mt-4 relative group ">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <MagnifyingGlassIcon className=" h-5 w-5 text-gray-400 group-focus-within:text-gray-500" />
      </div>
      <input
        type="text"
        name="search"
        className=" w-full p-2 pl-10 pr-10 rounded-xl border border-gray-300 focus:ring-2 focus:ring-gray-500 focus:border-transparent outline-none transition-all"
        placeholder={placeHolder}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {searchTerm &&
      (<button
          type="button"
          onClick={() => setSearchTerm("")}
          className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 transition-colors"
          title="Limpiar búsqueda"
        >
          <XMarkIcon className="h-5 w-5" />
        </button>)
      }
    </div>
  );
}
