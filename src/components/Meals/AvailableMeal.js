import classes from './AvailableMeal.module.css';
import MealItem from "./MealItems/MealItem";
import Card from '../UI/Card';
import { useEffect, useState } from 'react';



const AvailableMeal=()=>{

  const [meals, setMeals] = useState([]);
  const [isError, setError] = useState(null);
  const [isLoading,setIsLoading]=useState(true);

  useEffect(() => {
    const getMeals = async () => {
      try {
        const response =await fetch(
          "https://food-order-6cae6-default-rtdb.firebaseio.com/meals.json"
        );
        if (!response.ok) {
          throw new Error("Something went wrong");
        }
        const data =await response.json();
        let loadedMeals = [];
        for (let key in data) {
          loadedMeals.push({
            id: key,
            name: data[key].name,
            imag: data[key].imag,
            description: data[key].description,
            price: data[key].price,
          });
        }
        setMeals(loadedMeals);
      } catch (error) {
        setError(error.message);
      }
      setIsLoading(false);
    };
    getMeals();
  }, []);
    if(isLoading){
      return (
        <section className={classes.MealsLoading}>
          <p>Loading....</p>
        </section>
      );
    }
    if (isError) {
      return (
        <section className={classes.MealsError}>
          <p>{isError}</p>
        </section>
      );
    }
    const mealsList=meals.map((meal)=>(<MealItem imag={meal.imag}id={meal.id} key={meal.id} title={meal.name} price={meal.price} description={meal.description}/>));
    return(
        <section className={classes.meals}>
            <Card>
                <ul>
                    {mealsList}
                </ul>
            </Card>
        </section>
    )
};

export default AvailableMeal; 