import PropTypes from 'prop-types';
import styled from 'styled-components';

ProductIntro.propTypes = {
  data: PropTypes.object,
};

const IntroStyle = styled.div`
  .desc-bundle {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  .desc {
    font-size: 1.4rem;
    font-weight: 400;
    line-height: 2;
    padding: 0px 10px;
    font-style: italic;
  }
  .desc-left {
    padding-top: 10px;
    font-size: 3rem;
  }
  .desc-right {
    font-size: 3rem;
    margin-left: auto;
  }
`;

function ProductIntro({ data }) {
  return (
    <IntroStyle>
      <div className="desc-bundle">
        <span className="desc-left"> ❝ </span>
        <p className="desc">{data.item.extra.description}</p>
        <span className="desc-right"> ❞ </span>
      </div>
    </IntroStyle>
  );
}

export default ProductIntro;
