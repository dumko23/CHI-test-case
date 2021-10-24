let xhr = new XMLHttpRequest();
xhr.open('GET', './current-loans.json', false);
xhr.send();
let loanArray = JSON.parse(xhr.responseText);

let loanPlace = document.getElementById('loan-list');
for (let i = 0; i < loanArray['loans'].length; i++) {
    let li = document.createElement('li');
    let innerDiv = document.createElement('div');
    innerDiv.classList.add('invest-inner-div')
    let div = document.createElement('div');
    div.classList.add('invest-div');
    let invested = document.createElement('span');
    invested.textContent = `Invested`;
    invested.classList.add('invested');
    invested.id = `invested-${i}`;
    let loanTitle = document.createElement('span');
    loanTitle.textContent = loanArray['loans'][i].title;
    loanTitle.classList.add('title');
    let loanDetails = document.createElement('span');
    loanDetails.textContent = `Tranche: ${loanArray['loans'][i].tranche}`;
    loanDetails.classList.add('details');
    let button = document.createElement('button');
    button.textContent = `Invest`;
    button.classList.add('invest-button');
    button.id = `button-${i}`;
    button.onclick = function () {
        openModal(this);
    };
    innerDiv.appendChild(loanDetails);
    innerDiv.appendChild(button);
    div.appendChild(loanTitle);
    loanTitle.appendChild(invested);
    div.appendChild(innerDiv);
    li.appendChild(div);
    loanPlace.appendChild(li);
}

let cash = 238456,
    num;

document.getElementById('total-amount').innerText = `${cash}`;

function onInvest(investSum) {
    if (investSum) {
        document.getElementById('warning-2').style.display = 'none';
        cash -= investSum;
        document.getElementById('total-amount').innerText = ``;
        document.getElementById('total-amount').innerText = `${cash}`;
        let currentLoan = loanArray['loans'][num].available.replace(/,/g, '');
        if (parseInt(currentLoan) >= investSum) {
            let amountAvailable = parseInt(currentLoan) - investSum;
            loanArray['loans'][num].available = amountAvailable.toString()
                .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
            document.getElementById('current-loan-available').textContent = loanArray['loans'][num].available;
            document.getElementById(`invested-${num}`).style.display = 'inline';
            closeModal();
        } else {
            document.getElementById('warning-1').style.display = 'block';
        }
    } else {
        document.getElementById('warning-2').style.display = 'block';
    }
}

let modal = document.getElementById('modal-id')

function openModal(obj) {
    modal.style.visibility = 'visible';
    num = parseInt(obj.id.match(/\d+/));
    document.getElementById('current-loan-title').innerText = loanArray['loans'][num].title;
    document.getElementById('current-loan-available').innerText = loanArray['loans'][num].available;
    document.getElementById('current-loan-expire')
        .innerText = `${Math.floor(loanArray['loans'][num].term_remaining / 86400)}`;
}

function closeModal() {
    modal.style.visibility = 'hidden';
    document.getElementById('current-loan-title').innerText = '';
    document.getElementById('current-loan-available').innerText = '';
    document.getElementById('current-loan-expire').innerText = '';
    document.getElementById('warning-1').style.display = 'none';
    document.getElementById('warning-2').style.display = 'none';
}

window.onclick = function (event) {
    if (event.target === modal) {
        modal.style.visibility = "hidden";
    }
}