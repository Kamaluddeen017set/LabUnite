import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../styles/Stat.css';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
export default function Stats({ data }) {
  return (
    <div className={`${data.className} stats`}>
      <div
        className="Icons"
        style={{ background: data.color1, color: data.color2 }}
      >
        {data.icon}
      </div>
      <h3>{data.title}</h3>
      <div className="numtext">
        <span>{data.num}</span>
        <a href={data.url}>
          {data.text} <FontAwesomeIcon icon={faArrowRight} />
        </a>
      </div>
    </div>
  );
}
