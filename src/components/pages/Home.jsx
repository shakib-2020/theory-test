import React from "react";
import Categories from "../feature/categories/Categories";
import QuizListArea from "../feature/quiz/QuizListArea";
import Footer from "../Footer";
import Header from "../Header";
import Hero from "../Hero";
import Services from "../Services";
const Home = () => {
  return (
    <>
      <Header />
      <Hero />
      <Services />
      <Categories />
      <Footer />
    </>
  );
};

export default Home;
