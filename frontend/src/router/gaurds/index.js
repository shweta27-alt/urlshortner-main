//if user is login then will go to the chat if not it will move to login
import store from '../../store'


//check if user is authenticated based on store isLoggedInUser
export function checkAuthenticatedUser(to,from,next){
    store.dispatch("getUserData").then((response)=>{
       if(response.isLoggedInUser){
        return next()
       }
       window.location.href= `${window.location.origin}/auth/login`
    })
    .catch((error)=>{
      window.location.href= `${window.location.origin}/auth/login`
      console.log(error)
    })
}

//check if user is not authenticated based on store isLoggedInUser
export function checkNonAuthenticatedUser(to,from,next){
    store.dispatch("getUserData").then((response)=>{
        if(!response.isLoggedInUser){
        return next()
        }
        window.location.href= `${window.location.origin}/main`
     })
     .catch((error)=>{
       next()
       console.log(error)
     })
}

