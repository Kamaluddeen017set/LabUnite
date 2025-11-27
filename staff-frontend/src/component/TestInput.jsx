'use client';
import { useEffect, useRef, useState } from 'react';
import '../styles/TestInput.css';
export default function TestInput({ groups, onSelect, setQ }) {
  const [query, setQuery] = useState('');
  const [flatList, setFlatList] = useState([]);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const [open, setOpen] = useState(false);
  const inputRef = useRef(null);
  const ListRef = useRef(null);
  const itemsRef = useRef([]);
  useEffect(() => {
    const all = [];
    groups.forEach(group => {
      group.tests.forEach(test => {
        all.push({ ...test, category: group.category });
      });
    });
    setFlatList(all);
  }, [groups]);

  const filtered = flatList.filter(item =>
    item.label.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (highlightIndex >= 0 && itemsRef.current[highlightIndex]) {
      itemsRef.current[highlightIndex].scrollIntoView({
        block: 'nearest',
      });
    }
  }, [highlightIndex]);

  const handleKeyDown = e => {
    if (e.key === 'Escape') {
      setOpen(false);
      return;
    }
    if (!open) {
      if (e.key === 'ArrowDown') {
        setOpen(true);
        setHighlightIndex(0);
      }
      return;
    }

    if (e.key === 'ArrowDown') {
      setHighlightIndex(prev => (prev + 1 >= filtered.length ? 0 : prev + 1));
    } else if (e.key === 'ArrowUp') {
      setHighlightIndex(prev =>
        prev - 1 < 0 ? filtered.length - 1 : prev - 1
      );
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (highlightIndex >= 0 && filtered.length > 0) {
        const item = filtered[highlightIndex];
        setQ ? setQuery(item.label) : setQuery('');
        setOpen(false);
        onSelect(item);
      }
    }
  };
  return (
    <div className="combobox">
      <input
        ref={inputRef}
        tabIndex={0}
        type="text"
        placeholder="Search test..."
        value={query}
        onChange={e => {
          setQuery(e.target.value);
          setOpen(true);
          setHighlightIndex(filtered.length > 0 ? 0 : -1);
        }}
        onClick={() => setOpen(true)}
        onKeyDown={handleKeyDown}
        className="combobox-input"
      />
      {open && (
        <div className="combobox-list">
          {filtered.length === 0 && (
            <div className="combobox-empty">No Test Found</div>
          )}
          {groups.map(group => {
            const groupFiltered = filtered.filter(
              item => item.category === group.category
            );
            if (groupFiltered.length === 0) return null;

            return (
              <div key={group.category}>
                <div className="combobox-category">{group.category}</div>
                {groupFiltered.map((item, index) => {
                  const globalIndex = filtered.indexOf(item);

                  return (
                    <div
                      key={item.value}
                      ref={el => (itemsRef.current[globalIndex] = el)}
                      className={`combobox-item ${
                        highlightIndex === globalIndex ? 'highlighted' : ''
                      }`}
                      onClick={() => {
                        setQ ? setQuery(item.label) : setQuery('');
                        setOpen(false);
                        onSelect(item);
                      }}
                    >
                      {item.label}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
