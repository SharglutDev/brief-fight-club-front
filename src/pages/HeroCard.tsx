import { useEffect, useState, useRef, FormEvent } from "react";
import { useParams } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import { Hero } from "../models/interface/HeroInterface";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import "./HeroCard.css";

interface AxiosResponseType {
  status: string;
  message: string;
}

const HeroCard = () => {
  const [heroById, setHeroById] = useState<Hero>();
  const [deleteHeroMsg, setDeleteHeroMsg] = useState<string>();
  const [updateHeroMsg, setUpdateHeroMsg] = useState<string>();
  const [editingHero, toggleEditingHero] = useState<boolean>(false);

  const heroName = useRef<HTMLInputElement>(null);
  const heroPower = useRef<HTMLInputElement>(null);
  const heroLife = useRef<HTMLInputElement>(null);
  const heroWeapon = useRef<HTMLInputElement>(null);

  let { id } = useParams();

  useEffect(() => {
    const getHeroById = async () => {
      const heroData: AxiosResponse<{ data: Hero[] }> = await axios.get(
        `http://localhost:8080/api/heros/${id}`
      );
      setHeroById(heroData.data.data[0]);
    };
    getHeroById();
  }, [id]);

  const handleDelete = async () => {
    try {
      const deleteHero: AxiosResponse<AxiosResponseType> = await axios.delete(
        `http://localhost:8080/api/heros/${id}`
      );
      console.log(deleteHero.data.message);
      setDeleteHeroMsg(deleteHero.data.message);
    } catch (err) {
      let message: string;
      if (axios.isAxiosError(err) && err.response) {
        message = err.response.data.message;
      } else {
        message = `Unknow Error : ${err}`;
      }
      setDeleteHeroMsg(message);
    }
  };

  const handleUpdate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      heroName.current &&
      heroPower.current &&
      heroLife.current &&
      heroWeapon.current
    ) {
      const heroBeingUpdated: Hero = {
        name: heroName.current.value,
        power: parseInt(heroPower.current.value),
        life: parseInt(heroLife.current.value),
        id_type_weapon: parseInt(heroWeapon.current.value),
      };

      try {
        const updateHero: AxiosResponse<AxiosResponseType> = await axios.put(
          `http://localhost:8080/api/heros/${id}`,
          heroBeingUpdated
        );
        console.log(`update hero : ${updateHero.data.message}`);
        setUpdateHeroMsg(updateHero.data.message);
      } catch (err) {
        let message: string;
        if (axios.isAxiosError(err) && err.response) {
          message = err.response.data.message;
        } else {
          message = `Unknown Error : ${err}`;
        }
        setUpdateHeroMsg(message);
      }
    }
  };

  return (
    <>
      <div className="container">
        {!editingHero ? (
          <div className="hero-card">
            <h2 className="hero-header">{heroById?.name}</h2>
            <p className="hero-content">Power : {heroById?.power}</p>
            <p className="hero-content">Life: {heroById?.life}</p>
            <div className="hero-icons">
              <FontAwesomeIcon
                icon={faPenToSquare}
                style={{ color: "green", cursor: "pointer" }}
                onClick={() => toggleEditingHero(!editingHero)}
              />
              <FontAwesomeIcon
                icon={faTrashCan}
                style={{ color: "red", cursor: "pointer" }}
                onClick={handleDelete}
              />
            </div>
          </div>
        ) : (
          <form onSubmit={handleUpdate}>
            <div className="hero-card">
              <div className="hero-content">
                <label htmlFor="name">Name</label>
                <input
                  className="update-input"
                  type="text"
                  ref={heroName}
                  defaultValue={heroById?.name}
                  required
                />
              </div>
              <div className="hero-content">
                <label htmlFor="power">Power</label>
                <input
                  className="update-input"
                  type="number"
                  ref={heroPower}
                  defaultValue={heroById?.power}
                  required
                />
              </div>
              <div className="hero-content">
                <label htmlFor="life">Life</label>
                <input
                  className="update-input"
                  type="number"
                  ref={heroLife}
                  defaultValue={heroById?.life}
                  required
                />
              </div>
              <div className="hero-content">
                <label htmlFor="weapon">Weapon Id (optionnal)</label>
                <input
                  className="update-input"
                  type="number"
                  ref={heroWeapon}
                  defaultValue={heroById?.id_type_weapon}
                />
              </div>
              <button className="update-btn" type="submit">
                Valider
              </button>
            </div>
          </form>
        )}
      </div>
      {deleteHeroMsg && <div className="deleted-hero">{deleteHeroMsg}</div>}
      {updateHeroMsg && <div className="updated-hero">{updateHeroMsg}</div>}
    </>
  );
};

export default HeroCard;
