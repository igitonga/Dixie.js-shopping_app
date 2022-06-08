
const db = new Dexie('ShoppingList')
console.log(db)
db.version(1).stores( {items: '++id, name, price, isPurchased'} )

const itemsForm = document.getElementById('itemsForm')
const itemsDiv = document.querySelector('.items-container')
const totalPrice = document.querySelector('.totalPrice')

itemsForm.onsubmit = async (event) => {
    event.preventDefault()

    const name = document.querySelector('.name').value
    const quantity = document.querySelector('.quantity').value
    const price = document.querySelector('.price').value

    await db.items.add({name, quantity, price})
    itemsForm.reset()
}