import '../styles/Search.css';

export default function Search({ query, setQuery }) {
  return (
    <form className="search" onSubmit={e => e.preventDefault()}>
      <label>Search </label>
      <input
        value={query}
        onChange={e => setQuery(e.target.value)}
        type="text"
        placeholder="Enter Name, Phone Or Id"
        maxLength={20}
        className="search-input"
      />
    </form>
  );
}
