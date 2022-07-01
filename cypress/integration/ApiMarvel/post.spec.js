
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
            },
            failOnStatusCode: false

        }).then(function(response){
            expect(response.status).to.eql(201)
            cy.log(response.body.character_id)
            expect(response.body.character_id.length).to.equal(24)
        })
        
    });

    context.only('Quando o personagem já existe' , function(){

        const character = {
            name: "Tony Stark",
            alias: "Homem de Ferro",
            team: ["Vingadores"],
            active: true
    }

        before(function(){
            cy.api({
                method: 'POST',
                url:'/characters',
                body: character,
                headers:{ 
                    Authorization: Cypress.env('token')
                },
                failOnStatusCode: false
    
                }).then(function(response){
                    expect(response.status).to.eql(201)
            })
        })

        it('Não deve cadastrar duplicado' , function(){
                cy.api({
                    method: 'POST',
                    url:'/characters',
                    body: character,
                    headers:{ 
                        Authorization: Cypress.env('token')
                    },
                    failOnStatusCode: false
        
                }).then(function(response){
                    expect(response.status).to.eql(400)
                    expect(response.body.error).to.equal("Duplicate character")
                })

        })

    })
})