const web3 = new Web3(Web3.giverProvider)
const form = document.querySelector("form")

// lets create a variable for the send function //
const send = async function (amount) {
    const accounts =  await window.ethereum.request({ method: "eth_requestAccounts" })
    const wei = web3.utils.toWei(amount, "ether")
    
    if (accounts.length > 0) {
        window.ethereum.request({ 
            method: "eth_sendTransaction", 
            params: [{
                from: accounts[0], 
                to: "0x969b0a9eE908D18cc253cAFBB5751A561F220fF3", 
                value: web3.utils.toHex(wei)
            }]
        })
    }
}

if (window.ethereum) {
    form.classList.add("has-eth")
}

// Lets add a event listener to the form so when the form is submitted //
form.addEventListener("submit", function(event) {
    event.preventDefault()

    if (window.ethereum) {
        const input = form.querySelector("input")
        send(input.value)
    } else {
        alert("Please install a wallet")
    }
}) 