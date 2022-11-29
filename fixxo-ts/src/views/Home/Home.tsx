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
import { UseGetFeaturedProducts } from '../../Hooks/UseGetFeaturedProducts';
import { useContext } from 'react';
import { ProductContext } from '../../components/Admin/ProductContext';
import IProductContext from '../../assets/models/AdminModels/IProductContext';


const Home:React.FC = () => {
  const { getAmount, amountProducts } = useContext(ProductContext) as IProductContext

  const featuredAnountWrong4 = UseGetFeaturedProducts(4)
  const featuredAnountWrong3 = UseGetFeaturedProducts(3)

  const featuredProducts = (amount:number) => {
    getAmount(amount)

    return amountProducts

  }

  return (
    <>
      <Navigationbar />
      <Showcase />
      <ProductGrid cardIsFlexed={false} title={"Featured Products"} col={4} items={featuredProducts(8)}/>
      <FeaturedShowcase/>
      <ShoppingInfo/>
      <ShowCaseGrid leftImg={ShowCaseGridPlaceholder} leftAlt={"place holder"} col={2} rightImg={""} rightAlt={""} items={featuredAnountWrong4}/>
      <ShowCaseGrid leftImg={""} leftAlt={""}  col={2} rightImg={ShowCaseGridPlaceholder} rightAlt={"place holder"} items={featuredAnountWrong4}/>
      <SaleShowcase/>
      <div className="container flex">
        <ProductGrid cardIsFlexed={true} title={"Latest Products"} col={1} items={featuredAnountWrong3}/>
        <ProductGrid cardIsFlexed={true} title={"Best Selling Products"} col={1} items={featuredAnountWrong3}/>
        <ProductGrid cardIsFlexed={true} title={"Top Reacted Products"} col={1} items={featuredAnountWrong3}/>
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