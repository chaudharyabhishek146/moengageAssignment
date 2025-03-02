import { API_URL } from "../config";

const ResponseCodeCard = ({ code, description }) => {
  return (
    <div className="card" style={{ width: "18rem" }}>
      <img
        src={`${API_URL}/codes/${code}/image`}
        class="card-img-top"
        alt={`HTTP ${code}`} loading="lazy"
      />
      <div class="card-body">
        <h5 class="card-title">{code}</h5>
        <p class="card-text" title={description}>
          {description}
        </p>
        {/* <a href="#" class="btn btn-primary">Go somewhere</a> */}
      </div>
    </div>
  );
};

export default ResponseCodeCard;
