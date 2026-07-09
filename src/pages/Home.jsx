import "./Home.css";
import BundleBuilder from "../components/BundleBuilder/BundleBuilder";
import ReviewPanel from "../components/ReviewPanel/ReviewPanel";

function Home() {
  return (
    <main className="home">
      <div className="container">
        <BundleBuilder />
        <ReviewPanel />
      </div>
    </main>
  );
}

export default Home;
