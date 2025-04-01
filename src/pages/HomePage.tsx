import About from "@/components/about/About";
import Footer from "@/components/footer/Footer";
import Navbar from "@/components/header/Navbar";
import Home from "@/components/home/Home";
import ProjectsPage from "@/components/project/Projects";

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <div className="content">
        <Home />
        <About />
        <ProjectsPage />
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
