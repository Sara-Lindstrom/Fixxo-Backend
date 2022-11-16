
import {render, fireEvent, screen } from "@testing-library/react"
import ProductDetails from "../../views/ProductDetails/Sections/ProductDetails"

describe ("ShowMoreOrLessText", () => {

    let item = {
        imageName: "", 
        name: "", 
        rating: 1,
        price: 0
    }

    it('Dont display all text at init', () => {
        render(<ProductDetails item={item}/>)
        const textLength = screen.getByTestId('show-more-text').textContent
        expect(textLength.length).toBeLessThan(230)
    })

    it('Display more text on click', () => {
        render(<ProductDetails item={item}/>)

        const button = screen.getByRole('button', {name: '( Show More )'})
        fireEvent.click(button)

        const textLength = screen.getByTestId('show-more-text').textContent
        expect(textLength.length).toBeGreaterThan(230)
    })

})