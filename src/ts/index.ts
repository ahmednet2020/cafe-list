import { Observable, fromEvent } from 'rxjs'
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
    fromEvent(cross,"click")
    .subscribe((e:any)=> {
    	let id = e.target.parentElement.getAttribute('data-id');
        fireStore.collection('cafe').doc(id).delete()
    })
}
// getting data
const data:Observable<any> = Observable.create((obs:any) => {
	fireStore.collection('cafe').orderBy('city').get().then((snapshot:any) => {
		snapshot.docs.forEach((doc:any) => {
	        obs.next(doc);
	    });
	});
});
// print data to html 
data.subscribe((data:any) => {
	renderCafe(data);
},
(err:any) => console.log("data error" + err)
)
// saving data
fromEvent(form, "submit")
.subscribe((e:any) => {
	e.preventDefault();
    fireStore.collection('cafe').add({
        name: form.cafename.value,
        city: form.city.value
    });
    form.cafename.value = '';
    form.city.value = '';
})