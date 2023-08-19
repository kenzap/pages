import { H, __attr, attr, __html, showLoader, simulateClick, hideLoader, initHeader, initBreadcrumbs, parseApiError, getCookie, onClick, onKeyUp, getSiteId, link, slugify, spaceID , toast } from '@kenzap/k-cloud';
import { getPageNumber, getPagination, formatStatus, formatTime, initFooter, getParam } from "../_/_helpers.js"
import { pagesListContent } from "../_/_cnt_pages_list.js"

/**
 * Main product listing page of the dashboard.
 * Loads HTMLContent from _cnt_product_list.js file.
 * Renders product list in a dynamic table.
 * 
 * @version 1.0
 */
class Pages {

    // construct class
    constructor(){
        
        this.state = {
            firstLoad: true,
            settings: {},
            limit: 10, // number of records to load per table
        };
    
        // connect to backend
        this.getData();
    }

    /**
     * Get data from the cloud and authenticate the user.
     * Load translation strings.
     * Get any additional data by extending the query object.
     * 
     * @version 1.0
     * @link https://developer.kenzap.cloud/
     */
    getData = () => {

        // show loader during first load
        if (this.state.firstLoad) showLoader();

        // search content
        let s = document.querySelector('.search-cont input') ? document.querySelector('.search-cont input').value : '';

        let id = getParam('id');

        // do API query
        fetch('https://api-v1.kenzap.cloud/', {
            method: 'post',
            headers: H(),
            body: JSON.stringify({
                query: {
                    user: {
                        type:       'authenticate',
                        fields:     ['avatar'],
                        token:      getCookie('kenzap_token')
                    },
                    locale: {
                        type:       'locale',
                        source:      ['extension'],
                        key:         'ecommerce',
                    },
                    settings: {
                        type:       'get',
                        key:        'pages-settings',
                        fields:     ['currency', 'currency_symb', 'currency_symb_loc', 'tax_calc', 'tax_auto_rate', 'tax_rate', 'tax_display', 'fee_calc', 'fee_percent', 'fee_display'],
                    },
                    site: {
                        type:       'find',
                        key:        'pages-site',
                        fields:     ['_id', 'id', 'img', 'status', 'domain', 'title', 'updated'],
                        id:         id,
                    },
                    pages: {
                        type:       'find',
                        key:        'pages-page',
                        fields:     ['_id', 'id', 'status', 'page', 'slug', 'title', 'updated'],
                        limit:      this.state.limit,
                        offset:     s.length > 0 ? 0 : getPageNumber() * this.state.limit - this.state.limit,    // automatically calculate the offset of table pagination
                        search:     {                                                           // if s is empty search query is ignored
                                        field: 'title',
                                        s: s
                                    },
                        term:       [
                                    // {
                                    //     "field": "created",
                                    //     "relation": ">=",
                                    //     "type": "numeric",
                                    //     "value": Date.parse(from)  / 1000 | 0
                                    // },
                                    {
                                        "field": "site_id",
                                        "relation": "=",
                                        "type": "string",
                                        "value": id
                                    }
                        ],
                        // sortby:     {
                        //                 field: 'created',
                        //                 order: 'DESC'
                        //             }
                    }
                }
            })
        })
        .then(response => response.json())
        .then(response => {

            // hide UI loader
            hideLoader();

            if(response.success){

                this.state.pages = response.pages;

                // init header
                initHeader(response);

                // get core html content 
                this.html();  

                // render table
                this.render(response);

                // bind content listeners
                this.initListeners();
            
                // init pagination
                this.initPagination(response);

                // initiate footer
                initFooter(this);

                // first load
                this.state.firstLoad = false;

            }else{

                parseApiError(response);
            }
        })
        .catch(error => { parseApiError(error); });
    }

    authUser = (response) => {

        if(response.user){
            
            if(response.user.success == true){

                
            }
        }
    }

    html = () => {
  
        if(!this.state.firstLoad) return;

        // get core html content 
        document.querySelector('#contents').innerHTML = pagesListContent();
    }

