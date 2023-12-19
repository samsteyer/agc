import styles from "./HomeFacts.module.css";

export default function HomeFacts({ homeFacts }) {
  return (
    <div className={styles.facts}>
      <h1>Home Facts</h1>
      {homeFacts.map((homeFact, index) => (
        <div key={index}>
          <h2>{homeFact.title.replace(homeFact.title[0], homeFact.title[0].toUpperCase())}</h2>
          <p>{homeFact.value}</p>
        </div>
      ))}
    </div>
  );
}
