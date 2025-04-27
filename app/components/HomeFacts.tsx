import styles from "./HomeFacts.module.css";
import { HomeFactsProps } from '../types';

const HomeFacts: React.FC<HomeFactsProps> = ({ homeFacts }) => {
  // Make sure homeFacts exists and has properties
  if (!homeFacts || Object.keys(homeFacts).length === 0) {
    return <div className={styles.facts}>No home data available</div>;
  }

  const hvacKnown = homeFacts.heating || homeFacts.ac;
  
  return (
    <div className={styles.facts}>
      <h1 className={styles.address}>{homeFacts.address}</h1>
      {homeFacts.address && homeFacts.city && homeFacts.state && homeFacts.zip && (
        <p>{homeFacts.city}, {homeFacts.state} {homeFacts.zip}</p>
      )}
      {homeFacts.bedrooms && <h2 className={styles.factTitle}>Bedrooms</h2>}
      <p>{homeFacts.bedrooms}</p>
      {homeFacts.bathrooms && <h2 className={styles.factTitle}>Bathrooms</h2>}
      <p>{homeFacts.bathrooms}</p> 
      {homeFacts.year_built && <h2 className={styles.factTitle}>Year Built</h2>}
      <p>{homeFacts.year_built}</p>
      {homeFacts.last_remodel && <h2 className={styles.factTitle}>Remodeled</h2>}
      <p>{homeFacts.last_remodel}</p>
      {homeFacts.sqft && <h2 className={styles.factTitle}>Square Footage</h2>}
      <p>{homeFacts.sqft}</p>
      {homeFacts.roof_area && <h2 className={styles.factTitle}>Roof Area</h2>}
      <p>{homeFacts.roof_area}</p>
      <div className={styles.HVAC}>
        {hvacKnown && <h1>HVAC</h1>}
        {homeFacts.heating && <h2 className={styles.factTitle}>Heating</h2>}
        <p>{homeFacts.heating}</p>
        {homeFacts.ac && <h2 className={styles.factTitle}>Cooling</h2>}
        <p>{homeFacts.ac}</p>
      </div>
    </div>
  );
};

export default HomeFacts;