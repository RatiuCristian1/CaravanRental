import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  getDocs,
  collection,
  query,
  where,
} from "firebase/firestore/lite";
import { db } from "../api"; 
import { getStorage, ref, getDownloadURL } from 'firebase/storage';

export default function Caravans() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [caravans, setCaravans] = useState([]);
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState(null)

  const typeFilter = searchParams.get("type")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const q = query(collection(db, "caravans"));
        const querySnapshot = await getDocs(q);
        const caravanData = [];

        for (const doc of querySnapshot.docs) {
          const data = doc.data();
          const storageRef = ref(getStorage(), data.imagePath); 

          try {
            const downloadURL = await getDownloadURL(storageRef);
            data.imageUrl = downloadURL;
            caravanData.push({
              id: doc.id,
              ...data,
            });
          } catch (error) {
            console.error(`Error fetching download URL for ${data.imagePath}: `, error);
          }
        }

        setCaravans(caravanData);
      } catch (error) {
        console.error("Error fetching caravans: ", error);
      }
    };

    fetchData();
  }, []); // The empty dependency array ensures this effect runs once after initial render


const displayedVans = typeFilter
    ? caravans.filter(caravan => caravan.type === typeFilter)
    : caravans

const vanElements = displayedVans.map(caravan => (
    <div key={caravan.id} className="caravan-card">
         <Link to={caravan.id} className="caravan-link">
           <img
              src={caravan.imageUrl}
              alt={caravan.description}
              className="caravan-image"
            />
            <div className="caravan-description">{caravan.name}</div>
          </Link>
    </div>
))


function handleFilterChange(key, value) {
    setSearchParams(prevParams => {
        if (value === null) {
            prevParams.delete(key)
        } else {
            prevParams.set(key, value)
        }
        return prevParams
    })
}

    if (loading) {
        return <h1>Loading...</h1>
    }

    if (error) {
        return <h1>There was an error: {error.message}</h1>
    }


  return (
    <>

        <div className="van-list-container">
            <h1 className="explore--header">Explore our van options</h1>
            <div className="van-list-filter-buttons">
                <button
                    onClick={() => handleFilterChange("type", "small")}
                    className={
                        `van-type simple 
                        ${typeFilter === "small" ? "selected" : ""}`
                    }
                >Small</button>
                <button
                    onClick={() => handleFilterChange("type", "medium")}
                    className={
                        `van-type luxury 
                        ${typeFilter === "medium" ? "selected" : ""}`
                    }
                >Medium</button>
                <button
                    onClick={() => handleFilterChange("type", "large")}
                    className={
                        `van-type rugged 
                        ${typeFilter === "large" ? "selected" : ""}`
                    }
                >Large</button>

                {typeFilter ? (
                    <button
                        onClick={() => handleFilterChange("type", null)}
                        className="van-type clear-filters"
                    >Clear filter</button>
                ) : null}

            </div>
            <div className="caravans-container">
                <h1 className="caravans--title">Caravans</h1>
                <div className="caravan-list">
                    {vanElements}
                </div>
                <div className="caravans-container-bottom">
                    <h2 className="caravans-container-bottom-text">Welcome to the Caravan World Family !!</h2>
                    <img className="caravan-image-bottom" src="images/DET_Image_Header_1920x300_EN_3.jpg" alt="wtf is happening?" />
                </div>
                <div className="caravans-family-container">
                    <h3 className="caravans-family-text">Embrace your family</h3>
                    <p className="caravans-family-text-p">We understand that families are incredibly diverse, as are their preferences when it comes to holidays. Whether large or small, regardless of the type and arrangement, every family is unique and incomparable – just like the world of caravanning. We therefore set ourselves the task of creating the right travel companion for every family. With our wide range of vehicles, from urban campers to luxury motorhomes, there is plenty to choose from.</p>
                </div>
            </div>
        </div>

      {/* <div className="caravans-container">
        <h1 className="caravans--title">Caravans</h1>
        <div className="caravan-list">
          {caravans.map((caravan) => (
            <div key={caravan.id} className="caravan-card">
              <Link to={caravan.id} className="caravan-link">
              <img
                src={caravan.imageUrl}
                alt={caravan.description}
                className="caravan-image"
              />
              <div className="caravan-description">{caravan.name}</div>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div className="caravans-container-bottom">
        <h2 className="caravans-container-bottom-text">Welcome to the Caravan World Family !!</h2>
      <img className="caravan-image-bottom" src="images/DET_Image_Header_1920x300_EN_3.jpg" alt="wtf is happening?" />
    </div>
    <div className="caravans-family-container">
      <h3 className="caravans-family-text">Embrace your family</h3>
      <p className="caravans-family-text-p">We understand that families are incredibly diverse, as are their preferences when it comes to holidays. Whether large or small, regardless of the type and arrangement, every family is unique and incomparable – just like the world of caravanning. We therefore set ourselves the task of creating the right travel companion for every family. With our wide range of vehicles, from urban campers to luxury motorhomes, there is plenty to choose from.</p>
    </div> */}

  </>
  );
}
