import React, { useState } from "react";
import dishesData from "../data";

const Home = () => {
  const [dishList, setDishList] = useState(dishesData);
  const [showDish, setShowDish] = useState("Main Course");
  const [searchTerm, setSearchTerm] = useState("");

  const [totalItem, setTotaltem] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [dishTypeFilter, setDishTypeFilter] = useState("");

  const showData = dishList.filter((item) => {
    const isSameCategory = item.mealType === showDish;
    const matchSearch = item.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchType = dishTypeFilter ? item.type === dishTypeFilter : true;
    return isSameCategory && matchSearch && matchType;
  });

  const addItem = (iname) => {
    const updatedList = dishList.map((item) => {
      if (item.name === iname) {
        return { ...item, add: !item.add };
      }
      return item;
    });

    const addedItems = updatedList.filter((item) => item.add === true);

    setDishList(updatedList);

    setTotaltem(addedItems.length);
  };

  const openModal = (ingredient) => {
    setSelectedIngredients(ingredient);
    setIsModalOpen(true);
  };

  return (
    <div className="main-container" style={styles.mainContainer}>
      <div className="search-container" style={styles.searchContainer}>
        <div>
          <img
            src="./arrow.png"
            alt="arrow-icon"
            style={{ width: "14px", marginTop: 4 }}
          />
        </div>
        <input
          type="text"
          style={styles.searchInput}
          placeholder="Search dish for your party......"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div style={{ position: "relative", top: 5, left: 26 }}>
          <img
            src="./search.png"
            alt="search-icon"
            style={{ width: "24px", cursor: "pointer" }}
          />
        </div>
      </div>

      <div className="buttonContainer" style={styles.buttonContainer}>
        {["Starter", "Main Course", "Dessert", "Sides"].map((dishType) => (
          <div
            key={dishType}
            className="button"
            style={
              showDish === dishType ? styles.activeButton : styles.allButton
            }
            onClick={() => setShowDish(dishType)}
          >
            <p style={{ textAlign: "center" }}>{dishType}</p>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <h3>
          {showDish} Selected {`(${showData.length})`}
        </h3>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 20,
            margin: "10px 0",
            position: "relative",
            left: "20px",
          }}
        >
          {["VEG", "NON VEG"].map((type) => (
            <button
              key={type}
              style={{
                padding: "8px 20px",
                borderRadius: 10,
                border:
                  dishTypeFilter === type
                    ? "2px solid #FF941A"
                    : "1px solid #ADADAD",
                background: dishTypeFilter === type ? "#FF941A" : "#fff",
                color: dishTypeFilter === type ? "#fff" : "#000",
                cursor: "pointer",
                fontWeight: 700,
              }}
              onClick={() =>
                setDishTypeFilter((prev) => (prev === type ? "" : type))
              }
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {showData.map((item, ind) => (
        <div style={{ margin: 10 }} key={ind}>
          <div
            style={{
              display: "flex",
              height: 200,
              justifyContent: "space-around",
            }}
          >
            <div style={{ width: "100%" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                <h3>{item.name}</h3>
                <img
                  src={
                    item.type !== "VEG" ? "./nonVegLogo.png" : "./vegLogo.png"
                  }
                  alt="typeLogo"
                />
              </div>
              <p>
                {item.description}...
                <span style={{ fontWeight: "500" }}>Read More</span>
              </p>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  cursor: "pointer",
                }}
                onClick={() => openModal(item)}
              >
                <img src="./ingredient.png" alt="ingredient" />
                <p style={{ color: "#FF8800", fontWeight: 700 }}>Ingredient</p>
              </div>
            </div>
            <div>
              <img
                src={item.image || item.category.image}
                alt={item.name}
                style={{
                  width: "200px",
                  height: "150px",
                  objectFit: "cover",
                  border: "1px solid #000",
                  borderRadius: 20,
                }}
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  position: "relative",
                  top: -30,
                }}
              >
                <button
                  style={item.add ? styles.addButton : styles.removeButton}
                  onClick={() => addItem(item.name)}
                >
                  {item.add ? "Remove" : "ADD +"}
                </button>
              </div>
            </div>
          </div>
          <hr style={{ width: "95%" }} />
        </div>
      ))}
      <div style={{ position: "fixed", bottom: 0, width: "100%" }}>
        <div
          style={{
            backgroundColor: "#FFFAF4",
            display: "flex",

            boxShadow: "0 -2px 5px rgba(0,0,0,0.1)",
            justifyContent: "space-between",
            alignItems: "center",
            height: 50,
          }}
        >
          <h4 style={{ padding: "5px 20px" }}>
            Total Dish Selected {totalItem}
          </h4>
          <img
            src="./arrowRight.png"
            alt="right-arrow"
            style={{ padding: "5px 20px" }}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "#fff",
            padding: "10px 0",
          }}
        >
          <button
            style={{
              background: "#000",
              padding: "10px 0",
              color: "#fff",
              fontSize: 20,
              fontWeight: 700,
              width: "80%",
              borderRadius: 20,
              border: "none",
              cursor: "pointer",
            }}
          >
            Continue
          </button>
        </div>
      </div>
      {isModalOpen && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
              }}
              onClick={() => setIsModalOpen(false)}
            >
              <img src="./arrow.png" alt="back button" />
              <h2 style={{ marginLeft: 20 }}>Ingredient List</h2>
            </div>

            <div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "start",
                  }}
                >
                  <h3 style={{ textAlign: "start" }}>
                    {selectedIngredients.name}
                  </h3>
                  <p style={{ textAlign: "start" }}>
                    {selectedIngredients.description}
                  </p>
                </div>
                <img src="./ing 1.png" alt="IngredientsImage" />
              </div>
              <hr />

              {selectedIngredients.ingredients?.map((ing, i) => (
                <div
                  key={i}
                  style={{ display: "flex", justifyContent: "space-around" }}
                >
                  <h3 style={{ fontSize: 18, marginBottom: 8 }}>{ing.name}</h3>
                  <p style={{ fontSize: 18, marginBottom: 8 }}>
                    {ing.quantity}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  mainContainer: { marginBottom: "80px" },
  searchContainer: {
    margin: "14px 18px",
    width: "90%",
    border: "2px solid #ADADAD",
    borderRadius: 10,
    display: "flex",
    gap: 10,
    padding: 15,
  },
  searchInput: {
    width: "80%",
    padding: 3,
    border: "none",
    outline: "none",
    fontSize: 14,
  },
  buttonContainer: {
    display: "flex",
    gap: 20,
    justifyContent: "space-around",
    padding: "0px 20px",
  },
  activeButton: {
    width: "110px",
    display: "flex",
    justifyContent: "center",
    height: 40,
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#FF941A",
    color: "#fff",
    cursor: "pointer",
  },
  allButton: {
    border: "1px solid #000",
    width: "110px",
    display: "flex",
    justifyContent: "center",
    height: 40,
    alignItems: "center",
    borderRadius: 10,
    cursor: "pointer",
  },
  addButton: {
    color: "#FF941A",
    fontWeight: 700,
    padding: 10,
    border: "none",
    background: "#fff",
    borderRadius: 10,
    boxShadow: "4px 4px 10px 3px #1C1C1C26",
    width: 100,
    fontSize: 20,
    height: 40,
    cursor: "pointer",
  },
  removeButton: {
    color: "#73AE78",
    fontWeight: 700,
    padding: 10,
    border: "none",
    background: "#fff",
    borderRadius: 10,
    boxShadow: "4px 4px 10px 3px #1C1C1C26",
    width: 100,
    fontSize: 20,
    height: 40,
    cursor: "pointer",
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modalContent: {
    background: "#fff",
    padding: 30,
    width: "100%",
    height: "100%",

    textAlign: "center",
  },
  closeButton: {
    marginTop: 20,
    padding: "10px 20px",
    background: "#FF941A",
    color: "#fff",
    border: "none",
    borderRadius: 10,
    cursor: "pointer",
  },
};

export default Home;
