import * as rx from 'rxjs'
import fireStore from './fbConfig'


const cafeList = document.querySelector('#cafe-list') as HTMLElement;
const form = document.querySelector('#add-cafe-form') as HTMLFormElement;

// create element & render cafe
function renderCafe(doc:any){
    let li = document.createElement('li') as HTMLLIElement;
    let name = document.createElement('span') as HTMLSpanElement;
    let city = document.createElement('span') as HTMLSpanElement;
    let cross = document.createElement('div') as HTMLDivElement;

    li.setAttribute('data-id', doc.id);
    name.textContent = doc.data().name;
    city.textContent = doc.data().city;
    cross.textContent = 'x';

    li.appendChild(name);
    li.appendChild(city);
    li.appendChild(cross);

    cafeList.appendChild(li);

    // deleting data
    cross.addEventListener('click', (e:any) => {
        let id = e.target.parentElement.getAttribute('data-id');
        fireStore.collection('cafe').doc(id).delete()
    });
}

// getting data
fireStore.collection('cafe').orderBy('city').get().then((snapshot:any) => {
    snapshot.docs.forEach((doc:any) => {
        renderCafe(doc);
    });
});

// saving data
form.addEventListener('submit', (e) => {
    e.preventDefault();
    fireStore.collection('cafe').add({
        name: form.cafename.value,
        city: form.city.value
    });
    form.cafename.value = '';
    form.city.value = '';
});