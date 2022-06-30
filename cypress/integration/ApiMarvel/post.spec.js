
describe('POST /characters', function(){

    before(function(){
        cy.back2ThePast()
        cy.setToken()
    })
    
    it('deve cadastrar um personagem', function() {
            const character = {
                name: 'Wanda Maximoff',
                alias: 'Feiticeira Escarlate',
                team: ['vingadores'],
                active: true
            }
        cy.api({
            method: 'POST',
            url:'/characters',
            body: character,
            headers:{ 
                Authorization: Cypress.env('token')
            }

        }).then(function(response){
            expect(response.status).to.eql(201)
        })
        
    });
})