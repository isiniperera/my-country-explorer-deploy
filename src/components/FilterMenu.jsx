export default function FilterMenu({ onSelectRegion }) {
    const regions = ["Africa", "Americas", "Asia", "Europe", "Oceania"];
  
    return (
      <select className="p-2 border rounded" onChange={(e) => onSelectRegion(e.target.value)}>
        <option value="">All Regions</option>
        {regions.map((region) => (
          <option key={region} value={region}>{region}</option>
        ))}
      </select>
    );
  }
  