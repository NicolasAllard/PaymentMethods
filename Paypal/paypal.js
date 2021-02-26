const CLIENT_ID = "Aecwy7-Skop9FUunGXFqcEryW7p72gx77jjXOHoPkCDZXNniGjQPBd6ObtR0eKhh0kqnqQuljACxspz7";
const SECRET = "EKysTNoNI8aNyI6eHVta3a3GNB1ZuGpnqoLp7vjtpLaQxpl6ufJSbo00BE3DyrEDJzpgQXb-XkEqoaGr";
//Sandbox keys btw ;)

var arrParams = [];

//Create the script element using the parameters given
instantiate = (callbackSuccess) => {
    var scriptObj = document.createElement("script");
    var url = "https://www.paypal.com/sdk/js?client-id=CLIENTID";

    //Set params
    url = url.replace("CLIENTID", CLIENT_ID);

    arrParams.forEach((p) => {
        url += "&" + p.param + "=" + p.val;
    });

    scriptObj.src = url;

    //Instantiate
    document.body.parentElement.appendChild(scriptObj);

    if (callbackSuccess != undefined) {
        setTimeout(callbackSuccess, 1000);
    }
}


//Set parameters for the order
setOrderParam = (param, value) => {
    arrParams.push({
        param: param,
        val: value
    });
}

//Render paypal button
render = (selector) => {
    paypal.Buttons({
        style: {
            layout: 'vertical',
            color: 'blue',
            shape: 'rect',
            label: 'paypal'
        },
        createOrder: function (data, actions) {
            console.log("Order created");
            console.log(data);
            console.log(actions);

            // Set up the transaction
            return actions.order.create({
                purchase_units: [{
                    amount: {
                        value: '3.00'
                    }
                }]
            });
        },
        onApprove: function (data, actions) {
            console.log("Approved");
            console.log(data);
            console.log(actions);

            return actions.order.capture().then(function (details) {
                // This function shows a transaction success message to your buyer.
                alert('Transaction completed by ' + details.payer.name.given_name);
            });
        },
        onCancel: function (data) {
            console.log("Cancel");
            console.log(data);
        },
        onError: function (err) {
            console.log("Error");
            console.log(data);
        }
    }).render(selector);
}


//Runtime

window.onload = () => {
    setOrderParam("currency", "CAD");

    instantiate(function () {
        render("#paypal-button-container")
    });
}
