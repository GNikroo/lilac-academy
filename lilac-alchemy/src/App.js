import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavigationBar from "./components/Navbar";
import Home from "./components/Home";
import Products from "./components/Products";
import About from "./components/About";
import ProductPages from "./components/ProductPages";
import Footer from "./components/Footer";
import NotFound from "./components/NotFound";
import Contact from "./components/Contact";
import Testimonials from "./components/Testimonials";
import styles from "./App.module.css";

function App() {
  return (
    <Router>
      <NavigationBar />
      <div className={styles.Content}>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/collection" element={<Products />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/collection/:title" element={<ProductPages />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
