import { type Review } from './Sandbox';

type ListProps = {
  reviews: Reviews[];
};

const List = ({ reviews }: ListProps) => {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold">Reviews</h2>
      {reviews.length === 0 ? (
        <p>No reviews yet</p>
      ) : (
        reviews.map((el, index) => (
          <article key={index} className="border p-4 rounded mb-4">
            <div className="font-bold">{el.email}</div>
            <div className="text-yellow-500">
              {'⭐'.repeat(Number(el.rating))}
            </div>
            <p className="mt-2">{el.text}</p>
          </article>
        ))
      )}
    </div>
  );
};

export default List;
