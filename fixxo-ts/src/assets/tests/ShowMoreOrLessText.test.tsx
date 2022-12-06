
import {render, fireEvent, screen } from "@testing-library/react"
import ProductDetails from "../../views/ProductDetails/Sections/ProductDetails"
import IProduct from "../models/IProduct"


describe ("ShowMoreOrLessText", () => {

    let item: IProduct = {
        _id:"",
        name: "",
        description: "",
        category: "",
        price: 0,
        rating: 0,
        imageName: ""
    }

    it('Dont display all text at init', () => {
        render (<ProductDetails item={item}/>)

    

        let textLength = screen.getByTestId('show-more-text').textContent

        expect(textLength?.length).toBeLessThan(230)
    })

    it('Display more text on click', () => {
        render(<ProductDetails item={item}/>)

        const button = screen.getByRole('button', {name: '( Show More )'})
        fireEvent.click(button)

        let textLength = screen.getByTestId('show-more-text').textContent

        expect(textLength?.length).toBeGreaterThan(230)
    })

})