import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Hero } from "../models/interface/HeroInterface";
import "./Home.css";

const Home = () => {
  const [listHeros, setListHeros] = useState<Hero[]>([]);

  useEffect(() => {
    const getHeros = async () => {
      const herosData: AxiosResponse<{ data: Hero[] }> = await axios.get(
        "http://localhost:8080/api/heros"
      );
      setListHeros(herosData.data.data);
    };
    getHeros();
  }, []);
  return (
    <>
      <div className="container">
        <div className="row">
          {listHeros.map((hero) => (
            <div key={hero.id} className="column">
              <Link to={`/hero/${hero.id}`}>
                <div className="hero-card-list">
                  <h2 className="hero-header">{hero.name}</h2>
                  <p className="hero-content">Power : {hero.power}</p>
                  <p className="hero-content">Life: {hero.life}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
