import classes from './AvailableMeal.module.css';
import MealItem from "./MealItems/MealItem";
import Card from '../UI/Card';

const DUMMY_MEALS = [
  {
    id: "m1",
    imag: "http://www.theterracekitchen.in/wp-content/uploads/2019/07/048.-Chicken-Momos_545X545.png",
    name: "Momos",
    description:
      "Momo stuffed with freshly chopped Vegetable’s, herbs and Tinch of Spices.",
    price: 100,
  },
  {
    id: "m2",
    imag: "https://www.vegrecipesofindia.com/wp-content/uploads/2020/12/burger-recipe-3.jpg",
    name: "Burger",
    description: "veg burger with crispy patties, veggies & a tangy sauce",
    price: 80,
  },
  {
    id: "m3",
    imag: "https://hot-thai-kitchen.com/wp-content/uploads/2021/11/chili-garlic-noodles-blog.jpg",
    name: "Noodles",
    description: "Wok tossed noodles with shredded vegetables",
    price: 110,
  },
  {
    id: "m4",
    imag: "https://static.toiimg.com/thumb/54714340.cms?imgsize=458099&width=800&height=800",
    name: "Grilled Sandwich",
    description: "A classic melty grilled cheese sandwich with fries and dip",
    price: 100,
  },
];

const AvailableMeal=()=>{
    const mealsList=DUMMY_MEALS.map((meal)=>(<MealItem imag={meal.imag}id={meal.id} key={meal.id} title={meal.name} price={meal.price} description={meal.description}/>));
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