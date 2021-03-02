

console.log('JavaScript from client side.....')



const wetherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#meg-1')
const messageTwo = document.querySelector('#meg-2')
const messageThree = document.querySelector('#meg-3')



wetherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    messageThree.textContent=''
    //const url = http://localhost:3000/weather?address=hyderbad

    fetch(`http://localhost:3000/weather?address=${location}`).then( (response) => {
    response.json().then((data) => {
        if (data.error){
            console.log(data.error)
            messageThree.textContent = data.error
        }else if (data.invalidLocation){
            messageThree.textContent = data.userInfo
            // console.log('User message..',data.userInfo)

        }else{
            messageOne.textContent = data.weatherInfo.City
            messageTwo.textContent = data.weatherInfo.temperature
        }
    })
})
    // console.log('From user page...',location)
    // console.log('Submitting the button.....')
})