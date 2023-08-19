import { H, __attr, attr, __html, showLoader, hideLoader, spaceID, initHeader, initBreadcrumbs, parseApiError, getCookie, onClick, simulateClick, onKeyUp, getSiteId, link, onChange } from '@kenzap/k-cloud';
import { getPageNumber, getPagination, formatStatus, priceFormat, formatTime, getParam, initFooter } from "../_/_helpers.js"
import { sitesListContent } from "../_/_cnt_sites_list.js"

/**
 * Main product listing page of the dashboard.
 * Loads HTMLContent from _cnt_product_list.js file.
 * Renders product list in a dynamic table.
 * 
 * @version 1.0
 */
class Sites {

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
                        key:        'sites-settings',
                        fields:     ['currency', 'currency_symb', 'currency_symb_loc', 'tax_calc', 'tax_auto_rate', 'tax_rate', 'tax_display', 'fee_calc', 'fee_percent', 'fee_display'],
                    },
                    products: {
                        type:       'find',
                        key:        'pages-site',
                        fields:     ['_id', 'id', 'img', 'status', 'domain', 'desc', 'title', 'updated'],
                        limit:      this.state.limit,
                        offset:     s.length > 0 ? 0 : getPageNumber() * this.state.limit - this.state.limit,    // automatically calculate the offset of table pagination
                        search:     {                                                           // if s is empty search query is ignored
                                        field: 'title',
                                        s: s
                                    },
                        sortby:     {
                                        field: 'created',
                                        order: 'DESC'
                                    }
                    }
                }
            })
        })
        .then(response => response.json())
        .then(response => {

            // hide UI loader
            hideLoader();

            if(response.success){

                // init header
                initHeader(response);

                // get core html content 
                this.html();  

                // render table
                this.render(response);

                // bind content listeners
                this.initListeners();
            
                // init pagination
                // this.initPagination(response);

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
        document.querySelector('#contents').innerHTML = sitesListContent();
    }

    render = (response) => {

        if(this.state.firstLoad){

            // initiate breadcrumbs
            initBreadcrumbs(
                [
                    { link: link('https://dashboard.kenzap.cloud'), text: __html('Home') },
                    { text: __html('Sites') }
                ]
            );

            // init table header
            // document.querySelector(".table thead").innerHTML = `
            //     <tr>
            //         <th>
            //             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#212529" class="bi justify-content-end bi-search mb-1" viewBox="0 0 16 16" >
            //                 <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"></path>
            //             </svg>
            //         </th>
            //         <th>
            //             <div class="search-cont input-group input-group-sm mb-0 justify-content-start">     
            //                 <input type="text" placeholder="${ __html('Search products') }" class="form-control border-top-0 border-start-0 border-end-0 rounded-0" aria-label="${ __html('Search products') }" aria-describedby="inputGroup-sizing-sm" style="max-width: 200px;">
            //             </div>
            //             <span>${ __html("Domain") }</span>
            //         </th>
            //         <th>${ __html("Status") }</th>
            //         <th>${ __html("Desc") }</th>
            //         <th>${ __html("Last change") }</th>
            //         <th></th>
            //     </tr>`;
        }

        let sid = getSiteId();
        this.state.settings = response.settings;
        this.state.sites = response.products;

        // console.log(this.state.sites);

        // no products in the list
        if (response.products.length == 0) {

            document.querySelector(".table tbody").innerHTML = `<tr><td colspan="6" class="text-center form-text fs-6 p-3">${ __html("no sites to display") }</td></tr>`;
            return;
        }

        // generate website table
        let list = '';
        for (let i in response.products) {

            let img = 'https://cdn.kenzap.com/loading.png';

            if(typeof(response.products[i].img) === 'undefined') response.products[i].img = [];
            if(response.products[i].img[0]) img = CDN + '/S'+sid+'/product-'+response.products[i]._id+'-1-100x100.jpeg?'+response.products[i].updated;
              
            response.products[i].status = "1";

            list += `
                <tr class="fs-5 ">
                    <td class="destt" style="max-width:250px;min-width:250px;">
                        <div class="my-1 my-3 ms-2 d-flex align-items-center"> 
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-house-check me-3" viewBox="0 0 16 16">
                                <path d="M7.293 1.5a1 1 0 0 1 1.414 0L11 3.793V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v3.293l2.354 2.353a.5.5 0 0 1-.708.708L8 2.207l-5 5V13.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 2 13.5V8.207l-.646.647a.5.5 0 1 1-.708-.708L7.293 1.5Z"/>
                                <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm1.679-4.493-1.335 2.226a.75.75 0 0 1-1.174.144l-.774-.773a.5.5 0 0 1 .708-.707l.547.547 1.17-1.951a.5.5 0 1 1 .858.514Z"/>
                            </svg>
                            <a class="text-body" href="${ link('/pages/?id='+response.products[i]._id) }" >${ response.products[i].domain }<i style="color:#9b9b9b;font-size:15px;margin-left:8px;" title="${ __attr("Edit site") }" class="mdi mdi-pencil menu-icon edit-site"></i></a>
                        </div>
                    </td>
                    <td>
                        <span>${ formatStatus(__, response.products[i].status) }</span>
                    </td>
                    <td class="text-end"> 
                        <div class="dropdown applicationsActionsCont">
                            <svg id="applicationsActions${i}" data-bs-toggle="dropdown" data-boundary="viewport" aria-expanded="false" xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" class="bi bi-three-dots-vertical dropdown-toggle po" viewBox="0 0 16 16">
                                <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                            </svg>
                            <ul class="dropdown-menu" aria-labelledby="applicationsActions${i}">
                                <li><a class="dropdown-item po view-pages" href="#" data-id="${ attr(response.products[i]._id) }" data-index="${ i }">${ __html('Pages') }</a></li>
                                <li><a class="dropdown-item po change-domain" href="#" data-id="${ attr(response.products[i]._id) }" data-index="${ i }">${ __html('Domain') }</a></li>
                                <li><hr class="dropdown-divider "></li>
                                <li><a class="dropdown-item po remove-product" href="#" data-type="remove" data-id="${ attr(response.products[i]._id) }" data-index="${ i }">${ __html('Remove') }</a></li>
                            </ul>
                        </div>
                        <a href="#" data-id="${ response.products[i]._id }" class="remove-product text-danger d-none me-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                            </svg>
                        </a>
                    </td>
                </tr>`; 
        }

        // provide result to the page
        document.querySelector(".table tbody").innerHTML = list;
    }

    initListeners = () => {

        // remove website
        onClick('.remove-product', this.listeners.removeProduct);

        // edit pages
        onClick('.view-pages', this.listeners.viewPages);

        // change domain
        onClick('.change-domain', this.listeners.changeDomain);

        // search products activation
        onClick('.table-p-list .bi-search', this.listeners.searchProductsActivate);

        // break here if initListeners is called more than once
        if(!this.state.firstLoad) return;

        // add product modal
        onClick('.btn-add', this.addSite);

        // add product confirm
        onClick('.btn-modal', this.listeners.modalSuccessBtn);
    }

    listeners = {

        removeProduct: (e) => {

            e.preventDefault();

            let c = confirm( __html('Completely remove this site?') );

            if(!c) return;
  
            let site = this.state.sites.filter((o) => o._id == e.currentTarget.dataset.id)[0];

            // update data
            fetch('https://api-v1.kenzap.cloud/', {
                method: 'post',
                headers: H(),
                body: JSON.stringify({
                    query: {
                        product: {
                            type:       'delete',
                            key:        'pages-site',   
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

            // remove host
            fetch('https://api.pages.app.kenzap.cloud/', {
                method: 'post',
                headers: H(),
                body: JSON.stringify({
                    query: {
                        page: {
                            type:           'delete-host',
                            domain:         site.domain,
                            id:             site._id,         
                            sid:            spaceID(),
                        }
                    }
                }) 
            })
            .then(response => response.json())
            .then(response => {

                if (response.success){



                }else{

                    parseApiError(response);
                }
            })
            .catch(error => { parseApiError(error); }); 

        },

        viewPages: (e) => {

            e.preventDefault();

            // console.log(e.currentTarget.parentElement.parentElement.parentElement.parentElement.parentElement.querySelector('.destt a'))
            simulateClick(e.currentTarget.parentElement.parentElement.parentElement.parentElement.parentElement.querySelector('.destt a'));
        },

        changeDomain: (e) => {

            e.preventDefault();

            // console.log(e.currentTarget.dataset.id);
            // console.log(o._id);

            let site = this.state.sites.filter((o) => o._id == e.currentTarget.dataset.id)[0];

            console.log(site._id);

            let modal = document.querySelector(".modal");
            let modalCont = new bootstrap.Modal(modal);
            
            modal.querySelector(".modal-title").innerHTML = __html('Domain');
            modal.querySelector(".btn-primary").innerHTML = __html('Update');
            modal.querySelector(".btn-secondary").innerHTML = __html('Cancel');

            let modalHTml = `
            <div class="form-cont">
                <img style="width:100%;max-height:200px;" class="mb-3" src="/assets/img/application-1.svg">
                <div class="form-group mb-3">
                    <label for="p-domain" class="form-label">${ __html('Domain') }</label>
                    <input type="text" class="form-control" id="p-domain" autocomplete="off" placeholder="" value="${ site.domain }">
                    <div id="domainFeedback" class="invalid-feedback"></div>
                    <p class="form-text">${ __html('Please make sure to point provided domain name to the following IP address 128.199.169.41.') }</p>
                </div>
            </div>`;

            modal.querySelector(".modal-body").innerHTML = modalHTml;

            // onlyNumbers('#p-price', [8, 46, 190]);

            this.listeners.modalSuccessBtnFunc = (e) => {

                e.preventDefault();

                let data = {};
                // data.title = modal.querySelector("#p-title").value.trim();
                data.domain = modal.querySelector("#p-domain").value.trim().toLowerCase();

                // restore defaults
                document.querySelector('#p-domain').classList.remove('is-invalid'); 
                document.querySelector('#domainFeedback').innerHTML = ""; 

                // check for https
                if(data.domain.indexOf('/')!=-1){ document.querySelector('#p-domain').classList.add('is-invalid'); document.querySelector('#domainFeedback').innerHTML = __html('Remove http:// or https:// or other special characters.'); return; }

                // validate with subdomains
                let reg = /^[a-zA-Z0-9][a-zA-Z0-9-_]{0,61}[a-zA-Z0-9]{0,1}\.([a-zA-Z]{1,11}|[a-zA-Z0-9-]{1,30}\.[a-zA-Z]{2,12})$/;
                if(!reg.test(data.domain)){ document.querySelector('#p-domain').classList.add('is-invalid'); document.querySelector('#domainFeedback').innerHTML = __html('Domain name is invalid.'); return; }

                showLoader();

                // update data
                fetch('https://api-v1.kenzap.cloud/', {
                    method: 'post',
                    headers: H(),
                    body: JSON.stringify({
                        query: {
                            site: {
                                type:       'update',
                                key:        'pages-site',   
                                id:         site._id,
                                data:       data
                            }
                        }
                    }) 
                })
                .then(response => response.json())
                .then(response => {

                    if (response.success){

                        // open product editing page
                        // window.location.href = link(`/pages/?id=${ response.site.id }`)
                        modalCont.hide();
                        this.getData();

                    }else{

                        parseApiError(response);
                    }
                })
                .catch(error => { parseApiError(error); });

                // recreate host
                fetch('https://api.pages.app.kenzap.cloud/', {
                    method: 'post',
                    headers: H(),
                    body: JSON.stringify({
                        query: {
                            page: {
                                type:           'domain',
                                domain_from:    site.domain,
                                domain_to:      data.domain, 
                                site_id:        site._id,         
                                sid:            spaceID(),
                            }
                        }
                    }) 
                })
                .then(response => response.json())
                .then(response => {

                    if (response.success){

                        hideLoader();
 
                    }else{

                        parseApiError(response);
                    }
                })
                .catch(error => { parseApiError(error); }); 
            }

            modalCont.show();
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

    addSite = (e) => {

        let modal = document.querySelector(".modal");
        let modalCont = new bootstrap.Modal(modal);
        
        modal.querySelector(".modal-title").innerHTML = __html('Add Site');
        modal.querySelector(".btn-primary").innerHTML = __html('Add');
        modal.querySelector(".btn-secondary").innerHTML = __html('Cancel');
        let d = ""; 
        let title = '', domain = '', price = '';
        let modalHTml = `
        <div class="form-cont">
            <img style="width:100%;max-height:200px;" class="mb-3" src="/assets/img/application-1.svg">
            <div class="form-group mb-3">
                <div class="form-check">
                    <input id="free-domain" class="form-check-input" type="radio" value="free" name="domain_type" checked>
                    <label class="form-check-label" for="freeDomain">
                        ${ __html('Free Kenzap Domain') }
                    </label>
                    <div id="freeDomainFeedback" class="invalid-feedback"></div>
                    <p class="form-text">${ __html('Host your pages free of charge under https://%1$.kenzap.site domain name.', spaceID()) }</p>
                </div>
                <div class="form-check">
                    <input id="my-domain" class="form-check-input" type="radio" value="custom" name="domain_type" >
                    <label class="form-check-label" for="myDomain">
                        ${ __html('Custom Domain') }
                    </label>
                    <p class="form-text">${ __html('Connect your custom registered domain name.') }</p>
                </div>
                <div class="c-domain d-none">
                    <label for="p-domain" class="form-label">${ __html('Domain name') }</label>
                    <input id="p-domain" type="text" class="form-control" autocomplete="off" placeholder="" value="${ domain }">
                    <div id="domainFeedback" class="invalid-feedback"></div>
                    <p class="form-text">${ __html('Please make sure to point provided domain name to the following IP address 128.199.169.4.') }</p>
                </div>
            </div>
        </div>`;

        modal.querySelector(".modal-body").innerHTML = modalHTml;

        onChange('[name="domain_type"]', e => {

            if(modal.querySelector('[name="domain_type"]:checked').value == 'custom'){

                modal.querySelector(".c-domain").classList.remove('d-none');
            }else{
                modal.querySelector(".c-domain").classList.add('d-none');
            }
        });
        
        this.listeners.modalSuccessBtnFunc = (e) => {

            e.preventDefault();

            let data = {};
            // data.title = modal.querySelector("#p-title").value.trim();
            data.domain = modal.querySelector("#p-domain").value.trim();
            if(modal.querySelector('[name="domain_type"]:checked').value == 'free'){ data.domain = spaceID() + '.kenzap.site' }
                
            // data.price = modal.querySelector("#p-price").value.trim();
            data.status = "0";
            data.img = [];
            data.cats = [];

            // restore defaults
            document.querySelector('#p-domain').classList.remove('is-invalid');
            document.querySelector('#free-domain').classList.remove('is-invalid');
            document.querySelector('#domainFeedback').innerHTML = "";
            document.querySelector('#freeDomainFeedback').innerHTML = "";

            // can only add one free domain name
            if(this.state.sites.length > 0 && modal.querySelector('[name="domain_type"]:checked').value == 'free'){
                document.querySelector('#free-domain').classList.add('is-invalid'); document.querySelector('#freeDomainFeedback').innerHTML = __html('Can not add new free site. Consider removing existing sites first.'); return; 
            } 

            // if(data.domain.length<5){ alert( __html('Please provide valid domain name') ); return; }

            // check for https
            if(data.domain.indexOf('/')!=-1){ document.querySelector('#p-domain').classList.add('is-invalid'); document.querySelector('#domainFeedback').innerHTML = __html('Remove http:// or https:// or other special characters.'); return; }

            // validate with subdomains
            let reg = /^[a-zA-Z0-9][a-zA-Z0-9-_]{0,61}[a-zA-Z0-9]{0,1}\.([a-zA-Z]{1,11}|[a-zA-Z0-9-]{1,30}\.[a-zA-Z]{2,12})$/;
            if(!reg.test(data.domain)){ document.querySelector('#p-domain').classList.add('is-invalid'); document.querySelector('#domainFeedback').innerHTML = __html('Domain name is invalid.'); return; }

            showLoader();

            // send data
            fetch('https://api-v1.kenzap.cloud/', {
                method: 'post',
                headers: H(),
                body: JSON.stringify({
                    query: {
                        site: {
                            type:       'create',
                            key:        'pages-site',   
                            data:       data
                        }
                    }
                })
            })
            .then(response => response.json())
            .then(response => {

                if (response.success){

                    this.state.response_create = response;

                    // recreate host
                    fetch('https://api.pages.app.kenzap.cloud/', {
                        method: 'post',
                        headers: H(),
                        body: JSON.stringify({
                            query: {
                                page: {
                                    type:           'domain',
                                    domain_from:    '',
                                    domain_to:      data.domain, 
                                    site_id:        this.state.response_create.site.id,         
                                    sid:            spaceID(),
                                }
                            }
                        }) 
                    })
                    .then(response => response.json())
                    .then(response => {

                        if (response.success){

                            // open product editing page
                            window.location.href = link(`/pages/?id=${ this.state.response_create.site.id + (!localStorage.lastSite ? '&new=true' : '') }`)
                            localStorage.setItem('lastSite', '1');

                        }else{

                            parseApiError(response);
                        }
                    })
                    .catch(error => { parseApiError(error); }); 

                }else{

                    parseApiError(response);
                }
            })
            .catch(error => { parseApiError(error); });
        }

        modalCont.show();

        setTimeout(() => modal.querySelector("#p-domain").focus(),100);
    }

    initPagination = (response) => {

        getPagination(__, response.meta, this.getData);
    }
}

new Sites();