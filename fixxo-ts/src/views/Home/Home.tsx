import Footer from '../../components/Footer';
import ProductGrid from '../../components/ProductGrid';
import Navigationbar from '../../components/Navigationbar'; 
import Showcase from './sections/Showcase';
import FeaturedShowcase from './sections/FeaturedShowcase';
import ShoppingInfo from './sections/ShoppingInfo';
import ShowCaseGrid from './sections/ShowCaseGrid';
import ShowCaseGridPlaceholder from '../../assets/img/flash-sale-show-case.svg';
import SaleShowcase from './sections/SaleShowcase';
import CompanyInformation from './sections/CompanyInformation';
import CustomerService from "../../assets/img/customer-service-icon.svg";
import CustomerSecurePayment from "../../assets/img/secured-payment-icon.svg";
import CustomerDelivery from "../../assets/img/delivery-truck-icon.svg";
import UseGetFeatured from '../../Hooks/productHooks/UseGetFeatured';


const Home:React.FC = () => {
  const featuredProducts = UseGetFeatured("featured", 8)
  const specialProducts = UseGetFeatured("specials", 4)
  const specialProductsExtended = UseGetFeatured("specialsExtended", 4)
  const latestProducts = UseGetFeatured("latest", 3)
  const sellingProducts = UseGetFeatured("selling", 3)
  const reactedProducts = UseGetFeatured("reacted", 3)


  return (
    <>
      <Navigationbar />
      <Showcase />
      <ProductGrid cardIsFlexed={false} title={"Featured Products"} col={4} items={featuredProducts}/>
      <FeaturedShowcase/>
      <ShoppingInfo/>
      <ShowCaseGrid leftImg={ShowCaseGridPlaceholder} leftAlt={"place holder"} col={2} rightImg={""} rightAlt={""} items={specialProducts}/>
      <ShowCaseGrid leftImg={""} leftAlt={""}  col={2} rightImg={ShowCaseGridPlaceholder} rightAlt={"place holder"} items={specialProductsExtended}/>
      <SaleShowcase/>
      <div className="container flex">
        <ProductGrid cardIsFlexed={true} title={"Latest Products"} col={1} items={latestProducts}/>
        <ProductGrid cardIsFlexed={true} title={"Best Selling Products"} col={1} items={sellingProducts}/>
        <ProductGrid cardIsFlexed={true} title={"Top Reacted Products"} col={1} items={reactedProducts}/>
      </div>    
      <hr className="container line-break"/> 
      <div className="container contact-info">
        <CompanyInformation companyimg={CustomerService} companytitle={"Customer Support"} companyinfo={"Lorem ipsum dolor sit amet consectetur."}/>
        <CompanyInformation companyimg={CustomerSecurePayment} companytitle={"Secured Payment"} companyinfo={"Lorem ipsum dolor sit amet consectetur."}/>
        <CompanyInformation companyimg={CustomerDelivery} companytitle={"Free Home Delivery"} companyinfo={"Lorem ipsum dolor sit amet consectetur."}/>
        <CompanyInformation companyimg={CustomerDelivery} companytitle={"30 Day Free Return"} companyinfo={"Lorem ipsum dolor sit amet consectetur."}/>
      </div>   
      <Footer/>
    </>
  )
}

export default Home