    render = (response) => {

        if(this.state.firstLoad){

            // initiate breadcrumbs
            initBreadcrumbs(
                [
                    { link: link('https://dashboard.kenzap.cloud'), text: __html('Home') },
                    { link: link('/sites/'), text: __html('Sites') },
                    { text: __html('Pages') },
                ]
            );

            // init table header
            document.querySelector(".table thead").innerHTML = `
                <tr>
                    <th>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#212529" class="bi justify-content-end bi-search mb-1 me-2" viewBox="0 0 16 16" >
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"></path>
                        </svg>
                    </th>
                    <th>
                        <div class="search-cont input-group input-group-sm mb-0 justify-content-start">     
                            <input type="text" placeholder="${ __html('Search pages') }" class="form-control border-top-0 border-start-0 border-end-0 rounded-0" aria-label="${ __html('Search products') }" aria-describedby="inputGroup-sizing-sm" style="max-width: 200px;">
                        </div>
                        <span>${ __html("Status") }</span>
                    </th>
                    <th>${ __html("Last change") }</th>
                    <th class="text-end"> </th>
                </tr>`;

                if(getParam('new')){

                    this.newPageWelcome();
                }    
        }

        // no products in the list
        if (response.pages.length == 0) {

            document.querySelector(".table tbody").innerHTML = `<tr><td colspan="6">${ __html("No pages to display.") }</td></tr>`;
            return;
        }

        let sid = getSiteId();

        this.state.settings = response.settings;

        let img = 'https://cdn.kenzap.com/loading.png';
        
        // console.log(response.pages);

        // generate website table
        document.querySelector(".table tbody").innerHTML = response.pages.map((page, i) => {

            return `
                <tr>
                    <td class="d-flex align-items-center" style="min-width:250px;">
                        <div >
                            ${ 
                                page.page.home_page ?
                                `
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-house-check me-2" viewBox="0 0 16 16">
                                    <path d="M7.293 1.5a1 1 0 0 1 1.414 0L11 3.793V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v3.293l2.354 2.353a.5.5 0 0 1-.708.708L8 2.207l-5 5V13.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 2 13.5V8.207l-.646.647a.5.5 0 1 1-.708-.708L7.293 1.5Z"/>
                                    <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm1.679-4.493-1.335 2.226a.75.75 0 0 1-1.174.144l-.774-.773a.5.5 0 0 1 .708-.707l.547.547 1.17-1.951a.5.5 0 1 1 .858.514Z"/>
                                </svg>
                                `
                                :
                                `
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-file-earmark me-2" viewBox="0 0 16 16">
                                    <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z"/>
                                </svg>
                                `
                            } 
                        </div>
                        <div class="timgc d-none">
                            <a href="${ link('/edit/?id='+page._id+'&site='+getParam('id')) }"><img src="${ img }" data-srcset="${ img }" class="img-fluid rounded" alt="${ __attr("Product placeholder") }" srcset="${ img }" ></a>
                        </div>
            
                        <div class="my-1"> 
                            <a class="text-body" href="${ link('/edit/?id='+page._id+'&site='+getParam('id')) }" >${ page.page.title ? page.page.title : page.title }<i style="color:#9b9b9b;font-size:15px;margin-left:8px;" title="${ __attr("Edit product") }" class="mdi mdi-pencil menu-icon edit-page"></i></a>
                        </div>
                    </td>
                    <td>
                        <span>${ formatStatus(__, page.status == 0 ? 1 : 1) }</span>
                    </td>
                    <td>
                        <span>${ formatTime(__, page.updated) }</span>
                    </td>
                    <td class="text-end"> 
                        <div class="dropdown applicationsActionsCont">
                            <svg id="applicationsActions${i}" data-bs-toggle="dropdown" data-bs-boundary="viewport" aria-expanded="false" xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" class="bi bi-three-dots-vertical dropdown-toggle po" viewBox="0 0 16 16">
                                <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                            </svg>
                            <ul class="dropdown-menu" aria-labelledby="applicationsActions${i}">
                                <li><a class="dropdown-item po edit-page" href="#" data-id="${ attr(page._id) }" data-index="${ i }">${ __html('Edit') }</a></li>
                                <li><a class="dropdown-item po duplicate-page" href="#" data-id="${ attr(page._id) }" data-index="${ i }">${ __html('Duplicate') }</a></li>
                                <li><hr class="dropdown-divider d-none-"></li>
                                <li><a class="dropdown-item po remove-product" href="#" data-type="remove" data-id="${ attr(page._id) }" data-index="${ i }">${ __html('Remove') }</a></li>
                            </ul>
                        </div>
                    </td>
                </tr>`; 

        }).join('');
    }

