import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

import { requestIngredientsMeals } from '../services/requestFoodsAPI';
import { infinity } from '../common/svgStore';
import IngredientCard from '../components/IngredientCard';

function ExploreFoodsByIngredients() {
  const [isLoading, setIsLoading] = useState(true);
  const [mealsIngredientsList, setMealsIngredientsList] = useState([]);

  useEffect(() => {
    async function setIngredientsList() {
      setIsLoading(true);
      const ingredientsList = await requestIngredientsMeals();
      setMealsIngredientsList(ingredientsList);
      setIsLoading(false);
    }
    setIngredientsList();
  }, []);

  return (
    <div className="div-foods">
      <Header label="Explorar Ingredientes" Search={ () => '' } />
      <br />
      <br />
      <br />
      {isLoading ? (
        <section className="loading-section">
          <img src={ infinity } className="loading-logo" alt="Infinity Logo" />
        </section>
      ) : (
        <div className="card-food">
          {mealsIngredientsList.map((ingredient, index) => (
            <IngredientCard
              key={ index }
              imagePath={ `https://www.themealdb.com/images/ingredients/${ingredient.strIngredient}-Small.png` }
              title={ ingredient.strIngredient }
              index={ index }
              page="comidas"
            />
          ))}
        </div>
      )}
      <br />
      <br />
      <br />
      <Footer />
    </div>
  );
}

export default ExploreFoodsByIngredients;
