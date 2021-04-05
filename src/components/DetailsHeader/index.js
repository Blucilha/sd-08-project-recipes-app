import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Alert, Col, Container, Row } from 'react-bootstrap';
import copy from 'clipboard-copy';
import { useParams, useRouteMatch } from 'react-router';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import shareIcon from '../../images/shareIcon.svg';
import { getlocalStorage } from '../../services/localStorage';
// import { Container } from './styles';

function DetailsHeader(props) {
  const { title, imgSrc, category, alcoholic } = props;
  const [useRecipeIsFavorite, setUseRecipeIsFavorite] = useState(false);
  const [useShow, setUseShow] = useState(false);
  const { id: idPage } = useParams();
  const { path } = useRouteMatch();
  useEffect(() => {
    const verifyDoneStorage = () => {
      const favoriteRecipes = getlocalStorage('favoriteRecipes');
      const isFavorite = favoriteRecipes && favoriteRecipes.some(
        ({ id }) => id === idPage,
      );
      setUseRecipeIsFavorite(isFavorite);
    };
    verifyDoneStorage();
  }, [idPage, path]);
  function copyUrl() {
    const urlSite = document.URL;
    copy(urlSite);
    setUseShow(true);
  }
  return (
    <>
      <Container className="fluid p-0">
        <img
          src={ imgSrc }
          alt={ title }
          className="img-fluid"
          data-testid="recipe-photo"
        />
      </Container>
      <Container className="mt-3">
        <Row>
          <Col xs="8">
            <h2 data-testid="recipe-title" className="mb-0">{title}</h2>
          </Col>
          <Col xs="4">
            <input
              type="image"
              src={ shareIcon }
              alt="Share Button"
              className="mr-2"
              data-testid="share-btn"
              onClick={ copyUrl }
            />
            <input
              type="image"
              src={ useRecipeIsFavorite ? blackHeartIcon : whiteHeartIcon }
              alt="Favorite Button"
              data-testid="favorite-btn"
            />
          </Col>
        </Row>
        <h5 className="text-muted" data-testid="recipe-category">
          {alcoholic || category}
        </h5>
      </Container>
      { useShow && (
        <Alert onClick={ () => setUseShow(false) } variant="success">
          Link copiado!
        </Alert>
      )}
    </>
  );
}

DetailsHeader.defaultProps = {
  alcoholic: '',
};

DetailsHeader.propTypes = {
  title: PropTypes.string.isRequired,
  imgSrc: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  alcoholic: PropTypes.string,
};
export default DetailsHeader;
