import './../recipes.module.css';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Select,
  Textarea,
  Checkbox,
  Button,
  CheckboxGroup,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Recipe,
  RootState,
  Ingredient,
  recipesActions,
} from '../../../../store/recipes-slice';

function AddRecipes() {
  const recipes = useSelector((state: RootState) => state.recipes.recipes);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [recipeForm, setRecipeForm] = useState<Recipe>({
    name: '',
    type: '',
    portions: 1,
    ingredients: [{ ingredient: '', weight: 0, list: '' }],
    instructions: '',
    allergens: [],
  });

  const allergensTypes = [
    'Diary',
    'Fish',
    'Gluten',
    'Nuts',
    'Shellfish',
    'Soy',
    'Vegetarian',
    'Vegan',
  ];

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  function onSubmit() {
    dispatch(recipesActions.addRecipe<any>(recipeForm));
    navigate('/recipes');
  }

  function addIngredient() {
    setRecipeForm({
      ...recipeForm,
      ingredients: [
        ...recipeForm.ingredients,
        { ingredient: '', weight: 0, list: '' },
      ],
    });
  }
  function newIngredientInput() {
    return recipeForm.ingredients.map((ing: Ingredient, i: number) => (
      <FormControl
        className="formGroup ingredientInput"
        key={'ingredient ' + i}
      >
        <Input
          gridArea={'ingredient'}
          placeholder="Ingredient"
          value={recipeForm.ingredients[i].ingredient}
          onChange={(e) => {
            const newIngredients = [...recipeForm.ingredients];
            newIngredients[i] = {
              ...newIngredients[i],
              ingredient: e.target.value,
            };
            setRecipeForm({ ...recipeForm, ingredients: newIngredients });
          }}
        />
        <Input
          gridArea={'weight'}
          placeholder="Kg"
          type="number"
          value={recipeForm.ingredients[i].weight}
          onChange={(e) => {
            const newIngredients = [...recipeForm.ingredients];
            newIngredients[i] = {
              ...newIngredients[i],
              weight: Number(e.target.value),
            };
            setRecipeForm({ ...recipeForm, ingredients: newIngredients });
          }}
        />
        <Select
          gridArea={'type'}
          placeholder="Type"
          value={recipeForm.ingredients[i].list}
          onChange={(e) => {
            const newIngredients = [...recipeForm.ingredients];
            newIngredients[i] = {
              ...newIngredients[i],
              list: e.target.value,
            };
            setRecipeForm({ ...recipeForm, ingredients: newIngredients });
          }}
        >
          <option value="vegetables">Vegetables</option>
          <option value="meat">Meat</option>
          <option value="fish">Fish</option>
          <option value="spices">Spices</option>
          <option value="misc">Misc</option>
        </Select>
      </FormControl>
    ));
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="addRecipeForm">
      <FormControl isInvalid={Boolean(errors.recipeName)} className="formGroup">
        <FormLabel htmlFor="recipeName" className="label">
          Recipe Name
        </FormLabel>
        <Input
          id="recipeName"
          value={recipeForm.name}
          {...register('recipeName', {
            required: 'Unique recipe name required',
            minLength: { value: 3, message: 'Minimum length should be 3' },
            validate: {
              uniqueName: (value) =>
                !recipes
                  .map((recipe: Recipe) => recipe.name.toLowerCase())
                  .includes(value.toLowerCase()) ||
                'Recipe name must be unique',
            },
          })}
          onChange={(e) =>
            setRecipeForm({ ...recipeForm, name: e.target.value })
          }
        />
        <FormErrorMessage className="errorMessage">
          {/* {errors.recipeName && errors.recipeName.message} */}
        </FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={Boolean(errors.recipeType)} className="formGroup">
        <FormLabel htmlFor="recipeType" className="label">
          Recipe Type
        </FormLabel>
        <Select
          placeholder="Type"
          id="recipeType"
          value={recipeForm.type}
          {...register('recipeType', {
            required: 'Choose recipe type',
          })}
          onChange={(e) =>
            setRecipeForm({ ...recipeForm, type: e.target.value })
          }
        >
          <option value="Starter">Starter</option>
          <option value="Main">Main</option>
          <option value="Dessert">Dessert</option>
        </Select>
        <FormErrorMessage className="errorMessage">
          {/* {errors.recipeType && errors.recipeType.message} */}
        </FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={Boolean(errors.portions)} className="formGroup">
        <FormLabel htmlFor="portions" className="label">
          Portions
        </FormLabel>
        <Input
          id="portions"
          type="number"
          min={1}
          {...register('portions', {
            required: 'Add recipe portions',
            min: { value: 1, message: 'Minimum value is 1' },
          })}
          value={recipeForm.portions}
          onChange={(e) =>
            setRecipeForm({ ...recipeForm, portions: Number(e.target.value) })
          }
        />
        <FormErrorMessage className="errorMessage">
          {/* {errors.portions && errors.portions.message} */}
        </FormErrorMessage>
      </FormControl>
      <FormControl className="formGroup">
        <FormLabel htmlFor="ingredients" className="label">
          Ingredient
        </FormLabel>
        {newIngredientInput()}
        <Button
          onClick={() => {
            addIngredient();
            console.log(recipeForm);
          }}
          className="btn"
          style={{ margin: 0 }}
        >
          + Ingredient
        </Button>
      </FormControl>
      <FormControl className="formGroup">
        <FormLabel htmlFor="instructions" className="label">
          Instructions
        </FormLabel>
        <Textarea
          id="instructions"
          value={recipeForm.instructions}
          onChange={(e) =>
            setRecipeForm({
              ...recipeForm,
              instructions: e.target.value,
            })
          }
        />
      </FormControl>
      <FormControl className="formGroup">
        <FormLabel htmlFor="allergens" className="label">
          Allergens & Diet
        </FormLabel>
        <CheckboxGroup
          value={recipeForm.allergens}
          onChange={(newAllergens: string[]) => {
            setRecipeForm({ ...recipeForm, allergens: newAllergens });
          }}
        >
          <div className="checkboxContainer">
            {allergensTypes.map((type) => {
              return (
                <Checkbox
                  className="formCheckbox"
                  iconSize="2rem"
                  value={type}
                  key={type}
                >
                  {type}
                </Checkbox>
              );
            })}
          </div>
        </CheckboxGroup>
      </FormControl>
      <div className="btnContainer">
        <Button
          mt={4}
          isLoading={isSubmitting}
          type="submit"
          className="btn btnRecipe"
        >
          Submit
        </Button>
      </div>
    </form>
  );
}

export default AddRecipes;
