import axios, { AxiosResponse } from "axios";
import { FormEvent, useRef, useState } from "react";
import { Hero } from "../models/interface/HeroInterface";
import "./HeroForm.css";

interface CreateResponse {
  status: string;
  message: string;
}

const HeroForm = () => {
  const [createHeroMsg, setCreateHeroMsg] = useState<string>();

  const heroName = useRef<HTMLInputElement>(null);
  const heroPower = useRef<HTMLInputElement>(null);
  const heroLife = useRef<HTMLInputElement>(null);
  const heroWeapon = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createHero();
  };

  const createHero = async () => {
    if (
      heroName.current &&
      heroPower.current &&
      heroLife.current &&
      heroWeapon.current
    ) {
      const heroBeingCreated: Hero = {
        name: heroName.current.value,
        power: parseInt(heroPower.current.value),
        life: parseInt(heroLife.current.value),
        id_type_weapon: parseInt(heroWeapon.current.value),
      };
      try {
        const response: AxiosResponse<CreateResponse> = await axios.post(
          "http://localhost:8080/api/heros",
          heroBeingCreated
        );
        console.log(`create hero : ${response.data}`);
        setCreateHeroMsg(response.data.message);
      } catch (err) {
        let message: string;
        if (axios.isAxiosError(err) && err.response) {
          message = err.response.data.message;
        } else {
          message = `Unknown Error : ${err}`;
        }
        setCreateHeroMsg(message);
      }
      heroName.current.value = "";
      heroPower.current.value = "";
      heroLife.current.value = "";
      heroWeapon.current.value = "";
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Create a new Hero</h2>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-field border">
          <label htmlFor="name">Name</label>
          <input
            className="form-input"
            type="text"
            name="name"
            id="name"
            ref={heroName}
            required
          />
        </div>
        <div className="form-field border">
          <label htmlFor="power">Power</label>
          <input
            className="form-input"
            type="number"
            name="power"
            id="power"
            min={1}
            ref={heroPower}
            required
          />
        </div>
        <div className="form-field border">
          <label htmlFor="life">Life</label>
          <input
            className="form-input"
            type="number"
            name="life"
            id="life"
            min={1}
            ref={heroLife}
            required
          />
        </div>
        <div className="form-field border">
          <label htmlFor="weapon">Weapon Id (optionnal)</label>
          <input
            className="form-input"
            type="number"
            name="weapon"
            id="weapon"
            ref={heroWeapon}
          />
        </div>
        <button className="form-btn" type="submit">
          Submit
        </button>
      </form>
      {createHeroMsg && <div className="created-hero">{createHeroMsg}</div>}
    </div>
  );
};

export default HeroForm;
