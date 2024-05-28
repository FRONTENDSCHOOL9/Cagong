import PropTypes from 'prop-types';
import styled from 'styled-components';

VisitorReview.propTypes = {
  review: PropTypes.object,
};

const StyledReview = styled.div`
  .review-list {
    margin: 20px 10px;
  }
  .review-user {
    margin-right: 10px;
    font-size: 1.6rem;
    font-weight: 600;
  }
  .review-createdAt {
    font-size: 1.2rem;
    font-weight: bold;
    color: #828282;
  }
  .review-content {
    margin-top: 20px;
    font-size: 1.4rem;
    line-height: 1.6;
  }
  .no-review {
    padding: 30px 10px;
    font-size: 1.4rem;
  }
`;

function VisitorReview({ review }) {
  return (
    <StyledReview>
      <div className="review">
        {review?.item.length !== 0 ? (
          <>
            {review?.item.map(item => (
              <div key={item._id} className="review-list">
                <span className="review-user">{item.user.name}</span>
                <span className="review-createdAt">{item.createdAt}</span>
                <p className="review-content">{item.content}</p>
              </div>
            ))}
          </>
        ) : (
          <p className="no-review">아직 작성된 리뷰가 없습니다.</p>
        )}
      </div>
    </StyledReview>
  );
}

export default VisitorReview;
