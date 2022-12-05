// import { render, waitFor, screen, renderHook } from "@testing-library/react"
// import UseGetFeatured from "../../Hooks/UseGetFeatured"

// describe('get featured', () => {

//     it ('get products with featured tag', async () => {

//         const result = UseGetFeatured("featured", 8)
//         expect(result.length).toBe(8)


        // render(<UseGetFeatured tag={"featured"} amount={8}/>)

        // await waitFor(() => {
        //     expect().toBe(200)
        //     expect(200)
        // })
//     })
// })


// describe('get featured', () => {

//     it ('get products with featured tag', async () => {
//         const {result, rerender} = renderHook(UseGetFeatured("featured", 8))  
         
//        expect(result.length).toBeGreaterThan(0)
        
//     })
// })




// import supertest from 'supertest';
// import UseGetFeatured from '../../Hooks/UseGetFeatured';

// const request = supertest('http://localhost:5000/api/products/take/')


// const tag = "featured"
// const amount = 1

// jest.setTimeout(14000)

// describe('get all', () => {
//     it('GET', done => {
//         request.fetch(`http://localhost:5000/api/products`)
//         .expect(200)
//         .end(done)
//     })
// })