    initListeners = () => {

        // remove page
        onClick('.remove-product', this.listeners.removeProduct);

        // edit page
        onClick('.edit-page', this.listeners.editPage);

        // duplicate page
        onClick('.duplicate-page', this.listeners.duplicatePage);

        // search products activation
        onClick('.table-p-list .bi-search', this.listeners.searchProductsActivate);

        // break here if initListeners is called more than once
        if(!this.state.firstLoad) return;

        // add product modal
        onClick('.btn-add', this.addPage);

        // add product confirm
        // onClick('.btn-modal', this.listeners.modalSuccessBtn);
    }

    listeners = {

        editPage: (e) => {

            e.preventDefault();

            simulateClick(e.currentTarget.parentElement.parentElement.parentElement.parentElement.parentElement.querySelector('.timgc a'));
        },
        removeProduct: (e) => {

            e.preventDefault();

            let c = confirm( __html('Completely remove this page?') );

            if(!c) return;

            let page = this.state.pages.filter((o) => o._id == e.currentTarget.dataset.id)[0];

            if(!page.slug) page.slug = slugify(page.title);

            showLoader();
  
            // send data
            fetch('https://api-v1.kenzap.cloud/', {
                method: 'post',
                headers: H(),
                body: JSON.stringify({
                    query: {
                        product: {
                            type:       'delete',
                            key:        'pages-page',   
                            id:         e.currentTarget.dataset.id,
                        }
                    }
                })
            })
            .then(response => response.json())
            .then(response => {

                if (response.success){

                    this.getData();

                }else{

                    parseApiError(response);
                }
                
            })
            .catch(error => { parseApiError(error); });

            // delete page
            fetch('https://api.pages.app.kenzap.cloud/', {
                method: 'post',
                headers: H(),
                body: JSON.stringify({
                    query: {
                        page: {
                            type:           'delete-page',
                            // domain:         site.domain,
                            id:             e.currentTarget.dataset.id,         
                            slug:           page.slug,         
                            sid:            spaceID(),
                        }
                    }
                }) 
            })
            .then(response => response.json())
            .then(response => {

                if (response.success){

                    hideLoader();

                    toast( __html('Page removed') );

                }else{

                    parseApiError(response);
                }
            })
            .catch(error => { parseApiError(error); }); 
        },
 
        duplicatePage: (e) => {

            e.preventDefault();

            let c = confirm( __html('Create a copy of this page?') );

            if(!c) return;

            let page = this.state.pages.filter((o) => o._id == e.currentTarget.dataset.id)[0];

            // if(!page.slug) page.slug = slugify(page.title);

            // console.log(page);

            showLoader();

            // return;
  
            // create page
            fetch('https://api.pages.app.kenzap.cloud/', {
                method: 'post',
                headers: H(),
                body: JSON.stringify({
                    query: {
                        page: {
                            type:           'duplicate-page',
                            // domain:         site.domain,
                            id:             e.currentTarget.dataset.id,         
                            slug:           page.slug,         
                            sid:            spaceID(),
                        }
                    }
                }) 
            })
            .then(response => response.json())
            .then(response => {

                if (response.success){

                    hideLoader();

                    this.getData();
                    
                    toast( __html('Page copied') );

                }else{

                    parseApiError(response);
                }
            })
            .catch(error => { parseApiError(error); }); 
        },

        searchProductsActivate: (e) => {

            e.preventDefault();

            document.querySelector('.table-p-list thead tr th:nth-child(2) span').style.display = 'none';
            document.querySelector('.table-p-list thead tr th:nth-child(2) .search-cont').style.display = 'flex';
            document.querySelector('.table-p-list thead tr th:nth-child(2) .search-cont input').focus();

            // search products
            onKeyUp('.table-p-list thead tr th:nth-child(2) .search-cont input', this.listeners.searchProducts);
        },
 
        searchProducts: (e) => {

            e.preventDefault();

            this.getData();
        },

        modalSuccessBtn: (e) => {
            
            this.listeners.modalSuccessBtnFunc(e);
        },

        modalSuccessBtnFunc: null
    }

