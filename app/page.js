import Hero from "./_components/Hero";
import ProductList from "./_components/ProductList";

export default function Home() {
  return (
    <div >
      <Hero/>
      <div className='p-10 md:px-36 lg:px-48'>
        <ProductList/>
      </div>
    </div>
  );
}
