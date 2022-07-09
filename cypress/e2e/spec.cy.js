const url = 'http://localhost:5000/'
const url_users = url + 'users'
const url_tasks = url + 'tasks'

describe('E2E Test', () => {

  it('test-0', () => {
    cy.request({
      method: 'GET',
      url: url_users
    })
    cy.request({
      method: 'GET',
      url: url_tasks
    })
    
  })

  it('test-1', () => {
    cy.request({
      method: 'POST',
      url: url_users,
      body: {
        name: 'William Justin',
        age: '20'
      }
    }).then( user => {
      cy.request({
        method: 'PUT',
        url: url_users,
        body: {
          id: user.body._id,
          name: 'Justin William',
          age: '21'
        }
      })
      cy.request({
        method: 'PUT',
        url: url_users,
        body: {
          id: user.body._id,
          name: 'William Justin'
        }
      })
      cy.request({
        method: 'PUT',
        url: url_users,
        body: {
          id: user.body._id,
          age: '20'
        }
      })
      cy.request({
        method: 'PATCH',
        url: url_users,
        body: {
          id: user.body._id,
          name: 'Justin William'
        }
      })
      cy.request({
        method: 'DELETE',
        url: url_users,
        body: {
          id: user.body._id
        }
      })    
    })
  })

  it('test-2', () => {
    cy.request({
      method: 'POST',
      url: url_users,
      body: {
        name: 'William Justin',
        age: '20'
      }
    }).then( user => {
      cy.request({
        method: 'POST',
        url: url_tasks,
        body: {
          user_id: user.body._id,
          description: 'This is description on test-2'
        }
      }).then( task => {
        cy.request({
          method: 'DELETE',
          url: url_tasks,
          body: {
            id: task.body._id
          }
        })
      })
      cy.request({
        method: 'DELETE',
        url: url_users,
        body: {
          id: user.body._id
        }
      })    
    })
  })
})
