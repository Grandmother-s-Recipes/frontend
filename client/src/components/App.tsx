import { useState, useEffect } from 'react';
import Map from './Map.tsx';
import Header from './Header.tsx';
import RegionCard from './RegionCard.tsx';
import Favorites from './Favorites.tsx';
import LoginForm from './LoginForm.tsx';
import RecipeModal from './RecipeModal.tsx';
import "../styles/app.css";
import { PacmanLoader } from 'react-spinners';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Recipe {
  title: string;
  ingredients: string;
  servings: string;
  instructions: string;
}

export default function App() {
  const URL = import.meta.env.VITE_API_URL;

  const [view, setView] = useState<string>("map");
  const [activeRegion, setActiveRegion] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);

  const checkLoggedIn = async() => {
	const response = await fetch(`${URL}/session`, {
		method: 'GET',
		credentials: 'include'
	});

	const { userId } = await response.json();

	if (userId) {
		setIsLoggedIn(true);
	} else {
		setIsLoggedIn(false);
	}
  }

  useEffect(() => {
	checkLoggedIn();
  }, []);

  useEffect(() => {
    pathFetcher();
  });

  // Sets the state for logging in and sets the view to map on logging in and logging out.
  function handleLoggedInState(loggedIn: boolean) {
    setIsLoggedIn(loggedIn);
    setView("map");
  }

  useEffect(() => {
    if (activeRegion) {
      fetchRecipesForRegion(activeRegion);
    }
  }, [activeRegion]);

  const fetchRecipesForRegion = async (region: string) => {
    setLoading(true);
    try {
      const response = await fetch(`${URL}/recipes?region=${region}`);
      const data = await response.json();
      setRecipes(data);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  
  const handleRecipeClick = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedRecipe(null);
  };

  //adds click events to each region on the map. Calls the below function viewRegion to change the view to the selected region
  function pathFetcher() {
    const paths = document.querySelectorAll('path');
    for (let i = 0; i < paths.length; i++) {
      const region = paths[i].getAttribute('region-name');
      paths[i].addEventListener('click', () => {
        viewRegion(region);
      });
    }
  }

  //changes the view to the selected region. This function is called by the above pathFetcher function
  function viewRegion(region: string | null) {
    setActiveRegion(region);
    setView("region");
  }

  //returns to the default Map view
  function returnHome() {
    setActiveRegion(null);
    setRecipes([]);
    setView("map");
  }

  //header bar login button functionality. This does not log in, it switches the view to the login form. Users will finish logging in from the login form
  function loginButtonFunction() {
    if (!isLoggedIn) {
      setView("loginForm");
    }
  }

  //switches the view to the Favorited Recipes view
  function viewFavorites() {
    setView("favorites");
  }

  const warnToast = (a: string) => {
    toast.warn(a, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
  }

  async function addToFavorite (recipe: Recipe) {
	if (!isLoggedIn) {
    return warnToast('You must be logged in to save a favorite recipe.');
	}
	if (selectedRecipe === null) {
		return;
	}
	const response = await fetch(`${URL}/favorites`, {
			method: "POST",
			body: JSON.stringify({
				user_id: sessionStorage.user_id,
				recipe_id: recipe.title,
				region: activeRegion,
			}),
			headers: {
				'Content-Type': 'application/json'
			},
		})  
      if (response.status === 201) {
        warnToast(`${recipe.title} saved to favorites!`);
      } else if (response.status === 400) {
        warnToast(`${recipe.title} is already in your favorites.`);
      } else {
        toast.error(`Error adding to favorites.`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
      }
	}

  //this function is called in the return of App.tsx. The result of this function determines what components are rendered
  function determineView() {
    if (loading) {
      return (
        <div>
          <PacmanLoader
            color="#3e5c7e"
            cssOverride={{
              marginLeft: 'auto',
              marginRight: 'auto'
            }}
            margin={2}
            size={25}
            speedMultiplier={1}
          />
        </div>
      );
    }

    if (view === "map") {
      return (
        <>
          <div className="instruction">Select a region of Italy to get started!</div>
          <br />
		  <div className="container">
			<div className="mapContainer">
				<Map />
			</div>
		  </div>
          
        </>
      );
    }
    if (view === "region") {
      return (
        <>
          <ToastContainer />
          <RegionCard
            activeRegion={activeRegion}
            recipes={recipes}
            onRecipeClick={handleRecipeClick}
          />
          {showModal && selectedRecipe && (
            <div className="modal">
              <RecipeModal selectedRecipe={selectedRecipe} closeModal={closeModal} addToFavorite={addToFavorite} />
            </div>
          )}
        </>
      );
    }
    if (view === "favorites") {
      return <Favorites />;
    }
    if (view === "loginForm") {
      return <LoginForm handleLoggedInState={handleLoggedInState} />;
    }
  }

  return (
    <>
      <ToastContainer />
      <Header
        isLoggedIn={isLoggedIn}
        loginButtonFunction={loginButtonFunction}
        handleLoggedInState={handleLoggedInState}
        returnHome={returnHome}
        viewFavorites={viewFavorites}
      />
      <br />
      {determineView()}
    </>
  );
}



