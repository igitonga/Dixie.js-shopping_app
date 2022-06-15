
const db = new Dexie('ShoppingList')
console.log(db)
db.version(1).stores( {items: '++id, name, price, isPurchased'} )

const itemsForm = document.getElementById('itemsForm')
const itemsDiv = document.querySelector('.items-container')
const totalPriceText = document.querySelector('.totalPrice')

//populate data from indexDB to item div
const populateItemsDiv = async () => {
    const allItems = await db.items.reverse().toArray()

    itemsDiv.innerHTML = allItems.map(item => `
        <div class="item ${item.isPurchased && 'purchased'}">
            <div class="checkbox-cont">
            <input type="checkbox" onchange="checkedItem(event, ${item.id})"  ${item.isPurchased && 'checked'}>
            </div>
            <div class="info-cont">
                <p>${item.name}</p>
                <p>Ksh.${item.price} * ${item.quantity}</p>
            </div>
            <div class="close">
                <i class="fa fa-close"></i>
            </div>
        </div>
    `).join('')

    const arrayOfPrices = allItems.map(item => item.price * item.quantity)
    const totalPrice =  arrayOfPrices.reduce((a, b) => a + b, 0) 

    totalPriceText.innerText = "KSh." + totalPrice
}

//load items added
window.onload = populateItemsDiv

//submit data to IndexDB
itemsForm.onsubmit = async (event) => {
    event.preventDefault()

    const name = document.querySelector('.name').value
    const quantity = document.querySelector('.quantity').value
    const price = document.querySelector('.price').value

    await db.items.add({name, quantity, price})
    itemsForm.reset()

    //load items added
    await populateItemsDiv()
}

//cross item when checked
const checkedItem = async (event, id) => {
    await db.items.update(id, {isPurchased: !!event.target.checked})
    await populateItemsDiv()
}