export const renderRatingStars = (rating: number) => {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    stars.push(
      <span
        key={i}
        style={{
          color: i < rating ? "#FFD700" : "#E0E0E0",
          fontSize: "25px",
        }}>
        ★
      </span>
    );
  }
  return <div>{stars}</div>;
};
