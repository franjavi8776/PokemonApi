import { useState, useEffect } from "react";

function PokemonInfo() {
  const [pokeData, setPokeData] = useState(null);
  const [pokeId, setPokeId] = useState(1);

  useEffect(() => {
    const fetchPokeApi = async (id) => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);

        const data = await response.json();

        setPokeData(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPokeApi(pokeId);
  }, [pokeId]);

  function nextOnClick() {
    setPokeId(pokeId + 1);
  }
  function prevOnClick() {
    setPokeId(pokeId === 1 ? setPokeId(1) : pokeId - 1);
  }

  if (!pokeData) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="container">
      <div>
        <p>
          Nro: <b>{pokeData.id}</b>
        </p>
        <h2 style={{ fontSize: "2.2rem", color: "blueviolet" }}>
          Name: <b>{pokeData.name}</b>
        </h2>
        <div className="container-image">
          <div className="image">
            <img
              src={pokeData.sprites.other["official-artwork"].front_default}
              alt={pokeData.name}
            />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <button onClick={prevOnClick}>Prev</button>
          <button onClick={nextOnClick}>Next</button>
        </div>
      </div>
    </div>
  );
}

export default PokemonInfo;
