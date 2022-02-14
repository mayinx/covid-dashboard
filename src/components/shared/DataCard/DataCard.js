import "./styles.css";

export default function DataCard({title, data}){
 return  (<div className="DataCard">
    <div>{title}</div>
    <h3>{data}</h3>
  </div>)


}