export default function AddHomeForm ({ onSubmit }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const homeData = Object.fromEntries(formData);
    onSubmit(homeData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="homeName">Home Name:</label>
      <input id="homeName" name="homeName" type="text" required />

      {/* Add more fields as necessary */}

      <button type="submit">Create Home</button>
    </form>
  );
};
