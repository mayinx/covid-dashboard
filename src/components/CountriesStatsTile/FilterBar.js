export default function FilterBar({filterStats, fiteredCount, totalCount}) {
  return (
    <div className="FilterBar">
        <h4>Filter Countries</h4>
        <input name="countriesSearch" onChange={(e)=>filterStats(e)} />
      <h4 className="itemsCounter">Showing stats for {fiteredCount} / {totalCount} countries</h4>
    </div>
  );
}