    addPage = (e) => {

        let modal = document.querySelector(".modal");
        let modalCont = new bootstrap.Modal(modal);
        
        modal.querySelector(".modal-title").innerHTML = __html('Add Page');
        modal.querySelector(".modal-footer").innerHTML = `
            <button type="button" class="btn btn-primary btn-modal">${ __html('Add') }</button>
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">${ __html('Cancel') }</button>
        `;

        // modal.querySelector(".btn-primary").innerHTML = __html('Add');
        // modal.querySelector(".btn-secondary").innerHTML = __html('Cancel');

        // let d = ""; 
        let title = '', slug = '', price = '';
        let modalHTml = `
        <div class="form-cont">
            <img style="width:100%;max-height:200px;" class="mb-3" src="/assets/img/application-1.svg">
            <div class="form-group mb-3">
                <label for="p-title" class="form-label">${ __html('Title') }</label>
                <input type="text" class="form-control" id="p-title" autocomplete="off" placeholder="" value="${ title }">
                <p class="form-text">${ __html('You can update page title later.') }</p>
            </div>
            <div class="form-group mb-3 d-none">
                <label for="p-slug" class="form-label">${ __html('Slug (optional)') }</label>
                <input type="text" class="form-control" id="p-slug" autocomplete="off" placeholder="" value="${ slug }">
                <p class="form-text">${ __html('Slug is generated automatically.') }</p>
            </div>
        </div>`;

        modal.querySelector(".modal-body").innerHTML = modalHTml;

        // onlyNumbers('#p-price', [8, 46, 190]);

        onClick(".btn-modal", e => {

            e.preventDefault();

            let data = {};
            data.title = modal.querySelector("#p-title").value.trim();
            data.domain = modal.querySelector("#p-slug").value.trim();
            // data.price = modal.querySelector("#p-price").value.trim();
            data.status = "1";
            data.img = [];
            data.cats = [];
            data.site_id = getParam('id');

            // if(data.title.length<2){ alert( __html('Please provide longer title') ); return; }

            // send data
            fetch('https://api-v1.kenzap.cloud/', {
                method: 'post',
                headers: H(),
                body: JSON.stringify({
                    query: {
                        product: {
                            type:       'create',
                            key:        'pages-page',   
                            data:       data
                        }
                    }
                }) 
            })
            .then(response => response.json())
            .then(response => {

                if (response.success){

                    // open product editing page
                    window.location.href = link(`/edit/?id=${ response.product.id }&site=${ getParam('id') }`)

                }else{

                    parseApiError(response);
                }
            })
            .catch(error => { parseApiError(error); });
        });

        modalCont.show();

        setTimeout( () => modal.querySelector("#p-title").focus(),100 );
    }

    newPageWelcome = () => {

        let modal = document.querySelector(".modal");
        this.state.modalCont = new bootstrap.Modal(modal);
        modal.querySelector(".modal-dialog").style.maxWidth = '600px';
        modal.querySelector(".modal-title").innerHTML = __html('Site Created');
        modal.querySelector(".btn-secondary").innerHTML = __html('close');
        modal.querySelector('.modal-footer').innerHTML = `
            <button type="button" class="btn btn-primary btn-modal btn-help">${ __html('Add page') }</button>
            <button type="button" class="btn btn-secondary btn-modal" data-bs-dismiss="modal">${ __html('Close') }</button>
        `;
        modal.querySelector(".modal-body").innerHTML = `

            <div class="form-cont ge-form">
                <img style="width:100%;max-height:240px;" class="mb-3" src="/assets/img/welcome.svg">
                <p class="form-text-">${ __html('Your website is created and ready to serve first visitors. Hit on Add page button to create a new page.') }</p>
            </div>
        `;

        onClick('.btn-help', e => {

            this.state.modalCont.hide();
            this.addPage();
        });

        this.state.modalCont.show();
    }

    initPagination = (response) => {

        getPagination(__, response.meta, this.getData);
    }
}

new Pages();