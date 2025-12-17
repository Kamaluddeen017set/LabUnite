import { faSearch } from '@fortawesome/free-solid-svg-icons';
import '../styles/Search.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
export default function Search({ query, setQuery, placeholder }) {
  const icon = <FontAwesomeIcon icon={faSearch} />;
  return (
    <form className="search" onSubmit={e => e.preventDefault()}>
      <span className="search-icon">
        <FontAwesomeIcon icon={faSearch} />
      </span>

      <input
        value={query}
        onChange={e => setQuery(e.target.value)}
        type="text"
        maxLength={20}
        className="search-input"
        placeholder={placeholder}
      />
    </form>
  );
}
