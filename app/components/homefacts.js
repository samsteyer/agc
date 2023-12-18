import styles from "./homefacts.module.css";

export default function HomeFacts({ homeFacts }) {
  return (
    <div className={styles.facts}>
      <h1>Home Facts</h1>
      {homeFacts.map((homeFact) => (
        <div key={homeFact.id}>
          <h2>{homeFact.title}</h2>
          <p>{homeFact.value}</p>
        </div>
      ))}
    </div>
  );
}
