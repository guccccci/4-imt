const parrotWrapper = document.querySelector(".parrots-wrapper");
const btnWrap = document.querySelector('.btn-wrap');
const elCardList = document.querySelector(".card-list")
const editModal = new bootstrap.Modal("#edit-parrot-modal");
const addModalHide = new bootstrap.Modal("#add-parrot-modal");
const addForm = document.querySelector('#add-modal-form');
const addTitleInput = document.querySelector('#parrot-title');
const addImgInput = document.querySelector('#parrot-img');
const addPriceInput = document.querySelector('#price');
const addDateInput = document.querySelector('#parrot-date');
const addWidthInput = document.querySelector('#parrot_width');
const addHeightInput = document.querySelector('#parrot_height');
const addFeaturesInput = document.querySelector('#features');
const count = document.querySelector('#count');
const sortSelect = document.querySelector('#sortby');
const searchInput = document.querySelector('#search');
const filterBtn = document.querySelector('#filter-btn');

let parrotList = [
    {
        id: 1,
        title: "Hyacinth macaw",
        img: "https://media.istockphoto.com/photos/parrot-hyacinth-macaw-picture-id1359443019?b=1&k=20&m=1359443019&s=170667a&w=0&h=dteRZ9bM7sEvBbFE9it1r9O7IxlILXb1UnSoLNEVMAg=",
        price: 150,
        birthDate: "2021-12-12",
        sizes: {
            width: 300,
            height: 150
        },
        isFavorite: true,
        features: "Beautiful,Tame,Can speak"
    },
    {
        id: 2,
        title: "Qizil Ara",
        img: "https://media.istockphoto.com/photos/amazon-rainforest-parrot-macaw-picture-id1197182594?b=1&k=20&m=1197182594&s=170667a&w=0&h=bBQfSDgofCr_w2DBf79cwQe-JA45i02vCv7Ttx5qcmU=",
        price: 120,
        birthDate: "2021-11-19",
        sizes: {
            width: 250,
            height: 1200
        },
        isFavorite: false,
        features: ""
    },
    {
        id: 3,
        title: "Sariq tojli oq Kakatu",
        img: "https://media.istockphoto.com/photos/sulphur-crested-cockatoo-picture-id1322969996?k=20&m=1322969996&s=612x612&w=0&h=jceOFxtD6QmLKqKxUxdGFTVc7bATCCVcwpwUSCca0aE=",
        price: 100,
        birthDate: "2021-12-23",
        sizes: {
            width: 150,
            height: 60
        },
        isFavorite: false,
        features: ""
    }
];
// Initial data to add new card data
let addedData = {
    id: null,
    title: "",
    img: "",
    price: null,
    birthDate: "",
    sizes: {
        width: null,
        height: null
    },
    isFavorite: true,
    features: ""
};
// Initial config object for filtering
const filterConfig = {sort: '', searchTerm: ''};

// Funtion for render parrot cards
const renderParrot = (parrotArr = parrotList) => {
    parrotWrapper.innerHTML = '';
    for(let i = 0; i < parrotArr.length; i++){
        const parrot = parrotArr[i];
        const li = document.createElement('li');
        li.classList.add('col-6', 'position-relative');
        li.innerHTML = `<img src=${parrot.img} alt="" class="card-img-top">
        <div class="card-body">
        <h3 class="card-title">${parrot.title}</h3>
        <p class="card-text fw-bold"><mark>$${parrot.price}</mark></p>
        <p class="badge bg-success">${parrot.sizes.width}x${parrot.sizes.height}</p>
        
        <p class="card-text">${parrot.birthDate}</p>
        
        <ul class="d-flex flex-wrap list-unstyled">
        </ul>
        
        <div class="position-absolute top-0 end-0 d-flex btn-wrap">
        <button class="btn rounded-0 btn-success" id=${parrot.id}><i class="fa fa-star-o" style="color: yellow; pointer-events: none;"></i></button>
        <button class="btn rounded-0 btn-secondary" data-bs-toggle="modal" data-bs-target="#edit-parrot-modal" id=${parrot.id}><i class="fa-solid fa-pen" style="pointer-events: none;"></i></button>
        <button class="btn rounded-0 btn-danger" id=${parrot.id}><i class="fa-solid fa-trash" style="pointer-events: none;"></i></button>
        </div>
        </div>
        </div>`;
        parrot.features.split(',').forEach(feature => {
            const list = document.createElement('li');
            list.classList.add('badge', 'bg-primary', 'me-1', 'mb-1');
            list.textContent = feature;
            li.querySelector('.list-unstyled').append(list);
        })
        parrotWrapper.append(li);
    }
    count.textContent = parrotArr.length;
}
// Initial render
renderParrot();
// Function for delete parrot cards
const removeParrotCard = parrotId => {
    parrotList = parrotList.filter(parrot => parrot.id !== parrotId);
    renderParrot();
}
// Function for editing parrod cards and filling input fields
const fillModalFields = parrotId => {
    const titleInput = document.querySelector('#edit-parrot-title');
    const imgUrlInput = document.querySelector('#edit-parrot-img');
    const priceInput = document.querySelector('#edit-price');
    const dateInput = document.querySelector('#edit-parrot-date');
    const widthInput = document.querySelector('#edit-parrot_width');
    const heightInput = document.querySelector('#edit-parrot_height');
    const featuresInput = document.querySelector('#edit-features');
    const editModalForm = document.querySelector('#edit-modal-form');
    
    const selectedParrot = parrotList.filter(parrot => parrotId === parrot.id)[0];
    const editParrotData = (type, value) => {
        if(type === 'title'){
            selectedParrot.title = value;
        } else if(type === 'img'){
            selectedParrot.img = value;
        } else if(type === 'price'){
            selectedParrot.price = value;
        } else if(type === 'date'){
            selectedParrot.birthDate = value;
        } else if(type === 'width'){
            selectedParrot.sizes.width = value;
        } else if(type === 'height'){
            selectedParrot.sizes.height = value;
        } else {
            selectedParrot.features = value;
        }
    }
    
    titleInput.value = selectedParrot.title;
    imgUrlInput.value = selectedParrot.img;
    priceInput.value = selectedParrot.price;
    dateInput.value = selectedParrot.birthDate;
    widthInput.value = selectedParrot.sizes.width;
    heightInput.value = selectedParrot.sizes.height;
    featuresInput.value = selectedParrot.features;
    
    titleInput.addEventListener('change', e => editParrotData('title', e.target.value));
    imgUrlInput.addEventListener('change', e => editParrotData('img', e.target.value));
    priceInput.addEventListener('change', e => editParrotData('price', e.target.value));
    dateInput.addEventListener('change', e => editParrotData('date', e.target.value));
    widthInput.addEventListener('change', e => editParrotData('width', e.target.value));
    heightInput.addEventListener('change', e => editParrotData('height', e.target.value));
    featuresInput.addEventListener('change', e => editParrotData('features', e.target.value));
    editModalForm.addEventListener('submit', e => {
        e.preventDefault();
        const index = parrotList.findIndex(parrot => parrot.id === selectedParrot.id);
        parrotList = [...parrotList.splice(0, index), selectedParrot, ...parrotList.splice(index+1)];
        renderParrot();
        editModal.hide();
    });
    
}

