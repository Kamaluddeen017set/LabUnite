import '../styles/Search.css';

export default function Search({ query, setQuery, placeholder }) {
  return (
    <form className="search" onSubmit={e => e.preventDefault()}>
      <label>Search </label>
      <input
        value={query}
        onChange={e => setQuery(e.target.value)}
        type="text"
        placeholder={placeholder}
        maxLength={20}
        className="search-input"
      />
    </form>
  );
}
