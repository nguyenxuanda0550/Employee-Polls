import { Link } from 'react-router-dom';

const PollCard = ({ poll, author }) => {
  const date = new Date(poll.timestamp).toLocaleDateString();
  return (
    <div className="card" style={{ maxWidth: '18rem' }}>
      <div className="card-body text-center">
        {author?.avatarURL ? (
          <img src={author?.avatarURL} alt="avatar" className="card-img-top rounded-circle mx-auto d-block" style={{ width: '100px', height: '100px' }} />
        ) : (
          <img src="https://via.placeholder.com/450" alt="avatar" className="card-img-top rounded-circle mx-auto d-block" style={{ width: '100px', height: '100px' }} />
        )}
        <h5 className="card-title mt-3">{author?.name}</h5>
        <p className="card-text">Date: {date}</p>
        <Link
          to={`/questions/${poll.id}`}
          className="btn btn-primary"
        >
          Details
        </Link>
      </div>
    </div>
  );
};

export default PollCard;
