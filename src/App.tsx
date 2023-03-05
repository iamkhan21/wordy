import Header from "./core/Header";
import Footer from "./core/Footer";
import { Game } from "./components/Game";

function App() {
  return (
    <>
      <Header />
      <main className="py-10">
        <Game />
      </main>
      <Footer />
    </>
  );
}

export default App;