// Function for add new parrot card
const addData = (type, value) => {
    
    if(type === 'title'){
        addedData.title = value;
    } else if(type === 'img'){
        addedData.img = value;
    } else if(type === 'price'){
        addedData.price = value;
    } else if(type === 'date'){
        addedData.birthDate = value;
    } else if(type === 'width'){
        addedData.sizes['width'] = value;
    } else if(type === 'height'){
        addedData.sizes['height'] = value;
    } else {
        addedData.features = value;
    }
    
}

// Event listener for edit, delete buttons
parrotWrapper.addEventListener('click', e => {
    const clickedElement = e.target;
    if(clickedElement.classList.contains('btn-danger')){
        removeParrotCard(+clickedElement.getAttribute('id'));
    } else if(clickedElement.classList.contains('btn-secondary')){
        fillModalFields(+clickedElement.getAttribute('id'));
    }
})


addTitleInput.addEventListener('change', e => addData('title', e.target.value));
addImgInput.addEventListener('change', e => addData('img', e.target.value));
addPriceInput.addEventListener('change', e => addData('price', e.target.value));
addDateInput.addEventListener('change', e => addData('date', e.target.value));
addWidthInput.addEventListener('change', e => addData('width', e.target.value));
addHeightInput.addEventListener('change', e => addData('height', e.target.value));
addFeaturesInput.addEventListener('change', e => addData('features', e.target.value));

// Adding new parrot card
addForm.addEventListener('submit', e => {
    e.preventDefault();
    addedData.id = parrotList.length + 1;
    parrotList.push(addedData);
    addedData = {    id: null,
        title: "",
        img: "",
        price: null,
        birthDate: "",
        sizes: {
            width: null,
            height: null
        },
        isFavorite: true,
        features: ""};
        addForm.reset();
        addModalHide.hide();
        renderParrot();
    });
    
    searchInput.addEventListener('change', e => {
        filterConfig.searchTerm = e.target.value;
    });
    
    sortSelect.addEventListener('change', e => {
        filterConfig.sort = e.target.value;
    });
    
    filterBtn.addEventListener('click', e => {
        e.preventDefault();
        console.log(filterConfig);
        let filtered = [];
        if(!!filterConfig.searchTerm && !!filterConfig.sort){
            filtered = parrotList.filter(parrot => parrot.title.toLowerCase().includes(filterConfig.searchTerm.toLocaleLowerCase())).sort((a, b) => a.price - b.price);
            renderParrot(filtered);
        } else if(filterConfig.searchTerm){
            filtered = parrotList.filter(parrot => parrot.title.toLowerCase().includes(filterConfig.searchTerm.toLowerCase()));
            renderParrot(filtered);
        } else if(filterConfig.sort) {
            filtered = parrotList.sort((a, b) => a.price - b.price);
            renderParrot(filtered);
        } else {
            renderParrot();
        }
        
        
    })