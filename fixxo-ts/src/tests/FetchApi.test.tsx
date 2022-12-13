export {}

//OBS: Backend Server needs to be running
//nagivate to project: webapi -> run 'npm start' 


describe ("Api tests", () => {
 
    it('Test api/products', async () => {
    
        const response = await fetch (`http://localhost:5000/api/products`);
        expect(response.status).toBe(200)
    })

})