import "./styles.css";

export default function DataCard({title, data}){
 return  (<div className="DataCard">
    <div className="DataCard__title">{title}</div>
    <div className="DataCard__data">{data?.toLocaleString()}</div>
  </div>)
}